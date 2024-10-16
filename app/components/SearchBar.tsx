'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, Utensils, User, Calendar } from 'lucide-react'

type TabType = 'dishes' | 'preferences' | 'events'
type City = string
type PlaceType = string
type PriceLevel = string

const cities: City[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']
const placeTypes: PlaceType[] = ['Restaurant', 'Cafe', 'Bar', 'Fast Food']
const priceLevels: PriceLevel[] = ['$', '$$', '$$$', '$$$$']

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [activeTab, setActiveTab] = useState<TabType>('dishes')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '')
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery)
  const [selectedCity, setSelectedCity] = useState<City>(searchParams.get('city') as City || '')
  const [selectedPlaceType, setSelectedPlaceType] = useState<PlaceType>(searchParams.get('placeType') as PlaceType || '')
  const [selectedPriceLevel, setSelectedPriceLevel] = useState<PriceLevel>(searchParams.get('priceLevel') as PriceLevel || '')
  const [userLatitude, setUserLatitude] = useState<number | null>(Number(searchParams.get('latitude')) || null)
  const [userLongitude, setUserLongitude] = useState<number | null>(Number(searchParams.get('longitude')) || null)
  const [userRadius, setUserRadius] = useState<number>(Number(searchParams.get('radius')) || 5)
  const [isLoading, setIsLoading] = useState(false)
  const [showEmptySearchMessage, setShowEmptySearchMessage] = useState(false)

  const isGpsEnabled = userLatitude !== null && userLongitude !== null

  useEffect(() => {
    const query = searchParams.get('query') || ''
    const city = searchParams.get('city') as City || ''
    const placeType = searchParams.get('placeType') as PlaceType || ''
    const priceLevel = searchParams.get('priceLevel') as PriceLevel || ''
    const latitude = Number(searchParams.get('latitude')) || null
    const longitude = Number(searchParams.get('longitude')) || null
    const radius = Number(searchParams.get('radius')) || 5

    setSearchQuery(query)
    setTempSearchQuery(query)
    setSelectedCity(city)
    setSelectedPlaceType(placeType)
    setSelectedPriceLevel(priceLevel)
    setUserLatitude(latitude)
    setUserLongitude(longitude)
    setUserRadius(radius)
  }, [searchParams])

  const updateSearch = (value: string) => {
    setTempSearchQuery(value)
    setShowEmptySearchMessage(!value.trim() && !selectedCity && !selectedPlaceType && !selectedPriceLevel)
  }

  const performSearch = async () => {
    setIsLoading(true)
    setSearchQuery(tempSearchQuery)
    const query = new URLSearchParams({
      query: tempSearchQuery,
      tab: activeTab,
      city: selectedCity,
      placeType: selectedPlaceType,
      priceLevel: selectedPriceLevel,
      ...(isGpsEnabled && { latitude: userLatitude!.toString(), longitude: userLongitude!.toString(), radius: userRadius.toString() }),
    }).toString()

    router.push(`/search?${query}`)
    setIsLoading(false)
  }

  const toggleLocation = async () => {
    if (isGpsEnabled) {
      setUserLatitude(null)
      setUserLongitude(null)
      return
    }

    setIsLoading(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLatitude(position.coords.latitude)
          setUserLongitude(position.coords.longitude)
          setIsLoading(false)
        },
        (error) => {
          console.error("Error obtaining location", error)
          setIsLoading(false)
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl border-2 border-success-500">
      <div className="flex mb-6 space-x-2 justify-start overflow-x-auto">
        {['dishes', 'preferences', 'events'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as TabType)}
            className={`flex items-center px-4 py-2 rounded-full font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-success-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label={tab}
          >
            {tab === 'dishes' && <Utensils className="w-4 h-4 mr-2" />}
            {tab === 'preferences' && <User className="w-4 h-4 mr-2" />}
            {tab === 'events' && <Calendar className="w-4 h-4 mr-2" />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center align-middle mt-6">
        <input
          type="text"
          value={tempSearchQuery}
          onChange={(e) => updateSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && performSearch()}
          placeholder="Search for restaurants, cafes, and more..."
          className="w-full bg-gray-100 px-6 h-12 text-gray-900 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-success-500"
          autoComplete="on"
          autoFocus
        />
        <button
          onClick={toggleLocation}
          className={`h-12 px-3 ${isGpsEnabled ? 'bg-success-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          <MapPin className="h-5 w-5" />
        </button>
        <button
          onClick={performSearch}
          className="h-12 px-6 rounded-r-full bg-success-500 text-white hover:bg-success-600"
        >
          <span className='flex row text-gray-900'>
            <Search className="h-5 w-5 mr-2" />
            Search
          </span>
   
        </button>
      </div>

      <div className="flex flex-wrap justify-start mt-4 gap-2">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value as City)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-success-500"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <select
          value={selectedPlaceType}
          onChange={(e) => setSelectedPlaceType(e.target.value as PlaceType)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-success-500"
        >
          <option value="">Select Place Type</option>
          {placeTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          value={selectedPriceLevel}
          onChange={(e) => setSelectedPriceLevel(e.target.value as PriceLevel)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-success-500"
        >
          <option value="">Select Price Level</option>
          {priceLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {showEmptySearchMessage && (
        <div className="text-yellow-500 text-center mt-4">
          Please enter a search query or select filters.
        </div>
      )}
      {isLoading && (
        <div className="text-center mt-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-success-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
        </div>
      )}
    </div>
  )
}