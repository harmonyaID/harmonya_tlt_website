import RenderHtml from '@/component/general/RenderHtml'
import { PropsSectionContent } from '@/type/sectionContent.type'

const SectionHomeNeighbourhoods = ({ content = {} }: PropsSectionContent) => {
    return (
        <section className="section-space-small overflow-hidden">
            <div className="container">
                <RenderHtml
                    className="wp-general-content-head-and-desc"
                    html={content?.content || ''}
                />
            </div>
        </section>
    )
}
export default SectionHomeNeighbourhoods
