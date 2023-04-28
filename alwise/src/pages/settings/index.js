import HomeLayout from '@/layout/HomeLayout'
import React from 'react'
import { useSelector } from 'react-redux'
import EditProfile from '@/components/Profile/Settings/EditProfile'
import VerifyEmail from '@/components/Profile/Settings/VerifyEmail'
import UpdatePassword from '@/components/Profile/Settings/UpdatePassword'

const Settings = () => {
  return (
    <HomeLayout>
      <div className='max-w-7xl mx-auto py-10'>
        <h1 className='font-semibold text-4xl'>Settings</h1>
        <VerifyEmail />
        <EditProfile />
        <UpdatePassword/>
      </div>
    </HomeLayout>
  )
}

export default Settings