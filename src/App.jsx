import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

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
  '/privacy': 'Finn AI Privacy Policy',
  '/terms': 'Finn AI Terms of Use',
  '/support': 'Finn AI Support',
}

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const updatePathname = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', updatePathname)
    return () => window.removeEventListener('popstate', updatePathname)
  }, [])

  return pathname
}

function Link({ to, onClick, children, ...props }) {
  const handleClick = (event) => {
    onClick?.(event)
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) return
    event.preventDefault()
    if (window.location.pathname !== to) {
      window.history.pushState({}, '', to)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }

  return <a href={to} onClick={handleClick} {...props}>{children}</a>
}

function NavLink({ to, children, ...props }) {
  const active = window.location.pathname === to
  const className = [props.className, active ? 'active' : '']
    .filter(Boolean)
    .join(' ')
  return <Link {...props} className={className} to={to}>{children}</Link>
}

function usePageEffects(pathname) {

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = pageTitles[pathname] ?? 'Finn'

    const nodes = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.dataset.visible = 'true'
      }),
      { threshold: 0.12 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [pathname])
}

function SiteFrame({ children, pathname }) {
  const [menuOpen, setMenuOpen] = useState(false)
  usePageEffects(pathname)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <nav
          id="primary-navigation"
          className={menuOpen ? 'nav-pill is-open' : 'nav-pill'}
          aria-label="Primary navigation"
        >
          <Link className="brand" to="/" onClick={closeMenu} aria-label="Finn home">
            Finn
          </Link>

          <div className="nav-links">
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/flux" onClick={closeMenu}>FinnAI</NavLink>
            <NavLink to="/support" onClick={closeMenu}>Contact</NavLink>
            <NavLink to="/privacy" onClick={closeMenu}>Privacy Policy</NavLink>
          </div>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <Link className="brand brand--footer" to="/" aria-label="Finn home">Finn</Link>
        <nav className="footer-links" aria-label="Legal and support">
          <Link to="/flux">Flux</Link>
          <Link to="/finnos">FinnOS</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/support">Support</Link>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={links.x} target="_blank" rel="noreferrer">X</a>
        </nav>
        <p>© {new Date().getFullYear()} Finn</p>
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="home-canvas" id="top">
        <div className="home-intro" data-reveal>
          <span>Welcome to Finn.</span>
          <span>Discover our apps and services.</span>
        </div>

        <div className="showcase-grid" data-reveal>
          <Link className="showcase-card showcase-card--finnai" to="/flux" aria-label="Explore FinnAI">
            <img className="showcase-card__image" src="/finnai-card.png" alt="" />
            <span className="showcase-card__shade" aria-hidden="true" />
            <span className="showcase-card__label">FinnAI</span>
            <ArrowRight className="showcase-card__arrow" size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
          <Link className="showcase-card showcase-card--nomad" to="/finnos" aria-label="Explore Nomad">
            <img className="showcase-card__image" src="/nomad-card.png" alt="" />
            <span className="showcase-card__shade" aria-hidden="true" />
            <span className="showcase-card__label">Nomad</span>
            <ArrowRight className="showcase-card__arrow" size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="intro section home-after" id="about">
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
          <div className="progress-header">
            <p className="progress-heading">The road to an everyday OS</p>
            <p className="progress-phase">Early foundation · interrupts in progress</p>
          </div>
          <div
            className="progress-meter"
            role="progressbar"
            aria-label="FinnOS development progress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="48"
            aria-valuetext="Core boot and memory foundations complete; interrupt and timing work in progress"
          >
            <span className="progress-meter-fill" />
          </div>
          <ol className="progress-list">
            {progress.map((item) => (
              <li className={`progress-item progress-item--${item.state}`} key={item.title}>
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

function LegalPage({ eyebrow, title, intro, children }) {
  return (
    <article className="legal-page">
      <header className="legal-header" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <div className="legal-content" data-reveal>{children}</div>
    </article>
  )
}

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Last updated · July 28, 2026"
      title="Finn AI Privacy Policy"
      intro="Finn AI is designed around local processing. This policy explains what stays on your device and the limited cases where network services process data."
    >
      <section>
        <h2>1. Local AI processing</h2>
        <p>Prompts, conversations and AI responses are processed locally on your Android device using downloaded Bonsai models. They are not sent to Finn or to a cloud AI provider.</p>
        <p>Conversation history is stored in app-private storage with AES-256-GCM authenticated encryption. Creations, profile preferences, custom instructions and Skills also remain in app-private local storage.</p>
      </section>
      <section>
        <h2>2. Model downloads</h2>
        <p>The app connects over HTTPS to its configured model repository when downloading or updating a model. That host receives ordinary network metadata such as your IP address, but requests do not contain prompts or conversation content.</p>
      </section>
      <section>
        <h2>3. Advertising and consent</h2>
        <p>Finn AI uses Google AdMob and Google’s User Messaging Platform. Subject to your choices and applicable law, Google may process IP-derived approximate location, app interactions, diagnostics, performance information, advertising identifiers and other device identifiers for advertising, analytics and fraud prevention.</p>
        <p>You can revisit available advertising privacy choices from Finn AI Settings. Prompts and conversations are not provided to Google Mobile Ads.</p>
      </section>
      <section>
        <h2>4. Optional AI response reports</h2>
        <p>When you explicitly submit an AI response report, Finn receives the reported response, category, timestamp, app version, model tier and any additional details you enter. Your prompt is included only when you separately opt in.</p>
        <p>Reports are sent over HTTPS and stored in a protected Upstash Redis database for up to 30 days. The reporting service uses a salted, one-way hash of your IP address only to enforce an hourly submission limit; neither the address nor its hash is stored with the report. Upstash acts as a data processor for this service.</p>
      </section>
      <section>
        <h2>5. Your controls</h2>
        <p>Settings provides controls to clear chat history, unload AI models from memory and delete local conversations, encryption keys, downloaded models, Creations, preferences, Skills and onboarding state. Android application backup is disabled for Finn AI.</p>
      </section>
      <section>
        <h2>6. Children</h2>
        <p>Finn AI is not directed to children under 13, and Finn does not knowingly collect their personal information. The publisher’s Play target-audience declaration governs age-related advertising treatment.</p>
      </section>
      <section>
        <h2>7. Contact</h2>
        <p>Questions, privacy requests and safety concerns can be submitted through the <Link to="/support">Finn AI support page</Link> or emailed to <a href="mailto:finn_org@proton.me">finn_org@proton.me</a>.</p>
      </section>
    </LegalPage>
  )
}

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Last updated · July 28, 2026"
      title="Finn AI Terms of Use"
      intro="These terms apply when you install or use the Finn AI Android application."
    >
      <section>
        <h2>1. Acceptance</h2>
        <p>By installing or using Finn AI, you agree to these terms. If you do not agree, do not use the application.</p>
      </section>
      <section>
        <h2>2. Local generative AI</h2>
        <p>Finn AI generates responses locally using Bonsai models and an on-device inference engine. AI can produce inaccurate, incomplete or inappropriate content. Verify important information independently and do not rely on Finn AI as medical, legal, financial or other professional advice.</p>
      </section>
      <section>
        <h2>3. Acceptable use</h2>
        <p>You may not use Finn AI to create or facilitate illegal activity, child sexual abuse or exploitation material, malware, credential theft, fraud, targeted harassment or other content that violates applicable law or the rights of others.</p>
      </section>
      <section>
        <h2>4. Ownership and licences</h2>
        <p>Finn AI application software is proprietary and protected by intellectual-property law. Third-party components, the llama.cpp inference engine and Bonsai models remain governed by their respective licences, which are available in the app.</p>
      </section>
      <section>
        <h2>5. Availability and changes</h2>
        <p>Local model performance varies by device. Features, models and these terms may change as the application develops. Material updates will be reflected by the date on this page.</p>
      </section>
      <section>
        <h2>6. Limitation of liability</h2>
        <p>To the maximum extent permitted by law, Finn is not liable for indirect, incidental, special or consequential loss arising from use of the application or reliance on AI output.</p>
      </section>
      <section>
        <h2>7. Contact</h2>
        <p>For support, legal questions or safety concerns, use the <Link to="/support">Finn AI support page</Link> or email <a href="mailto:finn_org@proton.me">finn_org@proton.me</a>.</p>
      </section>
    </LegalPage>
  )
}

