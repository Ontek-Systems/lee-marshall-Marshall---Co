# Working rules for this project

## How to work with me

Talk to me like a normal person. I'll describe what I want in plain English. Just do it.

If I say "make another page," make another page - files, structure, whatever it takes. If I say "make this button blue," just change the colour. Match your effort to what I'm actually asking for.

## Speed and focus

- Act fast. Don't over-think simple things.
- Make the smallest change that does what I asked. Don't refactor or "improve" stuff I didn't mention.
- Don't reason out loud through multiple approaches before acting. Pick the obvious one and go.
- No "actually wait, let me reconsider" mid-task. If you're genuinely unsure, stop and ask me one short question.

## Finding things

- If I name a section, class, file, or ID, go straight there. Don't run a bunch of greps first.
- If you genuinely can't find what I mean, ask me - don't search blindly.

## Output

- Keep responses short. After an edit, one line on what changed and where. That's it.
- Don't explain how CSS or HTML works unless I ask.
- Don't list alternatives I didn't ask for.

## When in doubt

- Smallest change that does the job.
- Ask, don't assume.
- Stop, don't ramble.

## CSS specificity - Tailwind v4 (pre-built static stylesheet)

This project uses Tailwind v4 compiled to a static file, `tailwind.css`, which is linked **after** `style.css` on every page (so Tailwind utilities still win ties over `style.css` block rules, exactly as the old runtime CDN did). The only reliable way to override font-size, spacing, or colour on a specific element is to put `style="property: value !important"` directly on the HTML element. Never rely on class-based arbitrary values (e.g. `text-[7px]`) or `<style>` block rules for targeted overrides - they will be ignored.

### Rebuilding tailwind.css
`tailwind.css` is generated, not hand-edited. After adding markup with new utility classes, new brand-colour utilities, or new classes added by JavaScript, rebuild it:

```
npm install        # first time only
npm run build:css  # regenerates tailwind.css (minified)
```

Build config lives in `tailwind.input.css` (brand `@theme` tokens + `@source` globs). `global.js` is listed as a `@source` because it adds classes at runtime that appear nowhere in the HTML. The built `tailwind.css` is committed and served statically by Cloudflare Pages (no build step on the host). Do not re-add the `@tailwindcss/browser` CDN script.

## Typography system - how to edit text size, weight, spacing

All font size, weight, and line-height for the whole site is controlled by CSS variables at the top of `style.css`, inside the `:root` block. **Edit those variables only - never scatter font-size or font-weight in individual elements or media queries.**

### The variables (top of style.css `:root`):
```
--hero-heading-size / --hero-heading-weight / --hero-heading-line / --hero-heading-gap
--hero-body-size    / --hero-body-weight    / --hero-body-line    / --hero-body-gap
--section-heading-size / --section-heading-weight / --section-heading-line / --section-heading-gap
--section-body-size    / --section-body-weight    / --section-body-line    / --section-body-gap
--label-size / --label-weight / --label-spacing / --label-gap
```

### The classes to use in HTML:
- `.t-hero-heading` - hero h1/h2
- `.t-hero-body` - hero subtitle paragraphs
- `.t-section-heading` - section h2s
- `.t-section-body` - section body paragraphs
- `.t-label` - eyebrow/tagline text (uppercase small caps)

### Rules:
- **Site-wide change** (e.g. "make all body text bigger"): edit the relevant `--section-body-size` variable in `style.css`. One line, done.
- **Hero only** (e.g. "make hero headings bolder"): edit `--hero-heading-weight`. One line.
- **Single section only** (e.g. "make this section's heading smaller"): override inline on that element only, with a comment explaining why.
- **UI component headings** (gallery cards, process cards, stat numbers, badges - anything that is a widget, not page content): set `font-size: Xrem !important` directly in the component's own `<style>` block. These must never inherit from the global heading scale.
- **Never** add `font-size`, `font-weight`, or `line-height` to individual elements unless I specifically say to target one section. No Tailwind font-size classes (`text-xl`, `text-2xl`, etc.) on headings or body copy - use the system classes instead.
- **Changing the font**: update the font name in `fonts.css` (@font-face + `:root --site-font`) AND in `style.css` (the four `font-family` lines for `body`, `h1-h6`, `.font-heading`, `.font-body`). Do both simultaneously.

