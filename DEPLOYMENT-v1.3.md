# 🚀 Record Shelf v1.3 - Deployment Guide

## ✨ Was ist neu in v1.3?

**Netlify Blob Storage Integration!**

- ✅ **Persistente Datenspeicherung** - Daten bleiben für immer
- ✅ **Geräteübergreifend** - Zugriff von Handy, Laptop, Tablet
- ✅ **Keine localStorage-Probleme** - Unabhängig von Browser-Einstellungen
- ✅ **Instant Load** - Keine CSV-Uploads mehr bei jedem Besuch

---

## 📦 Deployment Schritte

### 1. Dependencies installieren

**Auf deinem Mac (im Repo-Verzeichnis):**

```bash
cd ~/path/to/record-shelf

# NPM initialisieren
npm install
```

Das installiert `@netlify/blobs` Package.

### 2. Dateien zu GitHub pushen

```bash
git add .
git commit -m "v1.3: Add Netlify Blob Storage"
git push
```

### 3. Netlify Deploy abwarten

Netlify deployt automatisch (~1-2 Minuten).

**Wichtig:** Netlify installiert die Dependencies automatisch!

---

## 🎯 Wie es funktioniert

### Erster CSV-Upload:

```
1. CSV hochladen
2. Genres/Cover von Last.fm laden
3. → Automatisch in Netlify Blob speichern ✨
4. Fertig!
```

### Nächster Besuch (egal welches Gerät!):

```
1. App öffnen
2. → Automatisch aus Blob laden ⚡
3. Instant anzeigen!
(Kein CSV-Upload nötig!)
```

### Neue CSV hochladen:

```
1. Klick "← Neue CSV laden"
2. CSV hochladen
3. → Blob wird überschrieben
```

---

## 🔍 Testen

### Nach dem Deploy:

1. **Öffne die App** (Hard Refresh: `Cmd+Shift+R`)
2. **Upload CSV** (falls noch keine Daten)
3. **Warte bis Genres/Cover geladen sind**
4. **Browser komplett schließen**
5. **App neu öffnen** → Daten sollten instant da sein! ✅
6. **Öffne auf anderem Gerät** → Daten auch dort! ✅

---

## 📊 Netlify Blob Storage Limits

**Free Tier:**
- ✅ 1 GB Speicher
- ✅ 10,000 Reads/Monat
- ✅ 1,000 Writes/Monat

**Für Single-User völlig ausreichend!**

Deine ~1000 Alben = ~500 KB = **0,0005 GB** 😄

---

## 🔧 Troubleshooting

### "Keine gespeicherten Alben gefunden"

**Check:**
1. Netlify Functions Logs → `save-albums` aufgerufen?
2. Netlify Functions Logs → `load-albums` Fehler?

**Lösung:**
- Einmal CSV hochladen
- Warten bis komplett geladen
- Dann sollte Blob gespeichert sein

### Dependencies nicht installiert

**Fehler:** `Cannot find module '@netlify/blobs'`

**Lösung:**
```bash
# Lokal:
npm install

# In Netlify sollte das automatisch passieren
# Falls nicht: package.json überprüfen
```

### Daten werden nicht geladen

**Check Browser Console:**
```
Lade gespeicherte Alben...
→ Sollte entweder "X Alben aus Blob Storage geladen"
→ Oder "Keine gespeicherten Alben gefunden"
```

**Check Netlify Function Logs:**
- Gehe zu Functions → `load-albums`
- Schau ob Errors da sind

---

## 🎨 Code-Änderungen

### Neue Netlify Functions:

- `netlify/functions/save-albums.js` - Speichert Alben
- `netlify/functions/load-albums.js` - Lädt Alben

### Geänderte Frontend-Logik:

- `init()` - Lädt aus Blob statt localStorage
- `saveToBlob()` - Speichert in Blob (statt saveToStorage)
- `loadNewCSV()` - Löscht Blob bei neuer CSV

### Entfernt:

- localStorage Code (wird nicht mehr genutzt)

---

## 🔮 Vorteile gegenüber v1.2

| Feature | v1.2 | v1.3 |
|---------|------|------|
| Speicherort | localStorage (Browser) | Netlify Blobs (Cloud) |
| Überlebt Browser-Cache löschen | ❌ | ✅ |
| Geräteübergreifend | ❌ | ✅ |
| Überlebt App-Deinstall | ❌ | ✅ |
| Backup nötig | ⚠️ Empfohlen | ❌ Optional |

---

## 📱 User Experience

**v1.2:**
```
Handy: CSV upload → Genres laden → localStorage
→ Browser-Cache löschen → ALLES WEG
→ CSV neu hochladen müssen
```

**v1.3:**
```
Handy: CSV upload → Genres laden → Blob
→ Browser-Cache löschen → Daten noch da ✅
→ Neues Handy → Daten da ✅
→ Laptop → Daten da ✅
```

---

## ✅ Deployment Checklist

- [ ] `npm install` ausgeführt
- [ ] `package.json` committed
- [ ] Neue Functions committed
- [ ] Zu GitHub gepusht
- [ ] Netlify Deploy erfolgreich
- [ ] CSV hochgeladen & getestet
- [ ] Browser geschlossen & neu geöffnet → Daten da?
- [ ] Auf anderem Gerät getestet → Daten da?

---

**Viel Erfolg mit v1.3!** 🎉

Deine Daten sind jetzt wirklich sicher und persistent! 💾
