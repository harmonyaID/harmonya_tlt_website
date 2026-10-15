import FormSelectOption from '@/component/form/FormSelectOption'

const PropertyFormSelectBedRooms = ({
    value = '',
}: {
    value?: string | number
}) => {
    const count = Array.from({ length: 8 }, (_, i) => i + 1)

    return (
        <>
            <FormSelectOption name="bedroom" classNameSelect="rounded-pill">
                <option value="">Bedroom All</option>
                {count.map((vm) => (
                    <option value={vm} key={vm}>
                        {/*{value === vm.toString() ? 'Bedroom: ' : ''}*/}
                        Bedroom {vm}
                    </option>
                ))}
            </FormSelectOption>
        </>
    )
}

export default PropertyFormSelectBedRooms
