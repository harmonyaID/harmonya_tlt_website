import FormSelectOption from '@/component/form/FormSelectOption'

const PropertyFormSelectBathRoom = () => {
    const count = Array.from({ length: 8 }, (_, i) => i + 1)

    return (
        <>
            <FormSelectOption name="bathroom" classNameSelect="rounded-pill">
                <option value="">Bathroom All</option>
                {count.map((vm) => (
                    <option value={vm} key={vm}>
                        Bathroom {vm}
                    </option>
                ))}
            </FormSelectOption>
        </>
    )
}

export default PropertyFormSelectBathRoom
