import SelectOptionGeneral from '@/common/dataForm/SelectOptionGeneral'
import joinClassNameHelper from '@/helper/joinClassName.helper'

const PropertyFormSelectBathRoom = (props: any) => {
    const count = Array.from({ length: 8 }, (_, i) => i + 1)

    return (
        <SelectOptionGeneral
            name={props.name || 'bathroom'}
            className={joinClassNameHelper(
                'rounded-pill',
                props?.classNameSelect,
                props?.className,
            )}
            placeholder="Bathroom"
            options={[
                { value: '', label: 'Bathroom All' },
                ...count.map((vm) => ({
                    value: String(vm),
                    label: `Bathroom ${vm}`,
                })),
            ]}
        />
    )
}

export default PropertyFormSelectBathRoom
