import './style.css'
import logoLocal from './logo-nazmrzku.jpg'
import zmrzkaPhoto from './470170214_1018877173587670_5343044287738702859_n.jpg'
import { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, getDoc, setDoc } from './firebase.js'

// Brand assets
const BRAND = {
  logo: logoLocal,
  photo: zmrzkaPhoto,
  heroBg1: 'https://www.nazmrzku.cz/wp-content/uploads/2025/03/Frame-974.jpg',
  heroBg2: 'https://www.nazmrzku.cz/wp-content/uploads/2025/03/Frame-973.jpg',
}

// Vlastní SVG ikony
const svg = {
  pin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  down: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E03B3B" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`,
  arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E03B3B" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  ig: `<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
  fb: `<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
  // Vlastní ilustrační ikony pro feature karty
  iceCream: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#E03B3B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8c-3.3 0-6 2.2-6 5 0 .6.1 1.1.3 1.6L16 28l5.7-13.4c.2-.5.3-1 .3-1.6 0-2.8-2.7-5-6-5z"/><circle cx="16" cy="6" r="3"/><path d="M13 6.5c-1.5.5-2.5 1.5-2.5 3"/><path d="M19 6.5c1.5.5 2.5 1.5 2.5 3"/></svg>`,
  truck: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#E03B3B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="18" height="14" rx="2"/><path d="M20 14h6l3 4v4h-9v-8z"/><circle cx="8" cy="24" r="2.5"/><circle cx="24" cy="24" r="2.5"/></svg>`,
  store: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#E03B3B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l2-7h20l2 7"/><path d="M4 12v16h24V12"/><rect x="12" y="20" width="8" height="8"/><path d="M4 12c0 2 1.5 3.5 3.5 3.5S11 14 11 12c0 2 1.5 3.5 3.5 3.5S18 14 18 12c0 2 1.5 3.5 3.5 3.5S25 14 25 12"/></svg>`,
  cone: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11 16l5 14 5-14" stroke="#d4a76a" stroke-width="1.5" fill="#f5deb3"/><circle cx="16" cy="12" r="5" fill="#E03B3B" stroke="#c42f2f" stroke-width="1"/><circle cx="12" cy="10" r="3.5" fill="#e87942" stroke="#d06830" stroke-width="1"/><circle cx="20" cy="10" r="3.5" fill="#f59e0b" stroke="#d48a09" stroke-width="1"/><circle cx="16" cy="7" r="3" fill="#fca5a5" stroke="#E03B3B" stroke-width="0.8"/></svg>`,
  leaf: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#E03B3B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 28c0 0 2-14 10-18s14-4 14-4-2 14-10 18-14 4-14 4z"/><path d="M6 28c6-6 12-10 24-22"/></svg>`,
  news: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z"/></svg>`,
  trophy: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9H4a2 2 0 01-2-2V5a2 2 0 012-2h2"/><path d="M18 9h2a2 2 0 002-2V5a2 2 0 00-2-2h-2"/><path d="M6 3h12v8a6 6 0 01-12 0V3z"/><path d="M9 21h6M12 17v4"/></svg>`,
  video: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
}

// Loading screen
const loader = document.createElement('div')
loader.className = 'loader'
loader.innerHTML = `
  <div class="loader-content">
    <div class="loader-logo-wrap">
      <div class="loader-logo-ring"></div>
      <img src="${BRAND.logo}" alt="NA&nbsp;ZMRZKU" class="loader-logo" />
    </div>
    <div class="loader-dots">
      <span class="loader-dot"></span>
      <span class="loader-dot"></span>
      <span class="loader-dot"></span>
    </div>
    <p class="loader-text">Připravujeme zmrzku…</p>
  </div>
`
document.body.appendChild(loader)

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('loader--hide')
    setTimeout(() => loader.remove(), 500)
  }, 1200)
})

