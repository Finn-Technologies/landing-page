import { useEffect, useRef, useState } from 'react'
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
  { to: '/flux', label: 'Flux' },
  { to: '/about', label: 'About' },
]

const pageTitles = {
  '/': 'Finn — AI that stays on your device',
  '/flux': 'Flux — On-Device AI Chat by Finn',
  '/about': 'About — Finn',
}

// ─── Scroll Reveal Hook ────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Route Effects ─────────────────────────────────────
function RouteEffects() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = pageTitles[location.pathname] ?? 'Finn'
  }, [location.pathname])
  return null
}

// ─── Icons ─────────────────────────────────────────────
function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 5h14M3 10h14M3 15h14" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M5 5l10 10M15 5l-10 10" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3l5 5-5 5" />
    </svg>
  )
}

function BackArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3l-5 5 5 5" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10l3 3 7-7" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" />
      <path d="M2 10h16M10 2a15 15 0 010 16 15 15 0 010-16z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2l7 3v6a7 7 0 01-7 5 7 7 0 01-7-5V5l7-3z" />
    </svg>
  )
}

function CpuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="12" height="12" rx="2" />
      <path d="M8 1v3M12 1v3M8 16v3M12 16v3M1 8h3M1 12h3M16 8h3M16 12h3" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 17l-1.5-1.4C4.5 11.8 2 9.5 2 6.7 2 4.4 3.8 2.5 6 2.5c1.4 0 2.8.7 4 1.8 1.2-1.1 2.6-1.8 4-1.8 2.2 0 4 2 4 4.2 0 2.8-2.5 5.1-6.5 8.9L10 17z" />
    </svg>
  )
}

function ZapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

