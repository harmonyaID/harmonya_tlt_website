import { getDetailMenusNavbar } from '@/service/api/contentPage.api'

const useMenuNavbarServerside = async () => {
    const menus = await getDetailMenusNavbar('navbar-default').then((res) => {
        return res?.result || {}
    })

    return {
        menus,
    }
}

export default useMenuNavbarServerside
