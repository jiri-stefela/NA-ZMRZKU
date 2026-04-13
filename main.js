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
            <div class="loc-card-row">${svg.pin} <span>V Kopečku 163, 500 02 Hradec Králové – Třebeš</span></div>
            <div class="loc-card-row">${svg.clock} <span id="hours-kopecku">Po–Ne: 11:00–18:00</span></div>
          </div>
          <div class="loc-card-rating">
            <span class="rating-stars">4,6</span>
            <span class="rating-count">188 recenzí</span>
          </div>
          <div class="loc-card-flavors" id="flavors-kopecku">
            <div class="flavors-loading">Načítám příchutě…</div>
          </div>
          <div class="loc-card-actions">
            <a href="https://maps.app.goo.gl/We5ZpddgCA5yF5YA7" target="_blank" rel="noopener noreferrer" class="contact-link">Navigovat</a>
            <a href="https://maps.app.goo.gl/We5ZpddgCA5yF5YA7" target="_blank" rel="noopener noreferrer" class="contact-link contact-link--review">Napsat recenzi</a>
          </div>
        </div>

        <!-- U DVORA -->
        <div class="loc-card">
          <div class="loc-card-icon">${svg.cone}</div>
          <div class="loc-card-head">
            <h3 class="loc-card-name">${svg.pin} NA&nbsp;ZMRZKU U Dvora</h3>
            <span class="loc-card-badge">2 točené</span>
          </div>
          <div class="loc-card-info">
            <div class="loc-card-row">${svg.pin} <span>U Dvora 839, 500 03 Hradec Králové</span></div>
            <div class="loc-card-row">${svg.clock} <span id="hours-dvora">Po–Ne: 13:00–18:00</span></div>
          </div>
          <div class="loc-card-rating">
            <span class="rating-stars">4,6</span>
            <span class="rating-count">207 recenzí</span>
          </div>
          <div class="loc-card-flavors" id="flavors-dvora">
            <div class="flavors-loading">Načítám příchutě…</div>
          </div>
          <div class="loc-card-actions">
            <a href="https://maps.app.goo.gl/sk4FJPn1xfHAeRGz9" target="_blank" rel="noopener noreferrer" class="contact-link">Navigovat</a>
            <a href="https://maps.app.goo.gl/sk4FJPn1xfHAeRGz9" target="_blank" rel="noopener noreferrer" class="contact-link contact-link--review">Napsat recenzi</a>
          </div>
        </div>
      </div>

      <!-- SPECIALITY - poháry a káva -->
      <div class="loc-specials fade-in">
        <h3 class="loc-specials-title">Naše speciality</h3>
        <div class="specials-grid">
          <div class="special-card">
            <img src="https://www.nazmrzku.cz/wp-content/uploads/2022/03/Pohar-hradecke-mango.png" alt="Hradecké Mango" class="special-img" loading="lazy" />
            <span class="special-name">Hradecké Mango</span>
          </div>
          <div class="special-card">
            <img src="https://www.nazmrzku.cz/wp-content/uploads/2020/03/Poh%C3%A1r-hradecke-boruvky.png" alt="Hradecké Borůvky" class="special-img" loading="lazy" />
            <span class="special-name">Hradecké Borůvky</span>
          </div>
          <div class="special-card">
            <img src="https://www.nazmrzku.cz/wp-content/uploads/2020/03/Poh%C3%A1r-hradeck%C3%A9-maliny.png" alt="Hradecké Maliny" class="special-img" loading="lazy" />
            <span class="special-name">Hradecké Maliny</span>
          </div>
          <div class="special-card special-card--highlight">
            <img src="https://www.nazmrzku.cz/wp-content/uploads/2020/03/Ledova-kava.png" alt="Ledová káva" class="special-img" loading="lazy" />
            <span class="special-name">Ledová káva</span>
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
          <span class="stat-number">2</span>
          <span class="stat-label">Pobočky v HK</span>
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
      <h2 class="modal-title">Správa příchutí</h2>
      <p class="modal-subtitle" id="admin-user-email"></p>
    </div>

    <!-- ADMIN TABS -->
    <div class="admin-tabs">
      <button class="admin-tab admin-tab--active" data-tab="quick">Rychlé přidání</button>
      <button class="admin-tab" data-tab="custom">Vlastní příchuť</button>
      <button class="admin-tab" data-tab="current">Aktuální příchutě</button>
      <button class="admin-tab" data-tab="hours">Hodiny</button>
    </div>

    <!-- TAB: Quick Add -->
    <div class="admin-tab-content admin-tab-content--active" id="tab-quick">
      <div class="quick-add-controls">
        <input type="text" id="quick-search" placeholder="Hledat příchuť…" class="quick-search-input" />
        <div class="quick-add-row">
          <div class="form-field">
            <label for="quick-location">Provozovna</label>
            <select id="quick-location">
              <option value="kopecku">V Kopečku</option>
              <option value="dvora">U Dvora</option>
              <option value="special">Specialita</option>
            </select>
          </div>
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
            <label for="flavor-name">Název příchutě</label>
            <input type="text" id="flavor-name" placeholder="Např. Pistáciová" required />
          </div>
          <div class="form-field">
            <label for="flavor-type">Typ</label>
            <select id="flavor-type">
              <option value="tocena">Točená</option>
              <option value="gelato">Gelato</option>
              <option value="sorbet">Sorbet</option>
              <option value="special">Specialita</option>
            </select>
          </div>
          <div class="form-field">
            <label for="flavor-location">Provozovna</label>
            <select id="flavor-location">
              <option value="kopecku">V Kopečku</option>
              <option value="dvora">U Dvora</option>
              <option value="special">Specialita</option>
            </select>
          </div>
          <button type="submit" class="btn btn--primary btn--small" id="flavor-submit-btn">Přidat</button>
        </div>
      </form>
    </div>

    <!-- TAB: Current Flavors -->
    <div class="admin-tab-content" id="tab-current">
      <div class="admin-current-actions">
        <button type="button" class="btn btn--outline btn--small btn--danger" id="clear-all-flavors-btn">Smazat vše</button>
      </div>
      <div class="admin-flavors-list" id="admin-flavors-list"></div>
    </div>

    <!-- TAB: Hours -->
    <div class="admin-tab-content" id="tab-hours">
      <h3 class="admin-section-title">Otevírací doba</h3>
      <div class="admin-hours">
        <div class="admin-hours-loc">
          <label>V Kopečku</label>
          <input type="text" id="hours-kopecku-input" placeholder="Po–Ne: 11:00–18:00" />
        </div>
        <div class="admin-hours-loc">
          <label>U Dvora</label>
          <input type="text" id="hours-dvora-input" placeholder="Po–Ne: 13:00–18:00" />
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

