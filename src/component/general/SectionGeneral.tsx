import {ReactNode} from "react";

const SectionGeneral = ({children, className} : {children?: ReactNode, className?: string}) => {

    return (
        <section className={'section-space ' + className}>
            {children}
        </section>
    )
}

export default SectionGeneral