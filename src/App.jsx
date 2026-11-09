import { Fab, Footer, Navbar, Preloader } from './components/Layout'
import Home from './pages/Home'
import Team from './pages/Team'

export default function App() {
  const isTeam = window.location.pathname.replace(/\/+$/, '') === '/team'
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