### Design tokens (colours, dark mode):
- `gs-tagline` - eyebrow text colour token
- `gs-heading` - heading colour token
- `gs-body` - body text colour token  
- `gs-stat-label` - stat labels
- `btn-adaptive` - buttons (adapts light/dark)
- `section-dark` - add to a `<section>` to flip it to dark mode

Use these tokens for new sections. Don't hardcode colours.

## Tech stack

Static HTML, Tailwind CSS, vanilla JavaScript. No React, no frameworks, no build steps. Python files in the root are one-off scripts - ignore them unless I ask.

## Context efficiency

- Don't re-read files you've already read this session unless I say something changed.
- Don't re-explain previous edits. Assume I remember.
- Don't summarise what you're about to do before doing it. Just do it.

## Business Context (Marshall & Co.)
- **Vibe/Tone:** Luxury, premium, bespoke, high-end craftsmanship.
- **Always use real data:** Never use "Lorem Ipsum" or placeholder text for copy. If generating text, write high-converting, no em-dashes, text should flow naturally without em dashes, professional copy tailored to structural renovations and bespoke joinery.

## Business Context (Marshall & Co.)

- **Company Name**: Marshall & Co. Bespoke Home Improvements
- **Owner**: Lee Marshall
- **Industry**: Construction, Bespoke Joinery & Home Improvements
- **Location**: 2 Talisker Place, Perth, PH1 3GW, Scotland
- **Service Area**: 
       -   Perth,
       -   Dundee,
       -   Perthshire,
       -   Auchterarder,
       -   Kinross,
       -   Crieff,
       -   Blairgowrie,
       -   Dunblane,
       -   Coupar Angus,
       -  Scone,
       -   Bridge of Earn,
       -   Alyth,
       -   Stanley,
       -   Luncarty,
       -   Almondbank,
       -   Milnathort,
       -   Abernethy,
       -   Bankfoot,
       -   Errol,
       -   Methven,
       -   Comrie,
       -   Inchture,
       -   Dunkeld
- **Phone**: 07940 568877
- **Facebook Link**: https://www.facebook.com/marshallandcohomeimprovements
- **Email**: info@marshallandco.uk
- **Credentials**: Over 20 years of industry experience managing specialized joinery and construction projects for a wide range of property types, from traditional sandstone homes to modern new builds.
- **Service Summary**
Marshall & Co. Bespoke Home Improvements, led by Lee Marshall, is a premier construction and bespoke joinery firm operating across Perth and the wider Perthshire region. Backed by over two decades of hands-on field experience, the company specializes in executing high-end structural renovations, interior remodeling, and custom carpentry projects tailored to each client's specific property needs.

- **Services**
        -  Home Renovations,
        -  House Extensions,
        -  Garage Conversions,
        -  Loft Conversions,
        -  Kitchen Renovations,
        -  Bathroom Renovations,
        -  Media Walls & Panelling,
        -  Windows & Doors,
        -  Garden Rooms,
        -  Decking,
        -  Insurance Repair Work,




## File Structure & Routing
- **New HTML pages:** Place in the root directory unless otherwise specified.
- **Components:** Reusable parts (like headers/footers) live in the `components/` folder.
- **Assets:** All new images must go in the `assets/` folder.
- **CSS:** Do not write inline styles. Use Tailwind utility classes. If a custom class is absolutely necessary, add it to `style.css`.

## "Standardize the sizing" command

When I say **"standardize the sizing"** on a section, match the tagline/title/subtitle block exactly to the gallery section pattern:

**Tagline (eyebrow):**
- Font size: `0.77rem` (inline `style="font-size:0.77rem !important;"`)
- Font weight: `500`
- Letter spacing on label text: `0.25em`
- Pattern: gold number + gold slash + faded white label text (`rgba(255,255,255,0.65)`)
- Class: `section-tagline eyebrow-chapter` (or equivalent eyebrow structure)

**Title (h2):**
- Font size: `clamp(2.54rem, 4.07vw, 3.63rem)` (inline `style="font-size: clamp(2.54rem, 4.07vw, 3.63rem) !important;"`)
- Font weight: 700 (bold)
- `margin-top: 1.5rem !important; margin-bottom: 1.275rem !important;`
- Class: `section-heading` (+ `text-white` on dark sections)

