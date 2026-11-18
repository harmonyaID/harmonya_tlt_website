'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, Send, Whatsapp } from 'iconsax-reactjs'
import { X } from 'feather-icons-react'
import { getWebInformation } from '@/service/api/contact.api'

const CACHE_KEY = 'web_information'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

interface CacheData<T> {
    data: T
    expiresAt: number
}

export const getCachedWebInformation = async () => {
    // Check cache
    const cached = localStorage.getItem(CACHE_KEY)

    if (cached) {
        const parsed: CacheData<any> = JSON.parse(cached)

        if (Date.now() < parsed.expiresAt) {
            return parsed.data
        }

        localStorage.removeItem(CACHE_KEY)
    }

    // Fetch fresh data
    const data = await getWebInformation()
    const result = data?.result

    // Save cache
    const cacheData: CacheData<typeof result> = {
        data: result,
        expiresAt: Date.now() + CACHE_DURATION,
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))

    return result
}

interface WhatsAppChatProps {
    defaultMessage?: string
}

export default function WhatsAppChat({
    defaultMessage = 'Hello, I would like to know more about your services.',
}: WhatsAppChatProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState(defaultMessage)
    const [webInformation, setWebInformation] = useState(null)

    const handleSend = () => {
        if (!message.trim()) return

        const phoneNumber = webInformation?.phones?.[0]?.phone
        if (!phoneNumber) return

        const url = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

        window.open(url, '_blank', 'noopener,noreferrer')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCachedWebInformation()
                setWebInformation(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="whatsapp-widget">
            {isOpen && (
                <div className="whatsapp-chat-box">
                    <div className="whatsapp-header">
                        <div>
                            <strong>The Lembongan Traveller</strong>
                            <small>Typically replies within a day</small>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="whatsapp-close">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="whatsapp-body">
                        <div className="whatsapp-message">
                            <small>Welcome!</small>
                            <p>Hi there! How can we help you today?</p>
                        </div>

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            rows={4}
                        />
                    </div>

                    <div className="whatsapp-footer">
                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={!message.trim()}>
                            Send Message <Send size={16} />
                        </button>
                    </div>
                </div>
            )}

            <button
                type="button"
                className="whatsapp-floating-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open WhatsApp chat">
                {isOpen ? <X size={28} /> : <Whatsapp size={28} />}
            </button>
        </div>
    )
}
