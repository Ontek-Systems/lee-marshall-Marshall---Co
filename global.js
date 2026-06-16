document.addEventListener('DOMContentLoaded', async () => {

    await loadComponents();

    // Set mega menu top to bottom edge of header (runs after layout is complete)
    function updateMegaTop() {
        const h = document.getElementById('site-header');
        if (h) document.documentElement.style.setProperty('--header-bottom', h.getBoundingClientRect().bottom + 'px');
    }
    requestAnimationFrame(() => { requestAnimationFrame(updateMegaTop); });
    window.addEventListener('scroll', updateMegaTop, { passive: true });
    window.addEventListener('resize', updateMegaTop, { passive: true });

    // ==========================================
    // 1. MOBILE MENU LOGIC (Smooth Animation)
    // ==========================================
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('opacity-0');
            mobileNav.classList.toggle('invisible');
            mobileNav.classList.toggle('-translate-y-4');
            mobileNav.classList.toggle('pointer-events-none');

            const svg = menuBtn.querySelector('svg');
            if (mobileNav.classList.contains('opacity-0')) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            } else {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            }
        });
    }

    initHeaderScroll();
    setActiveNav();
    initServicesMegaMenu();

    // ==========================================
    // 2. SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
        } else {
            revealObserver.observe(el);
        }
    });

});

async function loadComponents() {
    const path = window.location.pathname;
    const isPagesLocationPagesDir = path.includes('/pages/location_pages/');
    const isPagesLocationsDir = !isPagesLocationPagesDir && path.includes('/pages/locations/');
    const isPagesServiceDir = !isPagesLocationsDir && !isPagesLocationPagesDir && (path.includes('/pages/services/') || path.includes('/pages/service_pages/'));
    const isPagesDir = !isPagesServiceDir && !isPagesLocationsDir && !isPagesLocationPagesDir && path.includes('/pages/');
    let basePath = '';
    if (isPagesServiceDir || isPagesLocationsDir || isPagesLocationPagesDir) basePath = '../../';
    else if (isPagesDir) basePath = '../';

    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        try {
            const resp = await fetch(basePath + 'components/header.html');
            let html = await resp.text();
            if (basePath) {
                html = html.replace(/(href|src)="([^"]*)"/g, (match, p1, p2) => {
                    if (p2.startsWith('http') || p2.startsWith('mailto:') || p2.startsWith('tel:') || p2.startsWith('#') || p2.startsWith('/')) return match;
                    return `${p1}="${basePath + p2}"`;
                });
            }
            
            if (path.includes('contact.html')) {
                html = html.replace(/href="[^"]*index\.html#faq"/g, 'href="#faq"');
            }
            headerPlaceholder.outerHTML = html;
        } catch (e) {
            console.error('Error loading header:', e);
        }
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        try {
            const resp = await fetch(basePath + 'components/footer.html');
            let html = await resp.text();
            if (basePath) {
                html = html.replace(/(href|src)="([^"]*)"/g, (match, p1, p2) => {
                    if (p2.startsWith('http') || p2.startsWith('mailto:') || p2.startsWith('tel:') || p2.startsWith('#') || p2.startsWith('/')) return match;
                    return `${p1}="${basePath + p2}"`;
                });
            }
            if (document.body.hasAttribute('data-suppress-footer-cta')) {
                const footerStart = html.indexOf('<footer');
                if (footerStart !== -1) html = html.slice(footerStart);
            }
            footerPlaceholder.outerHTML = html;
        } catch (e) {
            console.error('Error loading footer:', e);
        }
    }
}

function initServicesMegaMenu() {
    const trigger = document.querySelector('.group\\/nav');
    const menu = document.getElementById('services-mega-wrapper');
    if (!trigger || !menu) return;
    let hideTimer;

    function openMenu() {
        clearTimeout(hideTimer);
        menu.classList.add('open');
    }
    function scheduleClose() {
        hideTimer = setTimeout(() => menu.classList.remove('open'), 200);
    }

    trigger.addEventListener('mouseenter', openMenu);
    trigger.addEventListener('mouseleave', scheduleClose);
    menu.addEventListener('mouseenter', openMenu);
    menu.addEventListener('mouseleave', scheduleClose);
}

function initHeaderScroll() {
    const header = document.getElementById('site-header');
    const container = document.getElementById('header-container');
    const isServicePage = window.location.pathname.match(/\/pages\/services\/.+\.html/);

    if (header && container) {
        if (window.location.pathname.includes('thank-you.html')) {
            header.classList.add('scrolled');
            header.classList.remove('bg-transparent', 'border-transparent');
            header.classList.add('bg-[#303030]', 'backdrop-blur-md', 'shadow-md', 'border-white/10');
            container.classList.remove('py-4', 'md:py-5');
            container.classList.add('py-3', 'md:py-4');
            return;
        }

        if (window.location.pathname.includes('contact.html') || window.location.pathname.includes('testimonials.html') || window.location.pathname.includes('gallery.html') || window.location.pathname.includes('about.html') || window.location.pathname.includes('services.html') || window.location.pathname.includes('locations.html') || window.location.pathname.includes('service_pages') || window.location.pathname.includes('location_pages')) {
            const banner = document.getElementById('top-banner');
            header.classList.add('scrolled');
            header.classList.remove('bg-transparent', 'border-transparent');
            header.classList.add('bg-[#303030]', 'backdrop-blur-md', 'shadow-md', 'border-white/10');
            container.classList.remove('py-4', 'md:py-5');
            container.classList.add('py-3', 'md:py-4');
            if (banner) { banner.style.maxHeight = '48px'; banner.style.opacity = '1'; banner.style.overflow = ''; }
            return;
        }

        if (isServicePage) {
            header.classList.add('scrolled');
            return;
        }

        const banner = document.getElementById('top-banner');

        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
                header.classList.remove('bg-transparent', 'border-transparent');
                header.classList.add('bg-brand-dark/95', 'backdrop-blur-md', 'shadow-md', 'border-white/10');
                container.classList.remove('py-4', 'md:py-5');
                container.classList.add('py-3', 'md:py-4');
                if (banner) { banner.style.maxHeight = '48px'; banner.style.opacity = '1'; banner.style.overflow = ''; }
            } else {
                header.classList.remove('scrolled');
                header.classList.add('bg-transparent', 'border-transparent');
                header.classList.remove('bg-brand-dark/95', 'backdrop-blur-md', 'shadow-md', 'border-white/10');
                container.classList.add('py-4', 'md:py-5');
                container.classList.remove('py-3', 'md:py-4');
                if (banner) { banner.style.maxHeight = '0'; banner.style.opacity = '0'; }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }
}

function setActiveNav() {
    const path = window.location.pathname;

    const matchers = [
        { test: p => p === '/' || p.endsWith('index.html'), label: 'Home' },
        { test: p => p.includes('/pages/services'), label: 'Services' },
        { test: p => p.includes('/pages/about'), label: 'About Us' },
        { test: p => p.includes('/pages/gallery'), label: 'Gallery' },
        { test: p => p.includes('/pages/contact') || p.endsWith('contact.html'), label: 'Contact' },
        { test: p => p.includes('/pages/locations/') || p.includes('/pages/location_pages/'), label: 'Where We Build' },
    ];

    let activeLabel = null;
    for (const m of matchers) {
        if (m.test(path)) { activeLabel = m.label; break; }
    }

    if (!activeLabel) return;

    document.querySelectorAll('nav .nav-link').forEach(el => {
        const text = el.textContent.trim();
        if (text === activeLabel) {
            el.classList.add('active-nav');
        }
    });
}