document.querySelector('#app').innerHTML = `
  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg">
      <img src="${BRAND.heroBg1}" alt="" />
    </div>
    <div class="hero-content">
      <div class="hero-logo-circle">
        <img src="${BRAND.logo}" alt="NA&nbsp;ZMRZKU logo" />
      </div>
      <h1>NA&nbsp;ZMRZKU</h1>
      <p class="hero-tagline">Když na zmrzku, tak Na zmrzku</p>
      <p class="hero-location">${svg.pin} Hradec Králové</p>
      <div class="hero-buttons">
        <a href="#pribeh" class="btn btn--primary">Náš příběh</a>
        <a href="#provozovny" class="btn btn--outline">Kde nás najdete</a>
      </div>
    </div>
    <div class="scroll-indicator">${svg.down}</div>
  </section>

  <!-- PROVOZOVNY — příchutě + kontakt -->
  <section class="section locations-section" id="provozovny">
    <div class="section-inner">
      <div class="section-header fade-in">
        <h2 class="section-title">Naše provozovny</h2>
        <p class="section-subtitle">Kde nás najdete a co dnes točíme</p>
      </div>

      <div class="locations-grid fade-in">
        <!-- V KOPEČKU -->
        <div class="loc-card">
          <div class="loc-card-icon">${svg.cone}</div>
          <div class="loc-card-head">
            <h3 class="loc-card-name">${svg.pin} NA&nbsp;ZMRZKU V Kopečku</h3>
            <span class="loc-card-badge">2 točené + 4 gelata</span>
          </div>
          <div class="loc-card-info">
            <div class="loc-card-row">${svg.pin} <span>V Kopečku 163, 500 02 Hradec Králové</span></div>
            <div class="loc-card-row">${svg.clock} <span id="hours-kopecku">Po–Ne: 11:00–18:00</span></div>
          </div>
          <div class="loc-card-rating">
            <span class="rating-stars">4,6</span>
            <span class="rating-count">188 recenzí</span>
          </div>
          <div class="loc-card-menu" id="menu-kopecku">
            <div class="flavors-loading">Načítám nabídku…</div>
          </div>
          <div class="loc-card-actions">
            <a href="https://maps.app.goo.gl/We5ZpddgCA5yF5YA7" target="_blank" rel="noopener noreferrer" class="contact-link">Navigovat</a>
            <a href="https://maps.app.goo.gl/We5ZpddgCA5yF5YA7" target="_blank" rel="noopener noreferrer" class="contact-link contact-link--review">Napsat recenzi</a>
          </div>
        </div>
      </div>

      <!-- SPECIALITY - poháry a káva -->
      <div class="loc-specials fade-in">
        <h3 class="loc-specials-title">Naše speciality</h3>
        <div class="specials-grid" id="specials-grid">
          <div class="special-card" style="--accent: #f59e0b">
            <span class="special-emoji">🥭</span>
            <span class="special-name">Hradecké Mango</span>
            <span class="special-desc">Mango & maracuja pohár</span>
          </div>
          <div class="special-card" style="--accent: #6366f1">
            <span class="special-emoji">🫐</span>
            <span class="special-name">Hradecké Borůvky</span>
            <span class="special-desc">Borůvkový pohár s čerstvým ovocem</span>
          </div>
          <div class="special-card" style="--accent: #e11d48">
            <span class="special-emoji">🍓</span>
            <span class="special-name">Hradecké Maliny</span>
            <span class="special-desc">Malinový pohár se šlehačkou</span>
          </div>
          <div class="special-card special-card--highlight" style="--accent: #92400e">
            <span class="special-emoji">☕</span>
            <span class="special-name">Ledová káva</span>
            <span class="special-desc">Espresso se zmrzlinou a mlékem</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- NÁŠ PŘÍBĚH — sjednocená sekce -->
  <section class="section story" id="pribeh">
    <div class="section-inner">

      <!-- Úvod -->
      <div class="story-intro fade-in">
        <h2 class="intro-heading">Zmrzku žereme.</h2>
        <p class="intro-sub">Nebo spíš milujeme...</p>
        <p class="intro-text">
          Zmrzlinu, kterou vyrábíme s láskou a péčí od roku 2016. Každý kornoutek NA&nbsp;ZMRZKU
          je poctivá domácí zmrzlina, která vám přinese nejen osvěžení, ale i radost.
        </p>
      </div>

      <!-- Fotka + text vedle sebe -->
      <div class="story-layout fade-in">
        <div class="story-photo">
          <img src="${BRAND.photo}" alt="Zmrzlina NA&nbsp;ZMRZKU" />
        </div>
        <div class="story-body">
          <p>
            V Hradci Králové a okolí jsme tu pro vás, abychom vám nabídli to nejlepší osvěžení
            a nezapomenutelný zážitek. <span class="highlight">Kvalitní suroviny a poctivá příprava</span> —
            to je základ každé naší příchutě.
          </p>
          <p>
            Každou příchuť pečlivě ladíme. Ať už si dáte osvěžující
            <span class="highlight">ovocný sorbet</span>, jemné <span class="highlight">gelato</span>
            nebo něco sezónního — vždycky je to čerstvé a poctivé.
          </p>
          <p>
            Udělejte si chvilku pro sebe. U nás je každý kousek příležitostí dopřát si něco výjimečného.
          </p>
        </div>
      </div>

      <!-- Časová osa příběhu -->
      <div class="section-header fade-in" style="margin-top: 2rem;">
        <h2 class="section-title">Náš příběh</h2>
        <p class="section-subtitle">Jak se zmrzka stala srdcovkou Hradce</p>
      </div>

      <div class="timeline fade-in">
        <div class="timeline-line"></div>

        <div class="timeline-item timeline-item--left">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <span class="timeline-year">2016</span>
            <h3 class="timeline-title">Kde to všechno začalo</h3>
            <p class="timeline-text">Jiří založil NA&nbsp;ZMRZKU s jedinou vizí — dělat poctivou zmrzlinu, která potěší. Z malého stánku v Hradci Králové se zrodil příběh, který trvá dodnes.</p>
          </div>
        </div>

        <div class="timeline-item timeline-item--right">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <span class="timeline-year">2019</span>
            <h3 class="timeline-title">Ocenění a média</h3>
            <p class="timeline-text">Naše pistáciová zmrzlina se dostala mezi nejlepší v ČR. Reportáže na Prima CNN ukázaly celému Česku, jak u nás zmrzlinu děláme.</p>
          </div>
        </div>

        <div class="timeline-item timeline-item--left">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <span class="timeline-year">2022</span>
            <h3 class="timeline-title">Dvě provozovny v Hradci</h3>
            <p class="timeline-text">Otevíráme druhou pobočku U Dvora. Hradec Králové má konečně svoji zmrzlinárnu na dvou místech — a Hradečáci si ji zamilovali.</p>
          </div>
        </div>

        <div class="timeline-item timeline-item--right">
          <div class="timeline-dot timeline-dot--highlight"></div>
          <div class="timeline-content">
            <span class="timeline-year">2026</span>
            <h3 class="timeline-title">Předání žezla</h3>
            <p class="timeline-text"><strong>Jiřin a Nikouš</strong> přebírají zmrzlinové království. Receptury zůstávají, kvalita zůstává — jen přicházejí nové nápady a energie.</p>
            <p class="timeline-quote">„První sezónu budu vše sledovat z povzdálí." — Jiří</p>
          </div>
        </div>

        <div class="timeline-item timeline-item--left">
          <div class="timeline-dot timeline-dot--future"></div>
          <div class="timeline-content">
            <span class="timeline-year">2026+</span>
            <h3 class="timeline-title">Příběh pokračuje</h3>
            <p class="timeline-text">Hradec má svoji zmrzlinárnu. S novou energií a odhodláním píšeme další kapitoly příběhu NA&nbsp;ZMRZKU. Přijďte je ochutnat.</p>
          </div>
        </div>
      </div>

      <!-- Čísla -->
      <div class="story-stats fade-in">
        <div class="stat-item">
          <span class="stat-number">2016</span>
          <span class="stat-label">Rok založení</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">4.6</span>
          <span class="stat-label">Google hodnocení</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">1</span>
          <span class="stat-label">Pobočka v HK</span>
        </div>
      </div>

    </div>
  </section>

  <!-- NABÍDKA -->
  <section class="section features" id="nabidka">
    <div class="section-inner">
      <div class="section-header fade-in">
        <h2 class="section-title">Co nabízíme</h2>
        <p class="section-subtitle">Poctivá zmrzlina pro každého</p>
      </div>
      <div class="features-grid fade-in">
        <div class="feature-card">
          <div class="feature-icon-wrap">${svg.iceCream}</div>
          <h3 class="feature-title">Řemeslná zmrzlina</h3>
          <p class="feature-desc">Denně čerstvá vanilková zmrzlina a ovocné sorbety z kvalitních surovin</p>
        </div>
        <div class="feature-card feature-card--disabled">
          <div class="feature-icon-wrap">${svg.truck}</div>
          <h3 class="feature-title">Rozvoz po HK</h3>
          <p class="feature-desc">Zamrzlou zmrzlinu přivezeme přímo domů nebo na zahradu</p>
          <span class="feature-badge-off">Dočasně vypnuto</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap">${svg.store}</div>
          <h3 class="feature-title">B2B boxy</h3>
          <p class="feature-desc">Zmrzlinové boxy pro firmu, akci nebo provozovnu</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap">${svg.leaf}</div>
          <h3 class="feature-title">Bez lepku a barviv</h3>
          <p class="feature-desc">Sorbety s vysokým podílem ovoce, bez přidaných barviv</p>
        </div>
      </div>
    </div>
  </section>

  <!-- MÉDIA -->
  <section class="section media-section" id="media">
    <div class="section-inner">
      <div class="section-header fade-in">
        <h2 class="section-title">Mohli jste nás vidět</h2>
        <p class="section-subtitle">NA&nbsp;ZMRZKU v médiích</p>
      </div>
      <div class="media-grid fade-in">
        <a href="https://cnn.iprima.cz/videa/velka-zmrzlinova-kradez-v-hradci-kralove" target="_blank" rel="noopener noreferrer" class="media-card media-card--link">
          <div class="media-icon">${svg.video}</div>
          <h3 class="media-title">Zmrzlina tak dobrá, že ji v noci ukradnou!</h3>
          <p class="media-desc">Vtipná reportáž z Primy, kde naše zmrzlina zmizela v noci.</p>
          <span class="media-source">Prima CNN</span>
        </a>
        <a href="https://hradecky.denik.cz/zpravy-z-ceska/je-libo-pistaciovou-nejlepsi-zmrzlinu-delaji-cukrarny-ve-velkych-mestech-20190627.html" target="_blank" rel="noopener noreferrer" class="media-card media-card--link">
          <div class="media-icon">${svg.trophy}</div>
          <h3 class="media-title">Nejlepší zmrzlina v ČR</h3>
          <p class="media-desc">Naše pistáciová zmrzlina v deníku — ocenění nejlepší zmrzky.</p>
          <span class="media-source">Hradecký deník</span>
        </a>
        <a href="https://cnn.iprima.cz/videla/vyroba-zmrzliny" target="_blank" rel="noopener noreferrer" class="media-card media-card--link">
          <div class="media-icon">${svg.video}</div>
          <h3 class="media-title">Za kulisami NA&nbsp;ZMRZKU</h3>
          <p class="media-desc">Jak vyrábíme zmrzlinu — reportáž Prima CNN.</p>
          <span class="media-source">Prima CNN</span>
        </a>
        <a href="https://hradecky.denik.cz/zpravy_region/zmrzlina-na-zmrzku-trebes-hradec-rozhovor-20250125.html" target="_blank" rel="noopener noreferrer" class="media-card media-card--link">
          <div class="media-icon">${svg.news}</div>
          <h3 class="media-title">Rozhovor v Hradeckém deníku</h3>
          <p class="media-desc">Jak NA&nbsp;ZMRZKU přináší radost Hradečákům.</p>
          <span class="media-source">Hradecký deník</span>
        </a>
      </div>
    </div>
  </section>

  <!-- KARIÉRA -->
  <section class="section hiring-section" id="kariera">
    <div class="section-inner">
      <div class="section-header fade-in">
        <h2 class="section-title">Hledáme kolegy</h2>
        <p class="section-subtitle">Buď součástí zmrzlinové rodiny</p>
      </div>
      <div class="hiring-content fade-in">
        <p class="hiring-intro">
          Práce u nás není jen o vytváření zmrzliny — je to o tom, být součástí rodiny,
          která se zavázala přinášet radost a osvěžení. Nabízíme možnost růstu, kreativního
          vyjádření a zázemí stabilní rodinné firmy.
        </p>
        <div class="hiring-perks">
          <div class="perk-item">${svg.check} <span>Přátelské prostředí</span></div>
          <div class="perk-item">${svg.check} <span>Profesní růst</span></div>
          <div class="perk-item">${svg.check} <span>Stabilní zázemí</span></div>
          <div class="perk-item">${svg.check} <span>Kvalitní suroviny</span></div>
          <div class="perk-item">${svg.check} <span>Férové ohodnocení</span></div>
        </div>
        <p class="hiring-cta-text">
          Hledáme nadšené, kreativní a přátelské lidi, kteří mají rádi zmrzlinu.
        </p>
      </div>
    </div>
  </section>

  <!-- SOCIÁLNÍ SÍTĚ -->
  <section class="social" id="socsite">
    <div class="section-inner">
      <div class="section-header fade-in">
        <h2 class="section-title">Sledujte nás</h2>
        <p class="section-subtitle">Buďte v obraze o nových příchutích</p>
      </div>
      <div class="social-links fade-in">
        <a href="https://www.instagram.com/nazmrzku/" target="_blank" rel="noopener noreferrer" class="social-link social-link--ig">
          ${svg.ig} @nazmrzku
        </a>
        <a href="https://www.facebook.com/nazmrzku/?locale=cs_CZ" target="_blank" rel="noopener noreferrer" class="social-link social-link--fb">
          ${svg.fb} NA&nbsp;ZMRZKU
        </a>
        <a href="https://www.nazmrzku.cz/" target="_blank" rel="noopener noreferrer" class="social-link social-link--web">
          ${svg.globe} nazmrzku.cz
        </a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-logo-circle">
        <img src="${BRAND.logo}" alt="NA&nbsp;ZMRZKU" />
      </div>
      <p>&copy; ${new Date().getFullYear()} NA&nbsp;ZMRZKU — Poctivá zmrzlina z Hradce Králové</p>
      <div class="footer-legal">
        <p>Provozovatel: <strong>NJHB s.r.o.</strong> | IČ: 24652253 | Rybná 716/24, 110 00 Praha 1</p>
        <p>Zapsána v OR vedeném Městským soudem v Praze, sp. zn. C 444518</p>
      </div>
      <p class="footer-partner">IT partner: <a href="https://www.datahold.cz" target="_blank" rel="noopener noreferrer">DATAHOLD s.r.o.</a></p>
      <button class="footer-admin-btn" id="admin-login-btn">Správa</button>
    </div>
  </footer>
`

