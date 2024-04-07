'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SignUpPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      setButtonDisabled(true)
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup succesful", response.data);
      router.push('/login')

    } catch (error: any) {
      console.log("SignUp failed");
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.password.length > 0 && user.email.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }

  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className='font-bold text-4xl'>{loading ? "Ruko jara Sabar Karo" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border w-96 mt-4 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border w-96 mt-4 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 border w-96 mt-4 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        className="p-2 border hover:bg-slate-600 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
          {buttonDisabled ? "No signup" : "Signup"}</button>
      <Link href="/login">Visit login page {`=>`}</Link>
    </div>
  )
}

export default SignUpPage
