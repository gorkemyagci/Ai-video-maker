import React from 'react'

const TotalPrice = () => {
    return (
        <div className='w-1/2 py-20 flex items-center flex-col'>
            <div className='flex flex-col items-start gap-y-5'>
                <div>
                    <h1 className='text-3xl font-semibold'>Total Price</h1>
                    <p className='text-gray-400'>Buy Alwise personal plan.</p>
                </div>
                <div className='flex items-end gap-x-3'>
                    <h1 className='text-4xl font-semibold'>14,99 $</h1>
                    <span className='text-base text-gray-400 font-medium'>only once</span>
                </div>
            </div>
        </div>
    )
}

export default TotalPrice