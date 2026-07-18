import { useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'

const links = {
  github: 'https://github.com/Finn-Technologies',
  x: 'https://x.com/finn_org',
  flux: 'https://github.com/Finn-Technologies/flux',
  fluxReleases: 'https://github.com/Finn-Technologies/flux/releases',
  finnos: 'https://github.com/Finn-Technologies/FinnOS',
}

const progress = [
  { title: 'Starts', detail: 'Boots reliably on real architectures.', state: 'complete', label: 'Working' },
  { title: 'Controls memory', detail: 'Owns paging, allocation and its address space.', state: 'complete', label: 'Working' },
  { title: 'Responds & keeps time', detail: 'Interrupts and scheduling are being brought online.', state: 'current', label: 'Building now' },
  { title: 'Runs apps', detail: 'Userspace, storage and networking come next.', state: 'future', label: 'Next' },
  { title: 'Becomes everyday', detail: 'A useful, calm graphical system.', state: 'future', label: 'Later' },
]

const pageTitles = {
  '/': 'Finn — Open software, made for people',
  '/flux': 'Flux — Your AI, on your phone',
  '/finnos': 'FinnOS — An operating system, built in the open',
}

function usePageEffects() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = pageTitles[location.pathname] ?? 'Finn'

    const nodes = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.dataset.visible = 'true'
      }),
      { threshold: 0.12 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [location.pathname])
}

function SiteFrame({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  usePageEffects()

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="Finn home">
          <img src="/finn-logo.png" alt="" width="19" height="19" />
          <span>Finn</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <nav id="primary-navigation" className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Primary navigation">
          <NavLink to="/flux" onClick={closeMenu}>Flux</NavLink>
          <NavLink to="/finnos" onClick={closeMenu}>FinnOS</NavLink>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={links.x} target="_blank" rel="noreferrer">X</a>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <Link className="brand brand--footer" to="/" aria-label="Finn home">
          <img src="/finn-logo.png" alt="" width="18" height="18" />
          <span>Finn</span>
        </Link>
        <p>Open software, made with care.</p>
        <p>© {new Date().getFullYear()} Finn</p>
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-inner" data-reveal>
          <p className="eyebrow">Open software, made for people</p>
          <h1>Technology that<br />feels like yours.</h1>
          <p className="hero-copy">
            Finn is an independent open-source studio building personal technology from the foundations up.
          </p>
          <a className="text-link" href="#about">Who we are</a>
        </div>
      </section>

      <section className="intro section" id="about">
        <div className="section-grid" data-reveal>
          <p className="section-label">Who we are</p>
          <div className="statement-stack">
            <p className="intro-statement">We think technology should belong to the people using it.</p>
            <p className="section-copy">
              So we build in the open, stay close to the device and make software that can be understood, changed and trusted. Finn is small by design and ambitious about what personal technology can become.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-grid" data-reveal>
          <p className="section-label">How we work</p>
          <ol className="principles-list">
            <li><span>01</span><div><h2>Open by default.</h2><p>The work, decisions and progress are there to see.</p></div></li>
            <li><span>02</span><div><h2>Close to your device.</h2><p>Personal software should feel local, direct and under your control.</p></div></li>
            <li><span>03</span><div><h2>Built from first principles.</h2><p>We are willing to start lower down when the foundations matter.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section" id="work">
        <div className="section-grid" data-reveal>
          <p className="section-label">What we make</p>
          <div className="product-index">
            <Link to="/flux">
              <div><p className="product-name">Flux</p><p>An open-source AI assistant that works on Android.</p></div>
              <span>Explore</span>
            </Link>
            <Link to="/finnos">
              <div><p className="product-name">FinnOS</p><p>A new operating system, growing from zero in the open.</p></div>
              <span>Explore</span>
            </Link>
          </div>
        </div>
      </section>

      <Closing eyebrow="Built quietly. Shared openly." title="See where Finn goes next." />
    </>
  )
}

function FluxPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner" data-reveal>
          <p className="eyebrow">Flux by Finn</p>
          <h1>Your AI,<br />on your phone.</h1>
          <p>Open source. Designed for Android. Made to keep personal intelligence personal.</p>
          <div className="link-row link-row--center">
            <a className="text-link" href={links.fluxReleases} target="_blank" rel="noreferrer">Get Flux</a>
            <a className="muted-link" href={links.flux} target="_blank" rel="noreferrer">View source</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-grid" data-reveal>
          <div>
            <p className="section-label">A closer assistant</p>
            <p className="status"><span aria-hidden="true" />Available on Android</p>
          </div>
          <div className="statement-stack">
            <p className="intro-statement">Intelligence that lives where you do.</p>
            <p className="section-copy">Flux brings conversational AI to your own device. Ask questions, understand images and create while keeping the experience direct, portable and yours to inspect.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-grid" data-reveal>
          <p className="section-label">What it can do</p>
          <div className="feature-list">
            <article><p>01</p><h2>Talk naturally.</h2><span>Use local models for everyday conversation and thinking.</span></article>
            <article><p>02</p><h2>See with you.</h2><span>Bring images into the conversation when words are not enough.</span></article>
            <article><p>03</p><h2>Reach further.</h2><span>Choose web search when you want current information beyond the device.</span></article>
          </div>
        </div>
      </section>

      <section className="closing section">
        <div className="closing-inner" data-reveal>
          <p className="eyebrow">Your device. Your choice.</p>
          <h2>Try Flux on Android.</h2>
          <div className="link-row link-row--center">
            <a className="text-link" href={links.fluxReleases} target="_blank" rel="noreferrer">Download</a>
            <a className="muted-link" href={links.flux} target="_blank" rel="noreferrer">Read the code</a>
          </div>
        </div>
      </section>
    </>
  )
}

function FinnOSPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner" data-reveal>
          <p className="eyebrow">FinnOS by Finn</p>
          <h1>An operating system,<br />built in the open.</h1>
          <p>A new system taking shape from its first instruction to, one day, the things people use every day.</p>
          <a className="text-link" href={links.finnos} target="_blank" rel="noreferrer">Follow the build</a>
        </div>
      </section>

      <section className="section">
        <div className="section-grid" data-reveal>
          <div>
            <p className="section-label">Where it is today</p>
            <p className="status status--building"><span aria-hidden="true" />In active development</p>
          </div>
          <div className="statement-stack">
            <p className="intro-statement">The foundations are becoming a system.</p>
            <p className="section-copy">FinnOS can already start on two kinds of computers and control its own memory. The next work is teaching it to respond, keep time and run more than one thing. It is early, useful mostly to builders, and progressing in public.</p>
          </div>
        </div>

        <div className="progress-wrap" data-reveal>
          <p className="progress-heading">The road to an everyday OS</p>
          <ol className="progress-list">
            {progress.map((item, index) => (
              <li className={`progress-item progress-item--${item.state}`} key={item.title}>
                <span className="progress-dot" aria-hidden="true">{item.state === 'complete' ? '✓' : index + 1}</span>
                <div>
                  <span className="progress-state">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <details className="technical-details" data-reveal>
          <summary>
            <span>For the technically curious</span>
            <span className="technical-summary-note">Architecture status and verified subsystems</span>
          </summary>
          <div className="technical-content">
            <article className="technical-architecture">
              <div className="technical-title-row">
                <div><p className="technical-kicker">Architecture</p><h3>x86-64</h3></div>
                <span className="technical-badge">Level 0 verified</span>
              </div>
              <p>The x86-64 path reaches a stable early kernel environment and can keep several cooperative ring-0 tasks moving.</p>
              <ul>
                <li>Boot and normalized architecture handoff</li>
                <li>Physical memory, paging and kernel heap</li>
                <li>xAPIC timer running at 100 Hz</li>
                <li>Cooperative kernel task scheduling</li>
                <li>Framebuffer diagnostics and idle path</li>
              </ul>
            </article>
            <article className="technical-architecture">
              <div className="technical-title-row">
                <div><p className="technical-kicker">Architecture</p><h3>ARM64</h3></div>
                <span className="technical-badge technical-badge--active">Active work</span>
              </div>
              <p>The ARM64 path owns its early memory environment and has verified exception and translation-table foundations locally.</p>
              <ul>
                <li>Integrated serial boot and hardened handoff</li>
                <li>Exception vectors and fault probes</li>
                <li>Physical memory allocator</li>
                <li>Owned TTBR0 four-level page tables</li>
                <li>GIC interrupt-controller work in progress</li>
              </ul>
            </article>
            <div className="technical-note">
              <span>Not here yet</span>
              <p>FinnOS remains experimental. Userspace, storage, networking and a graphical shell have not been built yet.</p>
            </div>
          </div>
        </details>
      </section>

      <section className="closing section">
        <div className="closing-inner" data-reveal>
          <p className="eyebrow">The work is the story.</p>
          <h2>Watch FinnOS grow.</h2>
          <a className="text-link" href={links.finnos} target="_blank" rel="noreferrer">Open the repository</a>
        </div>
      </section>
    </>
  )
}

function Closing({ eyebrow, title }) {
  return (
    <section className="closing section">
      <div className="closing-inner" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="link-row link-row--center">
          <a className="text-link" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="muted-link" href={links.x} target="_blank" rel="noreferrer">Follow on X</a>
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
          <Route path="/finnos" element={<FinnOSPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </SiteFrame>
    </BrowserRouter>
  )
}

export default App
