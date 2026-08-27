import SectionGeneral from '@/component/general/SectionGeneral'
import { PropsSectionContent } from '@/type/sectionContent.type'
import RenderHtml from '@/component/general/RenderHtml'
import { isEmpty } from 'lodash'

const SectionHomeFAQ = async ({
    content = {},
    list = [],
}: PropsSectionContent & { list?: any[] }) => {
    return (
        <SectionGeneral>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <RenderHtml
                            className="wp-font-tt-drugs text-grey-300 text-center pb-5"
                            html={content.content}
                        />

                        <div
                            className="accordion accordion-flush"
                            id="accordionFlushExample">
                            {list && !isEmpty(list) && list.length
                                ? list?.map((vm: any, index: number) => {
                                      const dataId = 'flushCollapsse' + index

                                      return (
                                          <div
                                              className="accordion-item"
                                              key={index}>
                                              <h2 className="accordion-header">
                                                  <button
                                                      className="accordion-button collapsed text-uppercase text-grey-300 font-tt-drugs fs-20 bg-transparent box-shadow-0"
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
                                                  className="accordion-collapse pb-2 collapse"
                                                  data-bs-parent="#accordionFlushExample">
                                                  <div className="accordion-body text-grey-100 fw-light pt-2">
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
