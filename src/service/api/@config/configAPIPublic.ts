import {
    get,
    renderCancelToken,
    queryFilter,
} from '@/service/api/@config/configAxios'
import { isSuccess } from '@/helper/base/condition.helper'

export const _configHeadBody = () => ({
    // Authorization: `Bearer ${getLocalStorage(LS_TOKEN) || ''}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // web_access_token: getLocalStorage(LS_TOKEN) || '',
    // Token: getLocalStorage(LS_TOKEN) || '',
})

export const _shapeMethodGet = async (
    url: string = '',
    tokenCancel: string = '',
) => {
    const others = tokenCancel ? { ...renderCancelToken(tokenCancel) } : {}

    return get(url, others, _configHeadBody())
        .then((res: any) => {
            if (isSuccess(res.data)) {
                return res.data
            } else {
                return null
            }
        })
        .catch((err: any) => {
            // if (err && err.response && err.response.status === 401) {
            //     manageHandleTokenExpired()
            // } else {
            //     if (isMsgCatch) {
            //         if (isEmpty(tokenCancel) || argCatchMsg(err)) {
            //             //
            //         } else {
            //             //
            //         }
            //     }
            // }
            console.log('error fetch API : ', err)
        })
}

export const _shapeMethodGetSearch = (
    url: string,
    search: any = {},
    tokenCancel: string = '',
    isMsgSuccess: boolean = true,
) => {
    return _shapeMethodGet(url + queryFilter(search), tokenCancel)
}
