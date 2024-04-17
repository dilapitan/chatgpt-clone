'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import WivesGPTLogo from '../components/WivesGPTLogo'

import { login, signup } from '../services/AuthService'

const Auth = ({ pathname }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const handleAuth = () => {
    if (pathname === '/login') {
      handleLogin()
    } else {
      handleSignup()
    }
  }

  const handleLogin = async () => {
    const response = await login({ email, password })

    if (response.data) {
      console.log('response.data:', response.data)
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: response.data.user.email,
          userID: response.data.user.id,
        }),
      )
      router.push('/')
    } else {
      setError(response.message)
    }
  }

  const handleSignup = async () => {
    const response = await signup({ email, password })

    if (response.data) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: response.data.user.email,
          userID: response.data.user.id,
        }),
      )
      router.push('/')
    } else {
      setError(response.message)
    }
  }

  return (
    <div className="p-10 flex flex-col items-center">
      <div>
        <Link href="/">
          <WivesGPTLogo color="text-blue-500" />
        </Link>
      </div>

      <div className="text-black mt-20 text-2xl font-bold">
        {pathname === '/login' ? 'Welcome back' : 'Create an account'}
      </div>

      <div className="mt-10 flex flex-col space-y-2 items-center w-full md:w-3/6 xl:w-1/5">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Email"
          required
        />
        <div className="w-full text-right">
          <button
            className="text-xs hover:underline"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'} Password
          </button>
        </div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={`${showPassword ? 'text' : 'password'}`}
          id="password"
          className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Password"
          required
        />
        <br />

        {error && <p className="text-red-500 font-bold">{error}</p>}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 font-bold text-white rounded-md p-2"
          onClick={handleAuth}
        >
          {pathname === '/login' ? 'Login' : 'Sign Up'}
        </button>
        <br />

        {pathname === '/login' ? (
          <div className="flex space-x-2">
            <p>Don't have an account?</p>
            <Link className="text-blue-500 hover:underline" href="/signup">
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex space-x-2">
            <p>Already have an account?</p>
            <Link className="text-blue-500 hover:underline" href="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Auth
