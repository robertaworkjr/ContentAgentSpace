import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ShoppingCart,
  Download,
  Star,
  Zap,
  Video,
  Megaphone,
  Sparkles,
  TrendingUp,
  Package,
  CheckCircle,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'

interface PromptPack {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  promptCount: number
  category: string
  icon: React.ReactNode
  tags: string[]
  popular?: boolean
  new?: boolean
  features: string[]
  color: string
}

const packs: PromptPack[] = [
  {
    id: 'viral-video-pack',
    title: 'Viral Short-Form Video Pack',
    description:
      'Battle-tested prompts for TikTok, Reels & YouTube Shorts. Hook your audience in the first 3 seconds every time.',
    price: 14.99,
    originalPrice: 24.99,
    promptCount: 120,
    category: 'Video',
    icon: <Video className='h-6 w-6' />,
    tags: ['TikTok', 'Reels', 'Shorts', 'Hooks'],
    popular: true,
    features: [
      '120 curated video prompts',
      'Hook formulas that convert',
      'Platform-specific variations',
      'Trending content formulas',
      'Lifetime access + updates',
    ],
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 'ad-copy-pack',
    title: 'AI Ad Copy Mastery Pack',
    description:
      'High-converting ad scripts and copy prompts for Facebook, Instagram, and YouTube ad campaigns.',
    price: 17.99,
    originalPrice: 27.99,
    promptCount: 85,
    category: 'Advertising',
    icon: <Megaphone className='h-6 w-6' />,
    tags: ['Facebook Ads', 'Google Ads', 'Copywriting'],
    new: true,
    features: [
      '85 ad copy prompts',
      'Pain-point targeting frameworks',
      'AIDA & PAS models included',
      'A/B test ready variations',
      'Lifetime access + updates',
    ],
    color: 'from-pink-600 to-orange-500',
  },
  {
    id: 'content-strategy-pack',
    title: 'Content Strategy Mega Pack',
    description:
      'A complete content calendar and strategy prompt system. Plan 30 days of content in under an hour.',
    price: 19.99,
    originalPrice: 29.99,
    promptCount: 200,
    category: 'Strategy',
    icon: <TrendingUp className='h-6 w-6' />,
    tags: ['Planning', 'Calendar', 'Strategy', 'Branding'],
    features: [
      '200+ strategy prompts',
      '30-day content calendar',
      'Niche-specific templates',
      'Brand voice builder prompts',
      'Lifetime access + updates',
    ],
    color: 'from-blue-600 to-purple-600',
  },
  {
    id: 'ai-image-pack',
    title: 'AI Image & Visual Prompts',
    description:
      'Midjourney, DALL·E & Stable Diffusion prompts engineered for social media-ready visuals that stop the scroll.',
    price: 12.99,
    promptCount: 150,
    category: 'Visuals',
    icon: <Sparkles className='h-6 w-6' />,
    tags: ['Midjourney', 'DALL·E', 'Stable Diffusion'],
    features: [
      '150 image generation prompts',
      'Style-locked consistency guides',
      'Brand aesthetic templates',
      'Platform size variations',
      'Lifetime access + updates',
    ],
    color: 'from-teal-500 to-blue-600',
  },
  {
    id: 'viral-captions-pack',
    title: 'Viral Captions & Hooks Pack',
    description:
      'Never stare at a blank caption box again. Hundreds of proven caption structures and opening hooks.',
    price: 9.99,
    originalPrice: 17.99,
    promptCount: 300,
    category: 'Copywriting',
    icon: <Zap className='h-6 w-6' />,
    tags: ['Captions', 'Hooks', 'Engagement', 'CTAs'],
    features: [
      '300 caption prompts',
      'Engagement-trigger formulas',
      'Emoji placement guides',
      'CTA script library',
      'Lifetime access + updates',
    ],
    color: 'from-yellow-500 to-orange-600',
  },
  {
    id: 'ultimate-bundle',
    title: 'Ultimate Creator Bundle',
    description:
      'Every single prompt pack in one mega zip. The complete AI content creation arsenal for serious creators.',
    price: 29.99,
    originalPrice: 74.99,
    promptCount: 855,
    category: 'Bundle',
    icon: <Package className='h-6 w-6' />,
    tags: ['All Packs', 'Best Value', 'Everything'],
    popular: true,
    features: [
      'All 5 packs included (855+ prompts)',
      'Exclusive bundle-only bonus prompts',
      'Priority Discord community access',
      'Quarterly update drops',
      'Lifetime access + all future packs',
    ],
    color: 'from-purple-600 via-pink-600 to-orange-500',
  },
]

