'use client'

import { useState, FormEvent } from 'react'

interface CityFormProps {
  onAddCity: (city: string) => void
  isLoading: boolean
}

export default function CityForm({ onAddCity, isLoading }: CityFormProps) {
  const [cityInput, setCityInput] = useState('')
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (cityInput.trim() === '') return
    
    onAddCity(cityInput)
    setCityInput('')
  }
  
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-10 relative">
      <div className="relative flex items-center shadow-lg rounded-full">
        <div className="absolute left-4 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-12 pr-28 py-4 bg-white text-slate-800 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <div className="absolute right-2">
          <button 
            type="submit" 
            className="px-5 py-2.5 font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Add City'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}