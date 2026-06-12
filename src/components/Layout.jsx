import WcCountdownBar from './WcCountdownBar.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import VignetteAd from './VignetteAd.jsx'

export default function Layout({ children, withWcBar = false, bare = false }) {
  // bare = internal pages with no chrome (header/footer) and no ads.
  if (bare) return <>{children}</>

  return (
    <>
      {withWcBar && <WcCountdownBar />}
      <Header withWcBar={withWcBar} />
      {children}
      <Footer />
      <VignetteAd />
    </>
  )
}
