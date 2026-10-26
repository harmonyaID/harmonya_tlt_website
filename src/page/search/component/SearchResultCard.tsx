import Link from 'next/link'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { BtnBasic, CodeIconArrow } from '@/component/general/Button'
import Image from 'next/image'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'

const SearchResultCard = () => {
    return (
        <div className="row g-5">
            <div className="col-md-6">
                <Link
                    className="w-100 vstack gap-3 text-grey-200 wp-hover-image overflow-hidden"
                    href={'#'}>
                    <WrapImageHoverOverlay
                        className="search-result-img"
                        contentOverlay={
                            <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                                <BtnBasic className="btn-outline-white rounded-pill">
                                    <div className="hstack align-items-center gap-1">
                                        Explore <CodeIconArrow />
                                    </div>
                                </BtnBasic>
                            </div>
                        }>
                        <Image
                            src={BGHero}
                            alt="about home"
                            fill
                            priority
                            className="object-fit-cover"
                        />
                    </WrapImageHoverOverlay>
                </Link>
            </div>
            <div className="col-md-6">
                <div className="vstack gap-3 justify-content-center h-100 search-result-color">
                    <p className="font-tt-drugs text-uppercase fw-light m-0">
                        August 8, 2025
                    </p>
                    <p className="font-tt-drugs fs-32 text-uppercase search-result-color m-0">
                        a complete guide to sandy bay, nusa lembongan
                    </p>
                    <div
                        className="badge fs-14 width-fit-content rounded-pill fw-300 px-3 mb-2"
                        style={{
                            background: '#EBF7F6',
                            border: '1px solid #98C9C9',
                            color: '#555555',
                        }}>
                        Island Guide
                    </div>
                    <p className="m-0">
                        Over on the western side, near the famous Devil’s Tears,
                        Sandy Bay Beach Club offers direct beach access paired
                        with dramatic cliff views. And just offshore, there is
                        even a floating platform anchored out in the calm, clear
                        water.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SearchResultCard
