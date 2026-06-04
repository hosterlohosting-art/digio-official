# Digioverse — Technical Specification

## Dependencies

### Core
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.1 | UI framework |
| react-dom | ^19.1 | DOM renderer |
| react-router-dom | ^7.6 | Multi-page routing (/, /about, /services, /work, /blog, /contact) |

### Styling
| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^4.1 | Utility-first CSS |
| @tailwindcss/vite | ^4.1 | Vite integration for Tailwind v4 |

### Animation
| Package | Version | Purpose |
|---------|---------|---------|
| gsap | ^3.13 | Core animation engine + ScrollTrigger plugin |

### 3D / WebGL
| Package | Version | Purpose |
|---------|---------|---------|
| three | ^0.175 | Homepage fluid shader (raw WebGL via Three.js) |

### Icons
| Package | Version | Purpose |
|---------|---------|---------|
| lucide-react | ^0.511 | All iconography across the site |

### Fonts (loaded via Google Fonts `<link>`, no npm packages)
| Font | Weights | Role |
|------|---------|------|
| Space Grotesk | 400, 500, 600, 700 | Display / headings |
| Inter | 400, 500, 600 | Body / UI |

---

## Component Inventory

### Layout Components (shared across all pages)

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed header with scroll-driven background transition, mobile hamburger menu, mega-menu dropdown for Services. Manages its own scroll listener for transparent→frosted state and hide/show on mobile. |
| Footer | Custom | 4-column grid, consistent across all pages. |
| NoiseGrainOverlay | Custom | Static SVG background overlay, zero runtime cost. Rendered once at app root. |
| ScrollReveal | Custom | Wrapper component using GSAP ScrollTrigger. Accepts `pattern` prop (A–F), `stagger`, `delay`. Centralizes all scroll-triggered animations. |
| CharacterScatter | Custom | Text-splitting animation for H1/H2 headings. Splits text into per-character `<span>` elements, animates via GSAP ScrollTrigger with stagger. Must preserve original text in `aria-label`. |

### Page Sections (page-specific, not reusable)

| Page | Sections |
|------|----------|
| Home | HeroSection, TrustBarSection, ServicesOverviewSection, WhyChooseUsSection, ProcessSection, PortfolioTeaserSection, SaaSShowcaseSection, CTABannerSection |
| About | AboutHeaderSection, OurStorySection, CoreValuesSection, TeamSection, ApproachSection, IndustriesSection, CTASection |
| Services | ServicesHeaderSection, ServiceCategoriesSection, FlagshipWebDesignSection, FlagshipSEOSection, ComparisonTableSection, PricingTeaserSection, CTASection |
| Work | WorkHeaderSection, FilterBarSection, ProjectGridSection, FeaturedCaseStudySection, CTASection |
| Blog | BlogHeaderSection, FeaturedPostSection, ArticleGridSection, NewsletterSection, CTASection |
| Contact | ContactHeaderSection, ContactFormSection, FAQSection, TrustBandSection, FinalCTASection |

### Reusable Components (used across multiple sections/pages)

