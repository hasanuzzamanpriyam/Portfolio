# Portfolio UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the existing personal portfolio into a responsive, accessible engineering dossier while retaining all current content and using only HTML, CSS, and raw JavaScript.

**Architecture:** The page uses a persistent identity/navigation rail on wide screens and a compact identity header on small screens. The main reading column contains a thesis-led hero, grouped capabilities, a timeline of work history, and a complete project index. A small raw-JavaScript module owns scroll-spy state, reveal-on-scroll behavior, and reduced-motion handling without changing content or adding dependencies.

**Tech Stack:** Semantic HTML5, CSS custom properties and responsive CSS, vanilla JavaScript, existing local avatar and résumé assets.

## Global Constraints

- Use only semantic HTML, CSS, and raw JavaScript; do not add frameworks, libraries, or a build step.
- Keep every current portfolio section and project visible.
- Preserve the existing avatar, résumé PDF, LinkedIn URL, GitHub URL, and project URLs.
- Use the approved modern-editorial “Engineering Dossier” direction.
- Use warm paper `#F5F2EA`, ink `#17202A`, graphite `#59636E`, signal vermilion `#E4572E`, blueprint teal `#146C94`, and mist `#E5E8E5` as the core palette.
- Use an editorial serif for display text, a system sans-serif for body text, and a monospace face for dates, locations, and technical labels.
- Include subtle motion with a short fade/translate reveal, restrained hover/focus states, and `prefers-reduced-motion` support.
- Provide semantic landmarks, visible keyboard focus, descriptive link text, sufficient contrast, and no color-only state indication.
- Make the layout responsive from mobile through wide desktop without horizontal scrolling.
- Do not introduce external runtime dependencies; the existing Google Fonts import may be replaced with local/system font stacks if useful.

---

## File Structure

Modify:

- `index.html`: semantic page structure, complete content, accessible navigation, hero, capabilities, experience timeline, project index, and inline script reference.
- `styles/main.css`: design tokens, layout, typography, responsive rules, interaction states, focus styles, and reduced-motion rules.

Create:

- `script.js`: small vanilla JavaScript module for scroll-spy, reveal-on-scroll, and reduced-motion-aware behavior.

Do not modify:

- `assets/images/circular_avatar.png`
- `assets/My Resume.pdf`

## Content Mapping

- Hero: `MD Hasanuzzaman Priyam`, `Software Engineer`, contact email, current availability/role context, résumé and profile actions.
- Capabilities: all four existing qualification statements, rewritten only for clarity and scanability where needed.
- Tech stack: all existing technologies, grouped into Languages, Frameworks & Platforms, and Data.
- Work History: all seven existing roles, dates, locations, and responsibility/outcome statements.
- Projects: all eleven existing project links and labels.

## Task 1: Build the semantic page structure

**Files:**
- Modify: `index.html`
- Create: `script.js`

**Interfaces:**
- Consumes: existing local assets and external profile/resume URLs.
- Produces: semantic sections with stable IDs used by CSS and JavaScript: `top`, `capabilities`, `experience`, `projects`.

- [ ] **Step 1: Replace the current body markup with semantic structure**

Use a skip link, header/nav identity rail, main landmark, hero, capabilities, experience, projects, and footer. Keep all current content and links. Add descriptive link labels such as `View LinkedIn profile`, `View GitHub profile`, and `Download résumé`.

- [ ] **Step 2: Add the vanilla JavaScript entry point**

Create `script.js` and reference it with `<script src="./script.js" defer></script>` before `</body>`.

- [ ] **Step 3: Validate the structure**

Open `index.html` and confirm that every current role/project remains present, all links resolve, and the page has one main landmark and one navigation landmark.

## Task 2: Implement the Engineering Dossier visual system

**Files:**
- Modify: `styles/main.css`

**Interfaces:**
- Consumes: IDs and classes emitted by Task 1.
- Produces: responsive dossier layout and approved visual treatment.

- [ ] **Step 1: Define design tokens**

Declare custom properties for the approved palette, typography roles, spacing, radii, shadows, and motion duration. Use `color-scheme: light` for the approved paper-led presentation.

- [ ] **Step 2: Build the wide-screen layout**

Create a sticky left rail with portrait, identity, contact actions, and anchor navigation. Create a right reading column with a generous max width, editorial hero type, section eyebrows, rules, and timeline markers.

- [ ] **Step 3: Style each content unit**

Style capability groups as a scannable grid, tech groups as labeled term rows, experience entries as timeline records, and projects as a complete link index. Keep the visual treatment quiet around the vermilion signature markers.

- [ ] **Step 4: Add interaction states**

Add hover and visible `:focus-visible` styles for navigation, buttons, links, and project cards. Add a current-section state driven by the `aria-current="true"` attribute.

- [ ] **Step 5: Validate the visual system**

Check desktop and mobile widths for overflow, readable line lengths, contrast, tap target size, and consistent spacing.

## Task 3: Add responsive behavior and raw JavaScript interactions

**Files:**
- Modify: `script.js`
- Modify: `styles/main.css`

**Interfaces:**
- Consumes: navigation links and sections from Task 1.
- Produces: active navigation state and progressive content reveals.

- [ ] **Step 1: Implement scroll-spy**

Use `IntersectionObserver` when available, with a scroll fallback, to set `aria-current="true"` on the navigation link matching the visible section.

- [ ] **Step 2: Implement progressive reveals**

Add an `is-revealed` class to sections and timeline entries when they enter the viewport. Ensure content remains visible if JavaScript is unavailable or the observer is unsupported.

- [ ] **Step 3: Respect reduced motion**

Check `window.matchMedia("(prefers-reduced-motion: reduce)")` and avoid reveal transitions or animated timeline drawing when reduced motion is requested.

- [ ] **Step 4: Add mobile navigation behavior**

At small widths, keep the identity header compact and make anchor navigation horizontally scrollable or wrapped without covering content. Do not add a modal menu unless required by the implemented layout.

- [ ] **Step 5: Validate behavior**

Test keyboard navigation, anchor jumps, active-section updates, JavaScript-disabled rendering, and reduced-motion behavior.

## Task 4: Polish content, accessibility, and responsive edge cases

**Files:**
- Modify: `index.html`
- Modify: `styles/main.css`
- Modify: `script.js`

**Interfaces:**
- Consumes: the completed Tasks 1–3.
- Produces: a production-ready static portfolio.

- [ ] **Step 1: Audit copy and link semantics**

Keep factual content intact while removing emoji-dependent meaning, fixing obvious punctuation issues, and ensuring each action describes its destination or result.

- [ ] **Step 2: Audit accessibility**

Verify heading order, alt text, skip-link behavior, focus visibility, color contrast, descriptive link text, and meaningful empty/error states where applicable.

- [ ] **Step 3: Audit responsive layout**

Test narrow mobile, tablet, desktop, and wide desktop widths. Confirm the rail collapses cleanly, project links remain readable, and no element causes horizontal scrolling.

- [ ] **Step 4: Run final checks**

Use a local static server or direct file open to inspect the page, then run available HTML/CSS/JavaScript syntax checks. Do not add a dependency solely for validation.

## Verification Checklist

- All seven work-history entries remain visible.
- All eleven project links remain visible.
- Résumé, LinkedIn, GitHub, and project links work.
- No framework, package, or build dependency is introduced.
- Keyboard users can reach and identify every interactive element.
- Reduced-motion users receive a non-animated experience.
- Mobile layout has no horizontal overflow.
- The design reads as a distinctive engineering dossier rather than a generic portfolio template.
