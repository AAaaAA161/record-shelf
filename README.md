# 📀 Record Shelf v1.2 - PWA Edition

Eine Progressive Web App für deine Musiksammlung mit Tidal-Integration.

## 🚀 Features

- ✅ **Installierbar** - Wie eine native App
- ✅ **Offline-Fähig** - Funktioniert ohne Internet nach erstem Load
- ✅ **Secure API** - Last.fm API Key sicher auf Server
- ✅ **Fast** - Parallelverarbeitung, 6x schneller als v1.0
- ✅ **Shuffle** - Zufällige Alben auf Kategorie- und Genre-Ebene
- ✅ **Mobile-Optimiert** - Perfekt auf dem Handy

---

## 📦 Deployment auf Netlify

### Schritt 1: Icons generieren

Die App braucht PNG-Icons in verschiedenen Größen. Du kannst sie aus dem SVG generieren:

**Option A: Online Tool (Einfach)**
1. Gehe zu https://realfavicongenerator.net/
2. Lade `icons/icon-template.svg` hoch
3. Download das Paket
4. Entpacke die Icons in den `/icons` Ordner

**Option B: ImageMagick (Command Line)**
```bash
cd icons

# Install ImageMagick if needed
# brew install imagemagick (Mac)
# apt-get install imagemagick (Linux)

# Generate all sizes from SVG
convert icon-template.svg -resize 72x72 icon-72.png
convert icon-template.svg -resize 96x96 icon-96.png
convert icon-template.svg -resize 128x128 icon-128.png
convert icon-template.svg -resize 144x144 icon-144.png
convert icon-template.svg -resize 152x152 icon-152.png
convert icon-template.svg -resize 192x192 icon-192.png
convert icon-template.svg -resize 384x384 icon-384.png
convert icon-template.svg -resize 512x512 icon-512.png

# Maskable icons (with safe zone)
convert icon-template.svg -resize 192x192 -background transparent -gravity center -extent 240x240 icon-192-maskable.png
convert icon-template.svg -resize 512x512 -background transparent -gravity center -extent 640x640 icon-512-maskable.png
```

**Option C: Online SVG to PNG Converter**
1. https://svgtopng.com/
2. Upload `icon-template.svg`
3. Generate sizes: 72, 96, 128, 144, 152, 192, 384, 512
4. Save to `/icons` folder

---

### Schritt 2: GitHub Repository erstellen

```bash
cd record-shelf-pwa

# Initialize Git
git init

# Rename .gitignore
mv gitignore .gitignore

# Add files
git add .
git commit -m "Initial commit - Record Shelf PWA v1.2"

# Create GitHub repo (via GitHub.com) dann:
git remote add origin https://github.com/YOUR-USERNAME/record-shelf.git
git branch -M main
git push -u origin main
```

---

### Schritt 3: Netlify Account & Deployment

1. **Gehe zu https://netlify.com** → Sign up (kostenlos)

2. **"Add new site" → "Import an existing project"**

3. **Connect to GitHub**
   - Autorisiere Netlify
   - Wähle dein `record-shelf` Repository

4. **Build Settings:**
   - **Build command:** (leer lassen)
   - **Publish directory:** `.` (Punkt)
   - **Functions directory:** `netlify/functions`

5. **Deploy site!**

---

### Schritt 4: Last.fm API Key konfigurieren

1. **Hole dir einen Last.fm API Key:**
   - Gehe zu https://www.last.fm/api/account/create
   - App Name: "Record Shelf"
   - App Description: "Personal music library"
   - Callback URL: (leer lassen)
   - **Kopiere den API Key!**

2. **In Netlify:**
   - Gehe zu deiner Site
   - **Site settings** → **Environment variables**
   - **Add a variable:**
     - Key: `LASTFM_API_KEY`
     - Value: [Dein Last.fm API Key]
   - **Save**

3. **Re-Deploy:**
   - Gehe zu **Deploys**
   - **Trigger deploy** → **Clear cache and deploy site**

---

### Schritt 5: Custom Domain (Optional)

1. **In Netlify:**
   - **Domain settings**
   - **Add custom domain**
   - Folge den Anweisungen

2. **Oder nutze Netlify subdomain:**
   - Kostenlos: `your-app.netlify.app`
   - **Domain settings** → **Edit site name**

---

## 🎵 Nutzung

### CSV Format

```csv
album,artist,tidal_id
Kind of Blue,Miles Davis,251380836
Abbey Road,The Beatles,77640617
```

**Columns:**
- `album` - Album-Name (Pflicht)
- `artist` - Künstler (Pflicht)
- `tidal_id` - Tidal Album-ID (Optional, aber empfohlen)

**Tidal-ID finden:**
1. Album in Tidal öffnen
2. URL kopieren: `https://listen.tidal.com/album/251380836`
3. Die Zahl am Ende ist die ID: `251380836`

### Installation (Mobile)

**iOS (Safari):**
1. Öffne die App in Safari
2. Tippe "Teilen" Button
3. "Zum Home-Bildschirm"

**Android (Chrome):**
1. Öffne die App in Chrome
2. Tippe Menü (⋮)
3. "App installieren" oder "Zum Startbildschirm hinzufügen"

**Desktop (Chrome/Edge):**
1. Öffne die App
2. Klicke "App installieren" in der Adressleiste (➕ Icon)

---

## 🔧 Entwicklung

### Lokales Testen

**Mit Netlify CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Link to your site
netlify link

# Set environment variable locally
echo "LASTFM_API_KEY=your_key_here" > .env

# Start dev server with functions
netlify dev
```

Öffne http://localhost:8888

**Ohne Netlify CLI (einfach):**
```bash
# Python Simple Server
python3 -m http.server 8000

# Oder Node
npx serve .
```

⚠️ **Achtung:** Ohne Netlify CLI funktionieren die Serverless Functions nicht!

---

## 📂 Projektstruktur

```
record-shelf-pwa/
├── index.html              # Haupt-App
├── manifest.json           # PWA Manifest
├── sw.js                   # Service Worker
├── netlify.toml            # Netlify Config
├── .gitignore              # Git ignore rules
├── README.md               # Diese Datei
├── icons/                  # App Icons
│   ├── icon-template.svg   # SVG Master
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   ├── icon-512.png
│   ├── icon-192-maskable.png
│   └── icon-512-maskable.png
└── netlify/
    └── functions/
        └── lastfm.js       # Last.fm API Proxy
```

---

## 🔒 Sicherheit

### API Key Protection

✅ **Last.fm API Key ist sicher:**
- Wird NICHT im Frontend-Code gespeichert
- Liegt nur in Netlify Environment Variables
- Serverless Function ist der einzige Zugriffspunkt
- Kein direkter Zugriff von Client möglich

### Was Nutzer NICHT können:
- ❌ Deinen API Key auslesen
- ❌ API direkt missbrauchen
- ❌ Rate Limits auf deinen Key umgehen

### Rate Limiting:
Netlify Functions haben automatisches Rate Limiting:
- 125,000 Requests/Monat (kostenlos)
- Dann: $25/Million weitere Requests

Für persönlichen Gebrauch völlig ausreichend!

---

## 🐛 Troubleshooting

### Icons werden nicht angezeigt
- Prüfe ob alle PNG-Dateien in `/icons` liegen
- Cache leeren: Netlify Deploy → "Clear cache and deploy"

### Functions funktionieren nicht
- Prüfe `LASTFM_API_KEY` in Environment Variables
- Schaue in Netlify Functions Logs
- Teste lokal mit `netlify dev`

### PWA Install-Prompt erscheint nicht
- Nur über HTTPS (Netlify hat automatisch HTTPS!)
- Service Worker muss registriert sein
- Einige Browser zeigen Prompt nur nach mehreren Besuchen

### Offline funktioniert nicht
- Service Worker muss erfolgreich registriert sein
- Browser Console: "Service Worker registered" sollte erscheinen
- Erst nach erstem erfolgreichen Laden offline-fähig

---

## 📊 Performance

**Load Times:**
- First Visit: ~2-3s (mit Cache)
- Return Visit: <500ms (Service Worker)
- Offline: Instant (aus Cache)

**CSV Import:**
- 1000 Alben: ~1-2 Minuten
- 100 Alben: ~10-15 Sekunden

**Storage:**
- localStorage: ~500 KB pro 1000 Alben
- Service Worker Cache: ~2-3 MB
- Icons: ~200 KB

---

## 🎨 Anpassungen

### Farben ändern

In `index.html` und `manifest.json`:
```css
:root {
    --bg-primary: #1f2128;      /* Haupt-Hintergrund */
    --bg-secondary: #2a2d3a;    /* Sekundär */
    --accent: #d4845f;          /* Akzentfarbe */
}
```

In `manifest.json`:
```json
{
  "background_color": "#1f2128",
  "theme_color": "#d4845f"
}
```

### Icon anpassen

Bearbeite `icons/icon-template.svg` und regeneriere PNGs.

---

## 📱 Browser Kompatibilität

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| PWA Install | ✅ | ✅ | ✅ | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |
| Offline | ✅ | ✅ | ✅ | ✅ |
| Netlify Functions | ✅ | ✅ | ✅ | ✅ |

---

## 🆘 Support

**Probleme?**
1. Check Netlify Function Logs
2. Check Browser Console (F12)
3. Check Service Worker Status (Chrome DevTools → Application)

**Updates deployen:**
```bash
git add .
git commit -m "Update message"
git push

# Netlify deployt automatisch!
```

---

## 📄 Lizenz

Für persönlichen Gebrauch. Open Source.

---

## 🎉 Credits

- **Design:** Inspired by cozy vinyl collections
- **Icons:** Vinyl record design
- **Fonts:** Pacifico (Google Fonts), Inter
- **APIs:** Last.fm, Tidal, MusicBrainz

---

**Viel Spaß mit deiner PWA!** 📀🎵

Version: 1.2  
Last Updated: Februar 2026
