import { BaseScene } from './BaseScene.js';
import { globalVariables } from '../globalVariables.js';

import bgImageUrl from '../images/scene01/startScreen.png';

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
