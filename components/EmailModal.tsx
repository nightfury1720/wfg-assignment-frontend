'use client'

import { useState, FormEvent } from 'react'

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
  existingEmail?: string
}

export default function EmailModal({ isOpen, onClose, onSubmit, existingEmail }: EmailModalProps) {
  const [email, setEmail] = useState(existingEmail || '')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email.trim()) {
      setError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    onSubmit(email)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter Your Email</h2>
        <p className="text-gray-600 mb-4">
          Please enter your email to customize charts
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
              placeholder="your.email@example.com"
              autoFocus
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

