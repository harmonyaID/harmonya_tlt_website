'use client'
import useGeneralDataList from '@/hook/useGeneralDataList.hook'
import { getListExpArea } from '@/service/api/experience.api'

const useExpAreaListHook = ({ configSearch = {} }) => {
    const useListHook = useGeneralDataList({
        configSearch,
        urlAPI: getListExpArea,
    })

    return { ...useListHook }
}

export default useExpAreaListHook
