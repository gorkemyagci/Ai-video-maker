import { db } from '@/firebase'
import { collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

const CardInformation = () => {
    const [cardNumber, setCardNumber] = React.useState('')
    const [cardDate, setCardDate] = React.useState('')
    const [cardCVC, setCardCVC] = React.useState('')
    const [cardName, setCardName] = React.useState('')
    const { user } = useSelector(state => state.auth)
    const [users, setUsers] = React.useState([])
    const router = useRouter()
    function handleChange(e) {
        // Kredi kartı numarasının uzunluğunu 16 haneye sınırlandırın
        const value = e.target.value.slice(0, 19);
        // Sadece sayı karakterlerine izin verin
        const numbersOnly = value.replace(/[^0-9]/g, '');
        // Her dört haneli bir gruplandırma ekleyin
        const formatted = numbersOnly.replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(formatted);
    }
    function handleChangeExpriyDate(e) {
        // Son kullanma tarihini mm/yy formatına sınırlandırın
        const value = e.target.value.slice(0, 5);
        // Sadece sayı karakterlerine ve / işaretine izin verin
        const numbersOnly = value.replace(/[^\d/]/g, '');
        // Tarihi mm/yy formatında gösterin
        const formatted = numbersOnly.replace(/^(\d{2})\/?(\d{0,2})/, (match, p1, p2) => {
            let formatted = `${p1}`;
            if (p2) {
                formatted += `/${p2}`;
            }
            if (match.endsWith('/')) {
                formatted += '/';
            }
            return formatted;
        }).trim();
        setCardDate(formatted);
    }
    function handleBlur() {
        // CVC'nin 3 haneli olması gerektiğini doğrulayın
        if (cardCVC.length !== 3) {
            setCardCVC('');
        }
    }
    const handleSubmit = async () => {
        if (cardNumber.length !== 19) {
            alert('Please enter a valid card number')
        } else if (cardDate.length !== 5) {
            alert('Please enter a valid date')
        } else if (cardCVC.length !== 3) {
            alert('Please enter a valid CVC')
        } else if (cardName.length < 3) {
            alert('Please enter a valid name')
        } else {
            toast.success('Payment successful')
            setCardCVC('')
            setCardDate('')
            setCardName('')
            setCardNumber('')
        }
    }
    return (
        <div className='py-4'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex flex-col items-start gap-y-2'>
                    <h3 className='font-medium border-b w-full pb-1.5'>Card Information</h3>
                    <div className='flex flex-col gap-y-2 w-full pt-2'>
                        <div className='pb-5 flex flex-col items-start w-full gap-y-1.5'>
                            {/* <label htmlFor='cardName' className='text-sm font-medium'>Card Holder Name</label> */}
                            <input type='text' value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder='Holder Name' className='border border-gray-300 outline-none rounded-lg w-full h-10 px-2' />
                        </div>
                        <input type='text' value={cardNumber} onChange={(e) => handleChange(e)} id='cardNumber' placeholder='1234 1234 1234 1234' className='border border-gray-300 outline-none rounded-lg w-72 h-10 px-2' />
                        <div>
                            <input
                                type='text'
                                value={cardDate}
                                onChange={(e) => handleChangeExpriyDate(e)}
                                className='border border-gray-300 rounded-l-lg w-36 h-10 px-2 outline-none'
                                placeholder='MM/YY'
                                max={5}
                            />
                            <input
                                type='text'
                                value={cardCVC}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^\d]/g, '');
                                    setCardCVC(value);
                                }}
                                className='border border-gray-300 rounded-r-lg w-36 h-10 px-2 outline-none'
                                placeholder='CVC'
                                maxLength={3}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                </div>
                <button onClick={handleSubmit} className='bg-blue-600 text-white rounded-md w-full py-3 font-semibold mt-5'>Pay</button>
            </div>
        </div>
    )
}

export default CardInformation