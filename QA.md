# QA evidence

Review date: 10 October 2026. Local Chromium inspection and Playwright verification at 390, 768 and 1440 pixels. See `output/playwright/qa-results.json` for route-level results and `output/playwright/` for full-page screenshots.

## Technical gates

- ESLint: passed.
- TypeScript strict no-emit check: passed.
- Next.js optimized production build: passed; routes prerendered successfully.
- Domain unit tests: 6 scheduling tests passed.

## Browser gates

Every application route is checked at the three widths for successful responses, one primary heading, horizontal overflow, control labels and empty button names. Unknown routes are checked for HTTP 404. Page errors and console errors are collected. Representative page types and key flow states are captured.

Checks target practical accessibility: semantic structure, labeled controls, visible keyboard focus, keyboard menus and reduced motion. This is not a full WCAG conformance audit or a measured performance score.

## Refinements made after initial review

Moved future dates to a hydrated browser snapshot so static builds do not freeze appointment dates, rechecked availability when reserving, and refreshed persisted bookings across storage changes.

## Limitations

No real clinic appointments. Local storage still.booking.v1 stores only appointment reference, dentist, treatment, date, time and duration. Contact fields are validated but not saved or sent. Dates use Asia/Karachi (UTC+05:00); reservations are checked again at confirmation. The browser adapter prevents persisted conflicts within this browser; real multi-user scheduling requires shared server storage and an atomic reservation transaction. Replace src/lib/booking-repository.ts with a shared adapter.

## Final measured outcomes

- 41 recorded browser checks passed; page/console errors: 0.
- Production HTTP verification: 13 application routes passed, 214 internal link references resolved to known routes, custom 404 passed.
- Production browser checks passed on the homepage and three representative inner pages: hydration, image decoding and desktop overflow.
- Optimized build output is saved in output/playwright/build-output.txt.
- Mobile menu opens, Escape closes and returns focus, keyboard focus outline, reduced-motion content visible, homepage images load, no failed asset requests.
- Contact demo validation and honest success feedback.

## Screenshot index

- [about-1440.png](output/playwright/about-1440.png)
- [about-390.png](output/playwright/about-390.png)
- [about-768.png](output/playwright/about-768.png)
- [booking-1440.png](output/playwright/booking-1440.png)
- [booking-390.png](output/playwright/booking-390.png)
- [booking-768.png](output/playwright/booking-768.png)
- [booking-confirmed-1440.png](output/playwright/booking-confirmed-1440.png)
- [booking-confirmed-390.png](output/playwright/booking-confirmed-390.png)
- [booking-time-1440.png](output/playwright/booking-time-1440.png)
- [booking-time-390.png](output/playwright/booking-time-390.png)
- [contact-1440.png](output/playwright/contact-1440.png)
- [contact-390.png](output/playwright/contact-390.png)
- [contact-768.png](output/playwright/contact-768.png)
- [dentists-1440.png](output/playwright/dentists-1440.png)
- [dentists-390.png](output/playwright/dentists-390.png)
- [dentists-768.png](output/playwright/dentists-768.png)
- [home-1440.png](output/playwright/home-1440.png)
- [home-390.png](output/playwright/home-390.png)
- [home-768.png](output/playwright/home-768.png)
- [home-desktop-preview.png](output/playwright/home-desktop-preview.png)
- [home-preview.png](output/playwright/home-preview.png)
- [home-production.png](output/playwright/home-production.png)
- [review-sheet.png](output/playwright/review-sheet.png)
- [testimonials-1440.png](output/playwright/testimonials-1440.png)
- [testimonials-390.png](output/playwright/testimonials-390.png)
- [testimonials-768.png](output/playwright/testimonials-768.png)
- [treatments-1440.png](output/playwright/treatments-1440.png)
- [treatments-390.png](output/playwright/treatments-390.png)
- [treatments-768.png](output/playwright/treatments-768.png)
- [treatments-aligners-1440.png](output/playwright/treatments-aligners-1440.png)
- [treatments-aligners-390.png](output/playwright/treatments-aligners-390.png)
- [treatments-aligners-768.png](output/playwright/treatments-aligners-768.png)
