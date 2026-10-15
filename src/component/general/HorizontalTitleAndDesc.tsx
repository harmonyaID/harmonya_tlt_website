import RenderHtml from '@/component/general/RenderHtml'
import joinClassNameHelper from '@/helper/joinClassName.helper'

const HorizontalTitleAndDesc = ({
    title,
    description,
    excerpt = '',
    className = '',
    isTextWhite = false,
}: {
    title?: string | any
    description?: string | any
    excerpt?: string
    className?: string
    isTextWhite?: boolean
}) => {
    const titleTextColor = isTextWhite ? 'text-white' : 'text-grey-200'

    const descriptionTextColor = isTextWhite ? 'text-white' : 'text-grey-400'

    return (
        <div className={joinClassNameHelper('row gx-8 gy-5', className)}>
            <div className="col-md-6">
                <h5
                    className={joinClassNameHelper(
                        'font-tt-drugs fw-light fs-48 text-uppercase',
                        titleTextColor,
                    )}>
                    {title || ''}
                </h5>
            </div>
            <div className="col-md-6">
                <div className="vstack gap-2">
                    {excerpt ? (
                        <RenderHtml
                            className={joinClassNameHelper(
                                'wp-font-tt-drugs',
                                descriptionTextColor,
                            )}
                            html={excerpt || ''}
                        />
                    ) : null}

                    <RenderHtml
                        className={descriptionTextColor}
                        html={description || ''}
                    />
                </div>
            </div>
        </div>
    )
}

export default HorizontalTitleAndDesc
