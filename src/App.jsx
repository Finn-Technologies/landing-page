import { useEffect, useState } from 'react'
import { Cancel01Icon, Menu01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowRight,
  ArrowUpRight,
  LockKeyhole,
  Play,
  Terminal,
} from 'lucide-react'

const links = {
  github: 'https://github.com/Finn-Technologies',
  x: 'https://x.com/finn_org',
  finnaiPlay: 'https://play.google.com/store/apps/details?id=com.abhiflex.finnai&hl=en&gl=US',
  finnCode: 'https://github.com/Finn-Technologies/Finn-Code',
  finnos: 'https://github.com/Finn-Technologies/FinnOS',
  abhi: 'https://x.com/Abhi-Flex1',
  waleed: 'https://x.com/waleedkafafi',
  varun: 'https://x.com/varun_polisetty',
}

const team = [
  {
    name: 'Abhi Flex',
    role: 'CEO · Head of development · Head of design',
    handle: '@Abhi-Flex1',
    href: links.abhi,
    initials: 'AF',
  },
  {
    name: 'Waleed Kafafi',
    role: 'UI designer',
    handle: '@waleedkafafi',
    href: links.waleed,
    initials: 'WK',
  },
  {
    name: 'Varun Polisetty',
    role: 'Developer',
    handle: '@varun_polisetty',
    href: links.varun,
    initials: 'VP',
  },
]

const progress = [
  { title: 'Starts', detail: 'Boots reliably on real architectures.', state: 'complete', label: 'Working' },
  { title: 'Controls memory', detail: 'Owns paging, allocation and its address space.', state: 'complete', label: 'Working' },
  { title: 'Responds & keeps time', detail: 'Interrupts and scheduling are being brought online.', state: 'current', label: 'Building now' },
  { title: 'Runs apps', detail: 'Userspace, storage and networking come next.', state: 'future', label: 'Next' },
  { title: 'Becomes everyday', detail: 'A useful, calm graphical system.', state: 'future', label: 'Later' },
]

const pageTitles = {
  '/': 'Finn — Open software, made for people',
  '/finnai': 'FinnAI — Your AI, on your phone',
  '/flux': 'FinnAI — Your AI, on your phone',
  '/finn-code': 'Finn Code — Coding agents, in your pocket',
  '/finnos': 'FinnOS — An operating system, built in the open',
  '/team': 'Team — The people behind Finn',
  '/privacy': 'Finn AI Privacy Policy',
  '/terms': 'Finn AI Terms of Use',
  '/support': 'Finn — Support',
  '/contact': 'Finn — Support',
}

const pageDescriptions = {
  '/': 'Finn makes open, local-first software for the people using it.',
  '/finnai': 'FinnAI is a private, on-device AI assistant for Android.',
  '/flux': 'FinnAI is a private, on-device AI assistant for Android.',
  '/finn-code': 'Finn Code is an Android-first, provider-agnostic AI coding harness.',
  '/finnos': 'FinnOS is a new operating system growing from zero in the open.',
  '/team': 'Meet the people building Finn, an independent software studio.',
  '/privacy': 'Read the FinnAI privacy policy and understand what stays on your device.',
  '/terms': 'Read the terms of use for the FinnAI Android application.',
  '/support': 'Get support for FinnAI, Finn Code, FinnOS, and the people behind Finn.',
  '/contact': 'Get support for FinnAI, Finn Code, FinnOS, and the people behind Finn.',
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
  const aliases = { '/flux': '/finnai', '/contact': '/support' }
  const currentPath = aliases[window.location.pathname] ?? window.location.pathname
  const active = currentPath === to
  const className = [props.className, active ? 'active' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <Link
      {...props}
      aria-current={active ? 'page' : undefined}
      className={className}
      to={to}
    >
      {children}
    </Link>
  )
}

