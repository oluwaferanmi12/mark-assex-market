import { AuthHeaderWrapper } from '@/components/shared/container/auth-header-wrapper'
import { AuthToggle } from '@/components/shared/container/auth-toggle'
import React from 'react'

const Login = () => {
  return (
    <div>
        <AuthHeaderWrapper text='Login to your account' />
        <AuthToggle active='login' />
    </div>
  )
}

export default Login