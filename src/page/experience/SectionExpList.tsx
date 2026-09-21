import useExpListHook from '@/page/experience/hook/useExpList.hook'

const SectionExpList = ({}) => {
    const { list, isLoading, _handleChangePage } = useExpListHook({
        configSearch: {},
    })

    return (
        <>
            <section className="section-space-small">
                <div className="container"></div>
            </section>
        </>
    )
}

export default SectionExpList
