import { BaseScene } from './_BaseScene.js';
import { globalVariables } from '../globalVariables.js';

/*
Für Copy & Paste
Change Title and Import
*/


export class plainScene extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("plainScene", p, sceneManager, uiManager);
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
        super.cleanup();
    }
}
