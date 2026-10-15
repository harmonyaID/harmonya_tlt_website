interface LabelProps {
    label?: string
    dataId?: string
    required?: boolean
}

const LabelForm = ({ label, dataId, required }: LabelProps) => {
    return label ? (
        <label htmlFor={dataId} className="form-label">
            {label}
            <span className="text-danger-200 fs-16">{required ? '*' : ''}</span>
        </label>
    ) : null
}

export default LabelForm
