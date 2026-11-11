import SectionHorizontalTitleAndDesc from '@/component/section/SectionHorizontalTitleAndDesc'
import SliderBannerWithTopNav from '@/component/swiperSlide/SliderBannerWithTopNav'
import RenderHtml from '@/component/general/RenderHtml'
import Image from 'next/image'
import {
    IconDistance,
    IconPeople,
    IconSquareArrow,
    IconSun,
    IconTemple,
    IconWave,
} from '@/page/islandGuide/component/IslandGuideIcons'
import { ReactNode } from 'react'

const MapList = ({
    icon,
    title,
    value,
}: {
    icon: ReactNode
    title: string
    value: string
}) => {
    return (
        <div className="row g-4 border-bottom pb-3">
            <div className="col-1">{icon}</div>
            <div className="col">
                <p className="m-0">
                    <span className="fw-semibold">{title}:</span> {value}
                </p>
            </div>
        </div>
    )
}

const IslandGuideAboutTheIsland = ({ content }: { content: any }) => {
    const { SECTION2, SECTION3, SECTION4, SECTION5 } = content?.content || {}

    return (
        <>
            {/*    SECTION 2   */}
            <section className="section-space-small">
                <div className="container">
                    <div className="row gy-5">
                        <div className="col-md-8">
                            <RenderHtml
                                className="font-tt-drugs fs-48 text-grey-200"
                                html={SECTION2?.title || ''}
                            />
                        </div>
                        <div className="col-md-4">
                            <RenderHtml
                                className="font-tt-drugs text-grey-400"
                                html={SECTION2?.description || ''}
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <SliderBannerWithTopNav
                            list={
                                SECTION2?.images?.map((img) => ({
                                    photo: img.image,
                                })) || []
                            }
                        />
                    </div>
                </div>
            </section>

            <div style={{ background: '#F0FDFB' }}>
                <section className="section-space-small">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <div
                                    style={{
                                        height: '901px',
                                        width: '100%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}>
                                    <Image
                                        src={SECTION2?.mapImage || ''}
                                        alt="about home"
                                        fill
                                        className="object-fit-cover"
                                    />
                                </div>
                            </div>
                            <div className="col d-flex align-items-center">
                                <div className="w-75 mx-auto">
                                    <p className="m-0 text-uppercase text-primary fs-32 font-tt-drugs">
                                        {SECTION2?.mapTitle}
                                    </p>

                                    <div className="vstack gap-3 color-555 mt-5">
                                        <MapList
                                            icon={<IconSquareArrow />}
                                            title="Size"
                                            value={SECTION2?.mapSize}
                                        />
                                        <MapList
                                            icon={<IconDistance />}
                                            title="Distance"
                                            value={SECTION2?.mapDistance}
                                        />
                                        <MapList
                                            icon={<IconTemple />}
                                            title="Village"
                                            value={SECTION2?.mapVillage}
                                        />
                                        <MapList
                                            icon={<IconWave />}
                                            title="Island Speciality"
                                            value={
                                                SECTION2?.mapIslandSpeciality
                                            }
                                        />
                                        <MapList
                                            icon={<IconSun />}
                                            title="Best season to visit"
                                            value={SECTION2?.mapBestSeason}
                                        />
                                        <MapList
                                            icon={<IconPeople />}
                                            title="Population"
                                            value={SECTION2?.mapPopulation}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/*    SECTION 3   */}
            <section className="section-space-small">
                <div className="container"></div>
            </section>
        </>
    )
}

export default IslandGuideAboutTheIsland