| Component | Source | Used By |
|-----------|--------|---------|
| Button | Custom | All pages — 4 variants (Primary, Secondary, Tertiary, Ghost) via `variant` prop |
| ServiceCard | Custom | Home (ServicesOverview), Services (ServiceCategories), About (CoreValues) — enhanced variant adds tag pills |
| PortfolioCard | Custom | Home (PortfolioTeaser), Work (ProjectGrid) — image with gradient overlay, category + title, hover reveals "View Project" |
| GlassmorphismCard | Custom | About (story stat overlay, industry cards), Work (case study results), Services (pricing), multiple CTA sections |
| StatCounter | Custom | Home (TrustBar), About (story), Work (header stats), Services (deep-dive stats) — count-up from 0 on scroll-into-view |
| Accordion | Custom | Contact (FAQ) — single-open mode, chevron rotation, max-height + opacity reveal |
| FormInput | Custom | Contact (form), Blog (newsletter) — text/email/tel/select/textarea variants, dark-mode variant for newsletter |
| SaaSProductCard | Custom | Home (SaaSShowcase) — image + content + tags, distinct from ServiceCard |
| ArticleCard | Custom | Blog (ArticleGrid) — image + category + title + excerpt + meta + author |
| ContactSlideOut | Custom | Global — slides from right, contains contact form. Triggered by "Start a Project" CTA in Navigation. |
| Breadcrumb | Custom | All inner pages (About, Services, Work, Blog, Contact) — "Home / Current Page" pattern |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollVelocity | Tracks scroll delta per frame, clamps to [-3, 3], applies decay. Feeds the hero shader uniform AND nav hide/show logic. |
| useInView | IntersectionObserver wrapper. Used to pause/resume the Three.js render loop when hero is off-screen. |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Liquid Prism — Hero Fluid Shader | Three.js (raw ShaderMaterial) | Fullscreen PlaneGeometry(2,2) with OrthographicCamera. Custom vertex + fragment shaders with 5 FBM octaves. 5 uniforms: uTime, uMouse, uResolution, uDistortion, uBaseColor. uMouse lerps at 0.05/frame. uDistortion combines ambient sin(t*0.3)*0.5 + scroll velocity (from useScrollVelocity). Render loop paused via IntersectionObserver when hero off-screen. | **High** 🔒 |
| Character Scatter (headings) | GSAP + ScrollTrigger | Custom CharacterScatter component splits text into `<span>` per char (preserves words in aria-label). GSAP timeline: each char opacity 0→1, y 30→0, stagger 0.02s, duration 0.6s. ScrollTrigger at 80% viewport, toggleActions "play none none none". | **Medium** |
| Scroll Fade-Up (Pattern A) | GSAP + ScrollTrigger | ScrollReveal wrapper. opacity 0→1, y 40→0, duration 0.8s, power3.out. Stagger configurable (default 0.1s). Trigger at 85%. Applied to cards, text blocks, CTAs. | **Low** |
| Counter Animation | GSAP + ScrollTrigger | StatCounter component. GSAP tween on a proxy object from 0→targetValue, onUpdate writes to DOM. Duration 1.5s, power2.out. Trigger at 85%. Formats with commas, appends suffix (+, %, £) on complete. | **Low** |
| SVG Line Draw (Pattern E) | GSAP + ScrollTrigger | Set stroke-dasharray + stroke-dashoffset to full path length. Animate dashoffset→0 over 1.2s, power2.inOut. Trigger at 80%. Used for process connecting lines. | **Low** |
| Why Choose Us — Sticky Pin | GSAP + ScrollTrigger | Parent section: pin true, start "top top", end "+=200%", scrub true. 4 benefit items transition via scroll-scrubbed opacity (0.3→1.0) sequentially. Each item visible for ~25% of pinned range. Mobile: no pin, standard scroll layout. | **Medium** |
| Scroll Velocity Distortion | Custom hook + Three.js uniforms | useScrollVelocity hook: tracks window.scrollY delta per frame, clamps [-3,3], multiplies by 0.1, decays at 0.95/frame. Value passed to hero ShaderMaterial uniform `uDistortion` combined with ambient term. | **Medium** |
| Parallax Image (Pattern C) | GSAP + ScrollTrigger | Image y: -40→+40 relative to container, scrub true, container overflow hidden, image scale(1.1). Easing: none. Disabled on mobile. | **Low** |
| Nav Scroll Behavior | CSS transitions + JS | Scroll position listener: >80px adds frosted-glass class (CSS transition 0.4s). useScrollVelocity drives hide/show: translateY(-100%) on scroll down >100px (mobile/tablet only), translateY(0) on scroll up. | **Low** |
| Mega Menu Dropdown | CSS transitions | translateY(-10px)→0 + opacity, 0.3s ease. Background: rgba(237,246,249,0.95) + backdrop-filter blur(24px). Triggered by hover (desktop) or click. | **Low** |
| Mobile Menu Overlay | GSAP | Overlay translateX(100%)→0, 0.5s power3.out. Menu items stagger in: translateY(20px)→0 + opacity, 0.4s, 0.08s stagger. Reverse on close. | **Low** |
| Contact Slide-Out Panel | GSAP | Panel translateX(100%)→0, 0.5s power3.out. Backdrop fade in rgba(0,29,61,0.4), 0.3s. Close: X icon or backdrop click. | **Low** |
| Page Transitions | GSAP | Outgoing: opacity 1→0, 0.2s ease. Incoming: opacity 0→1, 0.3s ease, 0.1s delay. Scroll resets to top on route change. | **Low** |
| Image Hover Scale | CSS transition | Container overflow hidden, border-radius 16px. Image: transition transform 0.6s ease. Hover: scale(1.05). Pure CSS, no JS. | **Low** |
| Card Hover Elevate | CSS transition | translateY(-4px), shadow elevate, border appears. transition: 0.4s cubic-bezier(0.16,1,0.3,1). Pure CSS. | **Low** |
| Button Hover Effects | CSS transition | Primary: glow shadow intensifies + translateY(-2px). Secondary: bg fill at 8% opacity. Tertiary: arrow translateX(4px). All 0.3s ease. Pure CSS. | **Low** |
| Accordion Open/Close | CSS transition | Chevron: rotate(0→180deg), 0.3s. Content: max-height + opacity, 0.4s ease. Single-open mode. | **Low** |
| Newsletter Icon Pop | GSAP | scale(0)→scale(1) with back.out(1.7), triggered on scroll-into-view. | **Low** |
| Filter Transitions (Work/Blog) | GSAP | Outgoing cards: opacity→0, 0.2s. Incoming: opacity 0→1, y 20→0, 0.3s staggered. Managed by parent component state change. | **Low** |

