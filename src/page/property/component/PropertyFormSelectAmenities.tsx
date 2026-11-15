import usePropertyAmenities from '@/page/property/hook/usePropertyAmenitiesList'
import FormSelectOption from '@/component/form/FormSelectOption'

const PropertyFormSelectAmenities = (props: any) => {
    const { amenitiesList } = usePropertyAmenities()

    return (
        <>
            <FormSelectOption
                name={props.name || 'typeId'}
                className={props?.className || ''}
                classNameSelect={props?.classNameSelect || ''}>
                <option value="">{props.placeholder || 'Type All'}</option>
                {amenitiesList.map((vm, index) => (
                    <option value={vm.value} key={index}>
                        {/*{value === vm.toString() ? 'Bedroom: ' : ''}*/}
                        {vm.label}
                    </option>
                ))}
            </FormSelectOption>
        </>
    )
}

export default PropertyFormSelectAmenities
