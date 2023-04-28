import Link from 'next/link'
import React from 'react'

const UpdatePassword = () => {
    return (
        <>
        <Link href={"/change-password"} className='flex w-full justify-center mt-5 text-white items-center font-semibold text-xl'>Change Password</Link>
        </>
    )
}

export default UpdatePassword