// ============ FLAVORS CRUD ============
const flavorForm = document.getElementById('flavor-form')
const flavorEditId = document.getElementById('flavor-edit-id')
const flavorNameInput = document.getElementById('flavor-name')
const flavorTypeInput = document.getElementById('flavor-type')
const flavorLocationInput = document.getElementById('flavor-location')
const flavorSubmitBtn = document.getElementById('flavor-submit-btn')
const adminFlavorsList = document.getElementById('admin-flavors-list')
const flavorsKopecku = document.getElementById('flavors-kopecku')
const flavorsDvora = document.getElementById('flavors-dvora')
const flavorsSpecials = document.getElementById('flavors-specials')

const typeLabels = { tocena: 'Točená', gelato: 'Gelato', sorbet: 'Sorbet', special: 'Specialita' }
const typeColors = { tocena: '#E03B3B', gelato: '#e87942', sorbet: '#f59e0b', special: '#8b5cf6' }

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
]

// Quick-add state
let selectedQuickFlavors = new Set()

function renderQuickAddPanel() {
  const searchInput = document.getElementById('quick-search')
  const searchVal = searchInput ? searchInput.value.toLowerCase() : ''
  const container = document.getElementById('quick-flavors-grid')
  if (!container) return

  const gelatoFlavors = PREDEFINED_FLAVORS.filter(f => f.type === 'gelato' && f.name.toLowerCase().includes(searchVal))
  const tocenaFlavors = PREDEFINED_FLAVORS.filter(f => f.type === 'tocena' && f.name.toLowerCase().includes(searchVal))

  container.innerHTML = `
    ${gelatoFlavors.length > 0 ? `<div class="quick-group-label">Gelato (${gelatoFlavors.length})</div>` : ''}
    ${gelatoFlavors.map(f => `
      <button type="button" class="quick-chip ${selectedQuickFlavors.has(f.name + '|' + f.type) ? 'quick-chip--selected' : ''}"
        data-name="${f.name}" data-type="${f.type}"
        style="--chip-color: ${typeColors[f.type]}">
        ${f.name}
      </button>
    `).join('')}
    ${tocenaFlavors.length > 0 ? `<div class="quick-group-label">Točená (${tocenaFlavors.length})</div>` : ''}
    ${tocenaFlavors.map(f => `
      <button type="button" class="quick-chip ${selectedQuickFlavors.has(f.name + '|' + f.type) ? 'quick-chip--selected' : ''}"
        data-name="${f.name}" data-type="${f.type}"
        style="--chip-color: ${typeColors[f.type]}">
        ${f.name}
      </button>
    `).join('')}
  `

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
  const location = document.getElementById('quick-location').value
  const statusEl = document.getElementById('quick-add-status')
  if (selectedQuickFlavors.size === 0) {
    statusEl.textContent = 'Vyberte alespoň jednu příchuť'
    statusEl.className = 'quick-add-status quick-add-status--error'
    setTimeout(() => { statusEl.textContent = ''; statusEl.className = 'quick-add-status' }, 2000)
    return
  }

  statusEl.textContent = `Přidávám ${selectedQuickFlavors.size} příchutí...`
  statusEl.className = 'quick-add-status'

  for (const key of selectedQuickFlavors) {
    const [name, type] = key.split('|')
    await addDoc(collection(db, 'flavors'), { name, type, location, createdAt: new Date() })
  }

  statusEl.textContent = `Přidáno ${selectedQuickFlavors.size} příchutí!`
  statusEl.className = 'quick-add-status quick-add-status--success'
  selectedQuickFlavors.clear()
  renderQuickAddPanel()
  updateQuickAddCount()
  setTimeout(() => { statusEl.textContent = ''; statusEl.className = 'quick-add-status' }, 2500)
}

flavorForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = flavorNameInput.value.trim()
  const type = flavorTypeInput.value
  const location = flavorLocationInput.value
  if (!name) return

  if (flavorEditId.value) {
    await updateDoc(doc(db, 'flavors', flavorEditId.value), { name, type, location })
    flavorEditId.value = ''
    flavorSubmitBtn.textContent = 'Přidat'
  } else {
    await addDoc(collection(db, 'flavors'), { name, type, location, createdAt: new Date() })
  }
  flavorNameInput.value = ''
  flavorTypeInput.value = 'tocena'
})

function startEdit(id, name, type, location) {
  flavorEditId.value = id
  flavorNameInput.value = name
  flavorTypeInput.value = type
  flavorLocationInput.value = location
  flavorSubmitBtn.textContent = 'Uložit'
  flavorNameInput.focus()
}

async function deleteFlavor(id) {
  if (confirm('Opravdu smazat tuto příchuť?')) {
    await deleteDoc(doc(db, 'flavors', id))
  }
}

window._editFlavor = startEdit
window._deleteFlavor = deleteFlavor

function renderFlavorChips(flavors) {
  if (flavors.length === 0) return '<p class="flavors-empty">Zatím nic</p>'
  return flavors.map(f => `
    <div class="flavor-chip" style="--chip-color: ${typeColors[f.type] || typeColors.tocena}">
      <span class="flavor-chip-dot"></span>
      <span class="flavor-chip-name">${f.name}</span>
      <span class="flavor-chip-type">${typeLabels[f.type] || f.type}</span>
    </div>
  `).join('')
}

