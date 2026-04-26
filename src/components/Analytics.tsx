import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// GA4 Tracking ID - Replace with your actual ID
const GA4_TRACKING_ID = 'G-XXXXXXXXXX'

const Analytics = () => {
  const location = useLocation()

  useEffect(() => {
    // Only initialize if tracking ID is set
    if (!GA4_TRACKING_ID || GA4_TRACKING_ID === 'G-XXXXXXXXXX') {
      console.warn('GA4 Tracking ID not set. Add your ID in Analytics.tsx')
      return
    }

    // Check if gtag is already loaded
    if (window.gtag) return

    // Load GA4 script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_TRACKING_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      // @ts-ignore
      dataLayer.push(arguments)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', GA4_TRACKING_ID, {
      page_path: location.pathname,
    })

    // Track page views on route change
    const handleRouteChange = () => {
      gtag('config', GA4_TRACKING_ID, {
        page_path: location.pathname,
      })
    }

    // Listen for route changes (this is a simplified approach)
    // For more accurate tracking, consider using a router listener
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [location.pathname])

  // Track button clicks and other events
  const trackEvent = (category: string, action: string, label?: string) => {
    if (window.gtag && GA4_TRACKING_ID !== 'G-XXXXXXXXXX') {
      // @ts-ignore
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      })
    }
  }

  // Track purchase events
  const trackPurchase = (packId: string, packTitle: string, price: number) => {
    if (window.gtag && GA4_TRACKING_ID !== 'G-XXXXXXXXXX') {
      // @ts-ignore
      window.gtag('event', 'purchase', {
        transaction_id: `TXN-${Date.now()}`,
        value: price,
        currency: 'USD',
        items: [{
          item_id: packId,
          item_name: packTitle,
          price: price,
        }],
      })
    }
  }

  return null
}

export { trackEvent, trackPurchase }
export default Analytics