function SupportPage() {
  return (
    <LegalPage
      eyebrow="Finn AI"
      title="Support"
      intro="Get help with Finn AI, report a product issue or contact the project maintainers."
    >
      <section>
        <h2>Application help</h2>
        <p>For installation, local-model, performance or account-free usage questions, email the monitored Finn AI support address.</p>
        <a className="text-link" href="mailto:finn_org@proton.me">finn_org@proton.me</a>
      </section>
      <section>
        <h2>AI response safety</h2>
        <p>Use the Report action attached to an AI response inside Finn AI. Reports submitted there follow the retention and prompt opt-in rules described in the privacy policy.</p>
      </section>
      <section>
        <h2>Privacy or legal request</h2>
        <p>Email <a href="mailto:finn_org@proton.me">finn_org@proton.me</a>. Do not include passwords, payment information or sensitive conversation content.</p>
      </section>
    </LegalPage>
  )
}

function App() {
  const pathname = usePathname()
  const Page = {
    '/': HomePage,
    '/flux': FluxPage,
    '/finnos': FinnOSPage,
    '/privacy': PrivacyPage,
    '/terms': TermsPage,
    '/support': SupportPage,
  }[pathname] ?? HomePage

  return (
    <SiteFrame pathname={pathname}>
      <Page />
    </SiteFrame>
  )
}

export default App
