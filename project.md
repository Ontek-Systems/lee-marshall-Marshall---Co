# Marshall & Co. Bespoke Home Improvements - Project Documentation

## 1. How to Work with Me (AI Directives)
- **Speed & Focus:** Act fast. Don't over-think. Pick the obvious approach and execute.
- **Output:** Smallest change that does the job. Keep responses short. One line on what changed and where.
- **Context Efficiency:** Don't re-read files unless told they changed. Don't summarize what you're about to do-just do it.
- **Finding Things:** If a section, class, or file is named, go straight to it. Don't grep blindly.
- **No Refactoring:** Only edit what is asked. Don't "improve" unrelated code.
- **Tone:** Real data only. No Lorem Ipsum. High-converting, professional, bespoke construction copy. NO em-dashes (-).

## 2. Business Context
- **Company**: Marshall & Co. Bespoke Home Improvements
- **Owner**: Lee Marshall (100% owner-led, no subcontractors, on site every day)
- **Vibe/Tone**: Luxury, premium, bespoke, high-end craftsmanship.
- **Industry**: Construction, Bespoke Joinery & Home Improvements.
- **Location**: 2 Talisker Place, Perth, PH1 3GW, Scotland
- **Contact**: 07940 568877 | info@marshallandco.uk
- **Service Areas**: Perth, Dundee, Perthshire, Auchterarder, Kinross, Crieff, Blairgowrie, Dunblane, Coupar Angus, Scone, Bridge of Earn, Alyth, Stanley, Luncarty, Almondbank, Milnathort, Abernethy, Bankfoot, Errol, Methven, Comrie, Inchture, Dunkeld.
- **Core Services**: Home Renovations, House Extensions, Garage Conversions, Loft Conversions, Kitchen Renovations, Bathroom Renovations, Media Walls & Panelling, Windows & Doors, Garden Rooms, Decking, Insurance Repair Work.

## 3. Tech Stack & Architecture
- **Tech Stack:** Static HTML, Tailwind CSS (via browser CDN), Vanilla JavaScript. NO React, no build steps.
- **Routing & Pathing:** 
  - Root: `index.html`, `services.html`, `gallery.html`, `contact.html`, `robots.txt`, `site.webmanifest`
  - Level 1 (`/pages/`): `about.html`, `testimonials.html`, `process_form.html`, `thank-you.html`
  - Level 2 (`/pages/service_pages/` & `/pages/location_pages/`): Individual service and location landing pages.
- **Critical Path Rule:** Always manage relative paths correctly (`./`, `../`, `../../`) for CSS links, JS scripts, images, and the Favicon/App Icon block in the `<head>`.
- **Component Loader:** `global.js` fetches `components/header.html` and `components/footer.html` and injects them into `#header-placeholder` and `#footer-placeholder`. It automatically resolves relative paths based on depth.

## 4. Theme & Design System
Defined via Tailwind `@theme` in HTML files and CSS variables in `style.css`.
- **Colors:**
  - White: `#ffffff` (`--color-brand-alice`)
  - Beige: `#fff9eb` (`--color-brand-beige`) - Primary light luxury background.
  - Brown: `#5b4a36` - Rich timber accent.
  - Gold: `#e8b238` (`--color-brand-bronze`, `--gs-accent`) - Primary CTA and accent.
  - Dark Grey: `#303030` (`--color-brand-dark`, `--gs-fg`) - Primary dark background.
  - Black: `#000000` - Button hover states.
- **Typography:**
  - **Headings** (`font-heading`): `'Cormorant'` (Self-hosted in `assets/fonts/Cormorant/`). Token: `--font-heading: 'Cormorant', Georgia, serif`.
  - **Body** (`font-body`): `'Montserrat'` (Google Fonts CDN). Token: `--font-body: 'Montserrat', sans-serif`.
  - **Script/Accent** (`font-script`): `'Elicit Script'` (Self-hosted). Used exclusively for section kickers and Lee's signature. Token: `--font-script: 'Elicit Script', cursive`.
- **Global Dark Mode:** Appending `.section-dark` to a `<section>` automatically flips CSS variables (`--gs-fg`, `--gs-bg`, button states) for dark sections.

## 5. UI Components & Button System
Buttons have a strict design system applied globally in `style.css`.
- **Classes:**
  - `.btn-primary`: Gold background, white text. Hover flips to Black background.
  - `.btn-ghost`: Transparent with white border. Hover flips to Black background.
  - `.btn-primary-white`: White border/text variant.
  - `.btn-adaptive`: Adapts automatically based on light/dark backgrounds.
- **Mobile Button Behavior (CRITICAL RULE):**
  - All buttons under `768px` are explicitly forced to:
    - `display: inline-block !important;`
    - `width: max-content !important;` (They do **NOT** stretch width-to-width).
    - `margin-left: auto !important; margin-right: auto !important;` (Perfectly centralized).
    - Mobile buttons are scaled down globally (`font-size: 0.85rem`, `padding: 0.6rem 1.5rem`).

## 6. Global Breakpoints & Responsive Rules
Handled in `style.css`:
- **Mobile (`max-width: 768px`):**
  - Heavy centering applied to all headings (`h1`, `h2`, `h3`, `p`) inside `main section`.
  - `.section-underline` animations are repositioned to `left: 50%; transform: translateX(-50%)`.
  - Buttons become `max-content` and center themselves.
  - The `.loc-svc-card` spans automatically center text globally.
- **Laptop Height Compression (`min-width: 1024px and max-height: 860px`):**
  - Section headings shrink to `3.78rem` to ensure tall hero banners fit in cramped laptop viewports.
- **Ultrawide Screens (`1200px - 1440px`):**
  - Section headings use a fluid `clamp()` lock. Containers (`max-w-[98rem]`) are restrained to `1280px` to maintain tight reading columns.

## 7. Animation System (Word-Mask & Reveal)
The site uses a premium, scroll-triggered reveal system driven by `global.js` (IntersectionObserver).
- **`.reveal`**: The parent trigger class. `global.js` adds `.active` when scrolled into view.
- **`.reveal-up`**: Add to a `.reveal` container to slide the whole block up.
- **`.word-mask` & `.word-mask-inner`**: Used inside `.section-heading` `<h2>` tags. `word-mask` hides overflow. `.word-mask-inner` translates from `110%` to `0` smoothly on reveal.
  - *Markup format:* `<h2><span class="word-mask"><span class="word-mask-inner" style="transition-delay: 100ms;">Word</span></span></h2>`
- **`.title-underline-anim`**: Used for body paragraphs beneath headings. Fades up and in on reveal.
- **`.scrolling-wrapper` / `.scrolling-track`**: Used for the infinite trust banner (marquees). Does not pause on hover.

## 8. SEO & Best Practices
- **Favicons & Manifest:** Master favicon snippet must be injected into every `<head>`. Absolute link to `site.webmanifest`.
- **Robots.txt:** Explicitly blocks `/pages/process_form.html`, `/pages/thank-you.html`, etc.
- **Semantic HTML & Alt Tags:** Always use `<main>`, `<section>`, `<article>`. High-quality, descriptive `alt` text is strictly enforced. No filler images.
