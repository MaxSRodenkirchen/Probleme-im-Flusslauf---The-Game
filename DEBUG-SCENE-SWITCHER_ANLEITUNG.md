# Debug Scene Switcher - Dokumentation

Dieses Tool ermöglicht es Entwicklern, während der Entwicklung schnell zwischen den verschiedenen Szenen des Spiels zu wechseln, ohne das Spiel jedes Mal komplett durchspielen zu müssen.

## Funktionsweise

Der Debug Scene Switcher hört auf Tastatureingaben und wechselt die Szene basierend auf der gedrückten Zahlentaste.

### Tastenkürzel
- **Tasten 1 bis 9**: Springt sofort zur entsprechenden Szene.
  - `1` -> Szene Index 0 (Startbildschirm)
  - `2` -> Szene Index 1 (Namensgenerator)
  - `3` -> Szene Index 2 (Intro)
  - ... und so weiter.

## Implementierungs-Details

### 1. Die Logik (`src/utils/debugSceneSwitcher.js`)
Die Funktion registriert einen `keydown`-Eventlistener am globalen `window`-Objekt. Wenn eine Zahl zwischen 1 und 9 gedrückt wird, berechnet sie den Index (`Taste - 1`) und ruft `sceneManager.switchScene()` auf.

### 2. Dynamisches Laden (`src/main.js`)
Um sicherzustellen, dass dieses Tool **nicht** im fertigen Spiel (Production Build) landet, wird es in `main.js` wie folgt eingebunden:

```javascript
if (import.meta.env.DEV) {
  import("./utils/debugSceneSwitcher.js").then((module) => {
    module.initDebugSceneSwitcher(p, sceneManager);
  });
}
```

*   **`import.meta.env.DEV`**: Dies ist eine spezielle Variable von Vite. Sie ist nur `true`, wenn du `npm run dev` ausführst. Im Build (`npm run build`) ist sie `false`.
*   **Dynamischer Import (`import(...)`)**: Der Code wird nur dann geladen, wenn die Bedingung erfüllt ist. Da Vite erkennt, dass dieser Zweig im Production-Build niemals erreicht wird, wird der Code des Switchers komplett aus den finalen Dateien entfernt ("Tree-Shaking").

## Sicherheit im Build
Durch diese Implementierung ist garantiert:
1.  **Kein Performance-Verlust**: Der Code wird im Browser des Endnutzers gar nicht erst geladen.
2.  **Kein Cheat-Potenzial**: Spieler können im fertigen Spiel nicht durch Drücken der Zahlentasten schummeln, da die Logik physisch nicht in den ausgelieferten JavaScript-Dateien existiert.

---
*Erstellt zur Unterstützung der Entwicklung von "Probleme im Flusslauf - The Game"*
