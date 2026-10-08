import RenderHtml from '@/component/general/RenderHtml'

const SectionEpxTypeDetailInfo = () => {
    return (
        <>
            <section className="section-space-small">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <RenderHtml
                                className="wp-font-tt-drugs text-uppercase text-grey-200"
                                html={'<h3>Neighbourhood</h3>'}
                            />
                        </div>

                        <div className="col-md-6">
                            <p className="fs-20 text-grey-400">
                                Whether you're looking for somewhere nearby or
                                venturing to a new neighbourhood for a change of
                                scene, our EAT guide helps you discover the best
                                restaurants and places to eat across Nusa
                                Lembongan and Nusa Ceningan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionEpxTypeDetailInfo
