import { globalVariables } from './globalVariables.js';

export class SceneManager {
    constructor() {
        this.scenes = [];
        this.currentScene = null;
    }

    // Register a scene
    addScene(scene) {
        this.scenes.push(scene);
    }

    async switchScene(index, p) {

        if (this.currentScene) {
            this.currentScene.cleanup();
        }

        // Check if index is valid
        if (index >= 0 && index < this.scenes.length) {
            globalVariables.currentScene = index;
            this.currentScene = this.scenes[index];
            await this.currentScene.setup(p);
            // console.log(`Switched to scene ${index}: ${this.currentScene.name}`);
        } else {
            console.error(`Scene index ${index} out of bounds!`);
        }
    }

    update(p) {
        if (this.currentScene) {
            this.currentScene.update(p);
        }
    }
    draw(p) {
        if (this.currentScene) {
            this.currentScene.draw(p);
        }
    }
    keyPressed(p) {
        if (this.currentScene) {
            this.currentScene.keyPressed(p);
        }
    }
    mousePressed(p) {
        if (this.currentScene) {
            this.currentScene.mousePressed(p);
        }
    }
}