// ============ LOGIN MODAL ============
const loginModal = document.createElement('div')
loginModal.className = 'modal-overlay'
loginModal.id = 'login-modal'
loginModal.innerHTML = `
  <div class="modal">
    <button class="modal-close" id="login-close">&times;</button>
    <div class="modal-header">
      <img src="${BRAND.logo}" alt="NA&nbsp;ZMRZKU" class="modal-logo" />
      <h2 class="modal-title">Přihlášení</h2>
      <p class="modal-subtitle">Správa příchutí NA&nbsp;ZMRZKU</p>
    </div>
    <form id="login-form" class="login-form">
      <div class="form-field">
        <label for="login-email">E-mail</label>
        <input type="email" id="login-email" placeholder="vas@email.cz" required />
      </div>
      <div class="form-field">
        <label for="login-password">Heslo</label>
        <input type="password" id="login-password" placeholder="Heslo" required />
      </div>
      <p class="login-error" id="login-error"></p>
      <button type="submit" class="btn btn--primary login-submit">Přihlásit se</button>
    </form>
  </div>
`
document.body.appendChild(loginModal)

// ============ ADMIN PANEL ============
const adminPanel = document.createElement('div')
adminPanel.className = 'modal-overlay'
adminPanel.id = 'admin-modal'
adminPanel.innerHTML = `
  <div class="modal modal--admin">
    <button class="modal-close" id="admin-close">&times;</button>
    <div class="modal-header">
      <h2 class="modal-title">Správa nabídky</h2>
      <p class="modal-subtitle" id="admin-user-email"></p>
    </div>

    <!-- ADMIN TABS -->
    <div class="admin-tabs">
      <button class="admin-tab admin-tab--active" data-tab="quick">Rychlé přidání</button>
      <button class="admin-tab" data-tab="custom">Přidat produkt</button>
      <button class="admin-tab" data-tab="current">Produkty</button>
      <button class="admin-tab" data-tab="categories">Kategorie</button>
      <button class="admin-tab" data-tab="hours">Hodiny</button>
    </div>

    <!-- TAB: Quick Add -->
    <div class="admin-tab-content admin-tab-content--active" id="tab-quick">
      <div class="quick-add-controls">
        <div class="quick-add-row">
          <input type="text" id="quick-search" placeholder="Hledat příchuť…" class="quick-search-input" />
          <button type="button" class="btn btn--primary btn--small" id="quick-add-btn">Přidat vybrané <span id="quick-add-count"></span></button>
        </div>
      </div>
      <div class="quick-flavors-grid" id="quick-flavors-grid"></div>
      <p class="quick-add-status" id="quick-add-status"></p>
    </div>

    <!-- TAB: Custom Add -->
    <div class="admin-tab-content" id="tab-custom">
      <form id="flavor-form" class="flavor-form">
        <input type="hidden" id="flavor-edit-id" />
        <div class="flavor-form-row">
          <div class="form-field form-field--grow">
            <label for="flavor-name">Název produktu</label>
            <input type="text" id="flavor-name" placeholder="Např. Pistáciová, Horká čokoláda…" required />
          </div>
          <div class="form-field">
            <label for="flavor-type">Kategorie</label>
            <select id="flavor-type"></select>
          </div>
          <button type="submit" class="btn btn--primary btn--small" id="flavor-submit-btn">Přidat</button>
          <button type="button" class="btn btn--outline btn--small" id="flavor-cancel-btn" hidden>Zrušit</button>
        </div>
        <p class="admin-hint">Novou kategorii (např. Teplé potěšení) založíte v záložce Kategorie.</p>
        <p class="quick-add-status" id="flavor-form-status"></p>
      </form>
    </div>

    <!-- TAB: Current Flavors -->
    <div class="admin-tab-content" id="tab-current">
      <div class="admin-current-actions">
        <button type="button" class="btn btn--outline btn--small btn--danger" id="clear-all-flavors-btn">Smazat vše</button>
      </div>
      <div class="admin-flavors-list" id="admin-flavors-list"></div>
    </div>

    <!-- TAB: Categories -->
    <div class="admin-tab-content" id="tab-categories">
      <form id="category-form" class="category-form">
        <input type="hidden" id="category-edit-id" />
        <div class="flavor-form-row">
          <div class="form-field form-field--icon">
            <label for="category-icon">Ikona</label>
            <input type="text" id="category-icon" maxlength="8" />
          </div>
          <div class="form-field form-field--grow">
            <label for="category-name">Název kategorie</label>
            <input type="text" id="category-name" placeholder="Např. Teplé potěšení" required />
          </div>
          <div class="form-field form-field--color">
            <label for="category-color">Barva</label>
            <input type="color" id="category-color" />
          </div>
        </div>
        <div class="category-pickers">
          <div class="emoji-picker" id="emoji-picker"></div>
          <div class="color-picker" id="color-picker"></div>
        </div>
        <div class="category-form-footer">
          <div class="category-preview-wrap">
            <span class="category-preview-label">Náhled na webu</span>
            <div class="menu-cat category-preview" id="category-preview">
              <div class="menu-cat-head">
                <span class="menu-cat-icon"></span>
                <span class="menu-cat-name"></span>
                <span class="menu-cat-count">3</span>
              </div>
            </div>
          </div>
          <div class="category-form-actions">
            <button type="button" class="btn btn--outline btn--small" id="category-cancel-btn" hidden>Zrušit</button>
            <button type="submit" class="btn btn--primary btn--small" id="category-submit-btn">Přidat kategorii</button>
          </div>
        </div>
        <p class="quick-add-status" id="category-form-status"></p>
      </form>
      <div class="admin-categories-list" id="admin-categories-list"></div>
    </div>

    <!-- TAB: Hours -->
    <div class="admin-tab-content" id="tab-hours">
      <h3 class="admin-section-title">Otevírací doba</h3>
      <div class="admin-hours">
        <div class="admin-hours-loc">
          <label>V Kopečku</label>
          <input type="text" id="hours-kopecku-input" placeholder="Po–Ne: 11:00–18:00" />
        </div>
        <button type="button" class="btn btn--primary btn--small" id="save-hours-btn">Uložit hodiny</button>
      </div>
    </div>

    <div class="admin-actions">
      <button class="btn btn--outline btn--small" id="admin-logout-btn">Odhlásit se</button>
    </div>
  </div>
`
document.body.appendChild(adminPanel)

