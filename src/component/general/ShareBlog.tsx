'use client'

import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    PinterestShareButton,
    PinterestIcon,
    EmailShareButton,
    EmailIcon,
} from 'next-share'
import { useState } from 'react'
import IconShareLinkCopy from '@/component/icon/IconShareLinkCopy'
import joinClassNameHelper from '@/helper/joinClassName.helper'

export default function ShareBlog({
    url,
    title,
    media,
    className = '',
}: {
    url: string
    title?: string
    media?: string
    className?: string
}) {
    const [copied, setCopied] = useState(false)

    const _handleCopy = async () => {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div
            className={joinClassNameHelper(
                'hstack flex-wrap gap-3',
                className,
            )}>
            <span className="fs-20 font-tt-drugs text-gray-500">Share:</span>

            <FacebookShareButton url={url} quote={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>

            {/*<PinterestShareButton url={url} media={media} description={title}>*/}
            {/*    <PinterestIcon size={32} round />*/}
            {/*</PinterestShareButton>*/}

            {/*<button*/}
            {/*    onClick={handleCopy}*/}
            {/*    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-500 text-white"*/}
            {/*    title="Copy link">*/}
            {/*    <IconShareLinkCopy />*/}
            {/*</button>*/}

            {/*<span*/}
            {/*    onClick={_handleCopy}*/}
            {/*    className="cursor-pointer"*/}
            {/*    role="button">*/}
            {/*    <IconShareLinkCopy />*/}
            {/*</span>*/}

            <EmailShareButton
                url={url || '#'}
                subject={title}
                body="Cek artikel ini:">
                <EmailIcon
                    size={32}
                    className="svg-fill-circle text-green-500"
                    round
                />
            </EmailShareButton>
        </div>
    )
}
