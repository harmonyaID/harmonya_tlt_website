import SectionGeneral from '@/component/general/SectionGeneral'
import RenderHtml from '@/component/general/RenderHtml'
import { PropsSectionContent } from '@/type/sectionContent.type'

const SectionHomeLiveTheIslandLife = ({
    content = {},
}: PropsSectionContent) => {
    console.log('content: ', content)

    return (
        <section className="section-space-small position-relative overflow-hidden bg-neutral-100">
            <div className="container">
                <RenderHtml
                    className="wp-general-content-head-and-desc pb-4"
                    html={content?.content || ''}
                />

                <div className="row justify-content-center">
                    <div className="col-lg-8 d-flex justify-content-center">
                        <ul
                            className="nav nav-underline nav-tabs-primary justify-content-betweenP width-fit-content border-bottom"
                            id="myTab"
                            role="tablist">
                            {content?.tabs?.map((vm: any, index: number) => {
                                return (
                                    <li
                                        key={index}
                                        role="presentation"
                                        className="nav-item">
                                        <button
                                            className={
                                                'nav-link fw-light px-5 fs-24 ' +
                                                (index < 1 ? 'active' : '')
                                            }
                                            id={'home-tab-' + index}
                                            data-bs-toggle="tab"
                                            data-bs-target={
                                                '#data-tab-pane-' + index
                                            }
                                            type="button"
                                            role="tab"
                                            aria-controls={
                                                'data-tab-pane-' + index
                                            }
                                            aria-selected="true">
                                            {vm.tabName}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="tab-content" id="myTabContent">
                    {content?.tabs?.map((vm: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className={
                                    'tab-pane fade ' +
                                    (index < 1 ? 'show active' : '')
                                }
                                id={'data-tab-pane-' + index}
                                role="tabpanel"
                                aria-labelledby="profile-tab">
                                {vm.items.map((item: any, idx: number) => {
                                    return (
                                        <div key={idx}>
                                            <h5>{item.title}</h5>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default SectionHomeLiveTheIslandLife
