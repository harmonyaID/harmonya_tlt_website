'use client'

import SliderBannerWithTopNav from '@/component/swiperSlide/SliderBannerWithTopNav'
import RenderHtml from '@/component/general/RenderHtml'
import {
    IconDistance,
    IconPeople,
    IconSquareArrow,
    IconSun,
    IconTemple,
    IconWave,
} from '@/page/islandGuide/component/IslandGuideIcons'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { isEmpty } from 'lodash'
import ValidImage from '@/component/general/ValidImage'
import { SectionTitle } from '@/component/text/Heading'
import { getFAQList } from '@/service/api/contentPage.api'
import { isSuccess } from '@/helper/base/condition.helper'
import { BtnBasic, BtnLinkBasic } from '@/component/general/Button'
import Dive from '@/asset/image/islandGuide/dive.png'
import Gojek from '@/asset/image/islandGuide/gojek.png'

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

    const [FAQ, setFAQ] = useState<any>([])

    const Section3List = useMemo(() => {
        return SECTION3?.list?.map((vm) => ({
            question: vm.title,
            answer: vm.description,
        }))
    }, [SECTION3])

    const _handleGetFAQ = () => {
        getFAQList({
            typeId: SECTION5?.FAQTypeId,
            page: 0,
        }).then((res) => {
            if (isSuccess(res)) {
                setFAQ(res.result)
            }
        })
    }

    useEffect(() => {
        _handleGetFAQ()
    }, [])

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
                        <div className="row gx-5">
                            <div className="col-md-7">
                                <div
                                    style={{
                                        height: '901px',
                                        width: '100%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}>
                                    <ValidImage
                                        src={SECTION2?.mapImage || ''}
                                        alt="about home"
                                        fill
                                        className="object-fit-cover"
                                    />
                                </div>
                            </div>
                            <div className="col d-flex align-items-center justify-content-center w-100">
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
            <section className="section-space-small mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="d-flex align-items-center justify-content-center w-100 h-100">
                            <div
                                className="mx-auto color-555"
                                style={{ width: '65%' }}>
                                <p className="text-uppercase fs-48 font-tt-drugs mb-3">
                                    {SECTION3?.title}
                                </p>
                                <p className="fs-20">
                                    <RenderHtml html={SECTION3?.description} />
                                </p>

                                <div className="w-100 mt-5">
                                    <div
                                        className="accordion accordion-flush"
                                        id="about-the-island-section3-list">
                                        {Section3List &&
                                        !isEmpty(Section3List) &&
                                        Section3List.length
                                            ? Section3List?.map(
                                                  (vm: any, index: number) => {
                                                      const dataId =
                                                          'flushCollapsse' +
                                                          index

                                                      return (
                                                          <div
                                                              className="accordion-item"
                                                              key={index}>
                                                              <div className="accordion-header h2">
                                                                  <button
                                                                      className="accordion-button p-0 py-4 collapsed text-uppercase color-555 font-tt-drugs fs-20 bg-transparent box-shadow-0"
                                                                      type="button"
                                                                      data-bs-toggle="collapse"
                                                                      data-bs-target={
                                                                          '#' +
                                                                          dataId
                                                                      }
                                                                      aria-expanded="false"
                                                                      aria-controls={
                                                                          dataId
                                                                      }>
                                                                      {
                                                                          vm.question
                                                                      }
                                                                  </button>
                                                              </div>
                                                              <div
                                                                  id={dataId}
                                                                  className="accordion-collapse collapse"
                                                                  data-bs-parent={
                                                                      '#' +
                                                                      'about-the-island-section3-list'
                                                                  }>
                                                                  <div className="accordion-body text-grey-100 fw-light pt-0 pb-4">
                                                                      {vm.answer ? (
                                                                          <RenderHtml
                                                                              html={
                                                                                  vm.answer
                                                                              }
                                                                          />
                                                                      ) : (
                                                                          <p className="text-neutral-300 m-0 text-center">
                                                                              No
                                                                              Content
                                                                          </p>
                                                                      )}
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      )
                                                  },
                                              )
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div
                            style={{
                                height: '901px',
                                width: '100%',
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                            <ValidImage
                                src={SECTION3?.image || ''}
                                alt="about home"
                                fill
                                className="object-fit-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small">
                <div className="container">
                    <p className="text-center text-uppercase fs-48 font-tt-drugs color-555">
                        {SECTION3?.funFactTitle}
                    </p>

                    <div className="row g-5 mt-4">
                        {SECTION3?.funFacts?.map((vm) => (
                            <div className="col-md-3 h-100" key={vm.id}>
                                <div className="text-center vstack gap-3">
                                    <div
                                        style={{
                                            height: '425px',
                                            width: '100%',
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}>
                                        <ValidImage
                                            src={vm?.image || ''}
                                            alt="about home"
                                            fill
                                            className="object-fit-cover"
                                        />
                                    </div>
                                    <p className="m-0 mt-3 fs-24 text-uppercase color-555 font-tt-drugs">
                                        {vm.title}
                                    </p>
                                    <p className="m-0 fs-16 text-light">
                                        <RenderHtml
                                            html={vm.description}
                                            className="text-clamp-3"
                                        />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*  SECTION 4  */}
            <section className="section-space-small bg-neutral-100">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <SectionTitle className="font-tt-drugs text-uppercase fw-light">
                                {SECTION4.vsTitle}
                            </SectionTitle>
                        </div>

                        <div className="col-md-6 offset-1">
                            <RenderHtml
                                html={SECTION4.vsDescription}
                                className="font-tt-drugs"
                            />
                        </div>
                    </div>

                    <div className="row mt-70">
                        {SECTION4?.vsContents?.map((vm) => (
                            <div
                                className="col-md-6 h-100 overflow-hidden"
                                key={vm.id}>
                                <div className="row g-5">
                                    <div
                                        className="col-md-6"
                                        style={{
                                            height: '425px',
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}>
                                        <ValidImage
                                            src={vm?.image || ''}
                                            alt="about home"
                                            fill
                                            className="object-fit-cover"
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="vstack justify-content-center h-100">
                                            <p className="m-0 mt-3 fs-32 text-uppercase color-555 font-tt-drugs">
                                                {vm.title}
                                            </p>
                                            <p className="m-0 fs-20 text-primary mb-4">
                                                {vm.subTitle}
                                            </p>
                                            <p className="m-0 fs-20 text-light color-555">
                                                <RenderHtml
                                                    html={vm.description}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-space-small">
                <div className="container">
                    <p className="text-center text-uppercase fs-48 font-tt-drugs color-555">
                        {SECTION5?.title}
                    </p>

                    <div className="row g-5 mt-4">
                        <div className="col-md-5 offset-1">
                            <div className="vstack gap-4">
                                <div
                                    style={{
                                        height: '425px',
                                        width: '100%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}>
                                    <ValidImage
                                        src={Gojek}
                                        alt="about home"
                                        fill
                                        className="object-fit-cover"
                                    />
                                </div>
                                <p className="m-0 mt-3 fs-32 text-uppercase color-555 font-tt-drugs">
                                    GETTING AROUND THE ISLAND
                                </p>
                                <p className="m-0 fs-16 text-light text-neutral-400">
                                    No Gojek or Grab, just scooters, bikes, two
                                    feet and local transport.
                                </p>
                                <BtnLinkBasic
                                    href={SECTION5?.button1Link}
                                    className="width-fit-content rounded-pill text-uppercase"
                                    isIconArrow
                                    isOutline>
                                    TRAVEL THE ISLAND
                                </BtnLinkBasic>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="vstack h-100 mt-70 gap-4">
                                <div
                                    style={{
                                        height: '425px',
                                        width: '100%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}>
                                    <ValidImage
                                        src={Dive}
                                        alt="about home"
                                        fill
                                        className="object-fit-cover"
                                    />
                                </div>
                                <p className="m-0 mt-3 fs-32 text-uppercase color-555 font-tt-drugs">
                                    Swim with beautiful view or just chilling by
                                    the beach
                                </p>
                                <p className="m-0 fs-16 text-light text-neutral-400">
                                    Surfing at Shipwrecks and Playgrounds,
                                    snorkelling with manta rays, diving trips,
                                    mangrove forest tours by kayak or SUP,
                                    cliff-jumping at Devil's Tear (carefully!),
                                    sunset at Mushroom Bay, and day trips across
                                    to Nusa Ceningan and Nusa Penida.
                                </p>
                                <BtnLinkBasic
                                    href={SECTION5?.button2Link}
                                    className="width-fit-content rounded-pill text-uppercase"
                                    isIconArrow
                                    isOutline>
                                    Explore experiences
                                </BtnLinkBasic>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small bg-neutral-100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <h4 className="text-center fs-48 text-grey-400 font-tt-drugs">
                                {SECTION5?.FAQTitle || ''}
                            </h4>

                            <div className="py-4">
                                <div
                                    className="accordion accordion-flush"
                                    id="accordionFAQ">
                                    {FAQ && !isEmpty(FAQ) && FAQ.length
                                        ? FAQ?.map((vm: any, index: number) => {
                                              const dataId =
                                                  'accordionFAQ' + index

                                              return (
                                                  <div
                                                      className="accordion-item"
                                                      key={index}>
                                                      <div className="accordion-header h2">
                                                          <button
                                                              className="accordion-button py-4 collapsed text-uppercase text-grey-300 font-tt-drugs fs-20 bg-neutral-100 box-shadow-0"
                                                              type="button"
                                                              data-bs-toggle="collapse"
                                                              data-bs-target={
                                                                  '#' + dataId
                                                              }
                                                              aria-expanded="false"
                                                              aria-controls={
                                                                  dataId
                                                              }>
                                                              {vm.question}
                                                          </button>
                                                      </div>
                                                      <div
                                                          id={dataId}
                                                          className="accordion-collapse collapse"
                                                          data-bs-parent={
                                                              '#accordionFAQ'
                                                          }>
                                                          <div className="accordion-body bg-neutral-100 text-grey-100 fw-light pt-0 pb-4">
                                                              <RenderHtml
                                                                  html={
                                                                      vm.answer
                                                                  }
                                                              />
                                                          </div>
                                                      </div>
                                                  </div>
                                              )
                                          })
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default IslandGuideAboutTheIsland
