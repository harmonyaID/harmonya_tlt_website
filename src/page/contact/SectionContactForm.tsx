'use client'

import ContactForm from '@/page/contact/container/ContactForm'
import {
    MailIcon,
    WhatsappIcon,
} from '@/page/contact/component/SectionContactIcons'
import {
    formatPhoneNumber,
    formatPhoneNumberIntl,
} from 'react-phone-number-input'
import Link from 'next/link'

const SectionContactForm = ({ content = {} }: { content?: any }) => {
    return (
        <section className="section-space-small-top pb-5">
            <div className="container">
                <div className="row justify-content-center pb-5">
                    <div className="col-md-10">
                        <div className="row gy-4 justify-content-between">
                            <div className="col-md-4">
                                <p className="fs-48 font-tt-drugs text-grey-200">
                                    {content.title}
                                </p>
                                <p className="fs-16 text-grey-400">
                                    {content?.description || ''}
                                </p>

                                <div className="vstack gap-4 mt-5">
                                    <div>
                                        <div className="hstack gap-2 mb-1">
                                            <WhatsappIcon />
                                            <p className="m-0">
                                                Lembongan Phone{' '}
                                                <span className="fw-bold">
                                                    (ID)
                                                </span>
                                            </p>
                                        </div>
                                        <Link
                                            target="_blank"
                                            href={`https://wa.me/${content?.phoneID}`}
                                            className="mb-0 text-primary">
                                            {formatPhoneNumberIntl(
                                                content?.phoneID,
                                            )}
                                        </Link>
                                    </div>
                                    <div>
                                        <div className="hstack gap-2 mb-1">
                                            <WhatsappIcon />
                                            <p className="m-0">
                                                Australia Phone{' '}
                                                <span className="fw-bold">
                                                    (AU)
                                                </span>
                                            </p>
                                        </div>
                                        <Link
                                            target="_blank"
                                            href={`https://wa.me/${content?.phoneAU}`}
                                            className="mb-0 text-primary">
                                            {formatPhoneNumberIntl(
                                                content?.phoneAU,
                                            )}
                                        </Link>
                                    </div>

                                    <div>
                                        <div className="hstack gap-2 mb-1">
                                            <MailIcon />
                                            <p className="m-0">
                                                General Info & Reservation
                                            </p>
                                        </div>
                                        <Link
                                            href="mailto:{content?.reservationEmail}"
                                            className="mb-0 text-primary mt-1">
                                            {content?.reservationEmail}
                                        </Link>
                                    </div>

                                    <div>
                                        <div className="hstack gap-2 mb-1">
                                            <MailIcon />
                                            <p className="m-0">
                                                Property Management
                                            </p>
                                        </div>
                                        <Link
                                            href="mailto:{content?.propertyEmail}"
                                            className="mb-0 text-primary">
                                            {content?.propertyEmail}
                                        </Link>
                                    </div>

                                    <div>
                                        <div className="hstack gap-2 mb-1">
                                            <MailIcon />
                                            <p className="m-0">
                                                Business Listing
                                            </p>
                                        </div>
                                        <Link
                                            href="mailto:{content?.businessEmail}"
                                            className="mb-0 text-primary">
                                            {content?.businessEmail}
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionContactForm
