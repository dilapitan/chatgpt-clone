'use client'

import { useState } from 'react'

import Link from 'next/link'

import WivesGPTLogo from '../components/WivesGPTLogo'

const Auth = ({ pathname }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="p-10 flex flex-col items-center">
      <div>
        <WivesGPTLogo color="text-blue-500" />
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
        <button className="w-full bg-blue-500 hover:bg-blue-600 font-bold text-white rounded-md p-2">
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
