const canonicalURLHelper = (url: string = '', isOnlyPath: boolean = true) => {
    if (url) {
        try {
            const u = new URL(url)
            if (isOnlyPath) {
                return u.pathname || '#'
            }

            return u.pathname + u.search + u.hash
        } catch {
            return url // sudah relatif
        }
    }

    return '#'
}

export default canonicalURLHelper
