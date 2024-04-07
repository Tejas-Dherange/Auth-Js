'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
   
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      setButtonDisabled(true)
      const response = await axios.post("/api/users/login", user);
      toast.success("Succesfully login")
      console.log("Login succesful", response.data);
      router.push('/profile')

    } catch (error: any) {
      
      console.log("Login failed");
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.password.length > 0 && user.email.length > 0 ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }

  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className='font-bold text-4xl'>{loading ? "Ruko jara Sabar Karo" : "Login"}</h1>
      <hr />
      
      <label htmlFor="email" className='mt-4'> email</label>
      <input
        className="p-2 border w-96 mt-4 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black "
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
        onClick={onLogin}
        className="p-2 border hover:bg-slate-600 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
          {buttonDisabled ? "No Login" : "Login"}</button>
      <Link href="/signup">Visit SignUp page { `=>`}</Link>
    </div>
  )
}

export default LoginPage


