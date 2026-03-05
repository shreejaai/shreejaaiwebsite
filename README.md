# Shreeja AI Website

Static multi-page website for **Shreeja AI** (Delhi, India), positioned around the tagline **"Trust Layer for AI Agents"**.

## What this site includes
- Home page with product overview and governance messaging.
- Product pages for **AGR** and **Company Box**.
- About page with mission, vision, and values.
- Contact page with email/phone/location and mailto form fallback.
- SEO essentials: per-page metadata, canonical links, `sitemap.xml`, and `robots.txt`.

## Run locally
No dependencies and no build step required.

1. Clone or download this repository.
2. Open `index.html` directly in your browser.

## Deploy (GitHub Pages)
Preferred approach: deploy from the `/docs` folder on the `main` branch.

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to `Deploy from a branch`.
4. Choose branch `main` and folder `/docs`.
5. Save and wait for Pages to publish.

The site files are stored in `/docs` so GitHub Pages can publish directly from that folder.

## Custom domain setup (`shreejaai.com`)
1. Go to **Settings → Pages**.
2. Ensure **Source** is set to **Deploy from a branch**.
3. Select branch **main** and folder **/docs**.
4. In **Custom domain**, enter `shreejaai.com` and save.
5. After certificate provisioning completes, enable **Enforce HTTPS**.

### DNS notes
- Configure apex/root DNS with **A records** pointed to GitHub Pages.
- Configure `www` as a **CNAME** record pointing to the apex/custom domain setup.
