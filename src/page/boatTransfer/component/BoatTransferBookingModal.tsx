import { MDBoatTransferBooking } from '@/config/modal.config'
import { BtnBasic, BtnPrimary } from '@/component/general/Button'
import FormWrap from '@/component/wrapping/Form.wrap'
import { WrapFormContext } from '@/context/Form.Context'
import FormInput from '@/component/form/FormInput'
import LabelForm from '@/component/form/LabelForm'
import { Minus, Plus } from 'feather-icons-react'
import FormTextArea from '@/component/form/FormTextarea'
import FormDatepicker from '@/component/form/FormDatepicker'
import FormRadio from '@/component/form/FormRadio'
import FormTimePicker from '@/component/form/FormTimePicker'
import FormPhone from '@/component/form/FormPhone'
import { useState } from 'react'
import useNestedFormHook from '@/hook/base/useNestedForm.hook'

const ONE_WAY = 'one_way'
const RETURN = 'return'
const TRUE = '1'
const FALSE = '0'

const param = {
    boatId: '',
    name: '',
    email: '',
    phone: '',
    ticketType: ONE_WAY,
    baliLandLocation: '',
    bookedThroughTlt: TRUE,
    needLandTransport: FALSE,
    tltBookingRefName: '',
    adultCount: 1,
    childCount: 0,
    infantCount: 0,
    departureDateFromBali: '',
    departureTimeFromBali: '',
    pickUpLocationBali: '',
    flightNumber: '',
    arrivalTime: '',
    hotelNameBali: '',
    hotelContactBali: '',
    departureDateFromLembongan: '',
    departureTimeFromLembongan: '',
    dropOffLocationBali: '',
    flightTime: '',
    hotelNameLembongan: '',
    accommodationLembongan: '',
    passengerNames: '',
    hasSurfboard: TRUE,
    hearAboutUs: '',
    message: '',
}