**Subtitle (p):**
- Font size: `1.1rem` (inline `style="font-size:1.1rem !important;"`)
- Font weight: 400
- Line height: `leading-relaxed`
- Color: `rgba(255,255,255,0.78)` on dark sections, `rgba(48,48,48,0.80)` on light sections - never solid `#303030`, never `var(--gs-body)`
- Class: `font-body`

**Spacing summary:** tagline → `1.5rem` gap → title → `1.25rem` gap → subtitle

Apply these exact values - no deviating to "similar" sizes. If the section is light-mode, swap white/faded-white colours for the appropriate `gs-` token equivalents.

## "Standardize the text content" command

When I say **"standardize the text content"** and name a specific section or element, read that element's current HTML and extract the exact values for:
- Font size (inline style or CSS class)
- Font weight
- Letter spacing
- Line height
- Colour
- Margin/padding (top, bottom, gap between elements)

Then apply every one of those exact values to the target I name. Do not approximate, do not use "similar" classes - copy the source values precisely as inline styles if needed to guarantee they aren't overridden by Tailwind.

### Font & word-mask fix (always apply on non-index pages)

When standardizing text content on any page other than `index.html`, also check and fix the following:

1. **Font**: Remove any Google Fonts (Montserrat, etc.) imports and `--font-heading`/`--font-body` overrides in `@theme`. Add `<link rel="stylesheet" href="../fonts.css">` (adjust path depth as needed) so Satoshi is used everywhere.

2. **Word-mask descender clipping**: The `.word-mask` definition must use `clip-path` - NOT `overflow: hidden` - to prevent font descenders being cut off. The correct definition is:
```css
.word-mask { display: inline-block; vertical-align: bottom; clip-path: inset(-80% -20% 0% -20%); padding-bottom: 0.25em; margin-bottom: -0.25em; }
.word-mask-inner { display: inline-block; transform: translateY(110%); transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); will-change: transform; }
h1 .word-mask-inner, h2 .word-mask-inner, h3 .word-mask-inner { transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) !important; }
.reveal.active .word-mask-inner { transform: translateY(0); }
```
Replace any `overflow: hidden` version with this.

## SEO & Accessibility (a11y)
- **Semantic HTML:** Always use proper `<header>`, `<main>`, `<section>`, `<article>`, and `<footer>` tags.
- **Images:** Every `<img>` tag must have a descriptive, keyword-relevant `alt` attribute (e.g., "Bespoke kitchen joinery in Perth" instead of "kitchen").
- **Links & Buttons:** Must have clear `aria-labels` if the text isn't explicitly descriptive.
- **Meta Tags:** Any new HTML page must include standard SEO meta title and description tags.

## Brand Guidelines & Vibe
  - **Primary font:** Currently **Satoshi** (self-hosted variable font in `assets/fonts/Satoshi/`). Used for all headings and body text site-wide via `--site-font` in `style.css`. To change the font, see "Typography system" section above.
  - **Accent/script font:** **Elicit Script** - self-hosted `assets/fonts/ElicitScript-SemiBold.otf`. Used ONLY for the Lee Marshall signature. Never apply to body text or headings.
  - **Overall Vibe:** Luxury, Premium, Bespoke, High-end Craftsmanship.

- **Color Scheme Palette:** (Apply these using Tailwind arbitrary values, e.g., `bg-[#fff9eb]`, `text-[#e8b238]`, or map them to custom CSS variables in style.css):
  - White: `#ffffff` 
  - Beige: `#fff9eb` (Excellent for luxury background sections)
  - Brown: `#5b4a36` (Rich, elegant timber/earth accent)
  - Gold: `#e8b238` (Hero highlights, primary buttons, borders, active links)
  - Dark Grey: `#303030` (Main dark backgrounds, headers, premium footers)
  - Black: `#000000` (Main body text or secondary backgrounds, or premium footers)

## Project Architecture & Directory Map

