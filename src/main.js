import p5 from 'p5';
import './style.css';
import { globalVariables } from './globalVariables.js';
import { drawGrid } from './utils/drawGrid.js';
import { SceneManager } from './SceneManager.js';

import { UIManager } from './ui/UIManager.js';
import { scene01 } from './scenes/1_startScreen.js';
import { scene03 } from './scenes/3_MaxMare-Intro.js';
import { scene04 } from './scenes/4_Wasserkreislauf.js';
import { scene05 } from './scenes/5_MeerFakten.js';
import { scene09 } from './scenes/9_demoEnd.js';
import { sceneXX } from './scenes/sceneXX.js';



const sketch = (p) => {
  let sceneManager;
  let uiManager;

  const updateScale = () => {
    const container = document.getElementById('game-container');
    if (!container) return;

    const baseWidth = globalVariables.canvasWidth;
    const baseHeight = globalVariables.canvasHeight;
    const scaling = Math.min(window.innerWidth / baseWidth, window.innerHeight / baseHeight);

    container.style.transform = `scale(${scaling})`;
  };


  p.setup = async () => {
    const canvas = p.createCanvas(globalVariables.canvasWidth, globalVariables.canvasHeight);
    canvas.parent('game-container');

    // Auto-parent all p5 DOM elements to the scaled container
    const domMethods = ['createDiv', 'createP', 'createImg', 'createButton', 'createA', 'createSpan', 'createInput'];
    domMethods.forEach(method => {
      const original = p[method];
      if (original) {
        p[method] = function () {
          const el = original.apply(p, arguments);
          el.parent('game-container');
          return el;
        };
      }
    });

    sceneManager = new SceneManager();
    uiManager = new UIManager(p, sceneManager);

    sceneManager.addScene(new scene01(p, sceneManager, uiManager));
    sceneManager.addScene(new scene03(p, sceneManager, uiManager));
    sceneManager.addScene(new scene04(p, sceneManager, uiManager));
    sceneManager.addScene(new scene05(p, sceneManager, uiManager));
    sceneManager.addScene(new scene09(p, sceneManager, uiManager));
    // sceneManager.addScene(new sceneXX(p, sceneManager, uiManager));

    // Start with first scene (index 0)
    await sceneManager.switchScene(4, p);

    // Initial scale
    updateScale();
  };

  p.draw = () => {
    sceneManager.update(p);
    sceneManager.draw(p);
  };

  p.windowResized = () => {
    updateScale();
  };

  p.keyPressed = () => {
    sceneManager.keyPressed(p);
    return false; // Prevent default browser behavior
  };

  p.mousePressed = () => {
    sceneManager.mousePressed(p);
  };
};

// Create p5 instance
new p5(sketch);
