import { useEffect, useRef, useState } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

const TextReadMore = ({
    children,
    maxChars = 750,
    moreText = 'Read more',
    lessText = 'Read less',
    className = '',
    classNameButton = '',
}) => {
    const ref = useRef(null)
    const [expanded, setExpanded] = useState(false)
    const [text, setText] = useState('')

    useEffect(() => {
        setText(ref.current?.textContent?.trim() || '')
    }, [children])

    const isOverflow = text.length > maxChars

    return (
        <div className={className}>
            {isOverflow && !expanded ? (
                <>{text.substring(0, maxChars)}...</>
            ) : (
                <div ref={ref}>{children}</div>
            )}

            {isOverflow && (
                <button
                    type="button"
                    className={joinClassNameHelper(
                        classNameButton,
                        'btn btn-link p-0 text-decoration-none text-primary text-decoration-underline d-block',
                    )}
                    onClick={() => setExpanded(!expanded)}>
                    {expanded ? lessText : moreText}
                </button>
            )}

            {!text && (
                <div ref={ref} className="d-none">
                    {children}
                </div>
            )}
        </div>
    )
}

export default TextReadMore
