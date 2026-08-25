import SectionGeneral from '@/component/general/SectionGeneral'
import { SectionTitle } from '@/component/text/Heading'
import { ReactNode } from 'react'
import {
    getContentHomePage,
    getFAQHomePage,
} from '@/service/api/contentPage.api'

const objectDataFQA = (question: ReactNode, answer?: ReactNode) => ({
    question,
    answer,
})

const SectionHomeFAQ = async ({ list = [] }: { list?: any[] }) => {
    const listFAQs = [
        objectDataFQA(
            'WHERE IS LEMBONGAN TRAVELLER LOCATED ?',
            'Raffles Bali is located in Jimbaran, Bali, set on a hillside overlooking the ocean. The resort is approximately 20 minutes from Bali Ngurah Rai International Airport, offering convenient access while maintaining a private setting away from busier areas.',
        ),
        objectDataFQA(
            'WHAT IS THE BEST TIME TO GO TO LEMBONGAN?',
            'Raffles Bali is located in Jimbaran, Bali',
        ),
        objectDataFQA(
            'HOW CAN I GO TO LEMBONGAN ISLAND?',
            'Raffles Bali is located in Jimbaran, Bali',
        ),
        objectDataFQA(
            'WHAT ARE THE CHECK-IN AND CHECK-OUT TIMES?',
            'Raffles Bali is located in Jimbaran, Bali',
        ),
        objectDataFQA(
            'WHAT IS THE CANCELLATION POLICY AT THE LEMBONGAN TRAVELLER?',
            'Raffles Bali is located in Jimbaran, Bali',
        ),
    ]

    // const dataFAQs = await getFAQHomePage({ locale: 'en' }).then(
    //     (res) => res?.result || {},
    // )

    const dataFAQs = list

    console.log('dataFAQs: ', list)

    return (
        <SectionGeneral>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <SectionTitle className="font-tt-drugs text-center pb-5">
                            FREQUENTLY ASKED QUESTIONS
                        </SectionTitle>

                        <div
                            className="accordion accordion-flush"
                            id="accordionFlushExample">
                            {dataFAQs && dataFAQs.length
                                ? dataFAQs?.map((vm: any, index: number) => {
                                      const dataId = 'flushCollapsse' + index

                                      return (
                                          <div
                                              className="accordion-item"
                                              key={index}>
                                              <h2 className="accordion-header">
                                                  <button
                                                      className="accordion-button collapsed grey-300 font-tt-drugs fs-20 bg-transparent box-shadow-0"
                                                      type="button"
                                                      data-bs-toggle="collapse"
                                                      data-bs-target={
                                                          '#' + dataId
                                                      }
                                                      aria-expanded="false"
                                                      aria-controls={dataId}>
                                                      {vm.question}
                                                  </button>
                                              </h2>
                                              <div
                                                  id={dataId}
                                                  className="accordion-collapse collapse"
                                                  data-bs-parent="#accordionFlushExample">
                                                  <div className="accordion-body">
                                                      {vm.answer}
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
        </SectionGeneral>
    )
}

export default SectionHomeFAQ
