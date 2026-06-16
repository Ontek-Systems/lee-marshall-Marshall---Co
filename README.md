# Demo Template — Local Service Business (2-Page)
## Quick-deploy demo for client pitches

---

## Directory Structure

```
demo-template/
│
├── index.html                  ← Home page (all sections)
├── contact.html                ← Contact page (form + details)
│
├── components/
│   ├── header.html             ← Header component (copy into each page)
│   └── footer.html             ← Footer component (copy into each page)
│
└── assets/
    ├── imgs/
    │   ├── logo-white.png      ← Logo for dark/transparent header bg
    │   ├── logo-dark.png       ← Logo for solid/scrolled header bg
    │   ├── og-image.jpg        ← 1200×630 Open Graph share image
    │   ├── slide-1.jpg         ← About section slideshow (image 1)
    │   ├── slide-2.jpg         ← About section slideshow (image 2)
    │   ├── slide-3.jpg         ← About section slideshow (image 3)
    │   ├── service-1.jpg       ← Service card photo 1
    │   ├── service-2.jpg       ← Service card photo 2
    │   └── [service-N.jpg]     ← One image per service card
    └── video/
        └── hero.mp4            ← Hero background video (optional)
```

---

## How to Start a New Demo

### Step 1 — Drop in the assets
- Add `logo-white.png` and `logo-dark.png` to `assets/imgs/`
- Add `hero.mp4` to `assets/video/` (or swap video for `<img>` in hero)
- Add service photos as `service-1.jpg`, `service-2.jpg`, etc.
- Add 3 slideshow images as `slide-1.jpg`, `slide-2.jpg`, `slide-3.jpg`

### Step 2 — Update Brand Config (2 minutes)
In **both** `index.html` and `contact.html`, find the `@theme` block and update:

```css
@theme {
    --color-brand-dark:   #YOUR_DARK;   /* footer, hero bg, dark sections */
    --color-brand-mid:    #YOUR_MID;    /* trust bar, card hover */
    --color-brand-light:  #YOUR_LIGHT;  /* page background */
    --color-brand-accent: #YOUR_ACCENT; /* CTA buttons, icons */
    --color-brand-warm:   #YOUR_WARM;   /* hover states, stars */
    --font-heading: 'Your Heading Font', serif;
    --font-body:    'Your Body Font', sans-serif;
}
```

Also update the Google Fonts `<link>` href to use your chosen fonts.

### Step 3 — Search and Replace (5 minutes)
Use your editor's Find & Replace. Search `REPLACE` to find every marker.

| Placeholder           | Replace with                          |
|-----------------------|---------------------------------------|
| `BUSINESS NAME`       | e.g. "Smith Plumbing Services"        |
| `YOURDOMAIN.com`      | e.g. "smithplumbing.co.uk"            |
| `+44XXXXXXXXXX`       | e.g. "+447480209512"                  |
| `hello@YOURDOMAIN.com`| Client email address                  |
| `REGION NAME`         | e.g. "Greater Manchester"             |
| `YEAR`                | e.g. "2026"                           |
| `OWNER NAME`          | e.g. "John Smith"                     |
| `AGENCY NAME`         | Your agency name                      |
| `YOUR_SCRIPT_ID`      | Google Apps Script deployment ID      |

### Step 4 — Paste Components
- Copy everything between the `═══ COPY FROM HERE` markers in `components/header.html`
  and paste it where `[PASTE HEADER COMPONENT HERE]` appears in each page.
- Do the same for `components/footer.html`.

### Step 5 — Fill in content
Replace all remaining `REPLACE` comments with real client content:
- Headlines, sub-copy, service names + descriptions
- Trust badge labels (6 items for the marquee)
- Stats (counter targets + labels)
- Service card content (title, description, "perfect for")
- Process steps (title + description per step)
- Reviews (stars, text, name, location)
- FAQ questions + answers
- Location pills (town names)
- Contact details (phone, email, address, hours)

---

## Component Notes

### Header (components/header.html)
- **Transparent on load** → solid dark at 50px scroll (JS inline)
- **Logo swap**: `.logo-white` shows on transparent/dark bg, `.logo-dark` shows after scroll
- **Light-bg pages** (contact.html): the `<script>` block after the header paste forces the solid state immediately on load
- **Mobile menu**: smooth slide-in, hamburger ↔ X icon swap, closes on link tap

### Footer (components/footer.html)
- 3-column grid: brand | contact highlights | quick links
- All links mirror the header nav

### Forms
- **Honeypot**: hidden field catches bots — never remove it
- **GDPR checkbox**: required before submit
- **Rate limiting**: max 3 submissions per browser session
- **Webhook**: set `WEBHOOK` constant in the `<script>` block at the bottom of each page
- **index.html**: on success → redirects to `contact.html?sent=1`
- **contact.html**: on success → hides form, shows inline success message

### Scroll Reveal
Add `class="reveal reveal-up"` to any element to animate it in on scroll.
Stagger siblings with `style="transition-delay: 150ms;"` (increase by 100–150ms per sibling).

### Counters
Add `class="auto-counter" data-target="50"` to a `<span>` inside a heading.
The JS counts up to the integer when the element scrolls into view.

### Image Slideshow (About section)
- Container must have `id="about-slideshow"`
- Each `<img>` needs `class="slide"` and the first gets `opacity-100`, others get `opacity-0`
- Auto-rotates every 3.5 seconds

### FAQ Accordion
- Each question button calls `onclick="toggleFaq(this)"`
- The answer `<div>` needs `class="faq-answer overflow-hidden max-h-0 transition-all duration-500 ease-in-out"`
- Only one answer is open at a time

---

## Google Apps Script Setup

1. Go to [script.google.com](https://script.google.com/) → New project
2. Paste this:
```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
  sheet.appendRow([
    new Date(),
    data.name    || '',
    data.email   || '',
    data.phone   || '',
    data.service || '',
    data.message || '',
    data.source  || ''
  ]);
  return ContentService.createTextOutput('OK');
}
```
3. **Deploy** → New deployment → Web app
4. Execute as: **Me** | Who has access: **Anyone**
5. Copy the deployment URL → paste into `WEBHOOK` constant in both pages

---

## Deployment (Cloudflare Pages)

1. Push the `demo-template/` folder to a GitHub repo
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect Git
3. Select repo → Framework: **None** → Build command: *(blank)* → Output: `/`
4. Deploy — done in ~30 seconds
5. Custom domain: Pages → Custom domains → add domain
