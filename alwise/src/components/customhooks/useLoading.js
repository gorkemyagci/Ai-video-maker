import React, { useEffect } from 'react'
import Router from 'next/router';

const useLoading = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    useEffect(() => {
        const handleStart = () => {
            setIsLoading(true);
        }
        const handleComplete = () => {
            setIsLoading(false);
        }

        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleComplete);
        Router.events.on('routeChangeError', handleComplete);
        window.addEventListener('load', handleComplete)

        return () => {
            Router.events.off('routeChangeStart', handleStart);
            Router.events.off('routeChangeComplete', handleComplete);
            Router.events.off('routeChangeError', handleComplete);
            window.removeEventListener('load', handleComplete)
        };
    },[]);
    return isLoading
}

export default useLoading