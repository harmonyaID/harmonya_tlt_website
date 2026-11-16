'use client'
import { FC, useEffect, useMemo, useState } from 'react'
import moment, { Moment } from 'moment'
import { ChevronLeft, ChevronRight } from 'react-feather'
import joinClassNameHelper from '@/helper/joinClassName.helper'
import {
    AvailabilityCalendarDay,
    AvailabilityCalendarProps,
    AvailabilityDateRange,
    AvailabilityDayStatus,
    CheckInRestriction,
    PropertyAvailabilitySetting,
} from '@/component/general/type/availabilityCalendar.type'

const DATE_FORMAT = 'YYYY-MM-DD'
const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const EMPTY_RANGE: AvailabilityDateRange = { fromDate: '', toDate: '' }

const toNumber = (value: unknown): number | null => {
    const n = Number(value)
    return value === null || value === undefined || Number.isNaN(n) ? null : n
}

// Normalisasi status dari API (Guesty / CMS) ke status internal
const normalizeStatus = (status?: string | null): AvailabilityDayStatus => {
    const s = String(status || '')
        .toLowerCase()
        .replace(/[\s-]/g, '_')

    if (['booked', 'reserved', 'unavailable', 'blocked'].includes(s))
        return 'booked'
    if (['on_request', 'onrequest', 'request', 'inquiry'].includes(s))
        return 'onRequest'
    return 'available'
}

// checkInRestrictions bisa berupa angka 0-6 atau nama hari
const toWeekdayIndex = (value: CheckInRestriction): number | null => {
    if (typeof value === 'number')
        return value >= 0 && value <= 6 ? value : null

    const key = value.toLowerCase().slice(0, 3)
    const index = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(key)
    return index === -1 ? null : index
}

const buildRules = (availability?: PropertyAvailabilitySetting | null) => {
    const setting = availability || {}
    const today = moment().startOf('day')

    // Advance notice => tanggal check-in paling awal
    const noticeValue = toNumber(setting.advanceNoticeValue) || 0
    const noticeUnit = String(setting.advanceNoticeUnit || 'days').toLowerCase()
    const minCheckIn = moment()
        .add(noticeValue, noticeUnit.startsWith('hour') ? 'hours' : 'days')
        .startOf('day')

    // Booking window => tanggal paling jauh yang bisa dibooking
    const bookingWindow = toNumber(setting.bookingWindow)
    const maxDate = bookingWindow
        ? today.clone().add(bookingWindow, 'days')
        : null

    const restrictedWeekdays = (setting.checkInRestrictions || [])
        .map(toWeekdayIndex)
        .filter((v): v is number => v !== null)

    return {
        today,
        minCheckIn: moment.max(today, minCheckIn),
        maxDate,
        minNights: toNumber(setting.minLengthOfStay) || 1,
        maxNights: toNumber(setting.maxLengthOfStay),
        preparationDays: toNumber(setting.preparationTimeValue) || 0,
        defaultStatus: setting.defaultAvailability
            ? normalizeStatus(setting.defaultAvailability)
            : ('available' as AvailabilityDayStatus),
        restrictedWeekdays,
    }
}

const buildStatusMap = (
    calendar: AvailabilityCalendarDay[] = [],
    preparationDays = 0,
) => {
    const map = new Map<string, AvailabilityDayStatus>()

    calendar.forEach((day) => {
        if (day?.date)
            map.set(
                moment(day.date).format(DATE_FORMAT),
                normalizeStatus(day.status),
            )
    })

    // Preparation time: blok N hari sebelum & sesudah tanggal booked
    if (preparationDays > 0) {
        const bookedDates = [...map.entries()]
            .filter(([, status]) => status === 'booked')
            .map(([date]) => date)

        bookedDates.forEach((date) => {
            for (let i = 1; i <= preparationDays; i++) {
                ;[-i, i].forEach((offset) => {
                    const key = moment(date)
                        .add(offset, 'days')
                        .format(DATE_FORMAT)
                    if (map.get(key) !== 'booked') map.set(key, 'booked')
                })
            }
        })
    }

    return map
}

