import Header from './components/Header'
import HeroSection from './components/HeroSection'
import SearchBar from './components/SearchBar'
import FoodIconsCircle from './components/FoodIconsCircle'
import PopularItems from './components/PopularItems'
import WaveSeparator from './components/wave-separator'

export default function DouqDiningPage() {
  return (
    <div className="min-h-screen bg-primary-700">
      <main className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <HeroSection />
          <SearchBar />
        </div>
        <FoodIconsCircle />
      </main>
      <WaveSeparator />
      <PopularItems />
    </div>
  )
}