# Architektur-Anleitung: P5.js Instance Mode mit SceneManager

Eine vollständige Anleitung zur Verwendung der SceneManager-basierten Architektur für dein p5.js Projekt.

---

## 📋 Inhaltsverzeichnis

1. [Architektur-Überblick](#architektur-überblick)
2. [Kernkomponenten](#kernkomponenten)
3. [Neue Szene erstellen](#neue-szene-erstellen)
4. [State Management](#state-management)
5. [UI-Elemente hinzufügen](#ui-elemente-hinzufügen)
6. [Assets laden](#assets-laden)
7. [Best Practices](#best-practices)

---

## Architektur-Überblick

### Das Konzept

Die Architektur basiert auf dem **Scene Pattern**: Jedes Minigame oder jeder Bildschirm ist eine eigene **Szene** (Scene). Der **SceneManager** verwaltet, welche Szene gerade aktiv ist und kümmert sich um Übergänge.

```
┌─────────────────────────────────────┐
│          main.js (p5 Instance)      │
│  ┌───────────────────────────────┐  │
│  │      SceneManager             │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │   Aktuelle Szene        │  │  │
│  │  │  (MenuScene/GameScene)  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │      UIManager (Optional)     │  │
│  │   (Persistentes Overlay)      │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
         ↓ verwendet ↓
    ┌─────────────────┐
    │    state.js     │
    │ (Globaler State)│
    └─────────────────┘
```

### Dateistruktur

```
src/
├── main.js                 # p5 Instance Mode Setup
├── state.js                # Globaler Spielzustand
├── SceneManager.js         # Szenen-Verwaltung
├── scenes/
│   ├── BaseScene.js        # Basis-Klasse (alle Szenen erben davon)
│   ├── MenuScene.js        # Beispiel: Menü-Szene
│   └── GameScene.js        # Beispiel: Spiel-Szene
└── ui/
    └── UIManager.js        # Optional: Persistentes UI
```

---

## Kernkomponenten

### 1. state.js - Der globale Zustand

**Zweck:** Zentrale Datenhaltung für alle Szenen.

```javascript
export const state = {
    currentScene: 'menu',
    score: 0,
    lives: 3,
    currentLevel: 1,
    
    // Deine eigenen Variablen:
    playerName: '',
    highscore: 0,
    // ...
};
```

**Verwendung in Szenen:**
```javascript
import { state } from '../state.js';

// Lesen
console.log(state.score);

// Schreiben
state.score += 10;
state.lives--;
```

### 2. SceneManager.js - Die Schaltzentrale

**Zweck:** Verwaltet alle Szenen und deren Übergänge.

**Wichtige Methoden:**
- `addScene(name, scene)` - Szene registrieren
- `switchScene(name, p)` - Zu anderer Szene wechseln
- `update(p)` - Aktualisiert aktive Szene
- `draw(p)` - Zeichnet aktive Szene

**Du musst hier normalerweise nichts ändern!**

### 3. BaseScene.js - Die Basis-Klasse

**Zweck:** Definiert das Interface, das alle Szenen haben müssen.

**Pflicht-Methoden:**
- `setup(p)` - Wird beim Aktivieren der Szene aufgerufen
- `draw(p)` - Wird jeden Frame aufgerufen

**Optionale Methoden:**
- `update(p)` - Für Spiel-Logik (vor draw)
- `cleanup()` - Wird beim Verlassen der Szene aufgerufen
- `keyPressed(p)` - Tastatur-Input
- `mousePressed(p)` - Maus-Input

### 4. main.js - Der Einstiegspunkt

**Zweck:** Initialisiert p5.js im Instance Mode und startet das Spiel.

```javascript
// Szenen registrieren
sceneManager.addScene('menu', new MenuScene(sceneManager));
sceneManager.addScene('game', new GameScene(sceneManager));

// Start-Szene festlegen
sceneManager.switchScene('menu', p);
```

---

## Neue Szene erstellen

### Schritt-für-Schritt Anleitung

#### 1. Neue Datei erstellen

Erstelle `src/scenes/MeineNeueScene.js`:

```javascript
import { BaseScene } from './BaseScene.js';
import { state } from '../state.js';

export class MeineNeueScene extends BaseScene {
    constructor(sceneManager) {
        super('meineNeueScene');
        this.sceneManager = sceneManager;
        
        // Deine Variablen
        this.counter = 0;
    }

    setup(p) {
        console.log('MeineNeueScene setup');
        // Initialisierung hier
    }

    draw(p) {
        p.background(100);
        
        // Zeichne hier
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(32);
        p.text('Meine neue Szene!', p.width / 2, p.height / 2);
    }

    keyPressed(p) {
        // ESC = zurück zum Menü
        if (p.keyCode === 27) {
            this.sceneManager.switchScene('menu', p);
        }
    }

    cleanup() {
        console.log('MeineNeueScene cleanup');
        // Aufräumen (z.B. DOM-Elemente entfernen)
    }
}
```

#### 2. Szene in main.js registrieren

```javascript
import { MeineNeueScene } from './scenes/MeineNeueScene.js';

// In p.setup():
sceneManager.addScene('meineNeue', new MeineNeueScene(sceneManager));
```

#### 3. Zur Szene wechseln

Von einer anderen Szene aus:
```javascript
this.sceneManager.switchScene('meineNeue', p);
```

---

## State Management

### Wann state.js verwenden?

✅ **Verwende state.js für:**
- Daten, die über mehrere Szenen hinweg benötigt werden
- Spieler-Statistiken (Score, Lives, Level)
- Globale Einstellungen
- Daten, die im UI angezeigt werden sollen

❌ **Verwende NICHT state.js für:**
- Szenen-spezifische Variablen (z.B. Position eines Balls)
- Temporäre Berechnungen
- p5.js Objekte (Images, Sounds)

### Beispiel: Punkte-System

```javascript
// In state.js
export const state = {
    score: 0,
    highscore: 0
};

// In deiner Szene
import { state } from '../state.js';

// Punkte hinzufügen
state.score += 10;

// Highscore aktualisieren
if (state.score > state.highscore) {
    state.highscore = state.score;
}
```

---

## UI-Elemente hinzufügen

### Option 1: Canvas-basiertes UI (empfohlen für Spiele)

Zeichne UI direkt im `draw()`:

```javascript
draw(p) {
    p.background(0);
    
    // Spiel-Inhalt
    // ...
    
    // UI oben drüber
    p.fill(255);
    p.textSize(20);
    p.text(`Score: ${state.score}`, 10, 30);
    p.text(`Lives: ${state.lives}`, 10, 60);
}
```

### Option 2: DOM-basiertes UI (für Buttons, Eingabefelder)

Verwende p5.js DOM-Funktionen:

```javascript
setup(p) {
    // Button erstellen
    this.startButton = p.createButton('Start');
    this.startButton.position(p.width / 2 - 50, p.height / 2);
    this.startButton.mousePressed(() => {
        this.sceneManager.switchScene('game', p);
    });
}

cleanup() {
    // WICHTIG: Button entfernen!
    if (this.startButton) {
        this.startButton.remove();
    }
}
```

> **⚠️ Wichtig:** DOM-Elemente **müssen** in `cleanup()` entfernt werden, sonst entstehen Memory Leaks!

---

## Assets laden

### Bilder und Sounds

#### 1. Assets in `public/` Ordner legen

```
public/
├── images/
│   ├── player.png
│   └── enemy.png
└── sounds/
    └── jump.mp3
```

#### 2. In Szene laden

```javascript
export class GameScene extends BaseScene {
    constructor(sceneManager) {
        super('game');
        this.sceneManager = sceneManager;
        this.playerImg = null;
    }

    setup(p) {
        // Bild laden
        this.playerImg = p.loadImage('/images/player.png');
        
        // Sound laden
        this.jumpSound = p.loadSound('/sounds/jump.mp3');
    }

    draw(p) {
        p.background(0);
        
        // Bild zeichnen
        if (this.playerImg) {
            p.image(this.playerImg, 100, 100);
        }
    }

    keyPressed(p) {
        if (p.key === ' ') {
            // Sound abspielen
            this.jumpSound.play();
        }
    }
}
```

---

## Best Practices

### ✅ DO's

1. **Immer `cleanup()` implementieren**
   ```javascript
   cleanup() {
       // DOM-Elemente entfernen
       if (this.button) this.button.remove();
       // Sounds stoppen
       if (this.bgMusic) this.bgMusic.stop();
   }
   ```

2. **State für globale Daten verwenden**
   ```javascript
   // Gut
   state.score += 10;
   
   // Schlecht
   this.globalScore = 10; // Geht bei Szenenwechsel verloren!
   ```

3. **SceneManager für Übergänge nutzen**
   ```javascript
   // Gut
   this.sceneManager.switchScene('menu', p);
   
   // Schlecht
   // Manuell Szenen wechseln
   ```

4. **Hardcoded KeyCodes verwenden**
   ```javascript
   // Gut (funktioniert in Instance Mode)
   if (p.keyCode === 39) { // RIGHT_ARROW
   
   // Schlecht (funktioniert nicht in p5.js 2.0 Instance Mode)
   if (p.keyCode === p.RIGHT_ARROW) {
   ```

### ❌ DON'Ts

1. **Keine globalen Variablen außerhalb von state.js**
   ```javascript
   // Schlecht
   let globalScore = 0;
   
   // Gut
   // In state.js: score: 0
   ```

2. **Keine DOM-Elemente ohne cleanup()**
   ```javascript
   // Schlecht - Memory Leak!
   setup(p) {
       this.button = p.createButton('Click');
       // Kein cleanup()!
   }
   ```

3. **Nicht direkt p5 Funktionen in state.js**
   ```javascript
   // Schlecht
   export const state = {
       canvas: createCanvas(400, 400) // ❌ p5 nicht verfügbar!
   };
   ```

---

## Häufige Szenarien

### Szenario 1: Minigame mit Zeitlimit

```javascript
export class TimedGameScene extends BaseScene {
    constructor(sceneManager) {
        super('timedGame');
        this.sceneManager = sceneManager;
        this.timeLeft = 30; // Sekunden
        this.lastTime = 0;
    }

    setup(p) {
        this.lastTime = p.millis();
    }

    update(p) {
        // Zeit runterzählen
        const currentTime = p.millis();
        if (currentTime - this.lastTime >= 1000) {
            this.timeLeft--;
            this.lastTime = currentTime;
            
            // Zeit abgelaufen?
            if (this.timeLeft <= 0) {
                this.sceneManager.switchScene('gameOver', p);
            }
        }
    }

    draw(p) {
        p.background(0);
        p.fill(255);
        p.textSize(32);
        p.text(`Zeit: ${this.timeLeft}s`, p.width / 2, 50);
    }
}
```

### Szenario 2: Mehrere Levels in einer Szene

```javascript
export class LevelScene extends BaseScene {
    constructor(sceneManager) {
        super('levels');
        this.sceneManager = sceneManager;
        this.currentLevel = 1;
        this.maxLevels = 5;
    }

    nextLevel() {
        this.currentLevel++;
        if (this.currentLevel > this.maxLevels) {
            // Alle Levels geschafft
            this.sceneManager.switchScene('victory', p);
        } else {
            // Nächstes Level laden
            this.loadLevel(this.currentLevel);
        }
    }

    loadLevel(levelNum) {
        // Level-spezifische Logik
        console.log(`Loading level ${levelNum}`);
    }
}
```

### Szenario 3: Pause-Menü

```javascript
export class GameScene extends BaseScene {
    constructor(sceneManager) {
        super('game');
        this.sceneManager = sceneManager;
        this.paused = false;
    }

    update(p) {
        if (!this.paused) {
            // Spiel-Logik nur wenn nicht pausiert
            // ...
        }
    }

    draw(p) {
        // Spiel zeichnen
        // ...
        
        // Pause-Overlay
        if (this.paused) {
            p.fill(0, 0, 0, 150);
            p.rect(0, 0, p.width, p.height);
            p.fill(255);
            p.textSize(48);
            p.text('PAUSE', p.width / 2, p.height / 2);
        }
    }

    keyPressed(p) {
        if (p.key === 'p' || p.key === 'P') {
            this.paused = !this.paused;
        }
    }
}
```

---

## Debugging-Tipps

### Console Logs nutzen

```javascript
setup(p) {
    console.log(`${this.name} setup`);
}

cleanup() {
    console.log(`${this.name} cleanup`);
}
```

### State im Browser inspizieren

Öffne die Browser-Konsole und tippe:
```javascript
import('./src/state.js').then(m => console.log(m.state));
```

### Szenen-Wechsel testen

```javascript
// In der Konsole
import('./src/SceneManager.js').then(m => {
    // SceneManager ist nicht global, aber du kannst state ändern
});
```

---

## Zusammenfassung

1. **Jede Szene** = Eine Klasse, die von `BaseScene` erbt
2. **SceneManager** = Verwaltet Szenen und Übergänge
3. **state.js** = Globale Daten, die überall verfügbar sein müssen
4. **cleanup()** = Immer implementieren, um Memory Leaks zu vermeiden
5. **p5 Instance** = Wird als Parameter `p` übergeben

**Viel Erfolg beim Entwickeln deines Spiels! 🎮**
