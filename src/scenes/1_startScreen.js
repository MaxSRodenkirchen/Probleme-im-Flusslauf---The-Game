import { BaseScene } from './_BaseScene.js';
import { globalVariables } from '../globalVariables.js';

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

        const startText = p.createDiv("Starte Spiel");
        startText.id("startText");
        startText.class("chelsea-market");
        startText.position(p.width / 2 - 250, p.height - 200);
        await startText.mousePressed(() => {
            globalVariables.currentScene++;
            this.sceneManager.switchScene(globalVariables.currentScene, p);
        })

        const head1 = p.createP("Probleme");
        head1.class("chelsea-market hugeText");
        head1.position(245, 195);
        head1.style('transform', `rotate(-3deg)`);

        const head2 = p.createP("im");
        head2.class("chelsea-market hugeText");
        head2.position(320, 320);
        head2.style('transform', `rotate(-3deg)`);

        const head3 = p.createP("Flusslauf");
        head3.class("chelsea-market hugeText");
        head3.position(500, 330);
        head3.style('transform', `rotate(-3deg)`);

        const banner = p.createDiv("");
        banner.class("banner shadow");
        banner.position(-1200, 100);
        banner.style('transform', `rotate(-16deg)`);

        const bannerText = p.createP("DEMO");
        bannerText.class("chelsea-market bigText");
        bannerText.parent(banner);


        this.domElements.push(startText, head1, head2, head3, banner, bannerText);

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
