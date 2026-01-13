import { BaseScene } from './_BaseScene.js';
import { globalVariables } from '../globalVariables.js';



export class scene09 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene09", p, sceneManager, uiManager);
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

        // const text1 = p.createDiv("Mehr unter");
        // text1.class("chelsea-market bigText");
        // text1.position(p.width / 2 - 250, p.height - 200);
        // text1.style('transform', `rotate(-4deg)`);

        // const text2 = p.createDiv("www.stimme-der-meere.de");
        // text2.class("chelsea-market bigText");
        // text2.position(p.width / 2 - 255, p.height - 150);
        // text2.style('transform', `rotate(-2deg)`);

        const text3 = p.createDiv("Max S. Rodenkirchen<br>in Zusammenarbeit mit<br> Die Stimme der Meere e.V.");
        text3.class("chelsea-market mediumText");
        text3.position(98 + globalVariables.ui.sideSpace + globalVariables.ui.objectHeight, p.height - globalVariables.ui.sideSpace - globalVariables.ui.objectHeight);
        // text3.style('transform', `rotate(-1deg)`);
        text3.style('text-align', `left`);

        const text2 = p.createDiv("Mehr unter<br>www.max-rodenkirchen.de<br>www.stimme-der-meere.de");
        text2.class("chelsea-market mediumText");
        text2.position(420 + globalVariables.ui.sideSpace + globalVariables.ui.objectHeight, p.height - globalVariables.ui.sideSpace - globalVariables.ui.objectHeight);
        // text3.style('transform', `rotate(-1deg)`);
        text2.style('text-align', `left`);

        const banner = p.createDiv("");
        banner.class("banner shadow");
        banner.position(-1200, 100);
        banner.style('transform', `rotate(-16deg)`);

        const bannerText = p.createP("DEMO BEENDET");
        bannerText.class("chelsea-market bigText");
        bannerText.parent(banner);


        this.domElements.push(text2, text3, head1, head2, head3, banner, bannerText); //text1, text2, 

    }

    draw(p) {

        this.uiManager.toggleLastSceneButton(true);
        this.uiManager.toggleNextSceneButton(false);
    }

    cleanup() {
        super.cleanup();
    }
}
