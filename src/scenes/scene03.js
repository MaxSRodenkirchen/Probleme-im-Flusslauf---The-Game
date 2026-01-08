import { BaseScene } from './BaseScene.js';
import { globalVariables } from '../globalVariables.js';

import maxMareUrl from '../images/scene03/maxMare.jpeg';


export class scene03 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene03");
        this.sceneManager = sceneManager;
        this.uiManager = uiManager;
        this.p = p;

        this.speech = `Wir haben ein großes Problem. Seit kurzem ist die Stimme der Meere ganz leise geworden. Ohne sie läuft hier gar nichts mehr. Könnt ihr, die ${globalVariables.teamName}, uns helfen?`;
        this.domElements = [];
    }

    async setup(p) {
        this.uiManager.setup();

        const name = p.createDiv("Max Mare");
        name.id("nameBig");
        name.class("chelsea-market");
        name.position(globalVariables.ui.sideSpace, globalVariables.ui.sideSpace);

        const maxMare = p.createImg(maxMareUrl, "Image with Text: Probleme im Flusslauf");
        maxMare.position(-320, 150);
        maxMare.id("maxMare01")

        const size = 0.92;
        maxMare.size(p.width * size, p.height * size);

        const text = p.createDiv(this.speech);
        text.class("chelsea-market mediumText")
        text.size(500, 0);
        text.position(p.width - 570, p.height - 370)
        text.style("transform", 'rotate(-1deg)')

        this.domElements.push(name, maxMare, text)

    }

    draw(p) {
        this.uiManager.toggleLastSceneButton(true);
        this.uiManager.toggleNextSceneButton(true);
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
