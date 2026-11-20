export const URL_WHATSAPP = (number: string | number = '') =>
    'https://wa.me/' + number

// Google Maps — buka rute ke koordinat tujuan (new tab)
export const URL_GOOGLE_MAPS_DIRECTION = (
    latitude: number | string = '',
    longitude: number | string = '',
) =>
    `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
