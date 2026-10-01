# MemoLink UI revision

## Audit and preserved contracts
Next.js App Router, React client state, CSS with legacy layered overrides, six-language dictionaries, persisted light/dark/system preferences. Create POST /api/shorten, device-key ownership via x-device-key, GET /api/links, PATCH/DELETE /api/links/:code and analytics remain intact. Preserve all expiration modes, password, custom slug, UTM and opt-in tracking cleanup, QR, share cards, recovery import/export, protected redirects and public routes.

The prior navigation, nested surfaces, large summary cards and recovery controls competed with actual tasks. Help categories wrapped into a tag cloud. Network failures in management mutations and analytics lacked complete handling.

## New hierarchy
Compact shared header and three navigation links. Create is an unboxed URL-first workspace with optional settings. Management starts with the list, compact totals and search; filters, link operations and recovery use disclosures. Help starts with search and horizontally scrollable categories. Native disclosure and dialog semantics keep keyboard interactions predictable.

## Verification boundaries
Browser checks use mocked API responses; no production database mutations. Live deployment and assistive-technology testing remain separate checks. Existing global CSS for legacy routes is retained; new semantic tokens and a scoped utility stylesheet govern rebuilt application surfaces.

## Behavior and validation notes
- New GET /api/availability is read-only, debounced in the UI, separately rate-limited and never uses redirect endpoints. Availability is advisory; the create endpoint remains authoritative and handles races with 409.
- Scheme-less destinations become HTTPS in the client; explicit non-web schemes are rejected. Existing query parameters are retained unless cleanup is selected.
- The existing list endpoint returns at most 200 links. Search/filter/sort operate on that returned set, displayed in groups of 20. Server pagination is a future backend change, not silently introduced here.
- Brand primary and success have different colors. Checked semantic text pair contrast: dark muted on raised 7.27:1, light muted on background 5.55:1, dark primary button 9.93:1, light primary button 7.50:1, success text at least 5.95:1.
- Manual screen-reader and physical iOS Safari testing are still recommended; browser automation uses Chromium.

## Completed verification
Production build and TypeScript passed on Node 24. Chromium checks covered normalization, optional settings, invalid hidden expiration, duplicate submit, preserved query parameters, QR PNG, slug availability/taken/suggestion, 409 focus, network failure, clipboard and share focus. Management checks used 105 fixture links and covered incremental rendering, search, edit, pause, confirmed delete, failed analytics retry, list failure/empty and recovery key roundtrip. The real reserved-name availability route was checked without database access.

Responsive checks: all three pages at 320, 360, 375, 390, 430, 768 and 1280 pixels; all six languages in light/dark at 320 pixels; Thai visual inspection at 390 pixels. No horizontal page overflow or runtime exceptions in these checks. API responses requiring MongoDB were mocked.

Reference principles consulted: [21st](https://21st.dev), [UI Guideline](https://www.uiguideline.com), [IxDF usability heuristics](https://ixdf.org/literature/article/user-interface-design-guidelines-10-rules-of-thumb), [shadcn design](https://www.shadcndesign.com). Applied component composition, recognition, disclosure and consistent feedback without copying a template.
