import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, X, CheckCircle, Gift } from 'lucide-react'
import { toast } from 'sonner'

interface EmailCaptureProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  incentive?: string
}

const EmailCapture = ({ 
  isOpen, 
  onClose, 
  title = 'Get Free Prompts',
  subtitle = 'Join 1,000+ creators and get exclusive prompts delivered to your inbox',
  incentive = 'FREE: 10 Premium Prompts'
}: EmailCaptureProps) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setEmail('')
      setIsSubmitting(false)
      setIsSuccess(false)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      // In production, replace this with your actual API endpoint
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // TODO: Integrate with your email service (Mailchimp, ConvertKit, etc.)
      // Example:
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      
      setIsSuccess(true)
      toast.success('Thank you! Check your email for your free prompts.')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in'
      onClick={onClose}
    >
      <div 
        className='bg-[#0c1830] border border-blue-700 rounded-2xl max-w-md w-full shadow-2xl shadow-blue-900/50'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 z-10'
          aria-label='Close'
        >
          <X className='h-5 w-5' />
        </button>

        <div className='p-8'>
          {/* Success state */}
          {isSuccess ? (
            <div className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 mb-6'>
                <CheckCircle className='h-8 w-8 text-green-400' />
              </div>
              <h3 className='text-2xl font-bold text-white mb-2'>You're In!</h3>
              <p className='text-slate-400 mb-6'>
                Check your email for your free premium prompts. We've also sent you a special welcome gift!
              </p>
              <Button 
                onClick={onClose}
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold w-full py-6 rounded-xl'
              >
                Continue to Store
              </Button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className='text-center mb-6'>
                <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4 shadow-lg shadow-blue-500/30'>
                  <Gift className='h-8 w-8 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-white'>{title}</h3>
                <p className='text-slate-400 text-sm mt-1'>{subtitle}</p>
                <div className='mt-3'>
                  <span className='bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent text-xs font-bold uppercase tracking-wider'>
                    {incentive}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='relative'>
                  <Mail className='h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500' />
                  <Input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    className='bg-[#08101f] border border-blue-800/50 text-white placeholder:text-slate-500 pl-12 py-6 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    required
                  />
                </div>
                <Button 
                  type='submit'
                  disabled={isSubmitting || !email.includes('@')}
                  className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white font-bold py-6 rounded-xl shadow-lg shadow-blue-900/40 transition-all hover:shadow-blue-500/30'
                >
                  {isSubmitting ? (
                    <>
                      <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2' />
                      Sending…
                    </>
                  ) : (
                    'Send Me My Free Prompts'
                  )}
                </Button>
              </form>

              {/* Disclaimer */}
              <p className='text-center text-slate-600 text-xs mt-4'>
                We respect your privacy. No spam, ever. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailCapture
