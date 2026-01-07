import p5 from 'p5';
import './style.css';
import { globalVariables } from './globalVariables.js';
import { drawGrid } from './utils/drawGrid.js';
import { SceneManager } from './SceneManager.js';

import { UIManager } from './ui/UIManager.js';
import { scene01 } from './scenes/scene01.js';
import { scene04 } from './scenes/scene04.js';
import { scene05 } from './scenes/scene05.js';

import { sceneXX } from './scenes/sceneXX.js';



const sketch = (p) => {
  let sceneManager;
  let uiManager;

  p.setup = async () => {

    p.createCanvas(globalVariables.canvasWidth, globalVariables.canvasHeight);


    sceneManager = new SceneManager();
    uiManager = new UIManager(p, sceneManager);

    sceneManager.addScene(new scene01(p, sceneManager, uiManager));
    sceneManager.addScene(new scene04(p, sceneManager, uiManager));
    sceneManager.addScene(new scene05(p, sceneManager, uiManager));

    sceneManager.addScene(new sceneXX(p, sceneManager, uiManager));

    // Start with first scene (index 0)
    await sceneManager.switchScene(2, p);

    // Setup UI overlay
    // uiManager.setup();
  };

  p.draw = () => {

    sceneManager.update(p);
    sceneManager.draw(p);

    // Update UI overlay
    // uiManager.update();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
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