// ============ ADMIN TABS ============
document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('admin-tab--active'))
    document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('admin-tab-content--active'))
    tab.classList.add('admin-tab--active')
    document.getElementById('tab-' + tab.dataset.tab).classList.add('admin-tab-content--active')
    if (tab.dataset.tab === 'quick') renderQuickAddPanel()
  })
})

// Quick add listeners
document.getElementById('quick-search').addEventListener('input', renderQuickAddPanel)
document.getElementById('quick-add-btn').addEventListener('click', quickAddFlavors)

// Clear all flavors
let allFlavorDocs = []
let allFlavors = []
document.getElementById('clear-all-flavors-btn').addEventListener('click', async () => {
  if (!confirm('Opravdu smazat VŠECHNY příchutě? Tato akce je nevratná.')) return
  for (const d of allFlavorDocs) {
    await deleteDoc(doc(db, 'flavors', d.id))
  }
})

// ============ AUTH LOGIC ============
const loginBtn = document.getElementById('admin-login-btn')
const loginCloseBtn = document.getElementById('login-close')
const loginForm = document.getElementById('login-form')
const loginError = document.getElementById('login-error')
const adminCloseBtn = document.getElementById('admin-close')
const adminLogoutBtn = document.getElementById('admin-logout-btn')

let currentUser = null

function openModal(id) {
  document.getElementById(id).classList.add('modal-overlay--visible')
}
function closeModal(id) {
  document.getElementById(id).classList.remove('modal-overlay--visible')
}

loginBtn.addEventListener('click', () => {
  if (currentUser) {
    openModal('admin-modal')
    renderQuickAddPanel()
  } else {
    openModal('login-modal')
  }
})

loginCloseBtn.addEventListener('click', () => closeModal('login-modal'))
adminCloseBtn.addEventListener('click', () => closeModal('admin-modal'))

loginModal.addEventListener('click', (e) => {
  if (e.target === loginModal) closeModal('login-modal')
})
adminPanel.addEventListener('click', (e) => {
  if (e.target === adminPanel) closeModal('admin-modal')
})

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  loginError.textContent = ''
  const email = document.getElementById('login-email').value
  const password = document.getElementById('login-password').value
  try {
    await signInWithEmailAndPassword(auth, email, password)
    closeModal('login-modal')
    openModal('admin-modal')
    loginForm.reset()
  } catch (err) {
    loginError.textContent = 'Neplatný e-mail nebo heslo'
  }
})

adminLogoutBtn.addEventListener('click', async () => {
  await signOut(auth)
  closeModal('admin-modal')
})

onAuthStateChanged(auth, (user) => {
  currentUser = user
  if (user) {
    loginBtn.textContent = 'Admin'
    loginBtn.classList.add('footer-admin-btn--active')
    document.getElementById('admin-user-email').textContent = user.email
  } else {
    loginBtn.textContent = 'Správa'
    loginBtn.classList.remove('footer-admin-btn--active')
  }
})

// ============ KATEGORIE + PRODUKTY ============
const flavorForm = document.getElementById('flavor-form')
const flavorEditId = document.getElementById('flavor-edit-id')
const flavorNameInput = document.getElementById('flavor-name')
const flavorTypeInput = document.getElementById('flavor-type')
const flavorSubmitBtn = document.getElementById('flavor-submit-btn')
const flavorCancelBtn = document.getElementById('flavor-cancel-btn')
const adminFlavorsList = document.getElementById('admin-flavors-list')
const menuKopecku = document.getElementById('menu-kopecku')
const specialsGrid = document.getElementById('specials-grid')

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

