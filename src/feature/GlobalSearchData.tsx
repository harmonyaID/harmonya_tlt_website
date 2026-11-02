import { MDGlobalSearchDat } from '@/config/modal.config'
import { BtnLinkPrimary, BtnPrimary } from '@/component/general/Button'
import { SEARCH_PATH } from '@/config/pagePath.config'
import { useState } from 'react'
import { slugify } from '@/helper/slugify.helper'
import { useRouter } from 'next/navigation'
import { Search } from 'feather-icons-react'
import actionModal from '@/helper/base/actionModal.helper'

const GlobalSearchData = () => {
    const router = useRouter()

    const [formRequest, setFormRequest] = useState({
        search: '',
    })

    const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFormRequest({ search: value })
    }

    return (
        <div
            className="modal fade"
            id={MDGlobalSearchDat}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-xl bg-transparent">
                <div className="modal-content bg-transparent border-0">
                    <div className="modal-body">
                        <div className="position-relative col">
                            <span className="search-input-icon text-primary">
                                <Search />
                            </span>

                            <input
                                type="text"
                                className="rounded-pill w-100 search-input font-tt-drugs"
                                placeholder="SEARCH..."
                                onChange={_handleChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        router.push(
                                            SEARCH_PATH +
                                                '/' +
                                                slugify(formRequest.search),
                                        )
                                        actionModal(MDGlobalSearchDat, true)
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalSearchData
