# Villa Marea

Static luxury-retreat site. HTML, CSS and JS only (GSAP loads from a CDN). No build step.

## Swap the photos
Every photo is in `images/`. Overwrite a file with your own using the **same name**, or edit the `src` in `index.html`.
`hero, suite, pool, rooftop, garden, deck, interior, sunset, spa` (all .jpg). Use landscape 1600px wide, under 400 KB each, for fast loading.

## Edit text
Villa name, copy and contact details are in `index.html`. Colors and fonts are the variables at the top of `style.css`.

## Deploy
1. `git init && git add . && git commit -m "villa site"`, then push to a new GitHub repo.
2. On vercel.com choose **Add New, Project**, import the repo, leave Framework as **Other**, and click Deploy.

## Booking form
It only shows a confirmation message. Point the form at Formspree, Netlify Forms or your own endpoint in `script.js`.
