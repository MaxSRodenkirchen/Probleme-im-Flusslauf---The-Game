import { state } from './state.js';

// Manages scene lifecycle and transitions
export class SceneManager {
    constructor() {
        this.scenes = {};
        this.currentScene = null;
    }

    // Register a scene
    addScene(name, scene) {
        this.scenes[name] = scene;
    }

    // Switch to a different scene
    switchScene(name, p) {
        // Cleanup old scene
        if (this.currentScene) {
            this.currentScene.cleanup();
        }

        // Activate new scene
        if (this.scenes[name]) {
            this.currentScene = this.scenes[name];
            this.currentScene.setup(p);
            state.currentScene = name;
        } else {
            console.error(`Scene "${name}" not found!`);
        }
    }

    // Update current scene
    update(p) {
        if (this.currentScene) {
            this.currentScene.update(p);
        }
    }

    // Draw current scene
    draw(p) {
        if (this.currentScene) {
            this.currentScene.draw(p);
        }
    }

    // Delegate keyboard input
    keyPressed(p) {
        if (this.currentScene) {
            this.currentScene.keyPressed(p);
        }
    }

    // Delegate mouse input
    mousePressed(p) {
        if (this.currentScene) {
            this.currentScene.mousePressed(p);
        }
    }
}
