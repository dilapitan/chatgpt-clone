'use client'

import { useState } from 'react'
import WivesGPTLogo from '../components/WivesGPTLogo'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex flex-col items-center">
      <div>
        <WivesGPTLogo color="text-blue-500" />
      </div>
      <div className="text-black text-2xl">Welcome back</div>
    </div>
  )
}

export default Login
