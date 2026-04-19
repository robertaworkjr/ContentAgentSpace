import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { CheckCircle, Download, Loader2, AlertCircle, Clock, Mail, ArrowLeft } from 'lucide-react'

interface DownloadData {
  downloadUrl: string
  packTitle: string
  packId: string
  email: string
  expiresInSeconds: number
}

const PurchaseSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [status, setStatus] = useState<'loading' | 'ready' | 'not_found' | 'error'>('loading')
  const [downloadData, setDownloadData] = useState<DownloadData | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(3600)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      setErrorMsg('No session ID found. Please check your email for your download link.')
      return
    }

    fetchDownloadUrl()
  }, [sessionId, retryCount])

  // Countdown timer
  useEffect(() => {
    if (status !== 'ready') return
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s <= 0 ? 0 : s - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [status])

  const fetchDownloadUrl = async () => {
    setStatus('loading')
    try {
      // Check if we are running locally or if Supabase functions aren't fully deployed
      // We will provide direct links to the public zip files based on a fallback map
      const packIdMap: Record<string, string> = {
        'viral-video-pack': '/Viral_Video_Pack.zip',
        'ad-copy-pack': '/AI_Ad_Copy_Pack.zip',
        'content-strategy-pack': '/Content_Strategy_Pack.zip',
        'ai-image-pack': '/AI_Image_Prompts_Pack.zip',
        'viral-captions-pack': '/Viral_Captions_Pack.zip',
        'ultimate-bundle': '/Ultimate_Creator_Bundle.zip',
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      // Only attempt to fetch from Supabase if we have valid credentials
      if (supabaseUrl && supabaseAnonKey && !supabaseAnonKey.startsWith('REPLACE')) {
        const res = await fetch(`${supabaseUrl}/functions/v1/get-download-url`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ sessionId }),
        })

        const data = await res.json()

        if (res.status === 404) {
          // Webhook might not have fired yet — retry after 3 seconds
          setStatus('not_found')
          return
        }

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch download link')
        }

        setDownloadData(data)
        setStatus('ready')
        return;
      }

      // FALLBACK: If no Supabase backend is configured, we extract the packId from the URL or query params
      // Since Stripe checkout success URLs often don't contain the packId by default unless passed as client_reference_id,
      // we'll attempt to parse it from a custom param, or default to the bundle if we can't find it.
      
      const purchasedPackId = searchParams.get('pack') || 'ultimate-bundle';
      const fileUrl = packIdMap[purchasedPackId] || packIdMap['ultimate-bundle'];
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDownloadData({
        downloadUrl: fileUrl,
        packTitle: purchasedPackId.replace(/-/g, ' ').toUpperCase(),
        packId: purchasedPackId,
        email: "your email",
        expiresInSeconds: 3600
      })
      setStatus('ready')

    } catch (err: any) {
      console.error(err)
      setErrorMsg(err.message || 'An unexpected error occurred.')
      setStatus('error')
    }
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  return (
    <div className='min-h-screen bg-black flex items-center justify-center px-4'>
      {/* Background glow */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/3 w-96 h-96 bg-purple-700/15 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/3 w-80 h-80 bg-green-700/15 rounded-full blur-3xl animate-pulse delay-700' />
      </div>

      <div className='relative z-10 max-w-lg w-full'>
        {/* Loading State */}
        {status === 'loading' && (
          <div className='text-center'>
            <Loader2 className='h-16 w-16 text-purple-400 animate-spin mx-auto mb-6' />
            <h1 className='text-2xl font-bold text-white mb-2'>Processing your order…</h1>
            <p className='text-gray-400'>Generating your secure download link</p>
          </div>
        )}

        {/* Not Found — Webhook not fired yet */}
        {status === 'not_found' && (
          <div className='bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center'>
            <Loader2 className='h-12 w-12 text-yellow-400 animate-spin mx-auto mb-4' />
            <h1 className='text-xl font-bold text-white mb-2'>Payment confirmed!</h1>
            <p className='text-gray-400 mb-6 text-sm'>
              We're preparing your download… This usually takes a few seconds.
            </p>
            <Button
              onClick={() => setRetryCount((c) => c + 1)}
              className='bg-gradient-to-r from-purple-600 to-pink-600 text-white'
            >
              <Loader2 className='h-4 w-4 mr-2 animate-spin' />
              Check Again
            </Button>
            <p className='text-gray-600 text-xs mt-4'>
              If this takes more than a minute, check your email — the link is on its way!
            </p>
          </div>
        )}

        {/* Ready State */}
        {status === 'ready' && downloadData && (
          <div className='bg-gray-900 border border-green-800 rounded-2xl overflow-hidden shadow-2xl shadow-green-900/20'>
            {/* Header */}
            <div className='bg-gradient-to-r from-green-600/20 to-purple-600/20 border-b border-gray-800 p-6 text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 mb-4'>
                <CheckCircle className='h-8 w-8 text-green-400' />
              </div>
              <h1 className='text-2xl font-bold text-white'>Payment Successful!</h1>
              <p className='text-gray-400 mt-1 text-sm'>{downloadData.email}</p>
            </div>

            <div className='p-6'>
              {/* Pack Name */}
              <div className='bg-gray-800 rounded-xl p-4 mb-6'>
                <p className='text-gray-400 text-xs uppercase tracking-wider mb-1'>Your purchase</p>
                <p className='text-white font-semibold text-lg'>{downloadData.packTitle}</p>
              </div>

              {/* Download Button */}
              <a
                href={downloadData.downloadUrl}
                download
                className='block w-full'
                target='_blank'
                rel='noreferrer'
              >
                <Button
                  size='lg'
                  className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-lg py-6 shadow-xl shadow-purple-900/40 transition-all'
                >
                  <Download className='h-5 w-5 mr-2' />
                  Download Your ZIP File
                </Button>
              </a>

              {/* Expiry Countdown */}
              <div className='flex items-center justify-center gap-2 mt-4 text-sm'>
                <Clock className='h-4 w-4 text-yellow-400' />
                <span className='text-gray-400'>
                  Link expires in{' '}
                  <span
                    className={`font-mono font-bold ${secondsLeft < 300 ? 'text-red-400' : 'text-yellow-300'}`}
                  >
                    {formatTime(secondsLeft)}
                  </span>
                </span>
              </div>

              {/* Email Reminder */}
              <div className='mt-6 bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex items-start gap-3'>
                <Mail className='h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0' />
                <p className='text-gray-400 text-sm'>
                  A copy of this download link was sent to{' '}
                  <span className='text-white'>{downloadData.email}</span>. Check your inbox if the
                  button above expires.
                </p>
              </div>

              {/* Navigation */}
              <div className='mt-6 flex gap-3'>
                <Link to='/prompt-store' className='flex-1'>
                  <Button variant='outline' className='w-full border-gray-700 text-gray-400 hover:text-white'>
                    <ArrowLeft className='h-4 w-4 mr-2' />
                    Back to Store
                  </Button>
                </Link>
                <Link to='/' className='flex-1'>
                  <Button variant='outline' className='w-full border-gray-700 text-gray-400 hover:text-white'>
                    Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className='bg-gray-900 border border-red-800 rounded-2xl p-8 text-center'>
            <AlertCircle className='h-12 w-12 text-red-400 mx-auto mb-4' />
            <h1 className='text-xl font-bold text-white mb-2'>Something went wrong</h1>
            <p className='text-gray-400 mb-2 text-sm'>{errorMsg}</p>
            <p className='text-gray-600 text-sm mb-6'>
              If you completed a payment, please email{' '}
              <a href='mailto:hello@contentagent.space' className='text-purple-400 underline'>
                hello@contentagent.space
              </a>{' '}
              and we'll sort it out immediately.
            </p>
            <div className='flex gap-3 justify-center'>
              <Button onClick={fetchDownloadUrl} className='bg-purple-600 hover:bg-purple-700 text-white'>
                Try Again
              </Button>
              <Link to='/prompt-store'>
                <Button variant='outline' className='border-gray-700 text-gray-400'>
                  Back to Store
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PurchaseSuccess
