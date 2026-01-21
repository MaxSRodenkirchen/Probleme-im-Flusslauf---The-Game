# 🖼️ Image Loading Anleitung

So funktioniert das blitzschnelle Laden der Bilder in diesem Projekt:

### 1. Die "Tankstelle" (`main.js`)
Am Start des Spiels sucht die `main.js` automatisch **alle** Bilder im `images/` Ordner zusammen:
- **`import.meta.glob`**: Findet jeden Dateipfad, egal wie tief er in Ordnern versteckt ist.
- **`await Promise.all()`**: Zwingt das Programm zu warten, bis jedes einzelne Bild im **Browser-Cache** (Kurzzeitgedächtnis) gelandet ist.
- **Ladebildschirm**: Bleibt so lange aktiv, bis dieser "Pre-Fetch" abgeschlossen ist.

### 2. Die "Nutzung" in den Szenen
In deinen Szenen importierst du Bilder weiterhin ganz normal als Variablen:
```javascript
import meinBildUrl from '../images/szene/bild.png';
```
Wenn du dann `p.createImg(meinBildUrl)` aufrufst, passiert das:
- Der Browser fragt nach dem Bild unter der URL.
- Er sieht sofort: *"Moment, das hab ich gerade in der `main.js` schon geladen!"*
- Er zieht es in Millisekunden aus dem Cache. **Ergebnis: Kein Aufblitzen von Text, das Bild ist sofort da.**

### 3. Warum dieser Weg?
- **Keine Wartezeiten im Spiel**: Der Lade-Stress passiert einmalig am Anfang.
- **Sicherheit**: Durch die Import-Variablen in den Szenen prüft Vite sofort, ob ein Dateipfad stimmt. Wenn du dich vertippst, zeigt die Konsole einen Fehler.
- **Ordnung**: Die `main.js` kümmert sich um die Technik (Laden), die Szenen kümmern sich um den Inhalt (Anzeigen).

---
*Tipp: Wenn du neue Bilder hinzufügst, musst du nichts weiter tun. Die `main.js` findet sie dank des `**/*.png` Musters automatisch!*
