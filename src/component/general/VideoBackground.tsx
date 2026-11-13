'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import joinClassNameHelper from '@/helper/joinClassName.helper'
import { imgLandscapeConfig } from '@/config/urlImage.config'

type VideoBackgroundProps = {
    /** URL video dari response content (mp4 / webm) */
    src?: string
    /** Thumbnail / poster dari response content, dipakai saat video belum siap atau tidak ada */
    poster?: string
    /** true = tampilkan kontrol video (play, volume, progress, dll). Default: false (full background, tanpa indikator) */
    showControls?: boolean
    /** Default: true (wajib agar autoplay diizinkan browser). Saat showControls aktif, user bisa unmute sendiri */
    muted?: boolean
    loop?: boolean
    /** Tampilkan overlay gelap di atas video agar teks tetap terbaca */
    overlay?: boolean
    className?: string
    alt?: string
}

const VideoBackground = ({
    src,
    poster,
    showControls = false,
    muted = true,
    loop = true,
    overlay = false,
    className,
    alt = 'Background video',
}: VideoBackgroundProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    // React tidak selalu men-set atribut `muted` di DOM, padahal browser
    // mewajibkan video dalam keadaan muted agar autoplay diizinkan.
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        video.muted = muted
        video.play().catch(() => {
            // Autoplay diblokir (mis. iOS Low Power Mode) -> poster tetap tampil
        })
    }, [src, muted])

    return (
        <div
            className={joinClassNameHelper(
                'video-background',
                { 'video-background-controls': showControls },
                className,
            )}>
            {src ? (
                <video
                    ref={videoRef}
                    key={src}
                    className="video-background-media"
                    src={src}
                    poster={poster || undefined}
                    autoPlay
                    muted={muted}
                    loop={loop}
                    playsInline
                    preload="auto"
                    controls={showControls}
                    disablePictureInPicture={!showControls}
                    disableRemotePlayback={!showControls}
                    controlsList={
                        showControls ? undefined : 'nodownload nofullscreen noremoteplayback'
                    }
                    aria-hidden={!showControls}
                    tabIndex={showControls ? 0 : -1}
                />
            ) : (
                <Image
                    src={imgLandscapeConfig(poster)}
                    className="video-background-media"
                    alt={alt}
                    fill
                    priority
                />
            )}

            {overlay && <div className="video-background-overlay" />}
        </div>
    )
}

export default VideoBackground
