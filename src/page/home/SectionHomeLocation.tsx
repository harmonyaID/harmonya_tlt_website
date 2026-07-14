'use client'
import Link from 'next/link'

const SectionHomeLocation = () => {
    return (
        <section className="row gx-0">
            <div className="col-md-5 bg-grey-500 p-5">
                <div className="p-5 text-white">
                    <h2 className="font-tt-drugs">GETTING TO LEMBONGAN</h2>
                    <p className="fs-20 font-tt-drugs mb-0">
                        THE LEMBONGAN TRAVELLER OFFICE
                    </p>
                    <p className="fs-14">
                        Nusa Lembongan, Jl. Jungutbatu, Jungutbatu, Kec. Nusa
                        Penida, Kabupaten Klungkung, Bali 80361
                    </p>

                    <div className="vstack gap-4 pt-4">
                        <div className="pb-4 border-bottom border-gray-200">
                            <p className="fs-16 mb-2">CUSTOMER SERVICE</p>

                            <div className="hstack flex-wrap gap-3">
                                <p className="fs-16 mb-0">
                                    (ID) +62 813-9218-3002
                                </p>

                                <p className="fs-16 mb-0">
                                    | (AU) +61 412 345 678
                                </p>
                            </div>
                        </div>

                        <div className="pb-4 border-bottom border-gray-200">
                            <p className="fs-16 mb-0">
                                I Gusti Ngurah Rai International Airport - Bali
                            </p>
                        </div>

                        <div className="">
                            <p className="fs-16 mb-2">SANUR FERRY HARBOUR</p>
                            <p className="fs-16 mb-3">
                                Distance from Lembongan:{' '}
                                <span className="fw-600">20.0 KM</span>
                            </p>

                            <ul className="list-group ms-3 gap-2">
                                <li>
                                    Boat transfers{' '}
                                    <Link
                                        href="#"
                                        className="text-green-300 text-decoration-underline">
                                        See Schedule
                                    </Link>
                                </li>
                                <li>
                                    Private Charter{' '}
                                    <Link
                                        href="#"
                                        className="text-green-300 text-decoration-underline">
                                        Book A Boat
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-7 position-relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75255.57767416943!2d115.40225729051069!3d-8.692688057142671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd26d1fd9a2805d%3A0x53dd9b00e8e16da3!2sThe%20Lembongan%20Traveller!5e0!3m2!1sen!2sid!4v1783960380802!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    // style="border:0;"
                    // allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </div>
        </section>
    )
}

export default SectionHomeLocation
