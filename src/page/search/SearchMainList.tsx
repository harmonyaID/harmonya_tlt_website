'use client'

import { SectionTitle } from '@/component/text/Heading'
import SearchResultCard from '@/page/search/component/SearchResultCard'

const SearchMainList = ({ search }: { search: string }) => {
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

                <div className="vstack gap-5">
                    <SearchResultCard />
                    <SearchResultCard />
                    <SearchResultCard />
                    <SearchResultCard />
                </div>
            </div>
        </section>
    )
}

export default SearchMainList
