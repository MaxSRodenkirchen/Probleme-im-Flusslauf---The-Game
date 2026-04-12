import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import maxMareUrl from "../images/scene08/maxMare.png";

export class scene19 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene19", p, sceneManager, uiManager);
        this.speech = null;
    }

    async setup(p) {
        this.uiManager.setup();
        this.speech = `Ich muss sagen, ich habe euch anfangs unterschätzt, aber die <span class="highlight">${globalVariables.teamName}</span> haben sich wirklich bewiesen. Durch euren Beitrag ist es nun wieder ein Stück sauberer geworden. Und ich möchte euch noch etwas verraten: Wir brauchen Leute wie euch, die sich für unsere Ökosysteme einsetzen. <span class="highlight"> Denn ihr seid die Stimme der Meere! </span> Ich hoffe euch bald wiederzusehen.  `;

        const name = p.createDiv("Max Mare");
        name.id("nameBig");
        name.class("chelsea-market bigText");
        name.position(globalVariables.ui.sideSpace, globalVariables.ui.sideSpace);

        const maxMare = p.createImg(
            maxMareUrl,
            "Image with Text: Probleme im Flusslauf",
        );
        maxMare.position(-320, 150);
        maxMare.id("maxMare01");

        const size = 0.92;
        maxMare.size(p.width * size, p.height * size);

        const text = p.createDiv(this.speech);
        text.class("chelsea-market smallText");
        text.size(500, 0);
        text.position(p.width - 570, p.height - 470);
        text.style("transform", "rotate(-1deg)");

        this.domElements.push(name, maxMare, text);
        this.uiManager.showAnswer("Bis bald Max!");
    }

    draw(p) {
        this.uiManager.toggleLastSceneButton(true);
        this.uiManager.toggleNextSceneButton(true);
    }

    cleanup() {
        super.cleanup();
    }
}
