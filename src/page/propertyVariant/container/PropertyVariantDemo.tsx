// components/Listings.jsx
'use client'
import { useEffect, useState } from 'react'

const PropertyVariantListings = () => {
    const [items, setItems] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('/api/guesty/listings?limit=10')
            .then((res) => {
                if (!res.ok) throw new Error(`Status ${res.status}`)
                return res.json()
            })
            .then((data) => setItems(data.results ?? []))
            .catch((err) => setError(err.message))
    }, [])

    if (error) return <p>Gagal memuat data ({error})</p>

    return (
        <ul>
            {items.map((item) => (
                <li key={item._id}>{item.title}</li>
            ))}
        </ul>
    )
}

export default PropertyVariantListings
