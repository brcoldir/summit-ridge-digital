# Summit Ridge Digital website

Source for https://summitridgedigital.com: a Vite + React 18 + TypeScript single-page app, styled with plain CSS, with a small AWS Lambda behind the contact form.

## About this source

The live multi-page site was built and deployed around Aug 9, 2026, but its source was never committed, and the `master` branch held the older one-page site from July 2026. In Nov 2026 this source was **recreated from the deployed bundle** (the `live-build` branch is the snapshot it was recreated from):

- All page copy, data, routes, meta titles and descriptions, form behavior, attribution capture and the contact endpoint were taken from the live JavaScript bundle.
- `src/styles.css` holds the live CSS rules, unchanged. It builds to the exact same file as the live site (`index-_IZz3wkj.css`).
- `public/` holds the live images, favicon and `vite.svg`. `ad-ai-automation.png` is not referenced by the site, but it is in the live bucket, so it is kept.
- `lambda-contact/` is the code currently deployed to the `summitridge-contact` Lambda (last updated Aug 9, 2026). Its `package.json` refers to an `index.test.cjs` that was not part of the deployed package.
- The one intentional change from the Aug 9 build is the footer: both footer variants read "Copyright {year} Summit Ridge Digital. Founded by Ocean Coldiron", linking to https://oceancoldiron.com. That edit is already live.

Comparing against the live site at 1280 px and 390 px widths showed pixel-identical screenshots, the same visible text, titles, descriptions and links on every route, and the same behavior for the menu, FAQs and contact form (see `scripts/`).

## Structure

```
src/
  main.tsx, App.tsx          entry point and routes
  styles.css                 all styling
  data/site.ts               contact details, services, process, FAQs, pricing tiers
  data/campaigns.ts          copy for the three campaign landing pages
  data/types.ts              shared types
  lib/attribution.ts         first-touch UTM, gclid and fbclid capture (sessionStorage)
  components/                Layout, Header, Footer, Brand, Icon, PageMeta, ScrollToTop, ContactForm
  components/home/           homepage sections
  components/campaign/       campaign visual and FAQ
  pages/                     Home, CampaignPage, Privacy, Terms, NotFound
lambda-contact/              contact form Lambda (SES email)
scripts/                     comparison checks against the live site
```

Routes: `/`, `/ai-automation`, `/ai-lead-systems`, `/ai-websites`, `/privacy`, `/terms`, plus a 404 page for anything else. The three campaign routes share `CampaignPage`, which uses a slimmer header and footer.

## Develop and build

```
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then writes dist/
npm run preview    # serves dist/ at http://localhost:4173
```

The contact form posts JSON to the API Gateway endpoint in `src/components/ContactForm.tsx`. Set `VITE_CONTACT_ENDPOINT` to override it. The deployed Lambda only allows the production origins, so form submissions from localhost fail unless the Lambda's `ALLOW_LOCALHOST_ORIGINS` is set to `true`.

## Compare with the live site

With `npm run preview` running:

```
CHROME_PATH=/path/to/chrome npm run compare -- compare-output   # screenshots, pixel diffs, text checks
CHROME_PATH=/path/to/chrome npm run compare:functional          # menu, FAQ and form behavior (the form request is intercepted)
```

## Deploy (manual)

The site is served from the S3 bucket `summitridgedigital.com` through CloudFront distribution `E1Y2D7AKYZMEDO`.

```
npm run build
aws s3 cp dist/index.html s3://summitridgedigital.com/index.html --content-type "text/html; charset=utf-8" --cache-control "no-cache,no-store,must-revalidate"
aws s3 sync dist/assets s3://summitridgedigital.com/assets --cache-control "public,max-age=31536000,immutable"
aws s3 sync public s3://summitridgedigital.com --exclude "index.html"
aws cloudfront create-invalidation --distribution-id E1Y2D7AKYZMEDO --paths "/*"
```

Keep the "Founded by Ocean Coldiron" footer link.
