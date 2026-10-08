/**
 * Mengubah string biasa menjadi slug URL
 * "Play" -> "play"
 * "Play Home" -> "play-home"
 * "Play   Home!!" -> "play-home"
 */
export const slugify = (text) => {
    if (!text) return ''

    return text
        .toString()
        .normalize('NFD') // pisahkan huruf & diakritik (é -> e + ́)
        .replace(/[\u0300-\u036f]/g, '') // hapus diakritik
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // hapus karakter selain huruf, angka, spasi, strip
        .replace(/[\s_]+/g, '-') // spasi/underscore jadi strip
        .replace(/-+/g, '-') // gabung strip ganda jadi satu
        .replace(/^-+|-+$/g, '') // hapus strip di awal/akhir
}

/**
 * Mengubah slug URL menjadi string biasa (title case)
 * "play-home" -> "Play Home"
 */
export const unslugify = (slug, titleCase = true) => {
    if (!slug) return ''

    const text = slug.toString().replace(/-/g, ' ').trim()

    if (!titleCase) return text

    return text
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}
