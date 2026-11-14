import { useEffect, useState } from 'react'
import { Fab, Footer, Navbar, Preloader } from './components/Layout'
import Home from './pages/Home'
import Team from './pages/Team'

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname)
    }

    // Intercept internal navigation links so switching between Home and Team
    // happens client-side without reloading the page or re-triggering the Preloader
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }
      const anchor = e.target.closest?.('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return
      }
      const rawHref = anchor.getAttribute('href')
      if (!rawHref || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
        return
      }

      let url
      try {
        url = new URL(rawHref, window.location.origin)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return

      const nextPath = url.pathname.replace(/\/+$/, '') || '/'
      const curPath = window.location.pathname.replace(/\/+$/, '') || '/'

      if (nextPath !== curPath) {
        e.preventDefault()
        window.history.pushState({}, '', url.pathname + url.search + url.hash)
        setPathname(url.pathname)
        if (url.hash) {
          requestAnimationFrame(() => {
            setTimeout(() => {
              const el = document.querySelector(url.hash)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 40)
          })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', onPopState)
      document.removeEventListener('click', onClick)
    }
  }, [])

  const isTeam = pathname.replace(/\/+$/, '') === '/team'

  return (
    <>
      <Preloader />
      <Fab />
      <Navbar />
      {isTeam ? <Team /> : <Home />}
      <Footer />
    </>
  )
}