```
marshall-and-co-bespoke-home-improvements/
├── index.html                  - Homepage (~1891 lines)
├── style.css                   - Global styles, gs- token system, animations (~638 lines)
├── global.js                   - Component loader, scroll reveal, header scroll, nav (~194 lines)
├── CLAUDE.md                   - Project rules & context
│
├── components/
│   ├── header.html             - Fixed nav: top info banner + logo + links + mobile menu
│   └── footer.html             - Brand, contact details, quick links, copyright
│
├── assets/
│   ├── fonts/
│   │   ├── ElicitScript-SemiBold.otf   - Accent/script font (kickers, signature)
│   │   └── Cormorant/                  - Heading font (Regular, RegularItalic, Semi, Bold, BoldItalic + subfamilies)
│   └── imgs/
│       ├── logo.png                    - Company logo
│       ├── qrcode.png                  - Google review QR code
│       ├── og-image.jpg                - Open Graph / social share image
│       ├── all_imgs/                   - 109 raw client WhatsApp photos (source material)
│       ├── general_imgs/               - about.jpg, about_bg.jpg, before.jpg, after.jpg
│       ├── hero_imgs/                  - hero1.jpg, hero2.jpg, hero3.jpg
│       ├── location_imgs/              - Empty (future location pages)
│       └── service_imgs/               - service1.jpg – service4.jpg
│
└── pages/
    ├── location_pages/         - Empty (future location landing pages)
    └── service_pages/          - Empty (future service detail pages)
```

### Token System (style.css CSS custom properties)

Light mode defaults on `:root`:
- `--gs-fg` `#303030` | `--gs-bg` `#ffffff` | `--gs-accent` `#e8b238`
- `--gs-btn-bg` `#e8b238` | `--gs-btn-fg` `#303030`

Dark mode via `.section-dark` on a `<section>`:
- `--gs-fg` `#ffffff` | `--gs-bg` `#303030` | btn flips to outline style

### Typography
See the "Typography system" section above. All sizes/weights are CSS variables in `style.css :root`. Classes: `.t-hero-heading`, `.t-hero-body`, `.t-section-heading`, `.t-section-body`, `.t-label`.

### Component Loading (global.js)

`loadComponents()` fetches `components/header.html` and `components/footer.html` and injects them into `#header-placeholder` and `#footer-placeholder`. It rewrites asset paths based on current directory depth so components work from any page level.

### Current Homepage Sections (index.html)

1. **Hero** - 3-slide content carousel (lerp-free CSS transitions). Slides: Welcome / Craftsmanship / Conversion (form). Background images cycle independently. Animated mouse scroll indicator + slide dots. Timer stops permanently on slide 3 or form focus.
2. **Trust Banner** - scrolling ticker of service keywords (marquee animation)
3. **About** - parallax background image, two-column text + floating portrait image (desktop), stat counters (20+ years, 5-Star, 100% personally led), Lee Marshall script signature with underline
4. **Gallery** (`#gallery-snippet`) - sticky lerp-scroll card carousel, mirrors Process section layout. Dark bg, fade gradients, dots, "View Full Gallery" button. Cards reference `all_imgs/` WhatsApp photos.
5. **Services** (`#services-section`) - 4 alternating full-width rows (image + text), parallax on images, section number 03, sub-cards numbered 01–04 internally
6. **Inspiration** (`#inspiration-banner-section`) - full-bleed bg image with parallax, frosted glass card anchored right, section number 04
7. **Process** (`#process-section`) - sticky card stack ("How We Work"), 4 cards reveal on scroll, lerp JS, dots, "Scroll to explore" hint anchored at bottom. Section number 05.
8. **Testimonials** (`#testimonials`) - review cards + Google QR code CTA. Section number 06/07.
9. **FAQ** (`#faq`) - native `<details>` accordion, Schema.org FAQ markup. Section number 08.
10. **Footer** - injected via component

### Known Outstanding Issues

- **Before/After slider JS exists** (`ba-slider`) but the HTML section was never built - dead code at bottom of file
- **Unused Cormorant subfamilies** still in `assets/fonts/Cormorant/` (CormorantInfant, CormorantSC, CormorantUnicase, CormorantUpright + undeclared weights) - ~25 files, ~3.5MB unused
- **Gallery scroll-wrapper height hardcoded** - `style="height: 420vh;"` inline on `#gallery-scroll-wrapper`