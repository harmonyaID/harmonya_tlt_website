import { ReactNode, FormEventHandler } from 'react'

interface Props {
    children: ReactNode
    actions?: {
        handleSubmit?: () => void
    }
    className?: string
}

const FormWrap = ({ children, actions = {}, className = '' }: Props) => {
    const { handleSubmit = () => {} } = actions

    const _handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        handleSubmit()
    }

    return (
        <form onSubmit={_handleSubmit} className={className}>
            {children}
        </form>
    )
}

export default FormWrap
