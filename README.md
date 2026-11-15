# Summit Ridge Digital: deployed build snapshot (not editable source)

This branch is a copy of everything in the S3 bucket `summitridgedigital.com` (served through CloudFront at https://summitridgedigital.com) as of Nov 14, 2026, 10:30 PM PT. It is the compiled output of a Vite + React build, **not** the editable source code.

## Why this exists
The live multi-page site (home, /ai-automation, /ai-lead-systems, /ai-websites, /privacy, /terms) was built and deployed around Aug 9, 2026, but its source was never pushed to GitHub. The `master` branch still holds the older one-page site from July 2026. No source maps, source archives or build pipelines (CodeBuild, Amplify) exist in AWS, so this snapshot is the most complete record of the live site.

## What is live
- `index.html` loads `assets/index-BtwTxWox-oc.js` and `assets/index-_IZz3wkj.css`.
- `assets/index-BtwTxWox-oc.js` is the Aug 9 bundle `assets/index-BtwTxWox.js` with one edit, made Nov 14, 2026: the copyright line in both footers (standard and campaign) now reads "Copyright {year} Summit Ridge Digital. Founded by Ocean Coldiron", with "Ocean Coldiron" linking to https://oceancoldiron.com.
- The other files in `assets/` are older builds still sitting in the bucket. They are not referenced by `index.html`.

## S3 object settings (needed if you ever re-upload these files)
- `index.html`: `Content-Type: text/html; charset=utf-8`, `Cache-Control: no-cache,no-store,must-revalidate`
- `assets/*.js`: `Content-Type: text/javascript`, `Cache-Control: public,max-age=31536000,immutable`
- After any upload, invalidate CloudFront distribution `E1Y2D7AKYZMEDO`.

## If the site is rebuilt from source later
Whoever recreates or recovers the source should keep the footer link: "Founded by Ocean Coldiron" linking to https://oceancoldiron.com, in both footer variants.
