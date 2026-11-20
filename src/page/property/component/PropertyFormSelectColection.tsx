import usePropertyTypeList from '@/page/property/hook/usePropertyTypeList'
import SelectOptionGeneral from '@/common/dataForm/SelectOptionGeneral'
import joinClassNameHelper from '@/helper/joinClassName.helper'

const PropertyFormSelectTreeOption = (props: any) => {
    const { typeList } = usePropertyTypeList()

    return (
        <SelectOptionGeneral
            name={props.name || 'typeId'}
            className={joinClassNameHelper(
                props?.classNameSelect,
                props?.className,
            )}
            placeholder={props.placeholder || 'Type'}
            options={[
                { value: '', label: props.placeholder || 'Type All' },
                ...typeList.map((vm) => ({
                    value: vm.value,
                    label: vm.label,
                })),
            ]}
        />
    )
}

export default PropertyFormSelectTreeOption
