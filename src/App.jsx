import { useEffect, useState } from 'react'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="app-shell">
      <RouteEffects />

      <header className={`site-header${isMenuOpen ? ' is-menu-open' : ''}`}>
        <div className="site-header-row">
          <Link className="brand" to="/" aria-label="Finn home">
            <BrandMark />
            <span className="brand-name">Finn</span>
          </Link>

          <button
            aria-controls="site-nav"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="site-nav-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            <span className="site-nav-toggle-text">Menu</span>
            <span className="site-nav-toggle-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>

        <div className="site-nav-shell">
          <div className="site-nav-panel">
            <nav aria-label="Primary" className="site-nav" id="site-nav">
              {navigationItems.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' is-active' : ''}`
                  }
                  end={end}
                  onClick={() => setIsMenuOpen(false)}
                  to={to}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
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
            Flux runs entirely on your device using Qwen 3.5, a local language
            model. No data ever leaves your phone. No cloud, no subscriptions, no
            accounts.
          </p>

          <div className="model-tiers">
            <div className="model-tier">
              <span className="model-tier-name">Flux Lite</span>
              <span className="model-tier-spec">500 MB · 4 GB RAM</span>
              <span className="model-tier-desc">Quick answers, older devices</span>
            </div>
            <div className="model-tier">
              <span className="model-tier-name">Flux Steady</span>
              <span className="model-tier-spec">1.3 GB · 6 GB RAM</span>
              <span className="model-tier-desc">Daily tasks, balanced use</span>
            </div>
            <div className="model-tier">
              <span className="model-tier-name">Flux Smart</span>
              <span className="model-tier-spec">2.6 GB · 8 GB+ RAM</span>
              <span className="model-tier-desc">Maximum capability</span>
            </div>
          </div>

          <a
            className="pill-link"
            href="https://github.com/Finn-Technologies/flux"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
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
