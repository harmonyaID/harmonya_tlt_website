import { useHookContextForm } from '@/context/Form.Context'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook'
import usePropertyTypeList from '@/page/property/hook/usePropertyTypeList'
import FormSelectOption from '@/component/form/FormSelectOption'

const PropertyFormSelectTreeOption = (props: any) => {
    const ctx = useHookContextForm()

    const { dataValue, handleChange } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props?.name,
        props?.value,
    )

    const { typeList } = usePropertyTypeList()

    return (
        <FormSelectOption
            name={props.name || 'typeId'}
            className={props?.className || ''}
            classNameSelect={props?.classNameSelect || ''}>
            <option value="">{props.placeholder || 'Type All'}</option>
            {typeList.map((vm, index) => (
                <option value={vm.value} key={index}>
                    {/*{value === vm.toString() ? 'Bedroom: ' : ''}*/}
                    {vm.label}
                </option>
            ))}
        </FormSelectOption>
    )
}

export default PropertyFormSelectTreeOption
