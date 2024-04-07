'use client'
import axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token })
      setVerified(true)
      setError(false)
    } catch (error: any) {
      console.log(error.response.data);

    }
  }

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])
  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyEmail()
    }
  }, [token])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-white text-black">{token ? `${token}` : " Token Not Available"}</h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>

        </div>
      )}
    </div>
  )
}


