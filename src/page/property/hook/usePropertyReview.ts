import useGeneralDataList from '@/hook/useGeneralDataList.hook'
import { getPropertyReview } from '@/service/api/property.api'

const usePropertyReview = (propertyId) => {
    const { list, isLoading } = useGeneralDataList({
        urlAPI: () => getPropertyReview(propertyId),
    })
}

export default usePropertyReview
