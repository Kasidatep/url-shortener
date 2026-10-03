# MemoLink experience refresh

MemoLink now pairs its link creation form with an editorial introduction and an interactive illustration of three sharing situations. A paper and cobalt palette, original line drawings, Thai typography and shorter task-focused copy carry through creation, management, help, redirect states and shared controls. This refresh follows the utility revision in `quiet-utility.md`.

## Surfaces and behavior

- `/`: two-column introduction and composer on desktop; a single task-first column on mobile. The example selector illustrates a portfolio, invitation and campaign. Examples are explicitly labelled and do not create links.
- `/manage`: browser ownership notice, three summary values, search and collapsed filters, link actions, editable destinations with cancel, analytics and recovery. The recovery anchor opens its disclosure both on entry and within the page. The 200-link API limit is explained when reached.
- `/faq`: 22 answers, search, topic filters, three useful starting questions and clear reset actions. Answers describe actual preview fetching and ownership behavior.
- `/[code]`, error and missing-page states: shared typography, palette, buttons and motion. Password, unavailable, missing and retry flows retain their original API contracts.
- Shared navigation, language/theme menus, QR panels, share dialogs, confirmations, notifications and footer use the same visual system. `/privacy` and `/terms` continue to redirect to MemoLab's policies.

## Motion and accessibility

Finite entrance animations, an animated selector, ticket transitions, drawn link paths and small hover responses add movement around useful actions. Existing Framer Motion is loaded through `LazyMotion`; no animation or WebGL dependency was added. Spatial details use CSS and SVG, keeping the form usable on smaller devices.

Both CSS and Motion respect the user's reduced-motion preference. Native disclosures stay keyboard-operable. Preference menus support arrows, Home, End and Escape, restoring focus after selection. Chart values are available by keyboard. Pending link changes disable competing actions. The server renders readable localized content before JavaScript loads.

## Search and answer discovery

Page titles, descriptions, document language and structured data follow the saved display language. The home page describes the product as a free URL shortener and QR tool. Help adds a direct product definition, keeps FAQ schema aligned with displayed answers and includes breadcrumbs. Canonicals, Open Graph images and `llms.txt` give the public product a consistent identity. Management stays `noindex`.

Display preferences use validated locale/theme cookies and migrate existing local storage values. Ownership keys remain in their original storage and are never placed in these cookies. Reading cookies makes public pages request-rendered; this trades static page caching for consistent localized HTML and metadata. New visitors and crawlers without a language preference receive English. This does not create separately indexed language URLs or promise search rankings or rich results.

## Verification

- Production webpack build, including TypeScript compilation.
- Chromium with fixture API responses: create, invalid input focus, custom name, password, click expiry, tracking cleanup and new UTM values, results, QR, share and reset.
- Management: analytics, destination edit, pause, cancelled/confirmed deletion, search/reset, recovery anchor, empty state and failed-list retry.
- Redirects: password and wrong-password feedback, expiry, missing link and request failure.
- All three main pages at 320px in all six languages and light/dark themes; Thai at 375, 390, 768, 1024 and 1440px. No horizontal document overflow in these checks. Mobile and desktop screenshots were visually inspected.
- Keyboard preference menus, locale metadata refresh, system theme changes, normal/reduced motion and Thai help content without JavaScript. No page exceptions or hydration errors in the completed browser checks.
- Real read-only checks: `llms.txt`, root/help Open Graph images, robots and sitemap return 200; unauthenticated management API returns 401; legal routes retain their MemoLab destinations.

Database-backed operations were mocked; no production data was changed. The agent-browser daemon could not start in the execution environment, so browser checks used Playwright with Chromium. Physical-device and assistive-technology checks remain outside this verification.

## References

Component composition and interaction references: [21st.dev](https://21st.dev), [UI Guideline](https://www.uiguideline.com/components) and [Motion](https://motion.dev). Editorial pacing and movement references: [Webflow animation](https://webflow.com/made-in-webflow/animation), [Awwwards](https://www.awwwards.com/websites/animation/) and [Ripplix](https://www.ripplix.com). Spatial inspiration: [Three.js](https://threejs.org). The implementation uses original markup and illustrations rather than imported showcase templates.