// Realtime listener
const flavorsQuery = query(collection(db, 'flavors'), orderBy('createdAt', 'desc'))

onSnapshot(flavorsQuery, (snapshot) => {
  allFlavorDocs = snapshot.docs.map(d => ({ id: d.id }))
  const all = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))

  const kopecku = all.filter(f => f.location === 'kopecku')
  const dvora = all.filter(f => f.location === 'dvora')
  const specials = all.filter(f => f.location === 'special')

  // Public - per location
  flavorsKopecku.innerHTML = renderFlavorChips(kopecku)
  flavorsDvora.innerHTML = renderFlavorChips(dvora)
  if (flavorsSpecials) flavorsSpecials.innerHTML = renderFlavorChips(specials)

  // Admin list
  if (all.length === 0) {
    adminFlavorsList.innerHTML = '<p class="admin-empty">Zatím žádné příchutě. Přidejte první.</p>'
  } else {
    const grouped = [
      { label: 'V Kopečku', items: kopecku },
      { label: 'U Dvora', items: dvora },
      { label: 'Speciality', items: specials },
    ].filter(g => g.items.length > 0)

    adminFlavorsList.innerHTML = grouped.map(g => `
      <div class="admin-group">
        <h4 class="admin-group-title">${g.label}</h4>
        ${g.items.map(f => `
          <div class="admin-flavor-item">
            <span class="admin-flavor-dot" style="background: ${typeColors[f.type] || typeColors.tocena}"></span>
            <span class="admin-flavor-name">${f.name}</span>
            <span class="admin-flavor-type">${typeLabels[f.type] || f.type}</span>
            <div class="admin-flavor-actions">
              <button onclick="window._editFlavor('${f.id}', '${f.name.replace(/'/g, "\\'")}', '${f.type}', '${f.location}')" class="admin-btn-edit">Upravit</button>
              <button onclick="window._deleteFlavor('${f.id}')" class="admin-btn-delete">Smazat</button>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('')
  }
})

// ============ OPENING HOURS (Firestore) ============
const hoursKopeckuEl = document.getElementById('hours-kopecku')
const hoursDvoraEl = document.getElementById('hours-dvora')
const hoursKopeckuInput = document.getElementById('hours-kopecku-input')
const hoursDvoraInput = document.getElementById('hours-dvora-input')
const saveHoursBtn = document.getElementById('save-hours-btn')

// Default hours (fallback)
const defaultHours = {
  kopecku: { text: 'Po–Ne: 11:00–18:00', open: '11:00', close: '18:00' },
  dvora: { text: 'Po–Ne: 13:00–18:00', open: '13:00', close: '18:00' },
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
  const dvoraData = data?.dvora || defaultHours.dvora

  renderHours(hoursKopeckuEl, kopeckuData)
  renderHours(hoursDvoraEl, dvoraData)

  // Fill admin inputs
  hoursKopeckuInput.value = kopeckuData.text
  hoursDvoraInput.value = dvoraData.text
})

// Save hours from admin
saveHoursBtn.addEventListener('click', async () => {
  const kopeckuText = hoursKopeckuInput.value.trim()
  const dvoraText = hoursDvoraInput.value.trim()

  // Parse open/close times from text like "Po–Ne: 11:00–18:00"
  function parseTimes(text) {
    const match = text.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/)
    return match ? { open: match[1], close: match[2] } : { open: '00:00', close: '23:59' }
  }

  const kopeckuTimes = parseTimes(kopeckuText)
  const dvoraTimes = parseTimes(dvoraText)

  await setDoc(doc(db, 'settings', 'hours'), {
    kopecku: { text: kopeckuText, ...kopeckuTimes },
    dvora: { text: dvoraText, ...dvoraTimes },
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
