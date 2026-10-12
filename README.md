# Still Dental

Independent local Next.js application. Fictional clinic with six treatments, three dentist profiles, illustrative testimonials, contact form and four-step booking with dentist eligibility, future dates, recurring schedules, breaks, duration conflicts, confirmation and reset.

## Run

Prerequisites: Node.js 24 or newer and pnpm. Versions are pinned in package.json and pnpm-lock.yaml. The pnpm workspace policy permits only the sharp and unrs-resolver dependency builds.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3002. Each project has its own dependencies, configuration and fixed port; all three can run together.

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

Stop the dev server before starting production on the same port.

## Routes and source

13 application routes, plus a custom 404. The complete route list is generated in `src/app/[...slug]/page.tsx`; home is `src/app/page.tsx`. Shared interfaces live in `src/components`, domain data and logic in `src/lib`, tokens and responsive rules in `src/app/globals.css`, and all images/fonts are local in `public/assets` and `public/fonts`.

Page metadata is generated per route. Motion respects reduced motion. No secrets or environment variables are needed for these demos.

## Demo boundary and integration

No real clinic appointments. Local storage still.booking.v1 stores only appointment reference, dentist, treatment, date, time and duration. Contact fields are validated but not saved or sent. Dates use Asia/Karachi (UTC+05:00); reservations are checked again at confirmation. The browser adapter prevents persisted conflicts within this browser; real multi-user scheduling requires shared server storage and an atomic reservation transaction. Replace src/lib/booking-repository.ts with a shared adapter.

## Review evidence

Read RESEARCH.md, DESIGN.md, ASSETS.md and QA.md. Brand guidance is in docs/brand-guidelines.md. Browser screenshots and machine-readable outcomes are in output/playwright/.
