import { MDGlobalSearchDat } from '@/config/modal.config'
import { BtnPrimary } from '@/component/general/Button'

const GlobalSearchData = () => {
    return (
        <div
            className="modal fade"
            id={MDGlobalSearchDat}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <p
                            className="modal-title fs-5 fw-500"
                            id="exampleModalLabel">
                            Search
                        </p>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="hstack gap-3 align-items-center">
                                    <div className="position-relative col">
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            placeholder="e.g Search Villa, and Property"
                                        />
                                    </div>

                                    <BtnPrimary className="rounded-pill">
                                        Search
                                    </BtnPrimary>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalSearchData
