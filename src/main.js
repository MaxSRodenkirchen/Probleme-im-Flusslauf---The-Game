import p5 from 'p5';
import './style.css';
import { globalVariables } from './globalVariables.js';
import { drawGrid } from './utils/drawGrid.js';

import { SceneManager } from './SceneManager.js';
import { UIManager } from './ui/UIManager.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { scene03 } from './scenes/scene03.js';

import bgImageUrl from './images/ui/background.png';

let bgImage;

// p5.js Instance Mode sketch
const sketch = (p) => {
  let sceneManager;
  let uiManager;

  p.setup = async () => {

    p.createCanvas(globalVariables.canvasWidth, globalVariables.canvasHeight);

    // Initialize managers
    sceneManager = new SceneManager();
    uiManager = new UIManager(p);

    // Register scenes
    sceneManager.addScene('scene03', new scene03(sceneManager));
    sceneManager.addScene('menu', new MenuScene(sceneManager));
    sceneManager.addScene('game', new GameScene(sceneManager));

    // Start with menu scene
    await sceneManager.switchScene('scene03', p);

    // Setup UI overlay
    uiManager.setup();
    bgImage = await p.loadImage(bgImageUrl);
  };

  p.draw = () => {

    p.image(bgImage, 0, 0)
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
