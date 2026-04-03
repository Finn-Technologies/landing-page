import { useEffect } from 'react'
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

const navigationItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
]

const pageTitles = {
  '/': 'Finn',
  '/explore': 'Finn | Explore',
  '/about': 'Finn | About',
}

function BrandMark() {
  return (
    <img
      className="brand-mark"
      src="/finn-logo.png"
      width="24"
      height="24"
      alt=""
    />
  )
}

function RouteEffects() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = pageTitles[location.pathname] ?? 'Finn'
  }, [location.pathname])

  return null
}

function SiteFrame({ children }) {
  return (
    <div className="app-shell">
      <RouteEffects />

      <header className="site-header">
        <Link className="brand" to="/" aria-label="Finn home">
          <BrandMark />
          <span className="brand-name">Finn</span>
        </Link>

        <nav aria-label="Primary" className="site-nav">
          {navigationItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              className={({ isActive }) =>
                `nav-link${isActive ? ' is-active' : ''}`
              }
              end={end}
              to={to}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="site-main">{children}</main>
    </div>
  )
}

function HomePage() {
  return (
    <section className="page page--hero">
      <div className="page-inner hero-panel">
        <div className="hero-copy">
          <h1 className="hero-title">Explore Finn</h1>
        </div>

        <Link className="pill-link" to="/explore">
          Explore
        </Link>
      </div>
    </section>
  )
}

function ExplorePage() {
  return (
    <section className="page page--copy">
      <div className="page-inner copy-panel">
        <div className="content-stack">
          <h1 className="section-title">Flux</h1>
          <p className="section-subtitle">
            A free, open source local AI assistant built by Finn.
          </p>
          <p className="section-description">
            Flux runs entirely on your device using Bonsai 8B, a 1-bit quantized
            language model that fits in just over 1GB of RAM. No data ever leaves
            your phone. No cloud, no subscriptions, no accounts.
            <br />
            It connects to Wikipedia, Google Maps, and other services only when
            needed, decided automatically by the model. Flux is being built for iOS
            and Android and is designed for people who want a genuinely capable,
            private AI that belongs to them.
          </p>
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="page page--copy">
      <div className="page-inner copy-panel">
        <div className="content-stack">
          <h1 className="section-title">About</h1>
          <p className="section-subtitle">
            Finn is an open source initiative making intentionally designed open
            source software.
          </p>
          <p className="section-description">
            We care about building tools that feel clear, thoughtful, and genuinely
            useful. Finn exists to prove open source software can be both practical
            and intentionally crafted from the first interaction onward.
          </p>
          <a
            className="pill-link"
            href="https://x.com/finn_org"
            target="_blank"
            rel="noreferrer"
          >
            Follow @finn_org on X
          </a>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SiteFrame>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/donate" element={<Navigate replace to="/about" />} />
          <Route path="/flux" element={<Navigate replace to="/explore" />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </SiteFrame>
    </BrowserRouter>
  )
}

export default App