---

## State & Logic

### Routing Architecture

Multi-page React app using `react-router-dom` with 6 routes:
- `/` — Home
- `/about` — About
- `/services` — Services
- `/work` — Work
- `/blog` — Blog
- `/contact` — Contact

Route transitions trigger the page transition animation (opacity fade). Scroll resets to top on every route change. The Navigation and Footer are rendered in a root layout wrapper outside the route outlet.

### Scroll-Velocity Tracking (global hook)

A single `useScrollVelocity` hook runs at the app level (or in the layout). It tracks `window.scrollY` deltas per `requestAnimationFrame` frame, computes velocity, clamps to [-3, 3], applies decay (0.95/frame), and returns the current value. This value is consumed by:
- The hero shader (via ref to the ShaderMaterial uniform)
- The navigation hide/show logic

Using a ref (not React state) for the velocity value avoids re-renders on every scroll frame. The hook should also expose a `scrollDirection` ref for the nav logic.

### Contact Slide-Out Panel (global state)

The "Start a Project" CTA appears in the Navigation (always visible). Clicking it opens the ContactSlideOut panel from the right edge. This panel contains a contact form identical to the Contact page form.

Since the trigger is in Navigation (layout level) but the panel overlays the entire viewport, the open/close state must be managed at the app root level. Use a simple React context or a ref-based store (no need for a full state library — just a boolean `isOpen` and a `toggle()` function).

### Service Filter State (Work page) + Category Filter State (Blog page)

Both pages use category filters. Pattern:
- Active filter stored in component state ("All" default).
- On filter change: animate out inactive items (opacity→0), then animate in active items (opacity 0→1, y 20→0, staggered).
- URL query param optional: `?category=web-design`. Parse on mount, sync on change.
- Work page filter bar is sticky (position: sticky, top: 72px) with backdrop-filter blur when stuck.

### Form Submission (Contact page + Slide-out panel)

Both forms submit to `POST /api/contact` with identical JSON body. The form component manages:
- Field-level validation (name min 2 chars, email format, service selected, message min 20 chars)
- Submit button states: default → loading (spinner) → success (checkmark + message) → error (retry)
- Success state fades form fields to 30% opacity and shows confirmation message
- Error state returns button to normal with inline error text

Since the form appears in two places (Contact page and ContactSlideOut), extract it as a shared `ContactForm` component that accepts an `onSuccess` callback.

### Hash Anchor Handling (Services page)

The Services page must handle hash-based scroll anchors on mount (e.g., `/services#website-design` from homepage service cards). On mount, if `window.location.hash` is present, wait 500ms (allow entrance animations to complete), then smooth-scroll to the target element.

---

## Other Key Decisions

### Raw Three.js (not React Three Fiber)

The hero fluid shader uses a single fullscreen plane with a custom ShaderMaterial. There is no scene graph, no multiple objects, no interactivity beyond uniform updates. R3F's declarative model adds overhead without benefit here. Use raw Three.js with `useRef`/`useEffect` for lifecycle management, and a single `requestAnimationFrame` loop controlled by an IntersectionObserver (pause when off-screen).

### No shadcn/ui Components

The design system is entirely bespoke — custom card styles, custom form inputs, custom accordion behavior, custom button variants with specific gradient/glow/shadow treatments. None of shadcn's pre-built primitives match the design closely enough to justify the dependency. All components are hand-built with Tailwind.

### No Splitting Library for Character Scatter

The CharacterScatter component manually splits text into per-character `<span>` elements. This is a one-time operation on mount (not on every render). A dedicated library like `splitting` or `split-type` would add an unnecessary dependency for a straightforward string→spans transformation.

### Static Content Strategy

All page content (service descriptions, blog articles, portfolio projects, FAQ items, team bios) is hardcoded as data arrays/objects in the page/section files. No CMS integration, no API calls for content, no markdown processing. This keeps the build simple and fast. Blog post detail pages (`/blog/:slug`) render from a shared `BlogPost` template component that looks up the article by slug from a static articles array.

### Performance Strategy
- Three.js shader: pixel ratio capped at `Math.min(dpr, 2)`, drops to 1 on mobile. Render loop paused off-screen.
- Images: `loading="lazy"` on all below-fold images. Hero images (if any) load eagerly.
- Grain overlay: static SVG data-URI background, zero runtime cost.
- GSAP ScrollTrigger: cleanup on unmount. Use `will-change: transform` on animated elements, remove after animation completes.
- Fonts: `font-display: swap` via Google Fonts link parameter.
