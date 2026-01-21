# 📐 Responsive Scaling & Auto-Parenting Guide

Dieses Dokument erklärt das System, das es ermöglicht, p5.js Projekte mit **festen Pixelwerten** zu designen (z. B. 1194x834), während die Anwendung auf jedem Endgerät (Tablet, Desktop, Handy) perfekt skaliert.

---

## 1. Das Konzept: "Fixed Sandbox"

Anstatt den Canvas bei jedem Resize-Event zu verändern (was Layout-Chaos verursacht), nutzen wir eine **Fixed Sandbox**:
1. Wir definieren eine **Basis-Auflösung** (Referenzgröße).
2. Wir platzieren alle Objekte (Bilder, Texte, Buttons) mit festen Pixelwerten innerhalb dieser Größe.
3. Ein Container (`#game-container`) umschließt alles und wird per CSS-Transformation am Stück skaliert.

---

## 2. Auto-Parenting (Der p5-Hack)

Normalerweise hängt p5.js DOM-Elemente (wie `createButton` oder `createDiv`) einfach an das Ende des HTML-Dokuments (`body`). Dadurch würden sie beim Skalieren des Spiels "wegschwimmen".

**Die Lösung:** Wir überschreiben die Standard-Funktionen von p5 kurzzeitig, damit sie jedes neue Element automatisch in unseren skalierten Container legen.

```javascript
// In der setup() Funktion
const domMethods = ["createDiv", "createP", "createImg", "createButton", "createA", "createSpan", "createInput"];

domMethods.forEach((method) => {
  const original = p[method]; // Wir merken uns die original p5-Funktion
  if (original) {
    p[method] = function () {
      const el = original.apply(p, arguments); // Wir rufen das Original auf
      el.parent("game-container");            // Wir erzwingen das Parenting
      return el;                              // Wir geben das Element zurück
    };
  }
});
```

**Vorteil:** Du musst nie wieder manuell `.parent("game-container")` an jedes Element hängen. Es passiert "magisch" im Hintergrund.

---

## 3. Dynamische Skalierung (CSS & JS)

Damit der Container immer exakt so groß ist wie der Bildschirm, aber seine Proportionen behält, nutzen wir ein Duo aus JavaScript und CSS.

### JavaScript: Die Berechnung
Wir berechnen den Skalierungsfaktor basierend auf der kleinsten Seite (Breite oder Höhe), damit nichts abgeschnitten wird.

```javascript
const updateScale = () => {
  const baseWidth = 1194;
  const baseHeight = 834;
  
  const scaling = Math.min(
    window.innerWidth / baseWidth,
    window.innerHeight / baseHeight
  );

  // Wir speichern den Wert in einer CSS-Variable
  document.documentElement.style.setProperty("--game-scale", scaling);
};
```

### CSS: Die Darstellung
Das CSS übernimmt das Zentrieren und das eigentliche "Zoomen" des Containers.

```css
#game-container {
  position: absolute;
  top: 50%;
  left: 50%;
  /* Zentrierung + Skalierung über CSS-Variable */
  transform: translate(-50%, -50%) scale(var(--game-scale, 1));
  transform-origin: center;
  
  width: 1194px;
  height: 834px;
  overflow: visible; /* Wichtig, damit Schatten oder Effekte rausschauen dürfen */
}
```

---

## 4. Warum ist das so genial?

1.  **Pixel-Perfekt:** Wenn du sagst `button.position(100, 100)`, ist dieser Button **immer** an dieser Stelle zum Hintergrundbild, egal ob der Nutzer auf einem 4K Monitor oder einem iPad spielt.
2.  **Kein Code-Overhead:** Du arbeitest in deiner Szene so, als gäbe es nur ein einziges, festes Gerät. Das System kümmert sich um den Rest.
3.  **Performance:** CSS-Skalierung (`transform: scale`) wird von der Grafikkarte (GPU) berechnet und ist extrem flüssig.
4.  **DOM-Integration:** Da DOM-Elemente (HTML) im selben skalierten Container liegen wie der Canvas (p5), verhalten sie sich wie eine Einheit.

---

*Tipp für zukünftige Projekte: Kopiere einfach diesen Part aus der `main.js` und das entsprechende CSS. Ändere nur die `baseWidth` und `baseHeight` in den `globalVariables` und das System passt sich sofort an.*
