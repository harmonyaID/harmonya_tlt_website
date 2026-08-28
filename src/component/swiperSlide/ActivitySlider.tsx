// 'use client'
//
// import { useRef } from 'react'
// import Image from 'next/image'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation } from 'swiper/modules'
// import type { Swiper as SwiperType } from 'swiper'
//
// import 'swiper/css'
// import 'swiper/css/navigation'
//
// /**
//  * ActivitySlider
//  * ---------------
//  * Slider "Things To Do" — Bootstrap 5.3 + Swiper, siap pakai di Next.js.
//  *
//  * Cara pakai (lihat ActivitySlider.example.tsx untuk contoh lengkap):
//  *
//  *   <ActivitySlider items={activities} />
//  *
//  * Semua breakpoint sudah diatur otomatis:
//  *   - Mobile   (< 576px)  : 1 card
//  *   - Tablet   (>= 768px) : 2 card
//  *   - Laptop   (>= 992px) : 3 card
//  *   - Desktop  (>= 1200px): 4 card
//  */
//
// export type ActivityItem = {
//     id: string | number
//     image: string | any
//     title: string
//     description: string
//     href?: string | any
// }
//
// type ActivitySliderProps = {
//     items: ActivityItem[]
//     /** Teks tombol di tengah gambar saat hover, default "Explore" */
//     ctaLabel?: string
//     className?: string
// }
//
// export default function ActivitySlider({
//     items,
//     ctaLabel = 'Explore',
//     className = '',
// }: ActivitySliderProps) {
//     const swiperRef = useRef<SwiperType | null>(null)
//
//     return (
//         <div className={`activity-slider position-relative ${className}`}>
//             {/* Tombol panah kiri */}
//             <button
//                 type="button"
//                 aria-label="Previous"
//                 className="activity-slider__nav activity-slider__nav--prev"
//                 onClick={() => swiperRef.current?.slidePrev()}>
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path
//                         d="M15 18l-6-6 6-6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     />
//                 </svg>
//             </button>
//
//             {/* Tombol panah kanan */}
//             <button
//                 type="button"
//                 aria-label="Next"
//                 className="activity-slider__nav activity-slider__nav--next"
//                 onClick={() => swiperRef.current?.slideNext()}>
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path
//                         d="M9 18l6-6-6-6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     />
//                 </svg>
//             </button>
//
//             <Swiper
//                 modules={[Navigation]}
//                 onSwiper={(swiper) => {
//                     swiperRef.current = swiper
//                 }}
//                 spaceBetween={24}
//                 slidesPerView={1.15}
//                 breakpoints={{
//                     576: { slidesPerView: 2, spaceBetween: 20 },
//                     992: { slidesPerView: 3, spaceBetween: 24 },
//                     1200: { slidesPerView: 4, spaceBetween: 24 },
//                 }}>
//                 {items.map((item) => (
//                     <SwiperSlide key={item.id}>
//                         <a
//                             href={item.href ?? '#'}
//                             className="activity-card text-decoration-none d-block">
//                             <div className="activity-card__image-wrap position-relative overflow-hidden rounded-3">
//                                 <Image
//                                     src={item.image}
//                                     alt={item.title}
//                                     fill
//                                     sizes="(max-width: 576px) 90vw, (max-width: 992px) 45vw, 25vw"
//                                     className="activity-card__image"
//                                 />
//                                 <span className="activity-card__cta">
//                                     {ctaLabel}
//                                     <svg
//                                         width="14"
//                                         height="14"
//                                         viewBox="0 0 24 24"
//                                         fill="none">
//                                         <path
//                                             d="M5 12h14M13 6l6 6-6 6"
//                                             stroke="currentColor"
//                                             strokeWidth="2"
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                         />
//                                     </svg>
//                                 </span>
//                             </div>
//
//                             <h3 className="activity-card__title text-uppercase mt-3 mb-1">
//                                 {item.title}
//                             </h3>
//                             <p className="activity-card__description text-muted mb-0">
//                                 {item.description}
//                             </p>
//                         </a>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//
//             <style jsx>{`
//                 .activity-slider {
//                     padding: 0 8px;
//                 }
//
//                 .activity-card__image-wrap {
//                     aspect-ratio: 3 / 4;
//                 }
//
//                 .activity-card__image {
//                     object-fit: cover;
//                     transition: transform 0.4s ease;
//                 }
//
//                 .activity-card:hover .activity-card__image {
//                     transform: scale(1.06);
//                 }
//
//                 .activity-card__cta {
//                     position: absolute;
//                     top: 50%;
//                     left: 50%;
//                     transform: translate(-50%, -50%);
//                     display: flex;
//                     align-items: center;
//                     gap: 6px;
//                     padding: 8px 18px;
//                     border: 1px solid rgba(255, 255, 255, 0.8);
//                     border-radius: 999px;
//                     color: #fff;
//                     font-size: 0.75rem;
//                     letter-spacing: 0.08em;
//                     text-transform: uppercase;
//                     background: rgba(0, 0, 0, 0.15);
//                     backdrop-filter: blur(2px);
//                     opacity: 0;
//                     transition: opacity 0.3s ease;
//                 }
//
//                 .activity-card:hover .activity-card__cta {
//                     opacity: 1;
//                 }
//
//                 .activity-card__title {
//                     font-size: 0.9rem;
//                     font-weight: 600;
//                     letter-spacing: 0.04em;
//                     color: #1a1a1a;
//                 }
//
//                 .activity-card__description {
//                     font-size: 0.85rem;
//                     line-height: 1.4;
//
//                     /* auto clamp 2 baris */
//                     display: -webkit-box;
//                     -webkit-line-clamp: 2;
//                     -webkit-box-orient: vertical;
//                     overflow: hidden;
//                 }
//
//                 .activity-slider__nav {
//                     position: absolute;
//                     top: 40%;
//                     z-index: 2;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     width: 40px;
//                     height: 40px;
//                     border-radius: 50%;
//                     border: 1px solid #dcdcdc;
//                     background: #fff;
//                     color: #333;
//                     transform: translateY(-50%);
//                 }
//
//                 .activity-slider__nav:hover {
//                     background: #f5f5f5;
//                 }
//
//                 .activity-slider__nav--prev {
//                     left: -20px;
//                 }
//
//                 .activity-slider__nav--next {
//                     right: -20px;
//                 }
//
//                 @media (max-width: 767px) {
//                     .activity-slider__nav {
//                         display: none;
//                     }
//                 }
//             `}</style>
//         </div>
//     )
// }
