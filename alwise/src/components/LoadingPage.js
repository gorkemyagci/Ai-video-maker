import React from 'react'

const LoadingPage = () => {
    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='flex flex-col items-center gap-y-10 loader-opacity'>
                <h2 className='text-alwise text-5xl font-medium'>Alwise</h2>
                <div className='loader-loading'></div>
            </div>
        </div>
    )
}

export default LoadingPage