const BoatTransferBookingModal = () => {
    const [formRequest, setFormRequest] =
        useState<Record<keyof typeof param, any>>(param)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest as any)

    return (
        <div
            className="modal fade"
            id={MDBoatTransferBooking}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-labelledby="modalBoatTransferBooking"
            aria-hidden="true">
            <div className="modal-dialog modal-lg" style={{ width: '911px' }}>
                <div className="modal-content">
                    <div className="modal-header border-0 bg-primary p-3 text-white hstack justify-content-center">
                        <div className="modal-title text-center font-tt-drugs fw-light mb-4">
                            <p className="fs-32 text-uppercase mb-2">
                                Boat Transfer Booking Form
                            </p>
                            <p className="m-0 fs-16">
                                Submit your inquiry and our team will get back
                                to you shortly
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn-close position-absolute"
                            style={{
                                top: '20px',
                                right: '20px',
                            }}
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>

                    <div className="modal-body font-tt-drugs">
                        <div
                            className="modal-boat-transfer-booking"
                            style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            <div className="container">
                                <div className="px-5 py-3 vstack gap-4">
                                    <p
                                        className="text-uppercase fw-light mb-0"
                                        style={{ fontSize: '24px' }}>
                                        D'stars Fast Ferry
                                    </p>

                                    <FormWrap
                                        actions={{
                                            handleSubmit: () => {},
                                        }}>
                                        <WrapFormContext
                                            formRequest={formRequest}
                                            actions={{
                                                change: nestedForm._handleChange,
                                            }}>
                                            <div className="row mb-4">
                                                <div className="col-6">
                                                    <BtnBasic
                                                        handle={() =>
                                                            nestedForm._handleChange(
                                                                'ticketType',
                                                                ONE_WAY,
                                                            )
                                                        }
                                                        className={`w-100 text-uppercase ${
                                                            formRequest.ticketType ===
                                                            ONE_WAY
                                                                ? ' bg-primary text-white'
                                                                : 'bg-neutral-100 text-neutral-400'
                                                        }`}
                                                        type="button"
                                                        style={{
                                                            fontSize: '20px',
                                                        }}>
                                                        One Way
                                                    </BtnBasic>
                                                </div>
                                                <div className="col-6">
                                                    <BtnBasic
                                                        handle={() =>
                                                            nestedForm._handleChange(
                                                                'ticketType',
                                                                RETURN,
                                                            )
                                                        }
                                                        type="button"
                                                        className={`w-100 text-uppercase ${
                                                            formRequest.ticketType ===
                                                            RETURN
                                                                ? ' bg-primary text-white'
                                                                : 'bg-neutral-100 text-neutral-400'
                                                        }`}
                                                        style={{
                                                            fontSize: '20px',
                                                        }}>
                                                        Return
                                                    </BtnBasic>
                                                </div>
                                            </div>

                                            <div className="vstack gap-5">
                                                <div>
                                                    <LabelForm
                                                        label="route"
                                                        required
                                                    />
                                                    <div className="border rounded-3 py-2 hstack justify-content-between align-items-center px-3">
                                                        <div>
                                                            <p className="text-uppercase fw-light fs-16 m-0">
                                                                From
                                                            </p>
                                                            <p className="fw-medium fs-16 m-0">
                                                                Sanur, Bali
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="rounded-circle hstack justify-content-center align-items-center"
                                                            style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                background:
                                                                    '#EBF7F6',
                                                                border: '1px solid #98C9C9',
                                                            }}>
                                                            <svg
                                                                width="15"
                                                                height="14"
                                                                viewBox="0 0 15 14"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M7.5532 0.223295C7.67153 0.0930236 7.83886 0.0132469 8.01839 0.00150621C8.19792 -0.0102345 8.37496 0.0470221 8.51057 0.160686L13.7951 4.58677C13.8999 4.67392 13.9743 4.78978 14.0086 4.91879C14.0428 5.04779 14.0351 5.18377 13.9865 5.30846C13.9379 5.43314 13.8508 5.54055 13.7369 5.61626C13.6229 5.69197 13.4876 5.73236 13.349 5.73199H0.680546C0.500552 5.73199 0.32793 5.66328 0.200655 5.54097C0.0733798 5.41867 0.00187748 5.25278 0.00187748 5.07982C0.00187748 4.90685 0.0733798 4.74097 0.200655 4.61866C0.32793 4.49635 0.500552 4.42764 0.680546 4.42764H11.5374L7.61925 1.14416C7.48356 1.03057 7.40037 0.869835 7.38798 0.697309C7.3756 0.524782 7.43502 0.353722 7.5532 0.223295ZM6.47637 13.2546C6.35804 13.3849 6.19071 13.4646 6.01118 13.4764C5.83164 13.4881 5.65461 13.4309 5.519 13.3172L0.234435 8.89112C0.129698 8.80398 0.0552225 8.68812 0.0210143 8.55911C-0.0131939 8.4301 -0.00549641 8.29412 0.0430727 8.16944C0.0916418 8.04475 0.178756 7.93734 0.292712 7.86163C0.406668 7.78592 0.542006 7.74554 0.680546 7.7459H13.349C13.529 7.7459 13.7016 7.81461 13.8289 7.93692C13.9562 8.05923 14.0277 8.22511 14.0277 8.39808C14.0277 8.57104 13.9562 8.73693 13.8289 8.85923C13.7016 8.98154 13.529 9.05025 13.349 9.05025H2.49214L6.41032 12.3337C6.54601 12.4473 6.6292 12.6081 6.64159 12.7806C6.65397 12.9531 6.59455 13.1242 6.47637 13.2546Z"
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    fill="#138F8F"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-uppercase fw-light fs-16 m-0">
                                                                To
                                                            </p>
                                                            <p className="fw-medium fs-16 m-0">
                                                                Jungutbatu main
                                                                bay
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <FormDatepicker
                                                        label="departure date"
                                                        name="departureDateFromBali"
                                                        required
                                                    />

                                                    <div className="hstack gap-2 mt-2">
                                                        <div className="badge fs-14 text-white border border-primary rounded-pill fw-300 bg-primary px-3">
                                                            9:15 AM
                                                        </div>
                                                        <div className="badge fs-14 text-black border rounded-pill fw-300 width-fit-content px-3">
                                                            3 AM
                                                        </div>
                                                        <div className="badge fs-14 text-black border rounded-pill fw-300 width-fit-content px-3">
                                                            11 AM
                                                        </div>
                                                    </div>
                                                </div>

                                                {formRequest.ticketType ===
                                                    RETURN && (
                                                    <div>
                                                        <FormDatepicker
                                                            label="return date"
                                                            name="departureDateFromLembongan"
                                                            required
                                                        />

                                                        <div className="hstack gap-2 mt-2">
                                                            <div className="badge fs-14 text-black border rounded-pill fw-300 px-3">
                                                                9:15 AM
                                                            </div>
                                                            <div className="badge fs-14 text-black border rounded-pill fw-300 px-3">
                                                                3 AM
                                                            </div>
                                                            <div className="badge fs-14 text-black border rounded-pill fw-300 px-3">
                                                                11 AM
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div>
                                                    <LabelForm
                                                        label="passengers"
                                                        required
                                                    />

                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="border rounded-3 py-2 hstack justify-content-between align-items-center px-3">
                                                                <div>
                                                                    <p className="text-uppercase fw-light fs-16 m-0">
                                                                        Adults
                                                                    </p>
                                                                    <p className="fs-12 text-neutral-300 m-0">
                                                                        Age 12+
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <div className="hstack align-items-center gap-4 h-100">
                                                                        <div
                                                                            className="rounded-circle text-primary hstack justify-content-center align-items-center"
                                                                            style={{
                                                                                width: '22px',
                                                                                height: '22px',
                                                                                background:
                                                                                    '#EBF7F6',
                                                                                border: '1px solid #98C9C9',
                                                                            }}>
                                                                            <Plus
                                                                                strokeWidth={
                                                                                    4
                                                                                }
                                                                                size={
                                                                                    12
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <p className="m-0">
                                                                            2
                                                                        </p>
                                                                        <div
                                                                            className="rounded-circle text-primary hstack justify-content-center align-items-center"
                                                                            style={{
                                                                                width: '22px',
                                                                                height: '22px',
                                                                                background:
                                                                                    '#EBF7F6',
                                                                                border: '1px solid #98C9C9',
                                                                            }}>
                                                                            <Minus
                                                                                strokeWidth={
                                                                                    4
                                                                                }
                                                                                size={
                                                                                    12
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="border rounded-3 py-2 hstack justify-content-between align-items-center px-3">
                                                                <div>
                                                                    <p className="text-uppercase fw-light fs-16 m-0">
                                                                        Children
                                                                    </p>
                                                                    <p className="fs-12 text-neutral-300 m-0">
                                                                        Age 2 -
                                                                        11
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <div className="hstack align-items-center gap-4 h-100">
                                                                        <div
                                                                            className="rounded-circle text-primary hstack justify-content-center align-items-center"
                                                                            style={{
                                                                                width: '22px',
                                                                                height: '22px',
                                                                                background:
                                                                                    '#EBF7F6',
                                                                                border: '1px solid #98C9C9',
                                                                            }}>
                                                                            <Plus
                                                                                strokeWidth={
                                                                                    4
                                                                                }
                                                                                size={
                                                                                    12
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <p className="m-0">
                                                                            1
                                                                        </p>
                                                                        <div
                                                                            className="rounded-circle text-primary hstack justify-content-center align-items-center"
                                                                            style={{
                                                                                width: '22px',
                                                                                height: '22px',
                                                                                background:
                                                                                    '#EBF7F6',
                                                                                border: '1px solid #98C9C9',
                                                                            }}>
                                                                            <Minus
                                                                                strokeWidth={
                                                                                    4
                                                                                }
                                                                                size={
                                                                                    12
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="m-0 text-end text-neutral-300 fs-12 mt-1">
                                                        *Child{' '}
                                                        <span className="fw-bold">
                                                            0-2 years old
                                                        </span>{' '}
                                                        free
                                                    </p>
                                                </div>

                                                <div>
                                                    <LabelForm
                                                        label="Your Details"
                                                        required
                                                    />

                                                    <FormInput
                                                        name="name"
                                                        className="mb-2"
                                                        placeholder="Full Name"
                                                    />
                                                    <div className="row g-3">
                                                        <div className="col-6">
                                                            <FormPhone name="phone" />
                                                        </div>
                                                        <div className="col-6">
                                                            <FormInput
                                                                name="email"
                                                                placeholder="Email"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr className="m-0 p-0" />

                                                <div>
                                                    <LabelForm
                                                        label="Land Transport"
                                                        required
                                                    />

                                                    <div className="border rounded-3 py-3 hstack justify-content-between align-items-center px-4">
                                                        <p className="m-0 fs-16">
                                                            Do you need land
                                                            transport service?
                                                        </p>

                                                        <div className="hstack gap-5">
                                                            <FormRadio
                                                                name="needLandTransport"
                                                                label="Yes"
                                                                defaultValue={
                                                                    TRUE
                                                                }
                                                                className="hstack gap-2"
                                                            />
                                                            <FormRadio
                                                                name="needLandTransport"
                                                                label="No"
                                                                defaultValue={
                                                                    FALSE
                                                                }
                                                                className="hstack gap-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    {formRequest.needLandTransport ===
                                                        TRUE && (
                                                        <>
                                                            <div className="mt-4">
                                                                {formRequest.ticketType ===
                                                                    RETURN && (
                                                                    <LabelForm
                                                                        label="Departure"
                                                                        required
                                                                    />
                                                                )}
                                                                <div>
                                                                    <p className="mb-2 text-uppercase fs-14 fw-light">
                                                                        Pick up
                                                                        Point
                                                                    </p>
                                                                    <FormInput
                                                                        placeholder="Airport"
                                                                        name="airport"
                                                                        className="mb-2"
                                                                    />
                                                                    <div className="row g-3">
                                                                        <div className="col-6">
                                                                            <FormInput
                                                                                placeholder="Flight Number"
                                                                                name="flightNumber"
                                                                            />
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <FormTimePicker
                                                                                placeholder="12:33"
                                                                                name="arrivalTime"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="mb-2 text-uppercase fs-14 mt-4 fw-light">
                                                                        Drop off
                                                                        Point
                                                                    </p>
                                                                    <FormInput
                                                                        placeholder="Airport"
                                                                        name="airport"
                                                                        className="mb-2"
                                                                    />
                                                                    <div className="row g-3">
                                                                        <div className="col-6">
                                                                            <FormInput
                                                                                placeholder="Location"
                                                                                name="location"
                                                                            />
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <FormTimePicker
                                                                                placeholder="12:33"
                                                                                name="arrivalTime"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {formRequest.ticketType ===
                                                                RETURN && (
                                                                <div className="mt-4">
                                                                    <LabelForm
                                                                        label="Return"
                                                                        required
                                                                    />
                                                                    <div>
                                                                        <p className="mb-2 text-uppercase fs-14 fw-light">
                                                                            Pick
                                                                            up
                                                                            Point
                                                                        </p>
                                                                        <FormInput
                                                                            placeholder="Airport"
                                                                            name="airport"
                                                                            className="mb-2"
                                                                        />
                                                                        <div className="row g-3">
                                                                            <div className="col-6">
                                                                                <FormInput
                                                                                    placeholder="Flight Number"
                                                                                    name="flightNumber"
                                                                                />
                                                                            </div>
                                                                            <div className="col-6">
                                                                                <FormTimePicker
                                                                                    placeholder="12:33"
                                                                                    name="arrivalTime"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <p className="mb-2 text-uppercase fs-14 mt-4 fw-light">
                                                                            Drop
                                                                            off
                                                                            Point
                                                                        </p>
                                                                        <FormInput
                                                                            placeholder="Airport"
                                                                            name="airport"
                                                                            className="mb-2"
                                                                        />
                                                                        <FormInput
                                                                            placeholder="Location"
                                                                            name="location"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>

                                                <hr className="m-0 p-0" />

                                                <div>
                                                    <LabelForm label="Extras" />

                                                    <div className="border rounded-3 py-3 hstack justify-content-between align-items-center px-4">
                                                        <p className="m-0 fs-16">
                                                            Accommodation booked
                                                            through TLT?
                                                        </p>

                                                        <div className="hstack gap-5">
                                                            <FormRadio
                                                                name="bookedThroughTlt"
                                                                label="Yes"
                                                                defaultValue={
                                                                    TRUE
                                                                }
                                                                className="hstack gap-2"
                                                            />
                                                            <FormRadio
                                                                name="bookedThroughTlt"
                                                                label="No"
                                                                defaultValue={
                                                                    FALSE
                                                                }
                                                                className="hstack gap-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="mb-2 text-uppercase fs-14 mt-3 fw-light">
                                                            Property Name /
                                                            Booking Info
                                                        </p>

                                                        <FormInput
                                                            name="hearAboutUs"
                                                            placeholder="Booking Ref/Name"
                                                        />
                                                    </div>

                                                    <div className="border rounded-3 py-3 hstack justify-content-between align-items-center px-4 mt-3">
                                                        <p className="m-0 fs-16">
                                                            Bringing a
                                                            surfboard?
                                                        </p>

                                                        <div className="hstack gap-5">
                                                            <FormRadio
                                                                name="hasSurfboard"
                                                                label="Yes"
                                                                defaultValue={
                                                                    TRUE
                                                                }
                                                                className="hstack gap-2"
                                                            />
                                                            <FormRadio
                                                                name="hasSurfboard"
                                                                label="No"
                                                                defaultValue={
                                                                    FALSE
                                                                }
                                                                className="hstack gap-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <FormTextArea
                                                        className="mt-2"
                                                        rows={5}
                                                        name="message"
                                                        placeholder="(optional) Write any additional notes/special request"
                                                    />
                                                </div>
                                            </div>
                                        </WrapFormContext>

                                        <BtnPrimary
                                            handle={() => {}}
                                            className="rounded-pill text-white fs-14 w-100 text-uppercase mt-4 mb-5">
                                            Submit
                                        </BtnPrimary>
                                    </FormWrap>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoatTransferBookingModal
