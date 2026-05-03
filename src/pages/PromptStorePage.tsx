import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import EmailCapture from '@/components/EmailCapture'
import StickyCTA from '@/components/StickyCTA'
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
  Clock,
  Eye,
  Users,
  Quote,
  Lightbulb,
  Tag,
  X,
} from 'lucide-react'
import { toast } from 'sonner'

// Sample prompts for preview
const samplePrompts: Record<string, string[]> = {
  'viral-video-pack': [
    'TikTok hook: "If you\'re a [niche] creator posting every day and still not growing, watch this." — call out the viewer, then deliver the fix.',
    'Write a 20-second Reel script using the before/after format: the messy reality, the turning point, the result. End with a punchy CTA.',
    'Create a "3 things nobody tells you about [topic]" TikTok — rapid-fire delivery, text overlays on each point, trending-audio ready.',
    'Script a "POV: you finally figured out your content strategy" video — contrast the before energy with the after. No talking needed, all text.',
  ],
  'ad-copy-pack': [
    'Write a Facebook ad hook that targets [Pain Point] for [Target Audience]. Use urgency and social proof.',
    'Create 3 ad variations for [Product] using the AIDA formula (Attention, Interest, Desire, Action).',
    'Generate a high-converting YouTube ad script (15-30 seconds) for [Service]. Include: Hook, problem, solution, CTA.',
    'Write a lead magnet ad that offers [Free Resource] in exchange for email signup. Use curiosity gap.',
  ],
  'content-strategy-pack': [
    'TikTok/Instagram: Explain how to batch-create 30 days of content in one afternoon using AI prompts. Walk through your actual workflow step by step.',
    'Carousel: 7 content frameworks that always get saved — break down AIDA, PAS, Before/After, List, Tutorial, Story, and Myth-Busting with examples.',
    'Write a hook using the before/after contrast: "I used to spend 4 hours on one post. Now it takes 20 minutes." Then reveal the system.',
    'Show how to create a content repurposing map: one long-form piece turned into 8 shorter formats across TikTok, Instagram, and YouTube Shorts.',
    'Caption: "I analysed 47 viral posts in my niche. Every single one had this in common." — reveal the pattern, back it with data.',
    'Build a content calendar for a product launch: teaser phase, launch phase, and post-launch nurture — what to post on each day.',
  ],
  'ai-image-pack': [
    'Generate a photorealistic portrait of a [Profession] in a [Style] setting, hyper-detailed, 8K, cinematic lighting, --ar 16:9',
    'Create a minimalist abstract background for social media posts, gradient colors, clean lines, --ar 1:1',
    'Design a futuristic product mockup for [Product Type], neon lighting, cyberpunk style, highly detailed, --ar 3:4',
    'Generate a fantasy landscape with [Theme], epic composition, award-winning photography, ultra HD, --ar 21:9',
  ],
  'viral-captions-pack': [
    'Write 10 engaging Instagram captions for [Product Launch]. Include emojis, hashtags, and CTAs.',
    'Create 5 Twitter threads hooks that spark conversations about [Controversial Topic].',
    'Generate 7 LinkedIn post hooks for [Industry Insight] that position you as a thought leader.',
    'Write 10 YouTube video titles with high CTR potential for [Keyword]. Include power words and curiosity.',
  ],
  'ultimate-bundle': [
    'Create a complete social media strategy for [Brand] including content pillars, posting schedule, and engagement tactics.',
    'Generate a 7-day email sequence for [Lead Magnet] that nurtures leads into customers.',
    'Write a sales page for [Product] using the PAS (Problem-Agitate-Solve) formula with testimonials and guarantees.',
    'Create a viral TikTok series concept with 5 interconnected videos that tell a compelling story.',
  ],
  'legal-prompts-pack': [
    'Draft a plain-English privacy policy for [Website/App] that covers data collection, cookies, third-party sharing, and user rights under GDPR and CCPA.',
    'Write a freelance services contract for [Service Type] between [Your Business Name] and a client. Include scope of work, payment terms, revision limits, IP ownership, and termination clauses.',
    'Generate a terms and conditions page for a [SaaS / e-commerce / content] platform covering acceptable use, liability disclaimers, refund policy, and governing law.',
    'Create a cease and desist letter template for copyright infringement of [Content Type] for a small creator or business. Keep the tone firm but professional.',
    'Draft an NDA (Non-Disclosure Agreement) for a [one-way / mutual] disclosure scenario between two businesses. Include definition of confidential information, exclusions, and duration.',
    'Write a DMCA takedown notice template a content creator can use to request removal of stolen [videos / images / written content] from a third-party platform.',
    'Generate a client intake agreement for a [coach / consultant / agency] that outlines deliverables, communication expectations, payment schedule, and dispute resolution.',
    'Draft an affiliate agreement for a brand working with content creators. Cover commission structure, disclosure requirements, prohibited promotions, and termination rights.',
    'Write a refund and cancellation policy for a [digital product / subscription / service] business that is fair to customers but protects against abuse.',
    'Create a user-generated content (UGC) license agreement allowing a brand to repurpose creator content across paid ads and organic channels. Include usage scope and compensation terms.',
    'Draft a liability waiver for [event / workshop / physical activity] participants that limits the organiser\'s legal exposure while remaining enforceable.',
    'Write an employment offer letter template for a [full-time / part-time / contract] role at a small business. Include title, compensation, start date, at-will clause, and confidentiality note.',
    'Generate a website disclaimer for a [blog / financial advice / health & wellness] site that limits liability for information provided and makes clear it is not professional advice.',
    'Draft a software end-user licence agreement (EULA) for a [mobile app / desktop tool / browser extension] covering permitted use, restrictions, updates, and warranty disclaimer.',
    'Write a sponsorship agreement for a content creator and a brand that covers deliverable requirements, approval process, exclusivity window, payment milestones, and FTC disclosure obligations.',
  ],
}

// Testimonials
const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Social Media Manager',
    avatar: 'SM',
    rating: 5,
    text: 'These prompts saved me 20+ hours a week. My engagement rate tripled in 30 days using the viral video pack. Worth every penny.',
    pack: 'viral-video-pack',
    timestamp: '2 weeks ago',
  },
  {
    name: 'James K.',
    role: 'E-commerce Owner',
    avatar: 'JK',
    rating: 5,
    text: 'The ad copy pack paid for itself in one campaign. My ROAS went from 2.1 to 4.7 overnight. Insane value.',
    pack: 'ad-copy-pack',
    timestamp: '1 month ago',
  },
  {
    name: 'Lisa T.',
    role: 'Content Creator',
    avatar: 'LT',
    rating: 5,
    text: 'The Ultimate Bundle is a game-changer. I went from posting sporadically to having 30 days of content planned and ready. My traffic is up 400%.',
    pack: 'ultimate-bundle',
    timestamp: '3 weeks ago',
  },
  {
    name: 'David R.',
    role: 'Marketing Director',
    avatar: 'DR',
    rating: 5,
    text: 'We bought the content strategy pack for our agency. The frameworks are so good we\'re using them for all our clients. 10/10 would buy again.',
    pack: 'content-strategy-pack',
    timestamp: '2 months ago',
  },
  {
    name: 'Emily S.',
    role: 'Freelance Designer',
    avatar: 'ES',
    rating: 5,
    text: 'The AI image prompts are next level. I\'ve created portfolio pieces that clients think I spent hours on. Little do they know it takes me 10 minutes now.',
    pack: 'ai-image-pack',
    timestamp: '1 week ago',
  },
  {
    name: 'Mark W.',
    role: 'Copywriter',
    avatar: 'MW',
    rating: 5,
    text: 'The caption pack solved my writer\'s block. I have 100+ high-performing captions ready to go. My client retention went through the roof.',
    pack: 'viral-captions-pack',
    timestamp: '1 month ago',
  },
]

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
  discount?: number
  savings?: number
}

// Countdown timer for bundle deal
const CountdownTimer = ({ hours = 24 }: { hours?: number }) => {
  const [timeLeft, setTimeLeft] = useState<{h: number, m: number, s: number}>({h: hours, m: 0, s: 0})
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 }
        if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 }
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 }
        return { h: 0, m: 0, s: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-2 bg-red-900/20 border border-red-600/30 rounded-full px-4 py-2">
      <Clock className="h-3 w-3 text-red-400" />
      <span className="text-xs font-bold text-red-400">
        {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s left at this price!
      </span>
    </div>
  )
}

// Preview modal component
const PreviewModal = ({ 
  isOpen, 
  onClose, 
  packId, 
  packTitle 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  packId: string; 
  packTitle: string 
}) => {
  if (!isOpen) return null
  
  const prompts = samplePrompts[packId] || samplePrompts['ultimate-bundle']
  
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#0c1830] border border-blue-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-900/50">
        <div className="sticky top-0 bg-[#0c1830]/90 backdrop-blur-md border-b border-blue-800/50 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-bold text-white">
            <Eye className="h-5 w-5 text-blue-400 inline mr-2" />
            Preview: {packTitle}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {prompts.map((prompt, index) => (
            <div 
              key={index} 
              className="bg-[#08101f] border border-blue-900/30 rounded-xl p-4 hover:border-blue-700/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-sm font-bold text-blue-400 flex-shrink-0 mt-0.5">
                  {index + 1}.
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">{prompt}</p>
              </div>
            </div>
          ))}
          
          <div className="bg-blue-900/20 border border-blue-800/40 rounded-xl p-4 text-center mt-6">
            <p className="text-blue-300 text-sm">
              <Lightbulb className="h-4 w-4 inline mr-1" />
              showing {prompts.length} of {packs.find(p => p.id === packId)?.promptCount || 'hundreds'} prompts
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Testimonials carousel
const TestimonialsSection = () => {
  const [selectedPack, setSelectedPack] = useState<'all' | string>('all')
  
  const filtered = selectedPack === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.pack === selectedPack)
  
  const packOptions = [
    { id: 'all', name: 'All Packs' }, 
    ...packs.map(p => ({ id: p.id, name: p.title }))
  ]
  
  return (
    <section className="py-16 border-t border-blue-900/20 bg-[#09121f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3">
            Trusted by 1,000+ Creators
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
            Real results from real creators using our prompt packs
          </p>
        </div>
        
        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide">
          {packOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedPack(option.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedPack === option.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'bg-[#0c1830] text-slate-400 border border-blue-900/40 hover:border-blue-700/40'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
        
        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t, index) => (
            <div 
              key={index}
              className="bg-[#0c1830] border border-blue-900/30 rounded-2xl p-6 hover:border-blue-700/40 transition-all group"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                  <span className="text-white font-bold text-sm">{t.avatar}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-600 ml-auto">{t.timestamp}</span>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    <Quote className="h-4 w-4 text-blue-500/70 float-left mr-2 -mt-1" />
                    {t.text}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{t.name}</span>
                    <span className="text-slate-600 text-xs">· {t.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No testimonials yet for this pack</p>
          </div>
        )}
      </div>
    </section>
  )
}

export const packs: PromptPack[] = [
  {
    id: 'viral-video-pack',
    title: '120 Viral Hook Prompts for TikTok, Reels & Shorts',
    description:
      'A low-cost starter pack for creators who need stronger openings, sharper hooks, and faster short-form video ideas without guessing what to post.',
    price: 4.99,
    originalPrice: 14.99,
    promptCount: 120,
    category: 'Video',
    icon: <Video className='h-6 w-6' />,
    tags: ['TikTok', 'Reels', 'Shorts', 'Hooks'],
    popular: true,
    features: [
      '120 ready-to-use hook and script prompts',
      'Built for TikTok, Reels, and Shorts',
      'Stronger first-3-second attention grabs',
      'Fast content idea generation without burnout',
      'Lifetime access + free updates',
    ],
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 'ad-copy-pack',
    title: '85 AI Ad Copy Prompts for Better Conversions',
    description:
      'A focused swipe-file style pack for faster Facebook, Instagram, and YouTube ads when you need clearer angles, offers, and calls to action.',
    price: 3.99,
    originalPrice: 17.99,
    promptCount: 85,
    category: 'Advertising',
    icon: <Megaphone className='h-6 w-6' />,
    tags: ['Facebook Ads', 'Instagram Ads', 'Copywriting'],
    new: true,
    features: [
      '85 ad copy and offer prompts',
      'Pain-point and desire-driven frameworks',
      'AIDA and PAS structures included',
      'Built for quick testing and iteration',
      'Lifetime access + free updates',
    ],
    color: 'from-pink-600 to-orange-500',
  },
  {
    id: 'content-strategy-pack',
    title: '200 Content Strategy Prompts for 30 Days of Posts',
    description:
      'A planning pack for creators and small teams who want a month of content direction, stronger positioning, and less time wasted wondering what comes next.',
    price: 7.99,
    originalPrice: 19.99,
    promptCount: 200,
    category: 'Strategy',
    icon: <TrendingUp className='h-6 w-6' />,
    tags: ['Planning', 'Content Calendar', 'Strategy', 'Branding'],
    features: [
      '200 strategy and planning prompts',
      'Build 30 days of content faster',
      'Niche-specific planning angles',
      'Brand voice and positioning helpers',
      'Lifetime access + free updates',
    ],
    color: 'from-blue-600 to-purple-600',
  },
  {
    id: 'ai-image-pack',
    title: '150 AI Image Prompts for Scroll-Stopping Visuals',
    description:
      'A visual prompt pack for creators who need better thumbnails, social graphics, and branded AI images that look deliberate instead of random.',
    price: 5.99,
    originalPrice: 14.99,
    promptCount: 150,
    category: 'Visuals',
    icon: <Sparkles className='h-6 w-6' />,
    tags: ['Midjourney', 'DALL·E', 'Stable Diffusion'],
    features: [
      '150 image-generation prompts',
      'Cleaner style and consistency guidance',
      'Brand aesthetic and visual direction help',
      'Useful for social posts, covers, and promos',
      'Lifetime access + free updates',
    ],
    color: 'from-teal-500 to-blue-600',
  },
  {
    id: 'viral-captions-pack',
    title: '300 Caption, Hook & CTA Prompts for Engagement',
    description:
      'A practical writing pack for when you need captions, openings, and calls to action that feel stronger than generic filler and actually move people to respond.',
    price: 6.99,
    originalPrice: 17.99,
    promptCount: 300,
    category: 'Copywriting',
    icon: <Zap className='h-6 w-6' />,
    tags: ['Captions', 'Hooks', 'Engagement', 'CTAs'],
    features: [
      '300 caption and CTA prompts',
      'Engagement-focused opening formulas',
      'Useful for social posts and launch content',
      'Designed to reduce blank-page syndrome fast',
      'Lifetime access + free updates',
    ],
    color: 'from-yellow-500 to-orange-600',
  },
  {
    id: 'legal-prompts-pack',
    title: '15 Legal Document Prompts for Creators & Businesses',
    description:
      'Stop paying lawyers for boilerplate. Get 15 AI-powered prompts to draft privacy policies, contracts, NDAs, DMCA notices, and more — in plain English, tailored to your situation.',
    price: 4.99,
    originalPrice: 19.99,
    promptCount: 15,
    category: 'Legal',
    icon: <Sparkles className='h-6 w-6' />,
    tags: ['Contracts', 'Privacy Policy', 'NDA', 'DMCA', 'Creator Law'],
    new: true,
    features: [
      '15 ready-to-use legal document prompts',
      'Covers privacy policy, T&Cs, NDA, DMCA & more',
      'Written in plain English — no law degree needed',
      'Built for freelancers, creators & small businesses',
      'Lifetime access + free updates',
    ],
    color: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'ultimate-bundle',
    title: 'Ultimate Creator Bundle — All 855+ Prompts',
    description:
      'The best-value option: every pack in one download for creators, marketers, and businesses who want the full system instead of buying one piece at a time.',
    price: 10.99,
    originalPrice: 74.99,
    promptCount: 855,
    category: 'Bundle',
    icon: <Package className='h-6 w-6' />,
    tags: ['All Packs', 'Best Value', 'Full Library'],
    popular: true,
    features: [
      'All 5 packs included (855+ prompts)',
      'Cheaper than buying packs individually',
      'Best choice for creators who want everything',
      'Bonus prompts included in the bundle',
      'Lifetime access + all future updates',
    ],
    color: 'from-purple-600 via-pink-600 to-orange-500',
  },
]

const PromptStore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [loadingPack, setLoadingPack] = useState<string | null>(null)
  const [previewModal, setPreviewModal] = useState<{open: boolean, packId: string, packTitle: string}>({
    open: false,
    packId: '',
    packTitle: ''
  })
  const [emailModal, setEmailModal] = useState(false)

  const categories = ['All', 'Video', 'Advertising', 'Strategy', 'Visuals', 'Copywriting', 'Legal', 'Bundle']

  // Show email modal after the visitor has seen the offer first
  useEffect(() => {
    const timer = setTimeout(() => {
      setEmailModal(true)
    }, 12000)
    return () => clearTimeout(timer)
  }, [])

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
    <div className='min-h-screen bg-[#08101f] text-white'>
      {/* Preview Modal */}
      <PreviewModal
        isOpen={previewModal.open}
        onClose={() => setPreviewModal({ open: false, packId: '', packTitle: '' })}
        packId={previewModal.packId}
        packTitle={previewModal.packTitle}
      />
      
      {/* Email Capture Modal */}
      <EmailCapture
        isOpen={emailModal}
        onClose={() => setEmailModal(false)}
        title="Get 10 Free High-Performing Prompts"
        subtitle="Try the quality first — instant download, no credit card needed"
        incentive="FREE STARTER PACK · INSTANT DOWNLOAD"
      />
      
      {/* Sticky Mobile CTA */}
      <StickyCTA
        onCTAClick={() => handlePurchase(packs.find(p => p.id === 'ultimate-bundle')!)}
        price={10.99}
        originalPrice={74.99}
        savingText="Save $64"
      />
      
      <Navigation />

      {/* Hero */}
      <section className='relative pt-28 pb-16 overflow-hidden bg-grid'>
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute -top-24 left-1/4 w-96 h-96 bg-blue-700/15 rounded-full blur-3xl' />
          <div className='absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-700/10 rounded-full blur-3xl' />
        </div>
        <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <Badge className='mb-4 bg-blue-900/50 text-blue-300 border border-blue-700/50 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase'>
            ⚡ Low-cost prompt packs · instant download
          </Badge>
          <h1 className='text-5xl md:text-7xl font-extrabold mb-6 tracking-tight'>
            Buy the exact prompt pack you need — or grab{' '}
            <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
              everything
            </span>
            .
          </h1>
          <p className='text-xl text-slate-400 max-w-3xl mx-auto mb-8'>
            Start with a cheap focused pack for hooks, ads, visuals, strategy, or captions. If you already know you want the full library, the bundle gives you the best value in one click.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500'>
            <span className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-blue-400' /> Instant ZIP Download
            </span>
            <span className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-blue-400' /> Lifetime Access
            </span>
            <span className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-blue-400' /> Free Updates
            </span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className='py-4 border-y border-blue-900/30 bg-[#09121f]/90 sticky top-16 z-40 backdrop-blur-md'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex gap-2 overflow-x-auto pb-1 scrollbar-hide'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                    : 'bg-[#0c1830] text-slate-400 border border-blue-900/40 hover:text-white hover:border-blue-600/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className='py-16 bg-[#08101f]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {filtered.map((pack) => (
              <div
                key={pack.id}
                className={`flex flex-col relative bg-[#0c1830] border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group ${
                  pack.id === 'ultimate-bundle'
                    ? 'border-blue-500/60 shadow-lg shadow-blue-900/30'
                    : 'border-blue-900/40 hover:border-blue-600/50'
                }`}
              >
                {/* Badges */}
                <div className='absolute top-4 right-4 flex flex-col gap-2 z-10'>
                  {pack.popular && (
                    <Badge className='bg-blue-600 text-white border-0 text-xs font-semibold'>
                      🔥 Popular
                    </Badge>
                  )}
                  {pack.new && (
                    <Badge className='bg-emerald-600 text-white border-0 text-xs font-semibold'>
                      ✨ New
                    </Badge>
                  )}
                  {pack.originalPrice && (
                    <Badge className='bg-red-600/80 text-white border-0 text-xs font-semibold'>
                      -{Math.round(((pack.originalPrice - pack.price) / pack.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                {/* Header Band */}
                <div className={`bg-gradient-to-br ${pack.color} p-6 flex items-start gap-4`}>
                  <div className='bg-white/20 rounded-xl p-3 backdrop-blur-sm flex-shrink-0'>
                    {pack.icon}
                  </div>
                  <div>
                    <p className='text-white/70 text-xs font-semibold uppercase tracking-widest mb-1'>
                      {pack.category}
                    </p>
                    <h2 className='text-white font-bold text-lg leading-tight'>
                      {pack.title}
                    </h2>
                  </div>
                </div>

                {/* Body */}
                <div className='p-6 flex flex-col flex-grow'>
                  <p className='text-slate-400 text-sm leading-relaxed mb-4'>
                    {pack.description}
                  </p>

                  {/* Prompt Count */}
                  <div className='flex items-center gap-2 mb-4'>
                    <Download className='h-4 w-4 text-blue-400' />
                    <span className='text-blue-300 font-semibold text-sm'>
                      {pack.promptCount.toLocaleString()} prompts included
                    </span>
                  </div>

                  <div className='mb-4 rounded-xl border border-blue-900/30 bg-[#08101f] px-3 py-2'>
                    <p className='text-xs uppercase tracking-wider text-slate-500 mb-1'>Best for</p>
                    <p className='text-sm text-slate-300'>
                      {pack.id === 'viral-video-pack' && 'Creators who need stronger hooks and faster short-form ideas.'}
                      {pack.id === 'ad-copy-pack' && 'Businesses and marketers who want faster ad testing and sharper offers.'}
                      {pack.id === 'content-strategy-pack' && 'People planning a month of content without starting from scratch.'}
                      {pack.id === 'ai-image-pack' && 'Creators making thumbnails, graphics, and branded AI visuals.'}
                      {pack.id === 'viral-captions-pack' && 'Anyone tired of weak captions, generic hooks, and empty CTA ideas.'}
                      {pack.id === 'ultimate-bundle' && 'Anyone who wants the full library at the best price instead of buying separately.'}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className='flex flex-wrap gap-1.5 mb-5'>
                    {pack.tags.map((tag) => (
                      <span
                        key={tag}
                        className='text-xs px-2.5 py-1 bg-blue-900/20 text-blue-300 rounded-md border border-blue-800/40'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className='space-y-2 mb-6 flex-grow'>
                    {pack.features.map((feat) => (
                      <li key={feat} className='flex items-start gap-2 text-sm text-slate-400'>
                        <CheckCircle className='h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0' />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Stars & Preview */}
                  <div className='flex items-center justify-between mb-5'>
                    <div className='flex items-center gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                      ))}
                      <span className='text-slate-600 text-xs ml-1'>(4.9/5)</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewModal({ open: true, packId: pack.id, packTitle: pack.title })}
                      className='border-blue-700/50 text-blue-300 hover:bg-blue-900/20 hover:text-blue-100 text-xs h-7 px-2 rounded-lg transition-colors'
                    >
                      <Eye className='h-3 w-3 mr-1' />
                      Preview
                    </Button>
                  </div>


                  {/* Savings badge */}
                  {pack.originalPrice && (
                    <div className='mb-4'>
                      <Badge className='bg-green-600/20 text-green-300 border border-green-600/30 text-xs font-semibold py-1'>
                        <Tag className='h-3 w-3 mr-1' />
                        Save ${(pack.originalPrice - pack.price).toFixed(2)} - {Math.round(((pack.originalPrice - pack.price) / pack.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                  )}

                  {/* Price & CTAs */}
                  <div className='flex flex-col mt-auto'>
                    <div className='flex items-baseline gap-2 mb-3'>
                      <span className='text-3xl font-bold text-white'>
                        ${pack.price}
                      </span>
                      {pack.originalPrice && (
                        <span className='text-slate-600 line-through text-sm'>
                          ${pack.originalPrice}
                        </span>
                      )}
                      <span className='text-slate-600 text-xs ml-auto'>One-time</span>
                    </div>

                    <div className='flex flex-row gap-2 w-full'>
                      <Button
                        onClick={() => handlePurchase(pack)}
                        disabled={loadingPack === pack.id}
                        className='flex-1 min-w-0 bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-md shadow-blue-900/40 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed font-semibold'
                      >
                        {loadingPack === pack.id ? (
                          <span className='flex items-center justify-center gap-1 text-xs'>
                            <Loader2 className='h-3 w-3 animate-spin flex-shrink-0' />
                            <span className='truncate'>Wait…</span>
                          </span>
                        ) : (
                          <span className='flex items-center justify-center gap-1 text-xs'>
                            <ShoppingCart className='h-3 w-3 flex-shrink-0' />
                            <span className='truncate'>Buy now</span>
                          </span>
                        )}
                      </Button>
                      <Button
                        onClick={() => handlePurchase(pack)}
                        disabled={loadingPack === pack.id}
                        className='flex-1 min-w-0 bg-[#0070ba] hover:bg-[#005ea6] text-white border-0 shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed font-semibold'
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

      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Trust Section */}
      <section className='py-16 border-t border-blue-900/20 bg-[#09121f]'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold mb-10 text-white text-center'>
            Why Teams Choose{' '}
            <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
              Our Prompt Packs
            </span>
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {[
              { icon: '⚡', title: 'Instant Download', desc: 'Get your ZIP file the moment you purchase. No waiting, no approval process.' },
              { icon: '🔄', title: 'Lifetime Updates', desc: 'As AI evolves, so do our prompts. Every purchase includes all future updates.' },
              { icon: '🔒', title: 'Stripe & PayPal', desc: 'Choose your preferred payment method — both are accepted at every checkout.' },
            ].map((item) => (
              <div key={item.title} className='flex gap-4 bg-[#0c1830] border border-blue-900/30 rounded-2xl p-6 hover:border-blue-700/40 transition-colors'>
                <div className='flex-shrink-0 text-2xl'>{item.icon}</div>
                <div>
                  <h3 className='text-white font-semibold mb-1'>{item.title}</h3>
                  <p className='text-slate-500 text-sm leading-relaxed'>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className='py-24 bg-gradient-to-b from-[#08101f] to-[#060d18] border-t border-blue-900/20 relative overflow-hidden'>
        {/* Background glow */}
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-700/10 rounded-full blur-3xl' />
        </div>
        
        <div className='relative z-10 max-w-2xl mx-auto px-4 text-center'>
          <p className='text-xs font-bold tracking-widest text-blue-400 uppercase mb-4'>
            Best value
          </p>
          <h2 className='text-3xl font-bold mb-4 text-white'>
            Start small or buy the whole system.
          </h2>
          <p className='text-slate-400 mb-6'>
            The Ultimate Bundle gives you <span className="text-white font-semibold">all 5 packs</span> in one download, so if you already know you will use hooks, ads, visuals, captions, and strategy prompts, this is the cheapest path.
          </p>
          
          <div className='flex items-center justify-center gap-4 mb-8'>
            <Badge className='bg-green-600/20 text-green-300 border border-green-600/30 text-sm font-semibold py-1.5 px-3'>
              <Tag className='h-3.5 w-3.5 mr-1' />
              Save $64 vs buying separately
            </Badge>
          </div>
          
          <div className='flex flex-wrap justify-center gap-2 mb-8 text-sm'>
            {packs.filter(p => p.id !== 'ultimate-bundle').map(p => (
              <span 
                key={p.id} 
                className='bg-[#0c1830] border border-blue-800/50 rounded-lg px-3 py-1 text-blue-300 text-xs'
              >
                ✓ {p.title}
              </span>
            ))}
          </div>
          <div className='flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto'>
            <Button
              onClick={() => setPreviewModal({ open: true, packId: 'ultimate-bundle', packTitle: 'Ultimate Creator Bundle' })}
              size='lg'
              variant="outline"
              className='flex-1 border-blue-700/50 text-blue-300 hover:bg-blue-900/20 hover:text-blue-100 font-bold text-base py-6 rounded-xl shadow-xl transition-all duration-200 hover:-translate-y-px disabled:opacity-70 hover:border-blue-500/60'
            >
              <Eye className='mr-2 h-5 w-5' />
              Preview All 855+ Prompts
            </Button>
          </div>
          
          <div className='flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto mt-4'>
            <Button
              onClick={() => handlePurchase(packs.find((p) => p.id === 'ultimate-bundle')!)}
              disabled={loadingPack === 'ultimate-bundle'}
              size='lg'
              className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-bold text-base py-6 rounded-xl shadow-xl shadow-blue-900/40 transition-all duration-200 hover:-translate-y-px hover:shadow-blue-500/30 disabled:opacity-70 border-0'
            >
              {loadingPack === 'ultimate-bundle' ? (
                <><Loader2 className='mr-2 h-5 w-5 animate-spin' />Processing…</>
              ) : (
                <><ShoppingCart className='mr-2 h-5 w-5' />Get The Full Bundle — $10.99</>
              )}
            </Button>
            <Button
              onClick={() => handlePurchase(packs.find((p) => p.id === 'ultimate-bundle')!)}
              disabled={loadingPack === 'ultimate-bundle'}
              size='lg'
              className='flex-1 bg-gradient-to-r from-cyan-600 to-blue-700 hover:opacity-90 text-white font-bold text-base py-6 rounded-xl shadow-xl shadow-cyan-900/40 transition-all duration-200 hover:-translate-y-px disabled:opacity-70 border-0'
            >
              {loadingPack === 'ultimate-bundle' ? (
                <><Loader2 className='mr-2 h-5 w-5 animate-spin' />Processing…</>
              ) : (
                <>PayPal — $10.99</>
              )}
            </Button>
          </div>
          <p className='text-slate-600 text-sm mt-6'>
            <CheckCircle className="h-3.5 w-3.5 text-green-400 inline mr-1" />
            30-day money-back guarantee · Secure checkout · Instant download
          </p>
        </div>
      </section>
    </div>
  )
}

export default PromptStore