// ─── Site Frame ────────────────────────────────────────
function SiteFrame({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="app-shell">
      <RouteEffects />
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}${isMenuOpen ? ' is-menu-open' : ''}`}>
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="Finn home">
            <img className="brand-logo" src="/finn-logo.png" width="28" height="28" alt="" />
            <span className="brand-name">Finn</span>
          </Link>
          <nav className="site-nav" id="site-nav">
            {navigationItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                end={end}
                onClick={() => setIsMenuOpen(false)}
                to={to}
              >
                {label}
              </NavLink>
            ))}
            <a className="nav-gh-button" href="https://github.com/Finn-Technologies" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>GitHub</span>
            </a>
          </nav>
          <button
            aria-controls="site-nav"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="site-nav-toggle"
            onClick={() => setIsMenuOpen(o => !o)}
            type="button"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <SiteFooter />
    </div>
  )
}

// ─── Home Page ─────────────────────────────────────────
function HomePage() {
  useScrollReveal()

  return (
    <div className="home-page">
      {/* ─── Hero ─── */}
      <section className="hero-section">
        <div className="hero-glow-bg" aria-hidden="true">
          <div className="hero-glow-blob" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Open Source
          </div>
          <h1 className="hero-title">
            AI that respects{' '}
            <span className="gradient-text">your privacy</span>
          </h1>
          <p className="hero-description">
            Finn builds open source AI tools that run entirely on your device — no internet, no cloud, no tracking. Your data stays yours.
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="https://github.com/Finn-Technologies" target="_blank" rel="noreferrer">
              Explore on GitHub
            </a>
            <Link className="btn btn--ghost" to="/flux">
              Discover Flux <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="stats-section">
        <div className="section-inner">
          <div className="stats-grid">
            <div className="stat-card reveal">
              <span className="stat-value">100%</span>
              <span className="stat-label">On-Device</span>
            </div>
            <div className="stat-card reveal" style={{ transitionDelay: '100ms' }}>
              <span className="stat-value">Zero</span>
              <span className="stat-label">Data Collection</span>
            </div>
            <div className="stat-card reveal" style={{ transitionDelay: '200ms' }}>
              <span className="stat-value">Free</span>
              <span className="stat-label">Forever</span>
            </div>
            <div className="stat-card reveal" style={{ transitionDelay: '300ms' }}>
              <span className="stat-value">Open</span>
              <span className="stat-label">Source</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="features-section">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Why Finn</div>
            <h2 className="section-heading">Built differently.</h2>
          </div>
          <div className="features-grid">
            {[
              { icon: <CpuIcon />, title: 'Runs Offline', desc: 'Use our tools on a plane, in the subway, or deep in the mountains. No signal needed.' },
              { icon: <ShieldIcon />, title: '100% Private', desc: 'Your conversations never leave your device. No data collection. No cloud servers.' },
              { icon: <GlobeIcon />, title: 'Open Source', desc: 'Built transparently for everyone. Inspect the code, fork it, make it better.' },
              { icon: <HeartIcon />, title: 'Free Forever', desc: 'No subscriptions. No premium tiers. No paywalls. Completely free, always.' },
            ].map((f, i) => (
              <div key={i} className="feature-card reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-section">
        <div className="cta-inner reveal">
          <h2 className="cta-title">Ready to take control?</h2>
          <p className="cta-desc">
            Join thousands who have switched to private, on-device AI. No accounts, no tracking, no compromises.
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="https://github.com/Finn-Technologies" target="_blank" rel="noreferrer">
              Get Started
            </a>
            <Link className="btn btn--ghost" to="/about">
              Learn More <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Flux Page ─────────────────────────────────────────
function FluxPage() {
  useScrollReveal()
  const features = [
    { title: 'Fully Offline', desc: 'Flux runs entirely on your device using llama.cpp. No internet connection required — ever.' },
    { title: 'Private by Design', desc: 'Your conversations stay on your phone. No accounts, no cloud sync, no data collection of any kind.' },
    { title: 'Multiple Models', desc: 'Choose from three tiers — Lite, Steady, or Smart — depending on your device and needs.' },
    { title: 'Open Source', desc: 'Built with Flutter and Riverpod. The entire source is on GitHub for inspection, forking, and contribution.' },
    { title: 'Cross-Platform', desc: 'Works on Android, iOS, and desktop. One codebase, same experience everywhere.' },
    { title: 'No Paywalls', desc: 'No subscriptions, no premium features, no ads. Flux is free now and always.' },
  ]

  const models = [
    { name: 'Flux Lite', size: '500 MB', ram: '4 GB RAM', desc: 'Quick answers on older devices', popular: false, features: ['Fast responses', 'Low memory', 'Basic reasoning'] },
    { name: 'Flux Steady', size: '1.3 GB', ram: '6 GB RAM', desc: 'Daily tasks, balanced performance', popular: true, features: ['Strong reasoning', 'Good memory', 'Balanced speed'] },
    { name: 'Flux Smart', size: '2.6 GB', ram: '8 GB+ RAM', desc: 'Maximum capability', popular: false, features: ['Expert reasoning', 'Creative writing', 'Deep analysis'] },
  ]

  return (
    <div className="simple-page">
      <section className="page-hero">
        <div className="section-inner">
          <div className="page-hero-content">
            <Link to="/" className="back-link"><BackArrowIcon /> Back</Link>
            <h1 className="page-title">Flux</h1>
            <p className="page-subtitle">Your AI chat app. Works offline. Stays local.</p>
            <div className="hero-actions" style={{ marginTop: 32 }}>
              <a className="btn btn--primary" href="https://github.com/Finn-Technologies/flux" target="_blank" rel="noreferrer">Download on GitHub</a>
              <a className="btn btn--ghost" href="https://github.com/Finn-Technologies/flux/releases" target="_blank" rel="noreferrer">Latest Release <ArrowIcon /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-inner">
          <div className="feature-grid-full">
            {features.map((f, i) => (
              <div key={i} className="detail-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="detail-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="detail-title">{f.title}</h3>
                <p className="detail-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Model Tiers (moved to Flux page) ─── */}
      <section className="features-section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Choose your model</div>
            <h2 className="section-heading">Three sizes, one experience.</h2>
          </div>
          <div className="models-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {models.map((m, i) => (
              <div key={i} className={`model-card reveal${m.popular ? ' is-popular' : ''}`} style={{ transitionDelay: `${i * 100}ms`, position: 'relative', padding: '32px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {m.popular && <div className="model-badge" style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', padding: '4px 14px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'linear-gradient(135deg, var(--green-from), var(--green-to))', color: 'var(--black-accent)', borderRadius: '999px' }}>Most Used</div>}
                <div className="model-name" style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--black-accent)' }}>{m.name}</div>
                <div className="model-spec" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{m.size} · {m.ram}</div>
                <p className="model-desc" style={{ fontSize: '14px', color: 'var(--text-soft)', lineHeight: 1.45 }}>{m.desc}</p>
                <ul className="model-features" style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0 16px' }}>
                  {m.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}><CheckIcon /> {f}</li>
                  ))}
                </ul>
                <a className="btn btn--primary btn--sm" href="https://github.com/Finn-Technologies/flux" target="_blank" rel="noreferrer">
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── About Page ────────────────────────────────────────
function AboutPage() {
  return (
    <div className="simple-page">
      <section className="page-hero">
        <div className="section-inner">
          <div className="page-hero-content">
            <Link to="/" className="back-link"><BackArrowIcon /> Back</Link>
            <h1 className="page-title">About Finn</h1>
            <p className="page-subtitle">
              An open source initiative making intentionally designed, privacy-first software.
            </p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-inner">
          <div className="about-content">
            <p className="about-text">
              We care about building tools that feel clear, thoughtful, and genuinely useful.
              Finn exists to prove that open source software can be both practical and
              intentionally crafted — from the first interaction onward.
            </p>
            <p className="about-text">
              Every product we build runs entirely on-device. No cloud dependency. No data collection.
              No tracking. Just software that does what it says and respects your privacy by design.
            </p>
            <div className="about-links">
              <a className="btn btn--primary" href="https://x.com/finn_org" target="_blank" rel="noreferrer">Follow on X</a>
              <a className="btn btn--ghost" href="https://github.com/Finn-Technologies" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Footer ────────────────────────────────────────────
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img className="brand-logo" src="/finn-logo.png" width="24" height="24" alt="" />
          <span>Finn</span>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/flux">Flux</Link>
          <Link to="/about">About</Link>
          <a href="https://github.com/Finn-Technologies" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://x.com/finn_org" target="_blank" rel="noreferrer">X</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Finn Technologies. Open source and free.</p>
      </div>
    </footer>
  )
}

// ─── App ───────────────────────────────────────────────
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
