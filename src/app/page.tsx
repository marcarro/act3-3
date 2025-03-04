'use client'

import { useState } from 'react'
import WeatherCard from '@/components/WeatherCard'
import CityForm from '@/components/CityForm'
import WeatherData from '@/types/WeatherData'

export default function Home() {
  const [weatherCards, setWeatherCards] = useState<WeatherData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const fetchWeatherData = async (city: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // using openweathermap api
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      )
      
      if (!response.ok) {
        throw new Error('City not found or weather data unavailable')
      }
      
      const data = await response.json()
      
      const weatherData: WeatherData = {
        id: Date.now(),
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon
      }
      
      setWeatherCards(prevCards => [...prevCards, weatherData])
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleAddCity = (city: string) => {
    fetchWeatherData(city)
  }
  
  const handleRemoveCard = (id: number) => {
    setWeatherCards(weatherCards.filter(card => card.id !== id))
  }
  
  // group cards into rows of 3
  const getCardRows = () => {
    const rows = []
    for (let i = 0; i < weatherCards.length; i += 3) {
      rows.push(weatherCards.slice(i, i + 3))
    }
    return rows
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-12 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4">
          Weather
        </h1>
        <p className="text-slate-500 text-center mb-10 max-w-md mx-auto">
          Search for any city around the world!
        </p>
        
        <CityForm onAddCity={handleAddCity} isLoading={isLoading} />
        
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-500 p-4 rounded-xl max-w-md mx-auto mb-10 text-center shadow-sm">
            {error}
          </div>
        )}
        
        {weatherCards.length > 0 ? (
          <div className="flex flex-col gap-8">
            {getCardRows().map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-col sm:flex-row gap-8">
                {row.map(card => (
                  <WeatherCard 
                    key={card.id}
                    weatherData={card}
                    onRemove={() => handleRemoveCard(card.id)}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-16 text-slate-400">
            <svg className="w-20 h-20 mx-auto mb-4 text-slate-300" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"></path>
            </svg>
            <p className="text-lg font-medium">No cities added yet</p>
            <p className="mt-1">Search for a city to see the weather</p>
          </div>
        )}
      </div>
    </main>
  )
}