import { db } from '@/firebase';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { toast } from 'react-hot-toast';
import { GrFormClose } from 'react-icons/gr'
import { useSelector } from 'react-redux';

const AddCreditCard = ({ subscriptions }) => {
    const { user } = useSelector(state => state.auth)
    const [holderName, setHolderName] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [expiryDate, setExpiryDate] = React.useState("");
    const [cvv, setCvv] = React.useState("");
    const [cardNumberError, setCardNumberError] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const ref = doc(db, "creditCards", user.uid);
        setDoc(ref, {
            cards: arrayUnion({
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cvv: cvv,
                holderName: holderName,
                active: false
            })
        });
        toast.success("Card added successfully");
    }
    return (
        <div className='flex flex-col items-start gap-y-3 mt-5'>
            {subscriptions !== 'free' && <p className='text-yellow-400 font-medium'>Add new card to contiune your payment</p>}
            <div className='w-[500px] flex flex-col gap-y-5 items-start rounded-2xl bg-white text-black py-3 px-5'>
                <div className='flex items-center justify-between w-full'>
                    <h2 className='font-semibold text-xl'>Add Credit Card</h2>
                </div>
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-2'>
                    <input type="text" value={holderName} onChange={(e) => setHolderName(e.target.value)} placeholder='Holder Name' className='border border-gray-300 placeholder:font-semibold w-5/6 placeholder:text-gray-500 rounded-md px-3 py-2' />
                    <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder='Card Number' className='border border-gray-300 placeholder:font-semibold w-5/6 placeholder:text-gray-500 rounded-md px-3 py-2' />
                    <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder='Expiry Date' className='border border-gray-300 placeholder:font-semibold w-5/6 placeholder:text-gray-500 rounded-md px-3 py-2' />
                    <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder='Cvv' className='border border-gray-300 placeholder:font-semibold placeholder:text-gray-500 w-2/6 rounded-md px-3 py-2' />
                    <button type='submit' className='bg-alwise rounded-full px-5 py-2 mt-5'>
                        <span className='font-semibold text-lg'>Add Card</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCreditCard