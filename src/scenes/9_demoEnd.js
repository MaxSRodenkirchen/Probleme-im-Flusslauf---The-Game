import { BaseScene } from './_BaseScene.js';
import { globalVariables } from '../globalVariables.js';

import bgImageUrl from '../images/scene01/startScreen.png';
import { SceneManager } from '../SceneManager.js';




export class scene09 extends BaseScene {
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

        const text1 = p.createDiv("Mehr unter");
        text1.class("chelsea-market bigText");
        text1.position(p.width / 2 - 250, p.height - 200);
        text1.style('transform', `rotate(-4deg)`);
        const text2 = p.createDiv("www.stimme-der-meere.de");
        text2.class("chelsea-market bigText");
        text2.position(p.width / 2 - 255, p.height - 150);
        text2.style('transform', `rotate(-2deg)`);


        this.domElements.push(text1, bgImage);

    }

    draw(p) {

        this.uiManager.toggleLastSceneButton(true);
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