function usePageEffects(pathname) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = pageTitles[pathname] ?? 'Finn'
    const description = document.querySelector('meta[name="description"]')
    if (description) description.content = pageDescriptions[pathname] ?? pageDescriptions['/']

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
            <NavLink to="/finnai" onClick={closeMenu}>FinnAI</NavLink>
            <NavLink to="/finn-code" onClick={closeMenu}>Finn Code</NavLink>
            <NavLink to="/team" onClick={closeMenu}>Team</NavLink>
            <NavLink to="/support" onClick={closeMenu}>Contact</NavLink>
          </div>

          <button
            className={menuOpen ? 'menu-toggle is-open' : 'menu-toggle'}
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="menu-toggle__icon menu-toggle__icon--menu" aria-hidden="true">
              <HugeiconsIcon icon={Menu01Icon} size={22} />
            </span>
            <span className="menu-toggle__icon menu-toggle__icon--close" aria-hidden="true">
              <HugeiconsIcon icon={Cancel01Icon} size={22} />
            </span>
          </button>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <Link className="brand brand--footer" to="/" aria-label="Finn home">Finn</Link>
        <nav className="footer-links" aria-label="Site links">
          <Link to="/finnai">FinnAI</Link>
          <Link to="/finn-code">Finn Code</Link>
          <Link to="/finnos">FinnOS</Link>
          <Link to="/team">Team</Link>
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

function ExternalAction({ href, children, className = 'button button--dark' }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
    </a>
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
          <Link className="showcase-card showcase-card--finnai" to="/finnai" aria-label="Explore FinnAI">
            <img className="showcase-card__image" src="/finnai-card.webp" alt="" />
            <span className="showcase-card__shade" aria-hidden="true" />
            <span className="showcase-card__label">FinnAI</span>
            <ArrowRight className="showcase-card__arrow" size={22} strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <Link className="showcase-card showcase-card--finncode" to="/finn-code" aria-label="Explore Finn Code">
            <img className="showcase-card__image" src="/finn-code-card.webp" alt="" />
            <span className="showcase-card__shade" aria-hidden="true" />
            <span className="showcase-card__label">Finn Code</span>
            <ArrowRight className="showcase-card__arrow" size={22} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section home-after" id="about">
        <div data-reveal>
          <h2>We think technology should belong to the people using it.</h2>
          <p className="section-copy">
            Finn is an independent software studio building personal technology from the foundations up. We make open, local-first tools for the moments when software should feel more like a tool you own than a service that owns you.
          </p>
        </div>
      </section>

      <section className="section">
        <div data-reveal>
          <h2>Small team. Real ownership.</h2>
          <p className="section-copy">
            Finn is led by people who care about the details: how a model runs, how a button feels, how a system explains itself, and how much of a person&apos;s data has to leave their hands.
          </p>
          <Link className="text-link" to="/team">Meet the team</Link>
        </div>
      </section>

      <Closing title="See where Finn goes next." />
    </>
  )
}

function FinnAIPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner" data-reveal>
          <h1>Your AI,<br />on your phone.</h1>
          <p>A private, on-device assistant for the questions, ideas and small tasks that stay yours.</p>
          <div className="button-row">
            <a className="button button--dark" href={links.finnaiPlay} target="_blank" rel="noreferrer">
              <span><Play size={15} fill="currentColor" aria-hidden="true" /> Get on Google Play</span>
              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>
            <a className="text-link" href="#inside">See how it works</a>
          </div>
          <p className="hero-note"><span className="status-dot" aria-hidden="true" /> No account. No cloud inference. One model on your device.</p>
        </div>
      </section>

      <section className="section" id="inside">
        <div className="presentation-head" data-reveal>
          <h2>Intelligence that lives where you do.</h2>
          <p className="section-copy">
            A compact multimodal model runs on your phone, so the questions, images and files you bring to FinnAI never have to leave it.
          </p>
        </div>

        <div className="presentation-pair" data-reveal>
          <figure className="illustration illustration--app">
            <div className="illustration__frame">
              <img src="/finnai-phone.png" alt="The FinnAI app on Android, waiting for a question" />
            </div>
            <figcaption>Ask anything. Answered on device.</figcaption>
          </figure>

          <figure className="illustration illustration--art">
            <div className="illustration__frame">
              <img src="/finnai-card.webp" alt="" />
            </div>
            <figcaption>Local by default. Private by design.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div data-reveal>
          <h2>What it can do.</h2>
          <div className="feature-list">
            <article><h3>Talk naturally.</h3><p>Ask questions, draft, explain and reason through a private local model.</p></article>
            <article><h3>Use your voice.</h3><p>Speak, pause and interrupt with hands-free voice input.</p></article>
            <article><h3>See the world.</h3><p>Bring in images, photos and files when text alone is not enough.</p></article>
            <article><h3>Make things.</h3><p>Turn an idea into saved Creations such as mini apps, widgets or slide decks.</p></article>
            <article><h3>Go further.</h3><p>Use automatic web grounding for current answers, with visible source links.</p></article>
            <article><h3>Make it yours.</h3><p>Keep a local profile, custom instructions and reusable Skills close at hand.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div data-reveal>
          <h2>Under the hood.</h2>
          <dl className="spec-list">
            <div><dt>Model</dt><dd>LFM2.5-VL 1.6B</dd></div>
            <div><dt>Runtime</dt><dd>llama.cpp on Android</dd></div>
            <div><dt>History</dt><dd>AES-256-GCM encrypted</dd></div>
            <div><dt>Languages</dt><dd>English · German · Spanish · French · Italian</dd></div>
            <div><dt>Good fit</dt><dd>64-bit ARM Android · 3 GB RAM or more</dd></div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="info-callout" data-reveal>
          <div className="info-callout__mark"><LockKeyhole size={19} strokeWidth={1.7} aria-hidden="true" /></div>
          <div>
            <h2>Your conversations stay on your phone.</h2>
            <p>FinnAI does not use a remote AI server for inference. When automatic web search is needed, only the latest request is sent to the configured search providers, and the results show you the sources used. Model downloads, voice input and local storage each have their own clear boundary.</p>
            <div className="button-row">
              <Link className="text-link" to="/privacy">Read the privacy policy</Link>
              <Link className="muted-link" to="/terms">Terms of use</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="closing-inner" data-reveal>
          <h2>Meet FinnAI on Android.</h2>
          <div className="button-row">
            <ExternalAction href={links.finnaiPlay}>Open Google Play</ExternalAction>
            <a className="muted-link" href="mailto:finn_org@proton.me">Ask a question</a>
          </div>
        </div>
      </section>
    </>
  )
}

