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
        this.domElements = [];

    }

    async setup(p) {
        this.uiManager.setup();

        const bgImage = p.createImg(bgImageUrl, "Image with Text: Probleme im Flusslauf");
        bgImage.position(0, 0);
        bgImage.size(p.width, p.height);

        const startText = p.createDiv("Starte Spiel");
        startText.id("startText");
        startText.class("chelsea-market");
        startText.position(p.width / 2 - 250, p.height - 200);
        await startText.mousePressed(() => {
            globalVariables.currentScene++;
            this.sceneManager.switchScene(globalVariables.currentScene, p);
        })


        this.domElements.push(startText, bgImage);

    }

    draw(p) {

        this.uiManager.toggleLastSceneButton(false);
        this.uiManager.toggleNextSceneButton(false);
    }

    cleanup() {
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
