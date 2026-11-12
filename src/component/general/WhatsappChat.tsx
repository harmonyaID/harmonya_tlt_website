'use client'

import { useState } from 'react'
import { MessageCircle, Send, Whatsapp } from 'iconsax-reactjs'
import { X } from 'feather-icons-react'

interface WhatsAppChatProps {
    phoneNumber: string
    defaultMessage?: string
}

export default function WhatsAppChat({
    phoneNumber,
    defaultMessage = 'Hello, I would like to know more about your services.',
}: WhatsAppChatProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState(defaultMessage)

    const handleSend = () => {
        if (!message.trim()) return

        const url = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

        window.open(url, '_blank', 'noopener,noreferrer')
    }

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
