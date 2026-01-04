import { BaseScene } from './BaseScene.js';
import { globalVariables } from '../globalVariables.js';

import bgImageUrl from '../images/scene01/startScreen.png';




export class scene02 extends BaseScene {
    constructor(sceneManager, uiManager) {
        super("scene01");
        this.sceneManager = sceneManager;
        this.uiManager = uiManager;

        this.completed = true;
        this.bgImage = null;
    }

    async setup(p) {
        this.bgImage = await p.loadImage(bgImageUrl);
        p.image(this.bgImage, 0, 0);


        this.uiManager.setup();
    }

    draw(p) {
        this.uiManager.toggleLastSceneButton(true);
        this.uiManager.toggleNextSceneButton(true);
    }

    cleanup() {
        this.uiManager.cleanup();
    }
    keyPressed(p) {
    }
    mousePressed(p) {
    }
}