const PromptStore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [loadingPack, setLoadingPack] = useState<string | null>(null)

  const categories = ['All', 'Video', 'Advertising', 'Strategy', 'Visuals', 'Copywriting', 'Bundle']

  const filtered =
    selectedCategory === 'All'
      ? packs
      : packs.filter((p) => p.category === selectedCategory)

  const handlePurchase = async (pack: PromptPack) => {
    if (loadingPack) return
    setLoadingPack(pack.id)

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      const res = await fetch(`${supabaseUrl}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          packId: pack.id,
          packTitle: pack.title,
          price: pack.price,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Failed to start checkout')
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      toast.error(message, {
        description: 'Please try again or contact hello@contentagent.space',
      })
      setLoadingPack(null)
    }
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navigation />

      {/* Hero */}
      <section className='relative pt-28 pb-16 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-20 left-1/4 w-80 h-80 bg-purple-700/25 rounded-full blur-3xl animate-pulse' />
          <div className='absolute bottom-0 right-1/4 w-80 h-80 bg-pink-700/25 rounded-full blur-3xl animate-pulse delay-700' />
        </div>
        <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <Badge className='mb-4 bg-purple-900/60 text-purple-300 border border-purple-700 px-4 py-1 text-sm'>
            ⚡ Instant Download · ZIP Files
          </Badge>
          <h1 className='text-5xl md:text-7xl font-bold mb-6'>
            AI Prompt{' '}
            <span className='bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent'>
              Store
            </span>
          </h1>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto mb-8'>
            Hand-crafted, battle-tested AI prompt packs for content creators.
            Download instantly. Create faster. Go viral.
          </p>
          <div className='flex items-center justify-center gap-6 text-sm text-gray-400'>
            <span className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-green-400' /> Instant ZIP Download
            </span>
            <span className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-green-400' /> Lifetime Access
            </span>
            <span className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-green-400' /> Free Updates
            </span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className='py-6 border-y border-gray-800 bg-gray-950/50 sticky top-16 z-40 backdrop-blur-md'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex gap-2 overflow-x-auto pb-1 scrollbar-hide'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className='py-16 bg-gradient-to-b from-gray-950 to-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
            {filtered.map((pack) => (
              <div
                key={pack.id}
                className={`flex flex-col relative bg-gray-900 border rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group ${
                  pack.id === 'ultimate-bundle'
                    ? 'border-purple-500 shadow-lg shadow-purple-900/30'
                    : 'border-gray-800 hover:border-gray-600'
                }`}
              >
                {/* Badges */}
                <div className='absolute top-4 right-4 flex flex-col gap-2 z-10'>
                  {pack.popular && (
                    <Badge className='bg-purple-600 text-white border-0 text-xs'>
                      🔥 Popular
                    </Badge>
                  )}
                  {pack.new && (
                    <Badge className='bg-green-600 text-white border-0 text-xs'>
                      ✨ New
                    </Badge>
                  )}
                  {pack.originalPrice && (
                    <Badge className='bg-red-600/80 text-white border-0 text-xs'>
                      -{Math.round(((pack.originalPrice - pack.price) / pack.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                {/* Gradient Header */}
                <div className={`bg-gradient-to-br ${pack.color} p-6 flex items-start gap-4`}>
                  <div className='bg-white/20 rounded-xl p-3 backdrop-blur-sm'>
                    {pack.icon}
                  </div>
                  <div>
                    <p className='text-white/70 text-xs font-medium uppercase tracking-wider mb-1'>
                      {pack.category}
                    </p>
                    <h2 className='text-white font-bold text-lg leading-tight'>
                      {pack.title}
                    </h2>
                  </div>
                  </div>

                  {/* Body - Flex Grow to push footer down */}
                  <div className='p-6 flex flex-col flex-grow'>
                    <p className='text-gray-400 text-sm leading-relaxed mb-4'>
                      {pack.description}
                    </p>

                    {/* Prompt Count */}
                    <div className='flex items-center gap-2 mb-4'>
                      <Download className='h-4 w-4 text-purple-400' />
                      <span className='text-purple-300 font-semibold text-sm'>
                        {pack.promptCount.toLocaleString()} prompts included
                      </span>
                    </div>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-2 mb-5'>
                      {pack.tags.map((tag) => (
                        <span
                          key={tag}
                          className='text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded-md border border-gray-700'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className='space-y-2 mb-6 flex-grow'>
                      {pack.features.map((feat) => (
                        <li key={feat} className='flex items-start gap-2 text-sm text-gray-300'>
                          <CheckCircle className='h-4 w-4 text-green-400 mt-0.5 flex-shrink-0' />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    {/* Stars */}
                    <div className='flex items-center gap-1 mb-5'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                      ))}
                      <span className='text-gray-500 text-xs ml-1'>(4.9)</span>
                    </div>

                    {/* Price & CTAs */}
                    <div className='flex flex-col mt-auto'>
                    <div className='flex items-baseline gap-2 mb-3'>
                      <span className='text-3xl font-bold text-white'>
                        ${pack.price}
                      </span>
                      {pack.originalPrice && (
                        <span className='text-gray-600 line-through text-sm'>
                          ${pack.originalPrice}
                        </span>
                      )}
                      <span className='text-gray-600 text-xs ml-auto'>One-time</span>
                    </div>
                    
                    <div className='flex flex-row gap-2 w-full'>
                      <Button
                        onClick={() => handlePurchase(pack)}
                        disabled={loadingPack === pack.id}
                        className={`flex-1 min-w-0 bg-gradient-to-r ${pack.color} hover:opacity-90 text-white border-0 shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed`}
                      >
                        {loadingPack === pack.id ? (
                          <span className='flex items-center justify-center gap-1 text-xs'>
                            <Loader2 className='h-3 w-3 animate-spin flex-shrink-0' />
                            <span className='truncate'>Wait…</span>
                          </span>
                        ) : (
                          <span className='flex items-center justify-center gap-1 text-xs'>
                            <ShoppingCart className='h-3 w-3 flex-shrink-0' />
                            <span className='truncate'>Stripe</span>
                          </span>
                        )}
                      </Button>
                      <Button
                        onClick={() => handlePurchase(pack)}
                        disabled={loadingPack === pack.id}
                        className="flex-1 min-w-0 bg-[#0070ba] hover:bg-[#005ea6] text-white border-0 shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loadingPack === pack.id ? (
                          <span className='flex items-center justify-center gap-1 text-xs'>
                            <Loader2 className='h-3 w-3 animate-spin flex-shrink-0' />
                            <span className='truncate'>Wait…</span>
                          </span>
                        ) : (
                          <span className='flex items-center justify-center gap-1 text-xs font-semibold'>
                            <span className='truncate'>PayPal</span>
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className='py-16 border-t border-gray-800'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold mb-10 text-white'>
            Why Creators Love Our{' '}
            <span className='bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
              Prompt Packs
            </span>
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              { icon: '⚡', title: 'Instant Download', desc: 'Get your ZIP file the moment you purchase. No waiting, no approval process.' },
              { icon: '🔄', title: 'Lifetime Updates', desc: 'As AI evolves, so do our prompts. Every purchase includes all future updates.' },
              { icon: '💬', title: 'Community Access', desc: 'Join our private creator community. Share results, get feedback, grow faster.' },
            ].map((item) => (
              <div key={item.title} className='bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-colors'>
                <div className='text-4xl mb-3'>{item.icon}</div>
                <h3 className='text-white font-semibold mb-2'>{item.title}</h3>
                <p className='text-gray-400 text-sm leading-relaxed'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className='py-20 bg-gradient-to-b from-black to-gray-950'>
        <div className='max-w-2xl mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-4 text-white'>
            Not sure which pack to start with?
          </h2>
          <p className='text-gray-400 mb-8'>
            The Ultimate Bundle gives you everything at 60% off. The most popular choice for serious creators.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto'>
            <Button
              onClick={() => handlePurchase(packs.find((p) => p.id === 'ultimate-bundle')!)}
              disabled={loadingPack === 'ultimate-bundle'}
              size='lg'
              className='flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white text-lg py-6 shadow-2xl shadow-purple-900/40 disabled:opacity-70'
            >
              {loadingPack === 'ultimate-bundle' ? (
                <><Loader2 className='mr-2 h-5 w-5 animate-spin' />Processing…</>
              ) : (
                <><ShoppingCart className='mr-2 h-5 w-5' />Stripe — $29.99</>
              )}
            </Button>
            <Button
              onClick={() => handlePurchase(packs.find((p) => p.id === 'ultimate-bundle')!)}
              disabled={loadingPack === 'ultimate-bundle'}
              size='lg'
              className='flex-1 bg-[#0070ba] hover:bg-[#005ea6] text-white text-lg py-6 shadow-2xl disabled:opacity-70'
            >
              {loadingPack === 'ultimate-bundle' ? (
                <><Loader2 className='mr-2 h-5 w-5 animate-spin' />Processing…</>
              ) : (
                <>PayPal — $29.99</>
              )}
            </Button>
          </div>
          <p className='text-gray-600 text-sm mt-6'>30-day money-back guarantee · Secure checkout</p>
        </div>
      </section>
    </div>
  )
}

export default PromptStore
