import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { XCircle, ShoppingCart, ArrowLeft } from 'lucide-react'

const PurchaseCancel = () => {
  return (
    <div className='min-h-screen bg-black flex items-center justify-center px-4'>
      {/* Background glow */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/3 left-1/3 w-96 h-96 bg-red-900/10 rounded-full blur-3xl' />
        <div className='absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl' />
      </div>

      <div className='relative z-10 max-w-md w-full'>
        <div className='bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-800 p-8 text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 mb-4'>
              <XCircle className='h-8 w-8 text-red-400' />
            </div>
            <h1 className='text-2xl font-bold text-white mb-2'>Payment Cancelled</h1>
            <p className='text-gray-400 text-sm'>
              No worries — your card was not charged.
            </p>
          </div>

          <div className='p-6 text-center'>
            <p className='text-gray-400 mb-8 text-sm leading-relaxed'>
              Changed your mind? You can return to the store and complete your purchase at any time.
              Your selected pack will still be there waiting for you.
            </p>

            <div className='flex flex-col sm:flex-row gap-3'>
              <Link to='/prompt-store' className='flex-1'>
                <Button
                  size='lg'
                  className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white'
                >
                  <ShoppingCart className='h-4 w-4 mr-2' />
                  Return to Store
                </Button>
              </Link>
              <Link to='/' className='flex-1'>
                <Button
                  size='lg'
                  variant='outline'
                  className='w-full border-gray-700 text-gray-400 hover:text-white'
                >
                  <ArrowLeft className='h-4 w-4 mr-2' />
                  Go Home
                </Button>
              </Link>
            </div>

            <p className='text-gray-700 text-xs mt-6'>
              Questions? Contact us at{' '}
              <a href='mailto:hello@contentagent.space' className='text-purple-500 hover:underline'>
                hello@contentagent.space
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseCancel
