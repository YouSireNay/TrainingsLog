# Trainingslog

Trainingstagebuch mit Vorlagen, Trainingsrhythmus, eigenen Übungen mit Gewichtsschritten, Verlauf als Tabelle und Graph. Läuft komplett im Browser, auch offline, und lässt sich auf dem Handy wie eine App installieren.

## Auf GitHub Pages veröffentlichen

1. Auf github.com ein neues Repository anlegen, z. B. `trainingslog` (öffentlich, denn GitHub Pages ist im kostenlosen Plan nur für öffentliche Repositories verfügbar).
2. **Add file → Upload files** und diese Dateien hochladen, die Ordnerstruktur bleibt dabei erhalten:
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
   Am einfachsten: die ZIP entpacken und den ganzen Inhalt ins Upload-Feld ziehen.
3. **Settings → Pages**: bei „Source“ *Deploy from a branch* wählen, Branch `main`, Ordner `/ (root)`, speichern.
4. Nach ein bis zwei Minuten läuft die App unter `https://<dein-name>.github.io/trainingslog/`.

## Aufs Handy installieren

- **Android (Chrome):** Seite öffnen → Menü ⋮ → **App installieren** bzw. **Zum Startbildschirm hinzufügen**.
- **iPhone (Safari):** Seite öffnen → Teilen → **Zum Home-Bildschirm**.

Die Seite einmal mit Internet öffnen, danach funktioniert sie auch ohne Netz.

## Deine Daten

- Alles wird nur auf dem Gerät gespeichert, im Browser, mit dem du die App nutzt. Es gibt keinen Server und kein Konto.
- Handy und Computer synchronisieren sich nicht. Was du am Handy einträgst, ist nur dort.
- Wer den Link hat, sieht nur eine leere App, nie deine Daten.
- **Backup:** Unter „Daten“ → *Backup herunterladen*. Zum Übertragen auf ein neues Gerät dort *Backup-Datei öffnen* und *Wiederherstellen* wählen.
- Wenn du die Browserdaten bzw. Websitedaten für github.io löschst oder die App deinstallierst, sind die Einträge weg. Mach deshalb regelmäßig ein Backup.

## Updates

Wenn du `index.html` änderst, in `sw.js` die Zeile `const VERSION = 'v1';` hochzählen (`'v2'` usw.), damit installierte Apps die neue Version laden. Die neue Version erscheint beim übernächsten Öffnen der App. Deine Daten bleiben dabei erhalten.
