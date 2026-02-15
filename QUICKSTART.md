# 🚀 Record Shelf PWA - Quick Start

## In 5 Schritten zur installierbaren PWA!

### 1️⃣ Icons generieren (5 Min)

Gehe zu https://realfavicongenerator.net/
- Upload `/icons/icon-template.svg`
- Download Paket
- Entpacke PNGs in `/icons` Ordner

### 2️⃣ GitHub Repo (2 Min)

```bash
cd record-shelf-pwa
git init
mv gitignore .gitignore
git add .
git commit -m "Initial commit"
```

Erstelle Repo auf GitHub.com, dann:
```bash
git remote add origin https://github.com/USERNAME/record-shelf.git
git push -u origin main
```

### 3️⃣ Netlify Deploy (3 Min)

1. https://netlify.com → Sign up
2. "New site from Git"
3. Wähle dein GitHub Repo
4. **Publish directory:** `.` (Punkt)
5. Deploy!

### 4️⃣ Last.fm API Key (2 Min)

1. https://www.last.fm/api/account/create
   - Hole API Key

2. Netlify → Site Settings → Environment variables
   - Key: `LASTFM_API_KEY`
   - Value: [dein API Key]
   - Save

3. Deploys → "Clear cache and deploy site"

### 5️⃣ Fertig! 🎉

Öffne deine Netlify URL (z.B. `record-shelf.netlify.app`)

**Auf Mobile installieren:**
- iOS: Safari → Share → "Add to Home Screen"
- Android: Chrome → Menu → "Install App"

---

## ✅ Checkliste

- [ ] Icons generiert (10 PNG-Dateien)
- [ ] GitHub Repo erstellt
- [ ] Netlify deployt
- [ ] Last.fm API Key konfiguriert
- [ ] App getestet
- [ ] Auf Handy installiert

---

**Brauchst du Hilfe?** Schau in die ausführliche README.md!
