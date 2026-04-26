import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, X, Tag } from 'lucide-react'

interface StickyCTAProps {
  onCTAClick: () => void
  price: number
  originalPrice?: number
  savingText?: string
}

const StickyCTA = ({ 
  onCTAClick, 
  price = 10.99, 
  originalPrice = 74.99,
  savingText = '80% OFF'
}: StickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const savings = originalPrice ? originalPrice - price : 0

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="bg-gradient-to-t from-black/90 to-black/60 backdrop-blur-xl border-t border-blue-900/40 p-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          {/* Badge */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2 flex-shrink-0 shadow-lg shadow-blue-500/30">
            <Tag className="h-5 w-5 text-white" />
          </div>
          
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm truncate">
              Get the Ultimate Bundle - All 855+ Prompts
            </p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-green-400">${price}</span>
              {originalPrice && (
                <span className="text-slate-600 line-through text-xs">${originalPrice}</span>
              )}
              <span className="bg-red-600/20 text-red-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                {savingText || `-${discount}% OFF`}
              </span>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button
            onClick={onCTAClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-bold text-sm py-5 px-4 flex-shrink-0 shadow-lg shadow-blue-900/40 border-0 transition-all hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Get Now
          </Button>
          
          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-1.5 flex-shrink-0"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StickyCTA
