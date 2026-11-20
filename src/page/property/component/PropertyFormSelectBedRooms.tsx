import SelectOptionGeneral from '@/common/dataForm/SelectOptionGeneral'
import joinClassNameHelper from '@/helper/joinClassName.helper'

const PropertyFormSelectBedRooms = (props: any) => {
    const count = Array.from({ length: 8 }, (_, i) => i + 1)

    return (
        <SelectOptionGeneral
            name={props.name || 'bedroom'}
            className={joinClassNameHelper(
                'rounded-pill',
                props?.classNameSelect,
                props?.className,
            )}
            placeholder="Bedroom"
            options={[
                { value: '', label: 'Bedroom All' },
                ...count.map((vm) => ({
                    value: String(vm),
                    label: `Bedroom ${vm}`,
                })),
            ]}
        />
    )
}

export default PropertyFormSelectBedRooms
