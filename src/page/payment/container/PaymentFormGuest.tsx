import { CreditCard, DollarSign } from 'feather-icons-react'
import FormInput from '@/component/form/FormInput'
import FormPhone from '@/component/form/FormPhone'
import FormTextArea from '@/component/form/FormTextarea'
import LabelForm from '@/component/form/LabelForm'
import joinClassNameHelper from '@/helper/joinClassName.helper'

const PAYMENT_METHODS = [
    { value: 'credit_card', label: 'Credit Card', Icon: CreditCard },
    { value: 'bank_transfer', label: 'Bank Transfer', Icon: DollarSign },
]

const PaymentFormGuest = ({
    formRequest,
    onChange,
}: {
    formRequest: any
    onChange: (name: string, value: any) => void
}) => (
    <div>
        <h1 className="text-grey-400 fs-48 text-uppercase font-tt-drugs mb-4">
            Guest information
        </h1>

        <div className="vstack gap-3">
            <FormInput
                label="First name"
                placeholder="Full Name"
                name="firstName"
                required
            />

            <div className="row g-3">
                <div className="col-md-6">
                    <FormInput
                        label="Email"
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <LabelForm label="Phone" dataId="payment-phone" />
                    <FormPhone name="phone" />
                </div>
            </div>

            <FormTextArea
                label="Add a special request"
                placeholder="Write your request"
                name="specialRequest"
                other={{ rows: 6 }}
            />
        </div>

        {/*Payment method*/}
        <div className="pt-5">
            <p className="fs-18 text-grey-300 mb-3">Payment method</p>

            <div className="hstack gap-3 flex-wrap">
                {PAYMENT_METHODS.map(({ value, label, Icon }) => {
                    const isActive = formRequest.paymentMethod === value

                    return (
                        <button
                            key={value}
                            type="button"
                            onClick={() => onChange('paymentMethod', value)}
                            className={joinClassNameHelper(
                                'btn hstack gap-2 rounded-2 fs-14 bg-white',
                                isActive
                                    ? 'border border-primary text-primary'
                                    : 'border text-grey-300',
                            )}>
                            <Icon size="16" />
                            {label}
                        </button>
                    )
                })}
            </div>

            <p className="fs-14 text-grey-300 mt-4 mb-0 col-lg-10">
                Once you book your stay, the accommodation will be pre-reserved
                for you. Then, someone from our team will reach out with payment
                instructions.
            </p>
        </div>

        {/*Agreement*/}
        <div className="vstack gap-3 pt-5">
            <label className="hstack gap-2 align-items-start fs-12 text-grey-300">
                <input
                    type="checkbox"
                    className="form-check-input mt-1 flex-shrink-0"
                    checked={!!formRequest.isAcceptPolicy}
                    onChange={(e) =>
                        onChange('isAcceptPolicy', e.target.checked)
                    }
                />
                <span>
                    I have read and accept the{' '}
                    <a href="#" className="text-primary text-decoration-none">
                        Privacy Policy
                    </a>{' '}
                    |{' '}
                    <a href="#" className="text-primary text-decoration-none">
                        The Lembongan Traveller Terms and Conditions
                    </a>
                </span>
            </label>

            <label className="hstack gap-2 align-items-start fs-12 text-grey-300">
                <input
                    type="checkbox"
                    className="form-check-input mt-1 flex-shrink-0"
                    checked={!!formRequest.isAcceptPromo}
                    onChange={(e) =>
                        onChange('isAcceptPromo', e.target.checked)
                    }
                />
                <span>
                    I am interested in receiving discounts, promotions and news
                    about The Lembongan Traveller
                </span>
            </label>
        </div>
    </div>
)

export default PaymentFormGuest