function FinnCodePage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner" data-reveal>
          <h1>Coding agents,<br />in your pocket.</h1>
          <p>An Android-first, provider-agnostic AI coding harness for people who want a real workspace, not a chat box that pretends it can edit files.</p>
          <div className="button-row">
            <ExternalAction href={links.finnCode}>View the repository</ExternalAction>
            <a className="text-link" href="#architecture">See the architecture</a>
          </div>
          <p className="hero-note"><span className="status-dot status-dot--building" aria-hidden="true" /> The app is in active development. The source is open.</p>
        </div>
      </section>

      <section className="section" id="architecture">
        <div className="product-intro product-intro--reverse" data-reveal>
          <div className="product-copy">
            <h2>One surface for serious agent work.</h2>
            <p>Finn Code is a Flutter mobile control plane for direct model APIs and the full Codex app-server protocol. It keeps setup, models, tasks and approvals in one calm mobile workspace.</p>
            <p className="product-copy__fine">Direct provider modes are explicitly chat-only. When you connect Codex app-server, plans, commands, file changes, diffs, tool events and approval requests become available through a versioned gateway.</p>
          </div>
          <div className="code-stage">
            <img src="/finn-code-tasks.png" alt="Finn Code Android task inbox with a new coding task button" />
            <span className="code-stage__caption">Tasks · Models · Settings</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div data-reveal>
          <h2>What is already taking shape.</h2>
          <div className="feature-list">
            <article><h3>Task inbox.</h3><p>Search, resume and organize coding tasks with streaming messages and Markdown.</p></article>
            <article><h3>Provider presets.</h3><p>Local llama.cpp, Ollama, OpenRouter Free, Groq, Gemini, Anthropic and Codex Gateway.</p></article>
            <article><h3>Codex mode.</h3><p>Connect to app-server over WebSocket for plans, tools, diffs and file changes.</p></article>
            <article><h3>Approval aware.</h3><p>Review command and file-change requests instead of hiding them behind a magic button.</p></article>
            <article><h3>Secure by default.</h3><p>API keys and gateway tokens use Android Keystore-backed secure storage.</p></article>
            <article><h3>Made to travel.</h3><p>Responsive Android and tablet layouts with light, dark and system themes.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div data-reveal>
          <h2>Two execution paths.</h2>
          <div className="execution-list">
            <article>
              <h3><Terminal size={17} strokeWidth={1.5} aria-hidden="true" />Direct provider path</h3>
              <p>Connect to OpenAI-compatible Chat Completions, Anthropic Messages or Gemini streaming APIs for quick setup, model comparison and free-tier testing.</p>
              <span className="execution-list__tag">Chat-only by design</span>
            </article>
            <article>
              <h3><ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />Codex app-server path</h3>
              <p>A trusted development host runs Codex app-server. Finn Code speaks its bidirectional JSON-RPC protocol for plans, reasoning summaries, commands, diffs, MCP events and approvals.</p>
              <span className="execution-list__tag">Full agent surface</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="architecture-panel" data-reveal>
          <div className="architecture-panel__top">
            <h2>The shape of the system.</h2>
            <span className="technical-badge technical-badge--active">Apache-2.0</span>
          </div>
          <div className="architecture-flow">
            <div><span>Mobile UI</span><strong>Finn Code</strong></div>
            <ArrowRight size={18} aria-hidden="true" />
            <div><span>Gateway</span><strong>AgentGateway</strong></div>
            <ArrowRight size={18} aria-hidden="true" />
            <div><span>Runtime</span><strong>Provider or Codex</strong></div>
          </div>
          <div className="architecture-notes">
            <p><LockKeyhole size={16} aria-hidden="true" /> Secrets stay in secure storage.</p>
            <p><Play size={16} aria-hidden="true" /> New tasks default to read-only without a project path.</p>
            <p><ArrowUpRight size={16} aria-hidden="true" /> Protocol changes stay behind the gateway.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="closing-inner" data-reveal>
          <h2>Follow Finn Code as it grows.</h2>
          <div className="button-row">
            <ExternalAction href={links.finnCode}>Open GitHub</ExternalAction>
            <a className="muted-link" href={links.x} target="_blank" rel="noreferrer">Follow Finn on X</a>
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
          <h1>An operating system,<br />built in the open.</h1>
          <p>A new system taking shape from its first instruction to, one day, the things people use every day.</p>
          <ExternalAction href={links.finnos}>Follow the build</ExternalAction>
        </div>
      </section>

      <section className="section">
        <div data-reveal>
          <h2>The foundations are becoming a system.</h2>
          <p className="status status--building"><span aria-hidden="true" />In active development</p>
          <p className="section-copy">FinnOS can already start on two kinds of computers and control its own memory. The next work is teaching it to respond, keep time and run more than one thing. It is early, useful mostly to builders, and progressing in public.</p>
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

      <section className="section">
        <div className="closing-inner" data-reveal>
          <h2>Watch FinnOS grow.</h2>
          <ExternalAction href={links.finnos}>Open the repository</ExternalAction>
        </div>
      </section>
    </>
  )
}

function TeamPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner" data-reveal>
          <h1>Small team.<br />Real ownership.</h1>
          <p>We are a compact group building software that respects the person using it, the device it runs on and the work that has to happen next.</p>
        </div>
      </section>

      <section className="section">
        <div data-reveal>
          <div className="team-list">
            {team.map((person) => (
              <a className="team-row" href={person.href} target="_blank" rel="noreferrer" key={person.name}>
                <span className="team-row__avatar" aria-hidden="true">{person.initials}</span>
                <span className="team-row__person">
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                </span>
                <span className="team-row__handle">{person.handle}</span>
                <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div data-reveal>
          <h2>Curiosity is a technical skill.</h2>
          <p className="section-copy">We ask a lot of questions, especially the ones that reveal a tradeoff. We care about performance, accessibility and the small moments of clarity that make a product feel considered.</p>
        </div>
      </section>

      <section className="section">
        <div className="team-values" data-reveal>
          <div>
            <h2>Make it legible.<br />Make it useful.<br />Make it last.</h2>
          </div>
          <div className="team-values__list">
            <p>Build from the foundations when the shortcut would hide the important part.</p>
            <p>Keep the user close to the data, the device and the decisions.</p>
            <p>Share progress early so the work can be understood and improved.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="closing-inner" data-reveal>
          <h2>Follow the work.</h2>
          <div className="button-row">
            <ExternalAction href={links.x}>Finn on X</ExternalAction>
            <ExternalAction href={links.github} className="button button--light">Finn on GitHub</ExternalAction>
          </div>
        </div>
      </section>
    </>
  )
}

function Closing({ title }) {
  return (
    <section className="section">
      <div className="closing-inner" data-reveal>
        <h2>{title}</h2>
        <div className="button-row">
          <ExternalAction href={links.github}>GitHub</ExternalAction>
          <a className="muted-link" href={links.x} target="_blank" rel="noreferrer">Follow on X</a>
        </div>
      </div>
    </section>
  )
}

function LegalPage({ meta, title, intro, children }) {
  return (
    <article className="legal-page">
      <header className="legal-header" data-reveal>
        <p className="page-meta">{meta}</p>
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
      meta="Last updated · July 28, 2026"
      title="Finn AI Privacy Policy"
      intro="FinnAI is designed around on-device processing. This policy explains what stays on your device and the limited cases where network services process data."
    >
      <section>
        <h2>1. On-device AI processing</h2>
        <p>FinnAI generates responses locally on your Android device using an mmap-backed GGUF inference engine. Prompts, conversations and AI responses are not sent to Finn or to a cloud AI provider.</p>
        <p>Conversation history is stored in app-private local storage with AES-256-GCM authenticated encryption. Creations, profile preferences, custom instructions and Skills also remain in app-private local storage.</p>
      </section>
      <section>
        <h2>2. Model downloads</h2>
        <p>The app connects over HTTPS to Hugging Face when downloading the LFM2.5-VL 1.6B model files. That host receives ordinary network metadata such as your IP address, but the download request does not include prompts or conversation content.</p>
      </section>
      <section>
        <h2>3. Automatic web search</h2>
        <p>When a request needs current information, FinnAI can send the latest request over HTTPS to DuckDuckGo and Wikipedia for transient search processing. Conversation history, saved profile data, custom instructions and Skills are not included. Retrieved results are shown with source links.</p>
        <p>Opening a retrieved source fetches that page from its own third-party host, which can see the page URL and ordinary network metadata. If search is unavailable, FinnAI falls back to a local answer.</p>
      </section>
      <section>
        <h2>4. Voice input</h2>
        <p>Voice input uses the device microphone when you grant permission. Recognition runs on-device whenever the platform provides offline speech recognition. When the platform does not, the captured audio is passed to the device&apos;s platform speech-recognition service to produce a transcript. FinnAI does not record or store your audio.</p>
      </section>
      <section>
        <h2>5. Optional AI response reports</h2>
        <p>When you explicitly use the in-app Report action, FinnAI prepares a report for your review in your email app. Nothing is sent until you review it and press Send. Your prompt is included only if you separately opt in.</p>
        <p>Reports are sent over HTTPS and handled through the support mailbox. Do not include passwords, payment information or sensitive conversation content.</p>
      </section>
      <section>
        <h2>6. Your controls</h2>
        <p>Settings provides controls to clear chat history, unload AI models from memory and delete local conversations, encryption keys, downloaded models, Creations, preferences, Skills and onboarding state. Android application backup is disabled for FinnAI.</p>
      </section>
      <section>
        <h2>7. Children</h2>
        <p>FinnAI is not directed to children under 13, and Finn does not knowingly collect their personal information. The publisher&apos;s Play target-audience declaration governs age-related treatment.</p>
      </section>
      <section>
        <h2>8. Contact</h2>
        <p>Questions, privacy requests and safety concerns can be submitted through the <Link to="/support">Finn support page</Link> or emailed to <a href="mailto:finn_org@proton.me">finn_org@proton.me</a>.</p>
      </section>
    </LegalPage>
  )
}

function TermsPage() {
  return (
    <LegalPage
      meta="Last updated · July 28, 2026"
      title="Finn AI Terms of Use"
      intro="These terms apply when you install or use the FinnAI Android application."
    >
      <section>
        <h2>1. Acceptance</h2>
        <p>By installing or using FinnAI, you agree to these terms. If you do not agree, do not use the application.</p>
      </section>
      <section>
        <h2>2. Local generative AI</h2>
        <p>FinnAI generates responses locally using the LFM2.5-VL 1.6B model by Liquid AI and an on-device inference engine. AI can produce inaccurate, incomplete or inappropriate content. Verify important information independently and do not rely on FinnAI as medical, legal, financial or other professional advice.</p>
      </section>
      <section>
        <h2>3. Acceptable use</h2>
        <p>You may not use FinnAI to create or facilitate illegal activity, child sexual abuse or exploitation material, malware, credential theft, fraud, targeted harassment or other content that violates applicable law or the rights of others.</p>
      </section>
      <section>
        <h2>4. Ownership and licences</h2>
        <p>FinnAI application software is proprietary and protected by intellectual-property law. Third-party components, the llama.cpp inference engine and the LFM2.5-VL model remain governed by their respective licences, which are available in the app.</p>
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
        <p>For support, legal questions or safety concerns, use the <Link to="/support">Finn support page</Link> or email <a href="mailto:finn_org@proton.me">finn_org@proton.me</a>.</p>
      </section>
    </LegalPage>
  )
}

function SupportPage() {
  return (
    <LegalPage
      meta="Finn"
      title="Support"
      intro="Get help with FinnAI, follow an open-source project, or contact the people building Finn."
    >
      <section>
        <h2>FinnAI help</h2>
        <p>For installation, local-model, performance or account-free usage questions, email the monitored FinnAI support address.</p>
        <a className="text-link" href="mailto:finn_org@proton.me">finn_org@proton.me</a>
      </section>
      <section>
        <h2>Product links</h2>
        <p>FinnAI is available on Google Play. Finn Code and FinnOS are developed in public on GitHub.</p>
        <div className="support-links">
          <a className="text-link" href={links.finnaiPlay} target="_blank" rel="noreferrer">FinnAI on Google Play</a>
          <a className="text-link" href={links.finnCode} target="_blank" rel="noreferrer">Finn Code on GitHub</a>
          <a className="text-link" href={links.finnos} target="_blank" rel="noreferrer">FinnOS on GitHub</a>
        </div>
      </section>
      <section>
        <h2>Safety, privacy or legal request</h2>
        <p>Use the Report action attached to an AI response inside FinnAI, or email <a href="mailto:finn_org@proton.me">finn_org@proton.me</a>. Do not include passwords, payment information or sensitive conversation content.</p>
      </section>
    </LegalPage>
  )
}

function App() {
  const pathname = usePathname()
  const Page = {
    '/': HomePage,
    '/finnai': FinnAIPage,
    '/flux': FinnAIPage,
    '/finn-code': FinnCodePage,
    '/finnos': FinnOSPage,
    '/team': TeamPage,
    '/privacy': PrivacyPage,
    '/terms': TermsPage,
    '/support': SupportPage,
    '/contact': SupportPage,
  }[pathname] ?? HomePage

  return (
    <SiteFrame pathname={pathname}>
      <Page />
    </SiteFrame>
  )
}

export default App
