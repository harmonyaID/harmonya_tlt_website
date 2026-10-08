import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import SectionHeroSecond from '@/component/general/SectionHeroSecond'
import { ReactNode } from 'react'

const TemplatePageBaseLayout = ({
    children,
    title = '',
    backgroundImage = '',
    isBgTransparent = true,
    isHeroSecond = false,
    isSecondFooter = true,
}: {
    children?: ReactNode
    title?: string | ReactNode
    backgroundImage?: string | any
    isBgTransparent?: boolean
    isHeroSecond?: boolean
    isSecondFooter?: boolean
}) => {
    return (
        <>
            <NavbarLayout isBgTransparent={isBgTransparent} />
            {title || backgroundImage ? (
                isHeroSecond ? (
                    <SectionHeroSecond
                        content={{
                            title: title,
                            image: backgroundImage,
                        }}
                    />
                ) : (
                    <SectionHeroHalfScreen
                        content={{
                            title: title,
                            image: backgroundImage,
                        }}
                    />
                )
            ) : null}

            {children}

            {isSecondFooter ? <FooterNewsLatterStaticLayout /> : null}
            <FooterLayout />
        </>
    )
}

export default TemplatePageBaseLayout
