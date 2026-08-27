import { getDetailMenusNavbar } from '@/service/api/contentPage.api'

const useMenuNavbarServerside = async () => {
    const menus = await getDetailMenusNavbar().then((res) => {
        console.log('res.data: ', res)

        return res?.result || {}
    })

    return {
        menus,
    }
}

export default useMenuNavbarServerside
