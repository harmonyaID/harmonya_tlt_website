const BoatTransferPriceTable = () => {
    return (
        <table className="custom-table table">
            <thead>
                <tr>
                    <th>Shared Driver</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <p className="fw-semibold text-uppercase">Return</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            Adult – IDR 750,000 With 20% Discount – IDR 450,000
                        </p>
                        <p>
                            Kids – IDR 250,000 With 20% Discount – IDR 150,000
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p className="fw-semibold text-uppercase">One Way</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Adult – IDR 750,000</p>
                        <p>Kids – IDR 250,000</p>
                    </td>
                </tr>
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
export default BoatTransferPriceTable
