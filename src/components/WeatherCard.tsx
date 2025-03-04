'use client'

import WeatherData from '@/types/WeatherData'

interface WeatherCardProps {
  weatherData: WeatherData
  onRemove: () => void
}

export default function WeatherCard({ weatherData, onRemove }: WeatherCardProps) {
  const { 
    city, 
    country, 
    temperature, 
    feelsLike, 
    condition, 
    description, 
    humidity, 
    windSpeed, 
    icon 
  } = weatherData
  
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
  
  const getConditionIcon = () => {
    switch(condition.toLowerCase()) {
      case 'clear':
        return (
          <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        );
      case 'clouds':
        return (
          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
          </svg>
        );
      case 'rain':
        return (
          <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
            <path d="M9 17a1 1 0 012 0v1a1 1 0 11-2 0v-1zm-2-1a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        );
      default:
        return (
          <img src={iconUrl} alt={description} className="w-12 h-12" />
        );
    }
  };

  return (
    <div className="w-full sm:w-1/3 max-w-sm">
      <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full relative border border-gray-100">
        <div className={`h-1.5 w-full ${
          temperature > 30 ? 'bg-red-500' : 
          temperature > 20 ? 'bg-orange-400' : 
          temperature > 10 ? 'bg-green-500' : 
          'bg-blue-500'
        }`}></div>
        
        <button 
          onClick={onRemove}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-red-500 transition-colors"
          aria-label="remove card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">{city}</h2>
              <p className="text-sm text-slate-500">{country}</p>
            </div>
            <div className="flex items-center">
              <div className="mr-2">{getConditionIcon()}</div>
              <div className="text-3xl font-bold text-slate-800">{temperature}°</div>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="bg-slate-100 rounded-lg px-3 py-1 mr-2">
              <span className="text-sm font-medium text-slate-600 capitalize">{description}</span>
            </div>
            <div className="text-sm text-slate-500">
              Feels like {feelsLike}°
            </div>
          </div>
          
          <div className="flex justify-between mt-8 pt-4 border-t border-slate-100">
            <div className="flex items-center">
              <div>
                <div className="text-xs text-slate-500">Humidity</div>
                <div className="font-medium text-slate-800">{humidity}%</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div>
                <div className="text-xs text-slate-500">Wind</div>
                <div className="font-medium text-slate-800">{windSpeed} m/s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}