'use client'

import { SectionTitle } from '@/component/text/Heading'
import SearchResultCard from '@/page/search/component/SearchResultCard'
import useGeneralDataList from '@/hook/useGeneralDataList.hook'
import { getBoatList } from '@/service/api/boatTransfer.api'
import { getBlogList } from '@/service/api/blog.api'
import Pagination from '@/component/general/Pagination'
import LoadingCardListData from '@/component/loading/LoadingCardListData'

const SearchMainList = ({ search }: { search: string }) => {
    const { list, isLoading, pagination, _handleChangePage } =
        useGeneralDataList({
            configSearch: {
                page: 1,
                search: search,
            },
            urlAPI: getBlogList,
        })

    return (
        <section className="section-space-small">
            <div className="container px-5">
                <p className="font-tt-drugs text-uppercase fw-light">
                    Search Result For
                </p>
                <SectionTitle className="font-tt-drugs text-uppercase">
                    {search}
                </SectionTitle>
                <hr className="my-5" />

                {isLoading ? (
                    <LoadingCardListData />
                ) : (
                    <div className="vstack gap-5">
                        {list.map((blog) => (
                            <SearchResultCard blog={blog} key={blog.id} />
                        ))}
                    </div>
                )}

                <div className="py-5">
                    <Pagination
                        // @ts-ignore
                        pagination={pagination}
                        onPageChange={(passPage) => _handleChangePage(passPage)}
                    />
                </div>
            </div>
        </section>
    )
}

export default SearchMainList
