import { BaseScene } from './_BaseScene.js';
import { globalVariables } from '../globalVariables.js';

import maxMareUrl from '../images/scene03/maxMare.png';


export class scene03 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene03", p, sceneManager, uiManager);

        this.speech = `Wir haben ein großes Problem. Seit kurzem ist die Stimme der Meere ganz leise geworden. Ohne sie läuft hier gar nichts mehr. Könnt ihr, die ${globalVariables.teamName}, uns helfen?`;
    }

    async setup(p) {
        this.uiManager.setup();
        this.speech = `Wir haben ein großes Problem. Seit kurzem ist die Stimme der Meere ganz leise geworden. Ohne sie läuft hier gar nichts mehr. Könnt ihr, die ${globalVariables.teamName}, uns helfen?`;

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
        super.cleanup();
    }
}
