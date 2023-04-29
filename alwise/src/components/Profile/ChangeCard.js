import { db } from '@/firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { toast } from 'react-hot-toast';
import { GrFormClose } from 'react-icons/gr'
import { useSelector } from 'react-redux';

const ChangeCard = ({ isOpen, setIsOpen }) => {
    const { user } = useSelector(state => state.auth);
    const [holderName, setHolderName] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [expiryDate, setExpiryDate] = React.useState("");
    const [cvv, setCvv] = React.useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const ref = doc(db, "creditCards", user.uid);
        updateDoc(ref, {
            cards: arrayUnion({
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cvv: cvv,
                holderName: holderName,
                active: false
            })
        });
        toast.success("Card added successfully");
        setIsOpen(false);
        setHolderName("");
        setCardNumber("");
        setExpiryDate("");
        setCvv("");
    }
    return (
        <div style={{
            display: isOpen ? 'flex' : 'none',
        }} className='w-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col gap-y-5 items-start rounded-2xl bg-white text-black py-3 px-5'>
            <div className='flex items-center justify-between w-full'>
                <h2 className='font-semibold text-xl'>Add Credit Card</h2>
                <GrFormClose onClick={() => setIsOpen(!isOpen)} size={30} className='cursor-pointer' />
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
    )
}

export default ChangeCard