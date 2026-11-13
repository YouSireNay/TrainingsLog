# Training Log

A workout log with templates, a training rotation, your own exercises with custom weight steps, and history as a table and chart. It runs entirely in the browser, works offline, and can be installed on your phone like an app.

## Publish on GitHub Pages

1. On github.com, create a new repository, e.g. `traininglog`. Make it public, because GitHub Pages is only available for public repositories on the free plan.
2. Upload the files so the repo looks like this. Everything sits at the top level, only the icons go in an `icons` folder:
   ```
   index.html
   sw.js
   manifest.webmanifest
   README.md
   icons/icon-192.png
   icons/icon-512.png
   icons/maskable-512.png
   icons/apple-touch-icon.png
   ```
   On a computer, unzip the download and drag its contents onto **Add file → Upload files**. On a phone, upload the 4 top-level files first, then use **Add file → Create new file** with the name `icons/x` to create the folder, upload the PNGs inside it and delete `x`.
3. **Settings → Pages**: under "Source" choose *Deploy from a branch*, branch `main`, folder `/ (root)`, and save.
4. After a minute or two the app is live at `https://<your-username>.github.io/traininglog/`.

## Install on your phone

- **Android (Chrome):** open the page → menu ⋮ → **Install app** or **Add to home screen**.
- **iPhone (Safari):** open the page → Share → **Add to Home Screen**.

Open the page once with an internet connection. After that it works offline too.

## Your data

- Everything is stored only on the device, in the browser you use the app in. There is no server and no account.
- Phone and computer don't sync. What you log on your phone stays on your phone.
- Anyone with the link only sees an empty app, never your data.
- **Backup:** under "Data" → *Download backup*. To move to a new device, use *Open backup file* there and then *Restore*.
- Clearing your browser or site data for github.io, or uninstalling the app, deletes your entries. Back up regularly.

## Updates

When you change `index.html`, bump the line `const VERSION = 'v1';` in `sw.js` (`'v2'` and so on) so installed apps load the new version. It shows up the second time you open the app after the update. Your data is kept.
