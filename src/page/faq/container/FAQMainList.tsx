import useGeneralDataList from '@/hook/useGeneralDataList.hook'
import { getFAQList } from '@/service/api/contentPage.api'
import { isEmpty } from 'lodash'

const FAQMainList = ({ configSearch = {} }) => {
    const { list } = useGeneralDataList({
        configSearch,
        urlAPI: getFAQList,
    })

    const idAccordion = 'accordionFlushGeneral'

    return (
        <>
            <div className="accordion accordion-flush" id={idAccordion}>
                {list && !isEmpty(list) && list.length
                    ? list?.map((vm: any, index: number) => {
                          const dataId = 'flushCollapsse' + index

                          return (
                              <div className="accordion-item" key={index}>
                                  <div className="accordion-header h2">
                                      <button
                                          className="accordion-button py-4 collapsed text-uppercase text-grey-300 font-tt-drugs fs-20 bg-transparent box-shadow-0"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target={'#' + dataId}
                                          aria-expanded="false"
                                          aria-controls={dataId}>
                                          {vm.question}
                                      </button>
                                  </div>
                                  <div
                                      id={dataId}
                                      className="accordion-collapse collapse"
                                      data-bs-parent={'#' + idAccordion}>
                                      <div className="accordion-body text-grey-100 fw-light pt-0 pb-4">
                                          {vm.answer}
                                      </div>
                                  </div>
                              </div>
                          )
                      })
                    : null}
            </div>
        </>
    )
}

export default FAQMainList
