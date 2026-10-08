const PropertyAmities = ({ icon, value }: { icon?: any; value?: any }) => (
    <div className="hstack gap-2 flex-wrap align-items-center">
        <span className="text-grey-200">{icon}</span>
        {value}
    </div>
)

export default PropertyAmities
