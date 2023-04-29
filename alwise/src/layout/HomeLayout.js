import Header from '@/components/Header/Header'
import React from 'react'
import useLoading from '@/components/customhooks/useLoading'

const HomeLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default HomeLayout