// Výchozí kategorie - id odpovídají starému poli "type" u příchutí
const DEFAULT_CATEGORIES = [
  { id: 'gelato', name: 'Gelato', icon: '🍨', color: '#e87942', order: 1 },
  { id: 'tocena', name: 'Točená zmrzlina', icon: '🍦', color: '#E03B3B', order: 2 },
  { id: 'triste', name: 'Ledová tříšť', icon: '🧊', color: '#3498db', order: 3 },
  { id: 'sorbet', name: 'Sorbet', icon: '🍧', color: '#f59e0b', order: 4 },
  { id: 'special', name: 'Speciality', icon: '🍨', color: '#8b5cf6', order: 99 },
]
const EMOJI_PRESETS = ['🍦', '🍨', '🍧', '🧊', '☕', '🍫', '🧁', '🍰', '🍪', '🥤', '🥛', '🍓', '🥭', '🫐', '🍋', '🍒', '🧇', '🥞', '🍯', '🔥', '⭐', '🎉']
const COLOR_PRESETS = ['#E03B3B', '#e87942', '#f59e0b', '#16a34a', '#0d9488', '#3498db', '#6366f1', '#8b5cf6', '#ec4899', '#92400e', '#475569']

let categories = DEFAULT_CATEGORIES
let categoriesInDb = false

const catById = (id) => categories.find(c => c.id === id)
const catColor = (id) => catById(id)?.color || '#999'

// Starší záznamy mají kategorii schovanou v poli location
function categoryOf(f) {
  if (f.location === 'special') return 'special'
  if (f.location === 'dvora' || f.location === 'triste-dvora') return '' // zrušená pobočka
  if (f.location === 'triste-kopecku' && f.type !== 'special') return 'triste'
  return f.type
}

function productCount(n) {
  return `${n} ${n === 1 ? 'produkt' : n >= 2 && n <= 4 ? 'produkty' : 'produktů'}`
}

function saveErrorText(err) {
  console.error(err)
  return err?.code === 'permission-denied'
    ? 'Neuloženo – nejste přihlášeni. Odhlaste se a přihlaste znovu.'
    : 'Neuloženo – zkontrolujte připojení a zkuste to znovu.'
}

function showStatus(el, text, ok, ms = 4000) {
  el.textContent = text
  el.className = `quick-add-status ${ok ? 'quick-add-status--success' : 'quick-add-status--error'}`
  el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  clearTimeout(el._t)
  el._t = setTimeout(() => { el.textContent = ''; el.className = 'quick-add-status' }, ms)
}

// ============ PREDEFINED FLAVORS ============
const PREDEFINED_FLAVORS = [
  // GELATO
  { name: 'Smetanový základ', type: 'gelato' },
  { name: 'Belgická čokoláda 70%', type: 'gelato' },
  { name: 'Mléčná čokoláda', type: 'gelato' },
  { name: 'Bílá čokoláda & levandule', type: 'gelato' },
  { name: 'Jogurt', type: 'gelato' },
  { name: 'Jogurt & zázvor', type: 'gelato' },
  { name: 'Jogurt & borůvka', type: 'gelato' },
  { name: 'Jogurt & malina', type: 'gelato' },
  { name: 'Mascarpone', type: 'gelato' },
  { name: 'Ricotta', type: 'gelato' },
  { name: 'Tvaroh', type: 'gelato' },
  { name: 'Pistácie', type: 'gelato' },
  { name: 'Lískový oříšek', type: 'gelato' },
  { name: 'Arašíd', type: 'gelato' },
  { name: 'Mandle', type: 'gelato' },
  { name: 'Kokos', type: 'gelato' },
  { name: 'Kokos Vegan', type: 'gelato' },
  { name: 'Slaný karamel', type: 'gelato' },
  { name: 'Malaga', type: 'gelato' },
  { name: 'Káva', type: 'gelato' },
  { name: 'Skořice', type: 'gelato' },
  { name: 'Konopné semínko', type: 'gelato' },
  { name: 'Lotus', type: 'gelato' },
  { name: 'Oreo', type: 'gelato' },
  { name: 'Stracciatella', type: 'gelato' },
  { name: 'Duo Stracciatella', type: 'gelato' },
  { name: 'Kouzelný šmoula', type: 'gelato' },
  { name: 'Taková maková', type: 'gelato' },
  { name: 'Mák & višeň', type: 'gelato' },
  { name: 'Citron', type: 'gelato' },
  { name: 'Pomeranč', type: 'gelato' },
  { name: 'Jahoda', type: 'gelato' },
  { name: 'Smetanová jahoda', type: 'gelato' },
  { name: 'Malina', type: 'gelato' },
  { name: 'Malina & jahoda', type: 'gelato' },
  { name: 'Višeň', type: 'gelato' },
  { name: 'Meruňka', type: 'gelato' },
  { name: 'Hruška', type: 'gelato' },
  { name: 'Švestka', type: 'gelato' },
  { name: 'Mango & maracuja', type: 'gelato' },
  { name: 'Avokádo', type: 'gelato' },
  { name: 'Dračí ovoce', type: 'gelato' },
  { name: 'Černý rybíz', type: 'gelato' },
  { name: 'Borůvka', type: 'gelato' },
  { name: 'Smetanová borůvka', type: 'gelato' },
  { name: 'Borůvka & ostružina', type: 'gelato' },
  { name: 'Lesní směs', type: 'gelato' },
  { name: 'Grep & šampaňské', type: 'gelato' },
  // TOČENÁ
  { name: 'Vanilková', type: 'tocena' },
  { name: 'Čokoládová', type: 'tocena' },
  { name: 'Jahodová', type: 'tocena' },
  { name: 'Jahodová & máta', type: 'tocena' },
  { name: 'Malinová', type: 'tocena' },
  { name: 'Banánová', type: 'tocena' },
  { name: 'Hrušková', type: 'tocena' },
  { name: 'Meruňková', type: 'tocena' },
  { name: 'Citrónová', type: 'tocena' },
  { name: 'Bezová', type: 'tocena' },
  { name: 'Černý rybíz', type: 'tocena' },
  { name: 'Červený rybíz', type: 'tocena' },
  { name: 'Černá višeň', type: 'tocena' },
  { name: 'Lesní směs', type: 'tocena' },
  { name: 'Mango & maracuja', type: 'tocena' },
  { name: 'Kiwi & banán', type: 'tocena' },
  { name: 'Jahoda & banán', type: 'tocena' },
  { name: 'Slaný karamel', type: 'tocena' },
  { name: 'Nutella', type: 'tocena' },
  { name: 'Grep & šampaňské', type: 'tocena' },
  // LEDOVÉ TŘÍŠTĚ
  { name: 'Jahodová tříšť', type: 'triste' },
  { name: 'Malinová tříšť', type: 'triste' },
  { name: 'Citrónová tříšť', type: 'triste' },
  { name: 'Pomerančová tříšť', type: 'triste' },
  { name: 'Mango tříšť', type: 'triste' },
  { name: 'Borůvková tříšť', type: 'triste' },
  { name: 'Višňová tříšť', type: 'triste' },
  { name: 'Bezová tříšť', type: 'triste' },
  { name: 'Kiwi tříšť', type: 'triste' },
  { name: 'Grep tříšť', type: 'triste' },
]

// Quick-add state
let selectedQuickFlavors = new Set()

function renderQuickAddPanel() {
  const searchInput = document.getElementById('quick-search')
  const searchVal = searchInput ? searchInput.value.toLowerCase() : ''
  const container = document.getElementById('quick-flavors-grid')
  if (!container) return

  const groups = ['gelato', 'tocena', 'triste'].map(catById).filter(Boolean)

  container.innerHTML = groups.map(g => {
    const items = PREDEFINED_FLAVORS.filter(f => f.type === g.id && f.name.toLowerCase().includes(searchVal))
    if (items.length === 0) return ''
    return `
      <div class="quick-group-label" style="color: ${g.color}">${esc(g.icon)} ${esc(g.name)} (${items.length})</div>
      ${items.map(f => `
        <button type="button" class="quick-chip ${selectedQuickFlavors.has(f.name + '|' + f.type) ? 'quick-chip--selected' : ''}"
          data-name="${f.name}" data-type="${f.type}"
          style="--chip-color: ${g.color}">
          ${f.name}
        </button>
      `).join('')}
    `
  }).join('')

  container.querySelectorAll('.quick-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.name + '|' + btn.dataset.type
      if (selectedQuickFlavors.has(key)) {
        selectedQuickFlavors.delete(key)
        btn.classList.remove('quick-chip--selected')
      } else {
        selectedQuickFlavors.add(key)
        btn.classList.add('quick-chip--selected')
      }
      updateQuickAddCount()
    })
  })
}

function updateQuickAddCount() {
  const countEl = document.getElementById('quick-add-count')
  if (countEl) {
    countEl.textContent = selectedQuickFlavors.size > 0 ? `(${selectedQuickFlavors.size})` : ''
  }
}

async function quickAddFlavors() {
  const statusEl = document.getElementById('quick-add-status')
  if (selectedQuickFlavors.size === 0) {
    showStatus(statusEl, 'Vyberte alespoň jednu příchuť', false, 2000)
    return
  }

  statusEl.textContent = `Přidávám ${selectedQuickFlavors.size} příchutí...`
  statusEl.className = 'quick-add-status'

  try {
    for (const key of selectedQuickFlavors) {
      const [name, type] = key.split('|')
      await addDoc(collection(db, 'flavors'), { name, type, location: 'kopecku', createdAt: new Date() })
    }
  } catch (err) {
    showStatus(statusEl, saveErrorText(err), false)
    return
  }

  showStatus(statusEl, `Přidáno ${selectedQuickFlavors.size} příchutí!`, true, 2500)
  selectedQuickFlavors.clear()
  renderQuickAddPanel()
  updateQuickAddCount()
}

// ---------- Produkty ----------
function renderCategoryOptions() {
  const current = flavorTypeInput.value
  flavorTypeInput.innerHTML = categories.map(c => `<option value="${esc(c.id)}">${esc(c.icon)} ${esc(c.name)}</option>`).join('')
  if (catById(current)) flavorTypeInput.value = current
}

function resetFlavorForm() {
  flavorEditId.value = ''
  flavorNameInput.value = ''
  flavorSubmitBtn.textContent = 'Přidat'
  flavorCancelBtn.hidden = true
}

flavorCancelBtn.addEventListener('click', resetFlavorForm)

flavorForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = flavorNameInput.value.trim()
  const type = flavorTypeInput.value
  const statusEl = document.getElementById('flavor-form-status')
  if (!name || !type) return

  flavorSubmitBtn.disabled = true
  try {
    if (flavorEditId.value) {
      await updateDoc(doc(db, 'flavors', flavorEditId.value), { name, type, location: 'kopecku' })
    } else {
      await addDoc(collection(db, 'flavors'), { name, type, location: 'kopecku', createdAt: new Date() })
    }
    resetFlavorForm()
    const cat = catById(type)
    showStatus(statusEl, type === 'special'
      ? `Uloženo – „${name}“ je na webu v sekci Naše speciality`
      : `Uloženo – „${name}“ je na webu v kategorii ${cat?.name || ''}`, true)
  } catch (err) {
    showStatus(statusEl, saveErrorText(err), false)
  }
  flavorSubmitBtn.disabled = false
})

function startEdit(id) {
  const f = allFlavors.find(x => x.id === id)
  if (!f) return
  flavorEditId.value = id
  flavorNameInput.value = f.name
  flavorTypeInput.value = catById(categoryOf(f)) ? categoryOf(f) : categories[0].id
  flavorSubmitBtn.textContent = 'Uložit'
  flavorCancelBtn.hidden = false
  document.querySelector('.admin-tab[data-tab="custom"]').click()
  flavorNameInput.focus()
}

async function deleteFlavor(id) {
  if (confirm('Opravdu smazat tento produkt?')) {
    await deleteDoc(doc(db, 'flavors', id))
  }
}

adminFlavorsList.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-edit], [data-delete], [data-add-to]')
  if (!btn) return
  if (btn.dataset.edit) startEdit(btn.dataset.edit)
  else if (btn.dataset.delete) deleteFlavor(btn.dataset.delete)
  else {
    resetFlavorForm()
    flavorTypeInput.value = btn.dataset.addTo
    document.querySelector('.admin-tab[data-tab="custom"]').click()
    flavorNameInput.focus()
  }
})

// ---------- Kategorie ----------
const categoryForm = document.getElementById('category-form')
const categoryEditId = document.getElementById('category-edit-id')
const categoryNameInput = document.getElementById('category-name')
const categoryIconInput = document.getElementById('category-icon')
const categoryColorInput = document.getElementById('category-color')
const categorySubmitBtn = document.getElementById('category-submit-btn')
const categoryCancelBtn = document.getElementById('category-cancel-btn')
const categoryStatus = document.getElementById('category-form-status')
const categoryPreview = document.getElementById('category-preview')
const adminCategoriesList = document.getElementById('admin-categories-list')

document.getElementById('emoji-picker').innerHTML = EMOJI_PRESETS.map(e => `<button type="button" class="emoji-btn" data-emoji="${e}">${e}</button>`).join('')
document.getElementById('color-picker').innerHTML = COLOR_PRESETS.map(c => `<button type="button" class="color-swatch" data-color="${c}" style="--swatch: ${c}" aria-label="Barva ${c}"></button>`).join('')

function updateCategoryPreview() {
  const color = categoryColorInput.value
  categoryPreview.style.setProperty('--cat-color', color)
  categoryPreview.querySelector('.menu-cat-icon').textContent = categoryIconInput.value || '🍦'
  categoryPreview.querySelector('.menu-cat-name').textContent = categoryNameInput.value.trim() || 'Název kategorie'
  document.querySelectorAll('.emoji-btn').forEach(b => b.classList.toggle('emoji-btn--active', b.dataset.emoji === categoryIconInput.value))
  document.querySelectorAll('.color-swatch').forEach(b => b.classList.toggle('color-swatch--active', b.dataset.color.toLowerCase() === color.toLowerCase()))
}

document.getElementById('emoji-picker').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-emoji]')
  if (!btn) return
  categoryIconInput.value = btn.dataset.emoji
  updateCategoryPreview()
})
document.getElementById('color-picker').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-color]')
  if (!btn) return
  categoryColorInput.value = btn.dataset.color
  updateCategoryPreview()
})
;[categoryNameInput, categoryIconInput, categoryColorInput].forEach(el => el.addEventListener('input', updateCategoryPreview))

function resetCategoryForm() {
  categoryEditId.value = ''
  categoryNameInput.value = ''
  categoryIconInput.value = '🍦'
  categoryColorInput.value = '#E03B3B'
  categorySubmitBtn.textContent = 'Přidat kategorii'
  categoryCancelBtn.hidden = true
  updateCategoryPreview()
}
categoryCancelBtn.addEventListener('click', resetCategoryForm)

// Dokud kategorie v databázi nejsou, ukazují se výchozí - před první změnou je uložíme
async function ensureCategoriesInDb() {
  if (categoriesInDb) return
  for (const { id, ...data } of DEFAULT_CATEGORIES) {
    await setDoc(doc(db, 'categories', id), data)
  }
  categoriesInDb = true
}

categoryForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = categoryNameInput.value.trim()
  if (!name) return
  const data = { name, icon: categoryIconInput.value.trim() || '🍦', color: categoryColorInput.value }

  categorySubmitBtn.disabled = true
  try {
    await ensureCategoriesInDb()
    if (categoryEditId.value) {
      await updateDoc(doc(db, 'categories', categoryEditId.value), data)
      showStatus(categoryStatus, `Kategorie „${name}“ uložena`, true)
    } else {
      const maxOrder = Math.max(0, ...categories.filter(c => c.id !== 'special').map(c => c.order || 0))
      await addDoc(collection(db, 'categories'), { ...data, order: maxOrder + 1 })
      showStatus(categoryStatus, `Kategorie „${name}“ přidána – teď do ní přidejte produkty`, true)
    }
    resetCategoryForm()
  } catch (err) {
    showStatus(categoryStatus, saveErrorText(err), false)
  }
  categorySubmitBtn.disabled = false
})

async function moveCategory(id, dir) {
  const list = categories.filter(c => c.id !== 'special')
  const i = list.findIndex(c => c.id === id)
  const other = list[i + dir]
  if (!other) return
  try {
    await ensureCategoriesInDb()
    // Pořadí přečíslujeme celé, aby se nepletly stejné hodnoty
    const reordered = [...list]
    ;[reordered[i], reordered[i + dir]] = [reordered[i + dir], reordered[i]]
    for (const [idx, c] of reordered.entries()) {
      if (c.order !== idx + 1) await updateDoc(doc(db, 'categories', c.id), { order: idx + 1 })
    }
  } catch (err) {
    showStatus(categoryStatus, saveErrorText(err), false)
  }
}

async function deleteCategory(id) {
  const cat = catById(id)
  const count = allFlavors.filter(f => categoryOf(f) === id).length
  if (count > 0) {
    showStatus(categoryStatus, `„${cat.name}“ obsahuje ${productCount(count)} – nejdřív je smažte nebo přesuňte do jiné kategorie.`, false, 6000)
    return
  }
  if (!confirm(`Opravdu smazat kategorii „${cat.name}“?`)) return
  try {
    await ensureCategoriesInDb()
    await deleteDoc(doc(db, 'categories', id))
  } catch (err) {
    showStatus(categoryStatus, saveErrorText(err), false)
  }
}

function startCategoryEdit(id) {
  const cat = catById(id)
  categoryEditId.value = id
  categoryNameInput.value = cat.name
  categoryIconInput.value = cat.icon
  categoryColorInput.value = cat.color
  categorySubmitBtn.textContent = 'Uložit kategorii'
  categoryCancelBtn.hidden = false
  updateCategoryPreview()
  categoryNameInput.focus()
}

adminCategoriesList.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-cat]')
  if (!btn) return
  const { cat, action } = btn.dataset
  if (action === 'up') moveCategory(cat, -1)
  else if (action === 'down') moveCategory(cat, 1)
  else if (action === 'edit') startCategoryEdit(cat)
  else if (action === 'delete') deleteCategory(cat)
})

function renderAdminCategories() {
  const list = categories.filter(c => c.id !== 'special')
  const special = catById('special')
  const row = (c, i) => {
    const count = allFlavors.filter(f => categoryOf(f) === c.id).length
    const isSpecial = c.id === 'special'
    return `
      <div class="admin-cat-item" style="--cat-color: ${c.color}">
        <span class="admin-cat-icon">${esc(c.icon)}</span>
        <div class="admin-cat-info">
          <span class="admin-cat-name">${esc(c.name)}</span>
          <span class="admin-cat-meta">${productCount(count)}${isSpecial ? ' · na webu jako karty v sekci Naše speciality' : ''}</span>
        </div>
        ${isSpecial ? '' : `
        <div class="admin-cat-order">
          <button type="button" data-cat="${c.id}" data-action="up" ${i === 0 ? 'disabled' : ''} aria-label="Posunout nahoru">▲</button>
          <button type="button" data-cat="${c.id}" data-action="down" ${i === list.length - 1 ? 'disabled' : ''} aria-label="Posunout dolů">▼</button>
        </div>`}
        <div class="admin-flavor-actions">
          <button type="button" data-cat="${c.id}" data-action="edit" class="admin-btn-edit">Upravit</button>
          ${isSpecial ? '' : `<button type="button" data-cat="${c.id}" data-action="delete" class="admin-btn-delete">Smazat</button>`}
        </div>
      </div>`
  }
  adminCategoriesList.innerHTML = `
    <h4 class="admin-group-title">Kategorie na webu (v tomto pořadí)</h4>
    ${list.map(row).join('')}
    ${special ? row(special, 0) : ''}
  `
}

