import React, { useEffect } from 'react'
import ChangeCard from './ChangeCard'
import { useSelector } from 'react-redux';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { toast } from 'react-hot-toast';

const CreditCard = ({ creditCards }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { user } = useSelector(state => state.auth);
    const activeteCard = (cardNumber) => {
        creditCards.map((creditCard) => {
            if (creditCard.cardNumber == cardNumber) {
                creditCard.active = true;
            } else {
                creditCard.active = false;
            }
        })
        const ref = doc(db, "creditCards", user.uid);
        updateDoc(ref, {
            cards: creditCards
        });
        toast.success("Card activated")
    }
    const removeCard = (cardNumber) => {
        const ref = doc(db, "creditCards", user.uid);
        updateDoc(ref, {
            cards: creditCards.filter((creditCard) => creditCard.cardNumber !== cardNumber)
        });
        toast.success("Card removed")
    }
    return (
        <div className='credit-card-information mt-14'>
            {creditCards?.filter((creditCard, index) => creditCard.active == true).map((creditCard) => {
                let creditCartNum = creditCard?.cardNumber.slice(0, 4) + ' ' + '****' + ' ' + '****' + ' ' + creditCard?.cardNumber.slice(12, 16);
                return (
                    <div className='credit-card relative bg-gradient-to-r from-sky-500 to-indigo-500 h-40 rounded-md w-80'>
                        <svg className='absolute bottom-0' width="273" height="151" viewBox="0 0 273 151" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9149 0.107384C7.84909 1.1501 -4.60105e-06 9.65842 -4.60105e-06 20V131C-4.60105e-06 142.046 8.95428 151 20 151H253.432C262.324 151 269.86 145.198 272.461 137.174C273.892 116.81 246.921 100.684 167.732 102.843C119.867 104.149 109.448 79.8512 98.6035 54.5616C87.1309 27.8071 75.1822 -0.057848 17.9149 0.107384Z" fill="white" fill-opacity="0.08" />
                        </svg>
                        <div className='flex flex-col gap-y-1.5 py-3 px-3 items-start'>
                            <span className='font-medium text-lg uppercase'>{creditCard.holderName}</span>
                            <div className='flex flex-col gap-y-0 items-end'>
                                <span className='font-semibold text-base'>{creditCartNum}</span>
                                <div className='pt-0.5 flex items-center gap-x-1.5 flex-row-reverse'>
                                    <span className='font-semibold text-sm'>{creditCard.cvv}</span>
                                    <span className='font-semibold text-sm'>|</span>
                                    <span className='font-semibold text-sm'>{creditCard.expiryDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className='change-credit-card'>
                <button onClick={() => setIsOpen(!isOpen)} className='bg-white bg-opacity-[0.15] rounded-md mt-3 px-3 text-white h-10 font-medium text-sm'>Add Credit Card</button>
            </div>
            <div className='flex flex-col gap-y-5 mt-10'>
                {creditCards?.filter((creditCard, index) => creditCard.active == false).map(item => {
                    let creditCartNum = item?.cardNumber.slice(0, 4) + ' ' + '****' + ' ' + '****' + ' ' + item?.cardNumber.slice(12, 16);
                    return (
                        <div className='bg-green-500 bg-opacity-50 rounded-md py-2 px-3 flex flex-col items-start gap-y-2'>
                            <div className='flex items-center gap-x-5'>
                                <span className='text-lg font-semibold'>{item.holderName}</span>
                                <span>-</span>
                                <span className='text-lg font-semibold'>{creditCartNum}</span>
                            </div>
                            <div className='flex items-center gap-x-2.5 font-medium'>
                                <span>{item.expiryDate}</span>
                                <span>|</span>
                                <span>{item.cvv}</span>
                            </div>
                            <div className='flex items-center gap-x-3'>
                                <button onClick={() => activeteCard(item.cardNumber)} className='bg-white bg-opacity-[0.15] rounded-md px-3 text-white h-10 mt-2 font-medium text-sm'>Activate</button>
                                <button onClick={() => removeCard(item.cardNumber)} className='bg-white bg-opacity-[0.15] rounded-md px-3 text-white h-10 mt-2 font-medium text-sm'>Remove</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ChangeCard isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default CreditCard