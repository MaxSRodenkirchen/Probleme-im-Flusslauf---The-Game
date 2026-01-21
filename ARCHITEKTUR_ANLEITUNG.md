# Architektur-Anleitung: P5.js Instance Mode mit SceneManager

Eine vollständige Anleitung zur Verwendung der SceneManager-basierten Architektur für dein p5.js Projekt (Stand: Januar 2026).

---

## 📋 Inhaltsverzeichnis

1. [Architektur-Überblick](#architektur-überblick)
2. [Kernkomponenten](#kernkomponenten)
3. [Neue Szene erstellen](#neue-szene-erstellen)
4. [Global Variables (State Management)](#global-variables-state-management)
5. [UI-Elemente & UIManager](#ui-elemente--uimanager)
6. [Assets & Image Loading](#assets--image-loading)
7. [Best Practices](#best-practices)

---

## Architektur-Überblick

### Das Konzept

Die Architektur basiert auf dem **Scene Pattern**: Jedes Minigame oder jeder Bildschirm ist eine eigene **Szene** (Scene). Der **SceneManager** verwaltet, welche Szene gerade aktiv ist und kümmert sich um die Übergänge.

```
┌───────────────────────────────────────────┐
│           main.js (p5 Instance)           │
│  ┌─────────────────────────────────────┐  │
│  │           SceneManager              │  │
│  │  ┌───────────────────────────────┐  │  │
│  │  │        Aktuelle Szene         │  │  │
│  │  │ (scene01, scene02, ...)       │  │  │
│  │  └───────────────────────────────┘  │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │            UIManager                │  │
│  │      (Buttons, Dialoge, Icons)      │  │
│  └─────────────────────────────────────┘  │
└───────────────────────────────────────────┘
               ↓ verwendet ↓
      ┌───────────────────────────┐
      │     globalVariables.js    │
      │  (Zustand & Einstellungen)│
      └───────────────────────────3
```

### Dateistruktur

```
src/
├── main.js                 # Einstiegspunkt & Asset-Preloading
├── globalVariables.js      # Globaler Spielzustand & UI-Konstanten
├── SceneManager.js         # Szenen-Verwaltung
├── ui/
│   └── UIManager.js        # Zentrales UI-System (Buttons, Charakter-Dialoge)
├── scenes/
│   ├── _BaseScene.js       # Basis-Klasse (alle Szenen erben davon)
│   ├── 1_startScreen.js    # Konkrete Szenen-Implementierung
│   └── ...
└── games/
    ├── _BaseGame.js        # Basis-Klasse für Minispiele
    ├── wimmelbild.js       # Beispiel für ein Spiel-Modul
    └── ...
```

---

## Kernkomponenten

### 1. globalVariables.js - Die "Single Source of Truth"

**Zweck:** Zentrale Datenhaltung für alle Szenen und UI-Einstellungen.

```javascript
export const globalVariables = {
    teamName: "flinken Fische",
    currentScene: 0,
    ui: {
        objectWidth: 100,
        sideSpace: 50
    },
    colors: {
        darkBlue: "#467DFC"
    }
};
```

**Verwendung in Szenen:**
```javascript
import { globalVariables } from '../globalVariables.js';

// Lesen
console.log(globalVariables.teamName);

// Schreiben
globalVariables.currentScene++;
```

### 2. main.js - Der Motor

**Zweck:** Initialisiert p5.js, lädt **alle** Bilder vorab (Preloading per async/await) und startet den SceneManager.

*   **Preloading:** Nutzt `import.meta.glob`, um alle Assets in den Cache zu schaufeln, bevor der Ladebildschirm verschwindet.
*   **Auto-Parenting:** Sorgt dafür, dass alle p5 DOM-Elemente automatisch im `#game-container` landen.

### 3. _BaseScene.js - Das Fundament

**Zweck:** Jede Szene muss von dieser Klasse erben. Sie bietet automatische Aufräumfunktionen (`cleanup`).

**Pflicht-Methoden:**
- `async setup(p)` - Wird beim Aktivieren aufgerufen (wichtig: `this.uiManager.setup()` nicht vergessen!)
- `draw(p)` - Die p5-Zeichenschleife der Szene.

---

## Neue Szene erstellen

### Schritt-für-Schritt

#### 1. Datei anlegen
Erstelle `src/scenes/X_MeineSzene.js`:

```javascript
import { BaseScene } from './_BaseScene.js';
import { globalVariables } from '../globalVariables.js';

export class MeineSzene extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("meineSzene", p, sceneManager, uiManager);
    }

    async setup(p) {
        // 1. UI Standard-Buttons initialisieren
        this.uiManager.setup();
        
        // 2. Eigene Elemente erstellen
        const text = p.createDiv("Willkommen!");
        text.position(100, 100);
        
        // 3. In domElements Array pushen für automatisches Cleanup
        this.domElements.push(text);
    }

    draw(p) {
        // UI Steuerung (Buttons zeigen/verstecken)
        this.uiManager.toggleNextSceneButton(true);
    }
}
```

#### 2. In main.js registrieren
Importiere die Szene oben und füge sie dem `sceneManager` hinzu.

---

## Assets & Image Loading

Wir nutzen ein **Automatisches Preloading System**:

1.  Bilder liegen in `src/images/`.
2.  `main.js` lädt alle Bilder beim Start in den Cache.
3.  In den Szenen importierst du Bilder weiterhin per Variable:
    `import maxImg from '../images/scene03/max.png';`
4.  Der Browser nimmt das Bild dann blitzschnell aus dem Cache statt es neu zu laden (verhindert flackernde Texte).

Für Details siehe: `IMAGE-LOADING-ANLEITUNG.md`

---

## Best Practices

### ✅ DO's

1.  **Immer `this.domElements.push(el)`**: Wenn du ein p5-Element (Button, Div, Img) erstellst, füge es diesem Array hinzu. `_BaseScene` entfernt es dann automatisch bei Szenenwechsel.
2.  **`this.uiManager.setup()`**: Muss in jedem `setup()` aufgerufen werden, damit die Navigations-Buttons korrekt erscheinen.
3.  **Relative Pfade in globalVariables**: UI-Maße (Paddings, Größen) sollten dort definiert sein, um ein konsistentes Look-and-Feel zu garantieren.

### ❌ DON'Ts

1.  **Kein `preload()` mehr verwenden**: Da wir p5.js mit `async setup` nutzen, ist das alte `preload` veraltet und führt zu hängenden Ladebildschirmen.
2.  **Keine Inline-Styles im Übermaß**: Nutze nach Möglichkeit CSS-Klassen in `style.css` (z.B. `.chelsea-market`, `.shadow`).
3.  **Keine Hard-Werte für Farben**: Nutze die Variablen aus `globalVariables.colors` oder die CSS-Variablen in `:root`.

---

**Viel Erfolg beim Entwickeln! Bei Fragen zum Image-Loading schau in die neue Anleitung.**
