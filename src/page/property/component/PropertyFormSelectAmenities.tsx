import usePropertyAmenities from '@/page/property/hook/usePropertyAmenitiesList'
import FormSelectOption from '@/component/form/FormSelectOption'
import SelectOptionGeneral from '@/common/dataForm/SelectOptionGeneral'
import joinClassNameHelper from '@/helper/joinClassName.helper'

const PropertyFormSelectAmenities = (props: any) => {
    const { amenitiesList } = usePropertyAmenities()

    return (
        <>
            <SelectOptionGeneral
                name={props.name || 'amenitiesId'}
                className={joinClassNameHelper(
                    props?.classNameSelect,
                    props?.className,
                )}
                placeholder="Amenities"
                // classNameSelect={ || ''}
                options={[
                    { value: '', label: 'Amenities All' },
                    ...amenitiesList.map((vm, index) => ({
                        value: vm.value,
                        label: vm.label,
                    })),
                ]}
            />
        </>
    )
}

export default PropertyFormSelectAmenities
