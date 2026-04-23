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
    <div className="home-page">
      {/* Hero Section */}
      <section className="page page--hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your AI chat app.
              <br />
              Works offline.
            </h1>
            <p className="hero-description">
              Chat with AI anywhere — on a plane, in the subway, or somewhere with no signal. Your conversations never leave your device.
            </p>
            <div className="hero-actions">
              <a
                className="pill-link pill-link--primary"
                href="https://github.com/Finn-Technologies/flux"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
              <a
                className="pill-link pill-link--secondary"
                href="/flux"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FluxPage() {
  return (
    <section className="page page--copy">
      <div className="page-inner copy-panel">
        <div className="content-stack">
          <h1 className="section-title">Flux</h1>
          <p className="section-subtitle">
            Your AI chat app. Works offline. Stays local.
          </p>
          <p className="section-description">
            Flux is a free, open source AI chat app that runs entirely on your device. 
            No internet required. No cloud. No account. No data ever leaves your phone.
          </p>

          <div className="flux-features">
            <div className="flux-feature">
              <h3 className="flux-feature-title">Works Offline</h3>
              <p className="flux-feature-desc">
                Use Flux on a plane, in the subway, or anywhere without signal. Your AI assistant works wherever you are.
              </p>
            </div>
            <div className="flux-feature">
              <h3 className="flux-feature-title">100% Private</h3>
              <p className="flux-feature-desc">
                Your conversations never leave your device. No data collection. No cloud servers. No tracking.
              </p>
            </div>
            <div className="flux-feature">
              <h3 className="flux-feature-title">Open Source</h3>
              <p className="flux-feature-desc">
                Built by Finn. Powered by Qwen. Inspect the code, run it yourself, make it better.
              </p>
            </div>
            <div className="flux-feature">
              <h3 className="flux-feature-title">Free Forever</h3>
              <p className="flux-feature-desc">
                No subscriptions. No premium features. No paywalls. Completely free, now and always.
              </p>
            </div>
          </div>

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

          <div className="flux-tech">
            <h2 className="flux-tech-title">Built with</h2>
            <div className="flux-tech-grid">
              <span className="flux-tech-item">Flutter</span>
              <span className="flux-tech-item">Qwen 3.5</span>
              <span className="flux-tech-item">MLX</span>
              <span className="flux-tech-item">llama.cpp</span>
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
          <Route path="/flux" element={<FluxPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/donate" element={<Navigate replace to="/about" />} />
          <Route path="/explore" element={<Navigate replace to="/flux" />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </SiteFrame>
    </BrowserRouter>
  )
}

export default App