function renderAdminFlavors() {
  if (allFlavors.length === 0) {
    adminFlavorsList.innerHTML = '<p class="admin-empty">Zatím žádné produkty. Přidejte první.</p>'
    return
  }
  const grouped = categories.map(c => ({ c, items: allFlavors.filter(f => categoryOf(f) === c.id) }))
  const orphans = allFlavors.filter(f => !catById(categoryOf(f)))
  if (orphans.length) grouped.push({ c: { id: '', name: 'Bez kategorie – upravte nebo smažte', icon: '❔', color: '#999' }, items: orphans })

  adminFlavorsList.innerHTML = grouped.map(({ c, items }) => `
    <div class="admin-group" style="--cat-color: ${c.color}">
      <div class="admin-group-head">
        <h4 class="admin-group-title admin-group-title--cat">${esc(c.icon)} ${esc(c.name)} <span class="admin-group-count">${items.length}</span></h4>
        ${c.id ? `<button type="button" class="admin-group-add" data-add-to="${esc(c.id)}">+ Přidat</button>` : ''}
      </div>
      ${items.length === 0 ? '<p class="admin-group-empty">Zatím prázdné – na webu se nezobrazí</p>' : items.map(f => `
        <div class="admin-flavor-item">
          <span class="admin-flavor-dot" style="background: ${c.color}"></span>
          <span class="admin-flavor-name">${esc(f.name)}</span>
          <div class="admin-flavor-actions">
            <button type="button" data-edit="${f.id}" class="admin-btn-edit">Upravit</button>
            <button type="button" data-delete="${f.id}" class="admin-btn-delete">Smazat</button>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('')
}

// ---------- Veřejný web ----------
function renderMenu() {
  // Ve stejném pořadí, v jakém byly přidány
  const items = [...allFlavors].reverse()
  const groups = categories
    .filter(c => c.id !== 'special')
    .map(c => ({ c, items: items.filter(f => categoryOf(f) === c.id) }))
    .filter(g => g.items.length > 0)

  if (groups.length === 0) {
    menuKopecku.innerHTML = '<div class="flavors-empty-box"><span class="flavors-empty-icon">🍦</span><p class="flavors-empty">Příchutě brzy doplníme</p></div>'
    return
  }
  menuKopecku.innerHTML = groups.map(({ c, items }) => `
    <div class="menu-cat" style="--cat-color: ${c.color}">
      <div class="menu-cat-head">
        <span class="menu-cat-icon">${esc(c.icon)}</span>
        <span class="menu-cat-name">${esc(c.name)}</span>
        <span class="menu-cat-count">${items.length}</span>
      </div>
      <div class="menu-cat-items">${items.map(f => `
        <span class="menu-item"><span class="menu-item-dot"></span>${esc(f.name)}</span>`).join('')}
      </div>
    </div>
  `).join('')
}

// Speciality z adminu - přidají se za pevné karty pohárů
function renderSpecialCards() {
  const cat = catById('special') || DEFAULT_CATEGORIES.find(c => c.id === 'special')
  const specials = [...allFlavors].reverse().filter(f => categoryOf(f) === 'special')
  specialsGrid.querySelectorAll('.special-card--dynamic').forEach(el => el.remove())
  specialsGrid.insertAdjacentHTML('beforeend', specials.map(f => `
    <div class="special-card special-card--dynamic" style="--accent: ${cat.color}">
      <span class="special-emoji">${esc(cat.icon)}</span>
      <span class="special-name">${esc(f.name)}</span>
    </div>
  `).join(''))
}

let flavorsLoaded = false
function renderAll() {
  renderCategoryOptions()
  renderAdminCategories()
  if (!flavorsLoaded) return
  renderMenu()
  renderSpecialCards()
  renderAdminFlavors()
}

// Realtime listeners
onSnapshot(collection(db, 'categories'), (snapshot) => {
  categoriesInDb = !snapshot.empty
  const fromDb = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
  categories = categoriesInDb ? fromDb : DEFAULT_CATEGORIES
  if (!catById('special')) categories = [...categories, DEFAULT_CATEGORIES.find(c => c.id === 'special')]
  categories = [...categories].sort((a, b) => (a.order ?? 50) - (b.order ?? 50))
  renderAll()
  renderQuickAddPanel()
})

onSnapshot(query(collection(db, 'flavors'), orderBy('createdAt', 'desc')), (snapshot) => {
  allFlavorDocs = snapshot.docs.map(d => ({ id: d.id }))
  allFlavors = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
  flavorsLoaded = true
  renderAll()
})

resetCategoryForm()
renderAll()

// ============ OPENING HOURS (Firestore) ============
const hoursKopeckuEl = document.getElementById('hours-kopecku')
const hoursKopeckuInput = document.getElementById('hours-kopecku-input')
const saveHoursBtn = document.getElementById('save-hours-btn')

// Default hours (fallback)
const defaultHours = {
  kopecku: { text: 'Po–Ne: 11:00–18:00', open: '11:00', close: '18:00' },
}

function isOpenNow(openTime, closeTime) {
  const now = new Date()
  const [oh, om] = openTime.split(':').map(Number)
  const [ch, cm] = closeTime.split(':').map(Number)
  const mins = now.getHours() * 60 + now.getMinutes()
  return mins >= oh * 60 + om && mins < ch * 60 + cm
}

function renderHours(el, data) {
  const open = isOpenNow(data.open, data.close)
  el.innerHTML = `
    ${data.text}
    <span class="hours-status ${open ? 'hours-status--open' : 'hours-status--closed'}">
      ${open ? 'Otevřeno' : 'Zavřeno'}
    </span>
  `
}

// Load hours from Firestore
onSnapshot(doc(db, 'settings', 'hours'), (snap) => {
  const data = snap.exists() ? snap.data() : null
  const kopeckuData = data?.kopecku || defaultHours.kopecku

  renderHours(hoursKopeckuEl, kopeckuData)

  // Fill admin inputs
  hoursKopeckuInput.value = kopeckuData.text
})

// Save hours from admin
saveHoursBtn.addEventListener('click', async () => {
  const kopeckuText = hoursKopeckuInput.value.trim()

  // Parse open/close times from text like "Po–Ne: 11:00–18:00"
  function parseTimes(text) {
    const match = text.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/)
    return match ? { open: match[1], close: match[2] } : { open: '00:00', close: '23:59' }
  }

  const kopeckuTimes = parseTimes(kopeckuText)

  await setDoc(doc(db, 'settings', 'hours'), {
    kopecku: { text: kopeckuText, ...kopeckuTimes },
  })

  saveHoursBtn.textContent = 'Uloženo!'
  setTimeout(() => { saveHoursBtn.textContent = 'Uložit hodiny' }, 1500)
})

// Refresh open/closed status every minute
setInterval(() => {
  const kopeckuData = { text: hoursKopeckuEl.textContent.replace(/Otevřeno|Zavřeno/g, '').trim() }
  // Re-trigger by reading the snapshot again - it's already listening
}, 60000)

// Animované lentičky / sprinkles - barevné jako Smarties
const sprinkleColors = [
  '#E03B3B', '#e74c3c', '#e87942', '#f39c12', '#f59e0b',
  '#27ae60', '#2ecc71', '#3498db', '#2980b9', '#8e44ad',
  '#9b59b6', '#f472b6', '#e91e63', '#ff6b6b', '#feca57',
  '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#01a3a4'
]
const storySection = document.querySelector('.story')
if (storySection) {
  for (let i = 0; i < 40; i++) {
    const dot = document.createElement('span')
    dot.className = 'sprinkle'
    const size = 6 + Math.random() * 10
    dot.style.cssText = `
      width: ${size}px;
      height: ${size * 0.85}px;
      background: ${sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)]};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-duration: ${5 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 10}s;
    `
    storySection.appendChild(dot)
  }
}

// ============ COOKIE BANNER ============
const cookieDismissed = localStorage.getItem('cookie-ok')
if (!cookieDismissed) {
  const cookieBanner = document.createElement('div')
  cookieBanner.className = 'cookie-banner'
  cookieBanner.innerHTML = `
    <div class="cookie-inner">
      <p class="cookie-text">Tento web používá pouze technické cookies nezbytné pro jeho fungování. Žádná data o vás neshromažďujeme ani nesledujeme.</p>
      <button class="cookie-btn" id="cookie-ok">Rozumím</button>
    </div>
  `
  document.body.appendChild(cookieBanner)
  requestAnimationFrame(() => cookieBanner.classList.add('cookie-banner--visible'))
  document.getElementById('cookie-ok').addEventListener('click', () => {
    localStorage.setItem('cookie-ok', '1')
    cookieBanner.classList.remove('cookie-banner--visible')
    setTimeout(() => cookieBanner.remove(), 400)
  })
}

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible')
  })
}, { threshold: 0.1 })

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el))

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  })
})
