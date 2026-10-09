const PropertyLoadingList = ({ count = 3 }: { count?: number }) => {
    const placeholders = Array(count).fill(0)
    return (
        <>
            <div className="row gx-5 gy-3 gy-md-5">
                {placeholders.map((item, i) => {
                    return (
                        <div className="col-md-4 placeholder-glow" key={i}>
                            <div className="h-320-px w-100 placeholder bg-neutral-300 mb-3"></div>
                            <div className="vstack gap-1">
                                <span className="placeholder bg-neutral-300 col-12"></span>
                                <span className="placeholder bg-neutral-300 col-9"></span>
                                <span className="placeholder bg-neutral-300 col-8"></span>
                                <span className="placeholder bg-neutral-300 col-5"></span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PropertyLoadingList
