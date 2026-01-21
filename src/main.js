import p5 from "p5";
import "./style.css";
import { globalVariables } from "./globalVariables.js";
import { drawGrid } from "./utils/drawGrid.js";
import { SceneManager } from "./SceneManager.js";
import { initDebugSceneSwitcher } from "./utils/debugSceneSwitcher.js";

import { UIManager } from "./ui/UIManager.js";
import { scene01 } from "./scenes/1_startScreen.js";
import { scene02 } from "./scenes/2_NameGen.js";
import { scene03 } from "./scenes/3_MaxMare-Intro.js";
import { scene04 } from "./scenes/4_Wasserkreislauf.js";
import { scene05 } from "./scenes/5_MeerFakten.js";
import { scene06 } from "./scenes/6_Plastikverschmutzung.js";
import { scene07 } from "./scenes/7_Plastikauswirkungen.js";
import { scene08 } from "./scenes/8_MaxMare-Mission.js";
import { scene09 } from "./scenes/9_demoEnd.js";

const sketch = (p) => {
  let sceneManager;
  let uiManager;

  const updateScale = () => {
    const container = document.getElementById("game-container");
    if (!container) return;

    const baseWidth = globalVariables.canvasWidth;
    const baseHeight = globalVariables.canvasHeight;
    const scaling = Math.min(
      window.innerWidth / baseWidth,
      window.innerHeight / baseHeight,
    );

    // Set scale as CSS variable - layout is centered via CSS translate
    document.documentElement.style.setProperty("--game-scale", scaling);
  };

  p.setup = async () => {
    p.pixelDensity(1);
    const canvas = p.createCanvas(
      globalVariables.canvasWidth,
      globalVariables.canvasHeight,
    );
    canvas.parent("game-container");

    // --- ASSET LOADING START ---
    try {
      const imageModules = import.meta.glob("./images/**/*.{png,jpg,jpeg,svg,webp}", {
        eager: true,
        import: "default",
      });

      const urls = Object.values(imageModules);
      console.log(`[Game] Starte Laden von ${urls.length} Bildern...`);

      // Jedes p.loadImage in ein Promise verpacken, damit wir darauf warten können
      const loadPromises = urls.map((url) => {
        return new Promise((resolve) => {
          p.loadImage(
            url,
            () => resolve(), // Erfolg
            () => {
              console.warn(`[Game] Konnte Bild nicht laden: ${url}`);
              resolve(); // Trotzdem weitermachen
            },
          );
        });
      });

      await Promise.all(loadPromises);
      console.log("[Game] Alle Assets im Cache.");
    } catch (err) {
      console.error("[Game] Fehler beim Vorab-Laden:", err);
    }
    // --- ASSET LOADING END ---

    // Auto-parent all p5 DOM elements to the scaled container
    const domMethods = [
      "createDiv",
      "createP",
      "createImg",
      "createButton",
      "createA",
      "createSpan",
      "createInput",
    ];
    domMethods.forEach((method) => {
      const original = p[method];
      if (original) {
        p[method] = function () {
          const el = original.apply(p, arguments);
          el.parent("game-container");
          return el;
        };
      }
    });

    sceneManager = new SceneManager();
    uiManager = new UIManager(p, sceneManager);

    sceneManager.addScene(new scene01(p, sceneManager, uiManager));
    sceneManager.addScene(new scene02(p, sceneManager, uiManager));
    sceneManager.addScene(new scene03(p, sceneManager, uiManager));
    sceneManager.addScene(new scene04(p, sceneManager, uiManager));
    sceneManager.addScene(new scene05(p, sceneManager, uiManager));
    sceneManager.addScene(new scene06(p, sceneManager, uiManager));
    sceneManager.addScene(new scene07(p, sceneManager, uiManager));
    sceneManager.addScene(new scene08(p, sceneManager, uiManager));

    sceneManager.addScene(new scene09(p, sceneManager, uiManager));

    // Initialize debug helper
    initDebugSceneSwitcher(p, sceneManager);

    // Start with first scene (index 0)
    try {
      await sceneManager.switchScene(3, p);
    } catch (err) {
      console.error("[Game] Error während Szenen-Setup:", err);
    }

    // Initial scale
    updateScale();

    // Ladebildschirm verstecken
    const hideLoading = () => {
      const loadingScreen = document.getElementById("loading-screen");
      if (loadingScreen) {
        loadingScreen.classList.add("hidden");
        console.log("[Game] Spiel bereit.");
      }
    };
    hideLoading();
  };

  p.draw = () => {
    sceneManager.update(p);
    sceneManager.draw(p);
  };

  p.windowResized = () => {
    updateScale();
  };
};

// Create p5 instance
new p5(sketch);