const AvailabilityCalendar: FC<AvailabilityCalendarProps> = ({
    availability = null,
    calendar = [],
    value,
    onChange,
    onMonthChange,
    initialMonth,
    selectable = true,
    className = '',
}) => {
    const rules = useMemo(() => buildRules(availability), [availability])
    const statusMap = useMemo(
        () => buildStatusMap(calendar, rules.preparationDays),
        [calendar, rules.preparationDays],
    )

    const [viewMonth, setViewMonth] = useState<Moment>(() =>
        moment(initialMonth || undefined).startOf('month'),
    )
    const [innerRange, setInnerRange] =
        useState<AvailabilityDateRange>(EMPTY_RANGE)
    const [hoverDate, setHoverDate] = useState<string>('')

    const range = value ?? innerRange

    useEffect(() => {
        onMonthChange?.(
            viewMonth.clone().format(DATE_FORMAT),
            viewMonth
                .clone()
                .add(1, 'month')
                .endOf('month')
                .format(DATE_FORMAT),
        )
    }, [viewMonth.format('YYYY-MM')])

    const getStatus = (date: Moment): AvailabilityDayStatus => {
        if (date.isBefore(rules.today, 'day')) return 'disabled'
        if (date.isBefore(rules.minCheckIn, 'day')) return 'disabled'
        if (rules.maxDate && date.isAfter(rules.maxDate, 'day'))
            return 'disabled'
        return statusMap.get(date.format(DATE_FORMAT)) || rules.defaultStatus
    }

    const isStayable = (status: AvailabilityDayStatus) =>
        status === 'available' || status === 'onRequest'

    const canCheckIn = (date: Moment) =>
        isStayable(getStatus(date)) &&
        !rules.restrictedWeekdays.includes(date.day())

    // Checkout valid jika semua malam dari check-in s/d H-1 bisa ditempati
    const canCheckOut = (from: Moment, to: Moment) => {
        const nights = to.diff(from, 'days')
        if (nights < rules.minNights) return false
        if (rules.maxNights && nights > rules.maxNights) return false

        for (let i = 0; i < nights; i++) {
            if (!isStayable(getStatus(from.clone().add(i, 'days'))))
                return false
        }
        return true
    }

    const updateRange = (next: AvailabilityDateRange) => {
        if (value === undefined) setInnerRange(next)
        onChange?.(next)
    }

    const handleSelect = (date: Moment) => {
        if (!selectable) return
        const key = date.format(DATE_FORMAT)
        const from = range.fromDate ? moment(range.fromDate) : null

        // Pilih tanggal check-out
        if (from && !range.toDate && date.isAfter(from, 'day')) {
            if (canCheckOut(from, date)) {
                updateRange({ fromDate: range.fromDate, toDate: key })
                return
            }
        }

        // Mulai range baru
        if (canCheckIn(date)) updateRange({ fromDate: key, toDate: '' })
    }

    const handleClear = () => {
        setHoverDate('')
        updateRange(EMPTY_RANGE)
    }

    const minMonth = rules.today.clone().startOf('month')
    const maxMonth = rules.maxDate?.clone().startOf('month')
    const canPrev = viewMonth.isAfter(minMonth, 'month')
    const canNext =
        !maxMonth ||
        viewMonth.clone().add(1, 'month').isBefore(maxMonth, 'month')

    const goMonth = (step: number) =>
        setViewMonth((prev) => prev.clone().add(step, 'month'))

    const renderDay = (date: Moment) => {
        const key = date.format(DATE_FORMAT)
        const status = getStatus(date)
        const from = range.fromDate ? moment(range.fromDate) : null
        const to = range.toDate
            ? moment(range.toDate)
            : from &&
                hoverDate &&
                moment(hoverDate).isAfter(from, 'day') &&
                canCheckOut(from, moment(hoverDate))
              ? moment(hoverDate)
              : null

        const isStart = !!from && date.isSame(from, 'day')
        const isEnd = !!to && date.isSame(to, 'day')
        const inRange =
            !!from &&
            !!to &&
            date.isAfter(from, 'day') &&
            date.isBefore(to, 'day')

        const pickingCheckOut = !!from && !range.toDate
        const clickable =
            selectable &&
            ((pickingCheckOut &&
                date.isAfter(from!, 'day') &&
                canCheckOut(from!, date)) ||
                canCheckIn(date))

        return (
            <button
                key={key}
                type="button"
                className={joinClassNameHelper(
                    'availability-calendar__day',
                    `is-${status}`,
                    isStart || isEnd ? 'is-selected' : '',
                    inRange ? 'is-in-range' : '',
                    clickable ? 'is-clickable' : '',
                )}
                disabled={!clickable}
                aria-label={`${date.format('D MMMM YYYY')} - ${status}`}
                aria-pressed={isStart || isEnd}
                onClick={() => handleSelect(date)}
                onMouseEnter={() => pickingCheckOut && setHoverDate(key)}>
                {date.date()}
            </button>
        )
    }

    const renderMonth = (month: Moment, position: 'first' | 'second') => {
        const start = month.clone().startOf('month')
        const leading = start.day()
        const days = Array.from({ length: month.daysInMonth() }, (_, i) =>
            start.clone().add(i, 'days'),
        )

        return (
            <div
                className={joinClassNameHelper(
                    'col-md-6',
                    position === 'second' ? 'd-none d-md-block' : '',
                )}>
                <div className="availability-calendar__header">
                    <button
                        type="button"
                        className={joinClassNameHelper(
                            'availability-calendar__nav',
                            position === 'first' ? '' : 'invisible',
                        )}
                        onClick={() => goMonth(-1)}
                        disabled={!canPrev}
                        aria-label="Previous month">
                        <ChevronLeft size={22} />
                    </button>

                    <p className="availability-calendar__title mb-0">
                        {month.format('MMMM YYYY')}
                    </p>

                    <button
                        type="button"
                        className={joinClassNameHelper(
                            'availability-calendar__nav',
                            // bulan pertama: next hanya tampil di mobile (bulan kedua di-hide)
                            position === 'second' ? '' : 'is-mobile-only',
                        )}
                        onClick={() => goMonth(1)}
                        disabled={!canNext}
                        aria-label="Next month">
                        <ChevronRight size={22} />
                    </button>
                </div>

                <div className="availability-calendar__grid">
                    {WEEK_DAYS.map((day) => (
                        <span
                            key={day}
                            className="availability-calendar__weekday">
                            {day}
                        </span>
                    ))}

                    {Array.from({ length: leading }, (_, i) => (
                        <span key={`empty-${i}`} />
                    ))}

                    {days.map(renderDay)}
                </div>
            </div>
        )
    }

    return (
        <div
            className={joinClassNameHelper('availability-calendar', className)}
            onMouseLeave={() => setHoverDate('')}>
            <div className="availability-calendar__body row g-4">
                {renderMonth(viewMonth, 'first')}
                {renderMonth(viewMonth.clone().add(1, 'month'), 'second')}
            </div>

            <div className="availability-calendar__footer">
                <div className="availability-calendar__legend">
                    <span className="availability-calendar__legend-item">
                        <i className="is-available" /> Available
                    </span>
                    <span className="availability-calendar__legend-item">
                        <i className="is-booked" /> Booked
                    </span>
                    <span className="availability-calendar__legend-item">
                        <i className="is-onRequest" /> On request
                    </span>
                </div>

                {selectable ? (
                    <button
                        type="button"
                        className="availability-calendar__clear"
                        onClick={handleClear}
                        disabled={!range.fromDate}>
                        Clear Dates
                    </button>
                ) : null}
            </div>

            {selectable && (rules.minNights > 1 || rules.maxNights) ? (
                <p className="availability-calendar__note mb-0">
                    {rules.minNights > 1
                        ? `Minimum stay ${rules.minNights} nights`
                        : ''}
                    {rules.minNights > 1 && rules.maxNights ? ' · ' : ''}
                    {rules.maxNights
                        ? `Maximum stay ${rules.maxNights} nights`
                        : ''}
                </p>
            ) : null}
        </div>
    )
}

export default AvailabilityCalendar
