import PropertyFeatureIcon from '@/page/property/component/PropertyFeatureIcon'

const PropertyFeatureList = ({ features = [] }: { features?: any[] }) => (
    <div className="row gx-3 gy-4 pt-3 align-items-end">
        {features.map((vm, index) => {
            const { icon, name, value } = vm || {}
            const label = value ? `Up to ${value} ${name}` : name

            return (
                <div
                    className="col-6 col-lg-2 col-md-3"
                    key={vm?.id ?? index}>
                    <div className="vstack gap-2 align-items-center text-center text-grey-200">
                        <PropertyFeatureIcon icon={icon} alt={name} />
                        <p className="fs-14 mb-0 text-grey-200">{label}</p>
                    </div>
                </div>
            )
        })}
    </div>
)

export default PropertyFeatureList
