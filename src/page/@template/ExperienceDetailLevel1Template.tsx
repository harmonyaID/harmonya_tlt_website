import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import SectionHeroSecondInfo from '@/component/general/SectionHeroSecondInfo'
import Breadcrumb from '@/component/general/Breadcrumb'
import RenderHtml from '@/component/general/RenderHtml'
import { getDetailExpTypes } from '@/service/api/experience.api'
import SectionExpAreaList from '@/page/experience/SectionExpAreaList'
import SectionExpList from '@/page/experience/SectionExpList'

const ExperienceDetailLevel1Template = async ({ slug }: { slug?: string }) => {
    const typeDetail = await getDetailExpTypes(
        '2',
        'tcSrvContentExpTypeDetail',
    ).then((res) => res?.result || {})

    const { name, banner, description } = typeDetail || {}

    console.log('typeDetail: ', typeDetail)

    return (
        <>
            <NavbarLayout isBgTransparent={false} isStartFix={false} />
            <SectionHeroSecondInfo
                content={{
                    title: name,
                    image: banner,
                }}
            />
            <div className="container">
                <div className="pt-4">
                    <Breadcrumb />
                </div>
            </div>

            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <RenderHtml
                                className="wp-font-tt-drugs text-uppercase text-grey-200"
                                html={'<h3>NEIGHBOURHOOD</h3>'}
                            />
                        </div>

                        <div className="col-md-6">
                            <RenderHtml
                                className="fs-20 text-grey-400"
                                html={description}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <SectionExpAreaList slug={slug} />
            <SectionExpList slug={slug} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default ExperienceDetailLevel1Template
