'use client'

import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { Button, Input } from "@nextui-org/react"

type TabType = 'dishes' | 'preferences' | 'events'

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState<TabType>('dishes')
  const [address, setAddress] = useState('')

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const handleSearch = () => {
    console.log(`Searching for ${activeTab} near: ${address}`)
    // Here you would typically call an API or update app state
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl border-2 border-purple-600">
      <div className="flex mb-6 space-x-4 justify-start">
        <Button
          onClick={() => handleTabChange('dishes')}
          className={`flex items-center px-4 py-2 rounded-2xl font-semibold transition-colors ${
            activeTab === 'dishes'
              ? 'bg-success-500 text-gray-900'
              : 'bg-transparent text-gray-800 hover:bg-gray-100'
          }`}
          aria-label="Best dishes"
        >
          <span className="mr-2">🍽️ Best dishes</span>
        </Button>
        <Button
          onClick={() => handleTabChange('preferences')}
          className={`flex items-center px-4 py-1 rounded-2xl font-semibold transition-colors ${
            activeTab === 'preferences'
              ? 'bg-success-500 text-gray-900'
              : 'bg-transparent text-gray-800 hover:bg-gray-100'
          }`}
          aria-label="My Preferences"
        >
          <span className="mr-2">🔒 My Preferences</span>
        </Button>
        <Button
          onClick={() => handleTabChange('events')}
          className={`flex items-center px-4 py-2 rounded-2xl font-semibold transition-colors ${
            activeTab === 'events'
              ? 'bg-success-500 text-gray-900'
              : 'bg-transparent text-gray-800 hover:bg-gray-100'
          }`}
          aria-label="Events"
        >
          <span className="mr-2">📅 Events</span>
        </Button>
      </div>

      <div className="flex items-center mt-6">
        <div className="relative flex-grow">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-success-500 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Enter Your Address"
            value={address}
            onChange={handleAddressChange}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-success-500 focus:border-success-500 transition-all duration-200 ease-in-out text-gray-800"
            aria-label="Enter your address"
          />
        </div>
        <Button
          onClick={handleSearch}
          className="h-12 rounded-r-full px-8 bg-success-500 text-white font-semibold hover:bg-success-600 transition-colors duration-200 ease-in-out"
          aria-label="Search"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  )
}