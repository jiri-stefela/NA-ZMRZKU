import './style.css'
import logoLocal from './logo-nazmrzku.jpg'
import zmrzkaPhoto from './470170214_1018877173587670_5343044287738702859_n.jpg'

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
      <img src="${BRAND.logo}" alt="NA ZMRZKU" class="loader-logo" />
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
        <img src="${BRAND.logo}" alt="NA ZMRZKU logo" />
      </div>
      <h1>NA ZMRZKU</h1>
      <p class="hero-tagline">Když na zmrzku, tak Na zmrzku</p>
      <p class="hero-location">${svg.pin} Hradec Králové</p>
      <div class="hero-buttons">
        <a href="#pribeh" class="btn btn--primary">Náš příběh</a>
        <a href="#kontakt" class="btn btn--outline">Kde nás najdete</a>
      </div>
    </div>
    <div class="scroll-indicator">${svg.down}</div>
  </section>

  <!-- NÁŠ PŘÍBĚH — sjednocená sekce -->
  <section class="section story" id="pribeh">
    <div class="section-inner">

      <!-- Úvod -->
      <div class="story-intro fade-in">
        <h2 class="intro-heading">Zmrzku žereme.</h2>
        <p class="intro-sub">Nebo spíš milujeme...</p>
        <p class="intro-text">
          Zmrzlinu, kterou vyrábíme s láskou a péčí od roku 2016. Každý kornoutek NA ZMRZKU
          je poctivá domácí zmrzlina, která vám přinese nejen osvěžení, ale i radost.
        </p>
      </div>

      <!-- Fotka + text vedle sebe -->
      <div class="story-layout fade-in">
        <div class="story-photo">
          <img src="${BRAND.photo}" alt="Zmrzlina NA ZMRZKU" />
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
            Udělejte si chvilku pro sebe. Zastavte se u nás nebo si zmrzlinu nechte doručit
            až k vám domů. U nás je každý kousek příležitostí dopřát si něco výjimečného.
          </p>
        </div>
      </div>

      <!-- Citát -->
      <div class="story-quote fade-in">
        <blockquote class="quote-text">
          „Zmrzku děláme jinak, po svém. S láskou, vášní a poctivostí."
        </blockquote>
        <p class="quote-author">— Jiří, zakladatel NA ZMRZKU</p>
      </div>

      <!-- Co nás dělá jiné -->
      <div class="story-values fade-in">
        <div class="value-item">
          <h3 class="value-title">Poctivost, která se nezapře</h3>
          <p class="value-desc">Každý kornoutek je připraven z kvalitních surovin, které vybíráme s maximální péčí.</p>
        </div>
        <div class="value-item">
          <h3 class="value-title">Láska k řemeslu</h3>
          <p class="value-desc">Každý detail je pro nás důležitý. Zmrzlinu vyrábíme s vášní, abyste si ji mohli opravdu užít.</p>
        </div>
        <div class="value-item">
          <h3 class="value-title">Moment pro vás</h3>
          <p class="value-desc">Zastavte se na chvíli pro sebe, nechte se hýčkat chutí, která vás osvěží a potěší.</p>
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
          <span class="stat-number">2</span>
          <span class="stat-label">Pobočky v HK</span>
        </div>
      </div>

    </div>
  </section>

  <!-- PŘEDÁNÍ -->
  <section class="section handover-section" id="novinka">
    <div class="section-inner">
      <div class="handover-card fade-in">
        <div class="handover-badge">Novinka 2026</div>
        <h2 class="handover-title">Předávám žezlo</h2>
        <p class="handover-subtitle">NA ZMRZKU má nové šéfy</p>
        <p class="handover-text">
          <strong>Jiřin a Nikouš</strong> přebírají zmrzlinové království.
        </p>
        <div class="handover-columns">
          <div class="handover-col">
            <h4 class="handover-col-title">Co zůstává?</h4>
            <div class="handover-item">${svg.check} <span>Receptury, které zbožňujete</span></div>
            <div class="handover-item">${svg.check} <span>Kvalita na prvním místě</span></div>
            <div class="handover-item">${svg.check} <span>Vaše oblíbená místa</span></div>
          </div>
          <div class="handover-col">
            <h4 class="handover-col-title">Co přichází?</h4>
            <div class="handover-item">${svg.arrow} <span>Nové trendy</span></div>
            <div class="handover-item">${svg.arrow} <span>Nové příchutě</span></div>
            <div class="handover-item">${svg.arrow} <span>Nové nápady</span></div>
          </div>
        </div>
        <p class="handover-note">
          „První sezónu budu vše sledovat z povzdálí, abych se přesvědčil,
          že všechno dělají správně." — Jiří
        </p>
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
        <p class="section-subtitle">NA ZMRZKU v médiích</p>
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
          <h3 class="media-title">Za kulisami NA ZMRZKU</h3>
          <p class="media-desc">Jak vyrábíme zmrzlinu — reportáž Prima CNN.</p>
          <span class="media-source">Prima CNN</span>
        </a>
        <a href="https://hradecky.denik.cz/zpravy_region/zmrzlina-na-zmrzku-trebes-hradec-rozhovor-20250125.html" target="_blank" rel="noopener noreferrer" class="media-card media-card--link">
          <div class="media-icon">${svg.news}</div>
          <h3 class="media-title">Rozhovor v Hradeckém deníku</h3>
          <p class="media-desc">Jak NA ZMRZKU přináší radost Hradečákům.</p>
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

  <!-- KONTAKT -->
  <section class="section contact" id="kontakt">
    <div class="section-inner">
      <div class="section-header fade-in">
        <h2 class="section-title">Kde nás najdete</h2>
        <p class="section-subtitle">Stavte se k nám na zmrzku</p>
      </div>
      <div class="contact-grid fade-in">
        <div class="contact-card">
          <h3 class="contact-card-title">${svg.pin} V Kopečku</h3>
          <div class="contact-item">${svg.pin} <span>V Kopečku 163, Hradec Králové</span></div>
          <div class="contact-item">${svg.clock} <span>Po\u2013Ne: 11:00\u201318:00</span></div>
          <div class="contact-rating">
            <span class="rating-stars">4,6</span>
            <span class="rating-count">188 recenzí</span>
          </div>
          <div class="contact-links">
            <a href="https://maps.app.goo.gl/We5ZpddgCA5yF5YA7" target="_blank" rel="noopener noreferrer" class="contact-link">Navigovat</a>
            <a href="https://maps.app.goo.gl/We5ZpddgCA5yF5YA7" target="_blank" rel="noopener noreferrer" class="contact-link contact-link--review">Napsat recenzi</a>
          </div>
        </div>
        <div class="contact-card">
          <h3 class="contact-card-title">${svg.pin} U Dvora</h3>
          <div class="contact-item">${svg.pin} <span>U Dvora 839, Hradec Králové</span></div>
          <div class="contact-item">${svg.clock} <span>Po\u2013Ne: 13:00\u201318:00</span></div>
          <div class="contact-rating">
            <span class="rating-stars">4,6</span>
            <span class="rating-count">207 recenzí</span>
          </div>
          <div class="contact-links">
            <a href="https://maps.app.goo.gl/sk4FJPn1xfHAeRGz9" target="_blank" rel="noopener noreferrer" class="contact-link">Navigovat</a>
            <a href="https://maps.app.goo.gl/sk4FJPn1xfHAeRGz9" target="_blank" rel="noopener noreferrer" class="contact-link contact-link--review">Napsat recenzi</a>
          </div>
        </div>
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
          ${svg.fb} NA ZMRZKU
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
        <img src="${BRAND.logo}" alt="NA ZMRZKU" />
      </div>
      <p>&copy; ${new Date().getFullYear()} NA ZMRZKU — Poctivá zmrzlina z Hradce Králové</p>
      <p class="footer-partner">IT partner: <a href="https://www.datahold.cz" target="_blank" rel="noopener noreferrer">DATAHOLD s.r.o.</a></p>
    </div>
  </footer>
`

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
