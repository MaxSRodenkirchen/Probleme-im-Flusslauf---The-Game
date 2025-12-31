import p5 from 'p5';
import './style.css';
import { SceneManager } from './SceneManager.js';
import { UIManager } from './ui/UIManager.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';

// p5.js Instance Mode sketch
const sketch = (p) => {
  let sceneManager;
  let uiManager;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    // Initialize managers
    sceneManager = new SceneManager();
    uiManager = new UIManager(p);

    // Register scenes
    sceneManager.addScene('menu', new MenuScene(sceneManager));
    sceneManager.addScene('game', new GameScene(sceneManager));

    // Start with menu scene
    sceneManager.switchScene('menu', p);

    // Setup UI overlay
    // uiManager.setup();
  };

  p.draw = () => {
    // Update and draw current scene
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
