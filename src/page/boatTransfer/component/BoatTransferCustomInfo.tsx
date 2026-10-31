import { Fragment } from 'react'
import RenderHtml from '@/component/general/RenderHtml'

const BoatTransferCustomInfo = ({ info }: { info: any }) => {
    return (
        <table className="custom-table table">
            <thead>
                <tr>
                    <th>{info?.name}</th>
                </tr>
            </thead>
            <tbody>
                {info?.customInformations?.map((vm, index) => (
                    <Fragment key={index}>
                        <tr>
                            <td>
                                <p className="fw-semibold text-uppercase">
                                    {vm.name}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <RenderHtml html={vm.value} />
                            </td>
                        </tr>
                    </Fragment>
                ))}

                <tr>
                    <td>
                        <p className="fs-12">
                            *Child 0-2 years old no charge. Older than it Kids
                            price will be charged
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
export default BoatTransferCustomInfo
