import { MDGlobalSearchDat } from '@/config/modal.config'
import { BtnLinkPrimary, BtnPrimary } from '@/component/general/Button'
import { SEARCH_PATH } from '@/config/pagePath.config'
import { useState } from 'react'
import { slugify } from '@/helper/slugify.helper'
import { useRouter } from 'next/navigation'
import { Search } from 'feather-icons-react'
import actionModal from '@/helper/base/actionModal.helper'
import NavbarLayout from '@/component/layout/Navbar.layout'

const GlobalSearchData = () => {
    return (
        <div
            className="modal fade"
            id={MDGlobalSearchDat}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog bg-transparent">
                <div className="modal-content border-0">
                    <div className="modal-body">
                        <NavbarLayout isBgTransparent={false} isInSearch />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalSearchData
