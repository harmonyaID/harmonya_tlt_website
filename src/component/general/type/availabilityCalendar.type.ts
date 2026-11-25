// Shape dari field availability pada response detail property.
// Semua field nullable — null berarti "tidak ada aturan".
export type AvailabilityUnit = 'hours' | 'days' | 'HOURS' | 'DAYS' | string

export type CheckInRestriction = number | string // 0-6 (Su-Sa) atau 'monday', 'mon', dst

export interface PropertyAvailabilitySetting {
    advanceNoticeUnit?: AvailabilityUnit | null
    advanceNoticeValue?: number | null
    bookingWindow?: number | null // hari ke depan yang bisa dibooking
    checkInRestrictions?: CheckInRestriction[] | null // hari yang TIDAK boleh check-in
    defaultAvailability?: string | null // 'available' | 'unavailable' | 'on_request'
    maxLengthOfStay?: number | null
    maxNightsPerYear?: number | null
    minLengthOfStay?: number | null
    preparationTimeValue?: number | null // hari buffer sebelum & sesudah booking
}

export type AvailabilityDayStatus =
    | 'available'
    | 'booked'
    | 'onRequest'
    | 'disabled'

// Data per tanggal, mis. dari getCalendarListingGuestyV2.
// status dari API akan dinormalisasi (reserved/unavailable/blocked => booked).
export interface AvailabilityCalendarDay {
    date: string // 'YYYY-MM-DD'
    status: string
    price?: number | null // harga per malam dari Guesty
    currency?: string | null
}

export interface AvailabilityDateRange {
    fromDate: string // 'YYYY-MM-DD' | ''
    toDate: string // 'YYYY-MM-DD' | ''
}

export interface AvailabilityCalendarProps {
    availability?: PropertyAvailabilitySetting | null
    calendar?: AvailabilityCalendarDay[]
    value?: AvailabilityDateRange
    onChange?: (range: AvailabilityDateRange) => void
    onMonthChange?: (startDate: string, endDate: string) => void // range 2 bulan yang tampil
    initialMonth?: string | Date
    selectable?: boolean
    className?: string
}
