import moment from 'moment'

export const formatDatePublish = (date = new Date()) => {
    const pad = (n: any) => String(n).padStart(2, '0')

    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())

    // Ex: 2026-07-10 09:00
    return `${year}-${month}-${day} ${hours}:${minutes}`
}

// Ex: '11 Nov 2026' -> '2026-11-11'
export const formatDateOnly = (
    value: string | Date = new Date(),
    baseFormat: string = 'D MMM YYYY',
) => {
    if (!value) return ''

    const date = value instanceof Date ? moment(value) : moment(value, baseFormat)

    return date.isValid() ? date.format('YYYY-MM-DD') : ''
}
