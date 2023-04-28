import { useRouter } from 'next/router'
import React from 'react'
import CardInformation from './CardInformation';
import { SquarePaymentsForm, CreditCardInput, PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Credit = () => {
    const router = useRouter();
    const handlePaymentFormSubmit = async (token, buyer) => {
       console.log(token);
       toast.success("Payment successful");
    };
    return (
        <div className='w-1/2 py-10 h-full bg-gray-100 shadow-lg shadow-gray-200 px-10'>
            <h2 className='font-semibold text-2xl pb-5'>Pay with credit card</h2>
            <div className='bg-gray-100 border w-72 h-10 mb-5 font-medium text-sm rounded-lg px-2 flex items-center justify-between'>
                <div className='border-r pr-3'>
                    <p>E-Mail</p>
                </div>
                <span>{router.query.email}</span>
            </div>
            {/* <CardInformation /> */}
            <PaymentForm
                applicationId='sq0idp-4QCq9egvChuvjeGFnw-jrg'
                locationId='LNPVYZYSQDJK9'
                cardTokenizeResponseReceived={handlePaymentFormSubmit}
                createVerificationDetails={() => ({
                    amount: '0.01',
                    /* collected from the buyer */
                    billingContact: {
                        addressLines: ['123 Main Street', 'Apartment 1'],
                        familyName: 'Doe',
                        givenName: 'John',
                        countryCode: 'GB',
                        city: 'London',
                    },
                    currencyCode: 'USD',
                    intent: 'CHARGE',
                })}
            >
                <CreditCard />
            </PaymentForm>
        </div>
    )
}

export default Credit