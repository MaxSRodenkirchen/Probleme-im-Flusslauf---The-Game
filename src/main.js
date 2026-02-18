import p5 from "p5";
import "./style.css";
import { globalVariables } from "./globalVariables.js";
import { drawGrid } from "./utils/drawGrid.js";
import { SceneManager } from "./SceneManager.js";

import { UIManager } from "./ui/UIManager.js";
import { scene01 } from "./scenes/0_startScreen.js";
import { scene02 } from "./scenes/1_NameGen.js";
import { scene03 } from "./scenes/2_MaxMare-Intro.js";
import { scene04 } from "./scenes/3_Wasserkreislauf.js";
import { scene05 } from "./scenes/4_MeerFakten.js";
import { scene06 } from "./scenes/5_Plastikverschmutzung.js";
import { scene07 } from "./scenes/6_Plastikauswirkungen.js";
import { scene08 } from "./scenes/7_MaxMare-Mission.js";
import { scene09 } from "./scenes/8_Flusslauf.js";
import { scene10 } from "./scenes/9_BioReinigung.js";
import { scene11 } from "./scenes/10_UrsacheVerschmutzung.js";
import { scene12 } from "./scenes/11_Kläranlage.js";
import { scene13 } from "./scenes/12_BixBiber.js";
import { scene14 } from "./scenes/13_AufbauKläranlage.js";
import { scene15 } from "./scenes/14_MaterialSuchen.js";
import { scene16 } from "./scenes/15_WortZuFluss.js";
import { scene17 } from "./scenes/16_WasKannManNochTun.js";
import { scene18 } from "./scenes/17_MaxMareEnde.js";
import { scene99 } from "./scenes/99_demoEnd.js";

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
      const imageModules = import.meta.glob(
        "./images/**/*.{png,jpg,jpeg,svg,webp}",
        {
          eager: true,
          import: "default",
        },
      );

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
    sceneManager.addScene(new scene10(p, sceneManager, uiManager));
    sceneManager.addScene(new scene11(p, sceneManager, uiManager));
    sceneManager.addScene(new scene12(p, sceneManager, uiManager));
    sceneManager.addScene(new scene13(p, sceneManager, uiManager));
    sceneManager.addScene(new scene14(p, sceneManager, uiManager));
    sceneManager.addScene(new scene15(p, sceneManager, uiManager));
    sceneManager.addScene(new scene16(p, sceneManager, uiManager));
    sceneManager.addScene(new scene17(p, sceneManager, uiManager));
    sceneManager.addScene(new scene18(p, sceneManager, uiManager));

    sceneManager.addScene(new scene99(p, sceneManager, uiManager));

    // Initialize debug helper only in development
    if (import.meta.env.DEV) {
      import("./utils/debugSceneSwitcher.js").then((module) => {
        module.initDebugSceneSwitcher(p, sceneManager);
      });
    }

    // Start with first scene (index 0)
    try {
      await sceneManager.switchScene(8, p);
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
