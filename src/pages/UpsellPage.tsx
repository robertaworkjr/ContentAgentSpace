import { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ShoppingCart,
  Rocket,
  Star,
  Clock,
  CheckCircle,
  Gift,
  ArrowRight,
  X,
  Zap
} from 'lucide-react'
import { packs } from './PromptStorePage'

const UpsellPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [selectedUpsell, setSelectedUpsell] = useState<string | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const purchasedPackId = searchParams.get('pack') || ''
  const purchasedPack = packs.find(p => p.id === purchasedPackId)

  // Upsell offers
  const upsellOffers = [
    {
      id: 'bundle-upsell',
      title: 'Complete Your Collection',
      description: 'Get ALL 5 packs (855+ prompts) at 80% OFF!',
      price: 10.99,
      originalPrice: 74.99,
      savings: 64,
      includePackIds: packs.map(p => p.id),
      cta: 'Yes! I Want All Prompts',
      icon: <Package className="h-8 w-8" />,
      color: 'from-purple-600 to-pink-600',
      position: 'primary',
    },
    {
      id: 'ai-consultation',
      title: '1-on-1 AI Strategy Session',
      description: '60-minute consultation to customize prompts for your business',
      price: 97,
      originalPrice: 197,
      savings: 100,
      includePackIds: [],
      cta: 'Book My Strategy Session',
      icon: <Rocket className="h-8 w-8" />,
      color: 'from-cyan-600 to-blue-700',
      position: 'secondary',
    },
    {
      id: 'monthly-membership',
      title: 'Prompt Club Membership',
      description: 'Get 50+ new premium prompts every month + early access',
      price: 19.99,
      originalPrice: 29.99,
      savings: 10,
      includePackIds: [],
      cta: 'Join the Club',
      icon: <Star className="h-8 w-8" />,
      color: 'from-yellow-500 to-orange-500',
      position: 'secondary',
    },
  ]

  // If user already has the bundle, filter it out
  const availableUpsells = upsellOffers.filter(upsell => {
    if (upsell.id === 'bundle-upsell' && purchasedPackId === 'ultimate-bundle') {
      return false
    }
    return true
  })

  const primaryUpsell = availableUpsells.find(u => u.position === 'primary') || availableUpsells[0]
  const secondaryUpsells = availableUpsells.filter(u => u.position !== 'primary')

  const handleAccept = (upsellId: string) => {
    setSelectedUpsell(upsellId)
    setIsRedirecting(true)
    
    // In production, this would redirect to a payment page for the upsell
    // For now, we'll simulate the redirect
    if (upsellId === 'bundle-upsell') {
      // Redirect to purchase the bundle
      navigate('/prompt-store?upsell=bundle#ultimate-bundle')
    } else {
      // Redirect to a payment page for other upsells
      navigate('/checkout?upsell=' + upsellId)
    }
  }

  const handleDecline = () => {
    // Redirect to download page
    navigate('/success?session_id=' + searchParams.get('session_id'))
  }

  useEffect(() => {
    if (isRedirecting) {
      // Add a loading state
      const timer = setTimeout(() => {
        setIsRedirecting(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isRedirecting])

  if (!purchasedPack) {
    return (
      <div className='min-h-screen bg-[#08101f] text-white flex items-center justify-center p-4'>
        <div className='text-center'>
          <p className='text-slate-400 mb-4'>Loading your upsell offer...</p>
          <Link to='/prompt-store'>
            <Button className='bg-blue-600 hover:bg-blue-500 text-white'>
              Back to Store
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#08101f] text-white relative overflow-hidden'>
      {/* Background glow */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-700/10 rounded-full blur-3xl' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8'>
        {/* Close button - goes to download */}
        <button
          onClick={handleDecline}
          className='absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 z-20'
          aria-label='No thanks'
        >
          <X className='h-5 w-5' />
        </button>

        {/* Hero Section */}
        <div className='text-center pt-16 pb-12'>
          <div className='inline-flex items-center gap-2 bg-green-600/20 border border-green-600/30 rounded-full px-4 py-1.5 text-xs font-semibold text-green-300 mb-6 tracking-wider uppercase'>
            <Gift className='h-3 w-3' />
            Special Offer for {purchasedPack.title} Buyers
          </div>
          
          <h1 className='text-4xl md:text-5xl font-extrabold mb-6 tracking-tight'>
            Congratulations on Your 
            <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
              Purchase!
            </span>
          </h1>
          
          <p className='text-xl text-slate-400 mb-8 max-w-2xl mx-auto'>
            As a thank you, we have an exclusive offer just for you. Upgrade to get even more value!
          </p>
        </div>

        {/* Primary Upsell Offer */}
        {primaryUpsell && (
          <div className='mb-12'>
            <Card className='bg-[#0c1830] border border-purple-700/60 rounded-2xl p-8 shadow-2xl shadow-purple-900/30'>
              <div className='flex flex-col md:flex-row items-center gap-8'>
                {/* Icon */}
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${primaryUpsell.color} flex items-center justify-center shadow-2xl shadow-purple-500/30 flex-shrink-0`}>
                  <span className='text-white text-3xl'>{primaryUpsell.icon}</span>
                </div>
                
                {/* Content */}
                <div className='flex-1 min-w-0'>
                  <div className='mb-4'>
                    <p className='text-purple-300 text-xs font-semibold uppercase tracking-wider mb-1'>
                      Best Value · Limited Time
                    </p>
                    <h2 className='text-2xl md:text-3xl font-bold text-white mb-2'>
                      {primaryUpsell.title}
                    </h2>
                    <p className='text-slate-400'>
                      {primaryUpsell.description}
                    </p>
                  </div>
                  
                  {/* Pricing */}
                  <div className='flex items-baseline gap-3 mb-6'>
                    <span className='text-4xl font-bold text-green-400'>${primaryUpsell.price}</span>
                    <span className='text-slate-600 line-through text-lg'>${primaryUpsell.originalPrice}</span>
                    <span className='bg-green-600/20 text-green-300 text-sm font-semibold px-3 py-1 rounded-full'>
                      Save ${primaryUpsell.savings}!
                    </span>
                  </div>
                  
                  {/* CTA */}
                  <Button
                    onClick={() => handleAccept(primaryUpsell.id)}
                    disabled={isRedirecting}
                    className='w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold text-lg py-6 px-8 rounded-xl shadow-xl shadow-purple-900/40 transition-all hover:-translate-y-px disabled:opacity-70 border-0'
                  >
                    {isRedirecting ? (
                      <>
                        <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2' />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Zap className='mr-2 h-5 w-5' />
                        {primaryUpsell.cta}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {/* What's included */}
            {primaryUpsell.id === 'bundle-upsell' && (
              <div className='mt-6'>
                <p className='text-slate-500 text-xs uppercase tracking-wider mb-4 text-center'>
                  Your Bundle Includes:
                </p>
                <div className='flex flex-wrap justify-center gap-2'>
                  {packs.filter(p => p.id !== 'ultimate-bundle').map(pack => (
                    <span 
                      key={pack.id}
                      className='bg-[#0c1830] border border-blue-800/50 rounded-full px-4 py-2 text-blue-300 text-sm'
                    >
                      {pack.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Secondary Upsells */}
        {secondaryUpsells.length > 0 && (
          <div className='mb-12'>
            <h3 className='text-xl font-bold text-center mb-6'>
              Also Available:
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {secondaryUpsells.map((upsell) => (
                <Card 
                  key={upsell.id}
                  className='bg-[#0c1830] border border-cyan-700/40 rounded-2xl p-6 hover:border-cyan-600/60 transition-colors'
                >
                  <div className='flex items-start gap-4'>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${upsell.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      {upsell.icon}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h4 className='font-bold text-white mb-1'>{upsell.title}</h4>
                      <p className='text-slate-400 text-sm mb-3'>{upsell.description}</p>
                      <div className='flex items-baseline gap-2 mb-3'>
                        <span className='text-xl font-bold text-green-400'>${upsell.price}</span>
                        <span className='text-slate-600 line-through text-sm'>${upsell.originalPrice}</span>
                      </div>
                      <Button
                        onClick={() => handleAccept(upsell.id)}
                        variant='outline'
                        className='w-full border-cyan-600/50 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-100 hover:border-cyan-600/70 transition-colors'
                      >
                        {upsell.cta}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No thanks */}
        <div className='text-center py-8 border-t border-blue-900/20'>
          <button
            onClick={handleDecline}
            className='text-slate-500 hover:text-slate-300 font-medium inline-flex items-center gap-1 transition-colors'
          >
            No thanks, take me to my download
            <ArrowRight className='h-4 w-4' />
          </button>
        </div>

        {/* Trust badges */}
        <div className='flex flex-wrap justify-center gap-4 pt-8 border-t border-blue-900/20 mt-8'>
          {["Secure Checkout", "30-Day Guarantee", "Instant Access"].map((text) => (
            <div key={text} className='flex items-center gap-2 text-slate-500 text-sm'>
              <CheckCircle className='h-4 w-4 text-blue-400' />
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UpsellPage
