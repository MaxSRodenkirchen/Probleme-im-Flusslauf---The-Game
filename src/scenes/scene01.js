import { BaseScene } from './BaseScene.js';
import { globalVariables } from '../globalVariables.js';

import bgImageUrl from '../images/scene01/startScreen.png';
import { SceneManager } from '../SceneManager.js';




export class scene01 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene01");
        this.sceneManager = sceneManager;
        this.uiManager = uiManager;
        this.p = p;
        this.completed = true;
        this.bgImage = null;
        this.startText = null;
    }

    async setup(p) {
        // this.bgImage = await p.loadImage(bgImageUrl);
        // p.image(this.bgImage, 0, 0);

        this.startText = p.createDiv("Starte Spiel");
        this.startText.id("startText");
        this.startText.class("chelsea-market");
        this.startText.position(p.width / 2 - 250, p.height - 200);
        await this.startText.mousePressed(() => {
            globalVariables.currentScene++;
            this.sceneManager.switchScene(globalVariables.currentScene, p);
            this.cleanup()
        })

        this.uiManager.setup();
    }

    draw(p) {
        this.uiManager.toggleLastSceneButton(false);
        this.uiManager.toggleNextSceneButton(false);
    }

    cleanup() {
        this.startText.remove();
        this.uiManager.cleanup();
    }
    keyPressed(p) {
    }
    mousePressed(p) {
    }
}
