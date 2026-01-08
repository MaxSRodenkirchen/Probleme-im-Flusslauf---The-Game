import { BaseScene } from './_BaseScene.js';
import { globalVariables } from '../globalVariables.js';



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

        const text1 = p.createDiv("Mehr unter");
        text1.class("chelsea-market bigText");
        text1.position(p.width / 2 - 250, p.height - 200);
        text1.style('transform', `rotate(-4deg)`);

        const text2 = p.createDiv("www.stimme-der-meere.de");
        text2.class("chelsea-market bigText");
        text2.position(p.width / 2 - 255, p.height - 150);
        text2.style('transform', `rotate(-2deg)`);

        const banner = p.createDiv("");
        banner.class("banner shadow");
        banner.position(-1200, 100);
        banner.style('transform', `rotate(-16deg)`);

        const bannerText = p.createP("DEMO BEENDET");
        bannerText.class("chelsea-market bigText");
        bannerText.parent(banner);


        this.domElements.push(text1, text2, head1, head2, head3, banner, bannerText);

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
