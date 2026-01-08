import { BaseScene } from './BaseScene.js';
import { globalVariables } from '../globalVariables.js';

/*
Für Copy & Paste
Change Title and Import
*/


export class plainScene extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("plainScene");
        this.sceneManager = sceneManager;
        this.uiManager = uiManager;
        this.p = p;
        this.domElements = [];
    }

    async setup(p) {
        this.uiManager.setup();
        // this.domElements.push();
    }

    draw(p) {
        // this.uiManager.toggleLastSceneButton(true);
        // this.uiManager.toggleNextSceneButton(true);
    }

    cleanup(p) {
        this.domElements.forEach(elements => {
            elements.remove();
        });
        this.domElements = [];
        this.uiManager.cleanup();
    }
    keyPressed(p) {
    }
    mousePressed(p) {
    }
}
