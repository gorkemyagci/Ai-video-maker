import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { store } from '../stores/store'
import { Provider } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LoadingPage from '@/components/LoadingPage'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath && setLoading(true));
    const handleComplete = (url) => (url === router.asPath && setLoading(false));

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  })
  return <>
    <Provider store={store}>
      <Toaster position='top-right' />
      {loading && <LoadingPage />}
      {!loading  && <Component {...pageProps} />}
    </Provider>
  </>
}