import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import bärbelUrl from "../images/bbarbe_character.png";

export class scene13 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene13", p, sceneManager, uiManager);
        this.speech = null;
    }

    async setup(p) {
        this.uiManager.setup();
        this.speech = `Die <span class="highlight">${globalVariables.teamName}</span> haben sich bewiesen. Euch möchte ich diese äußerst wichtige Mission anvertrauen. Aber nun schreitet los. Mein Freund <span class="highlight">Norbert Nass</span>  wird euch unterstützen. `;

        this.speech = `Ihr meint also eine Kläranlage könnte unser Problem lösen? Wenn dem so ist, solltet ihr mit <span class="highlight">Bix Biber</span> sprechen. Sie ist eine der besten Wasserbauerinnen weit und breit. Ihr findet sie im Flussarm A43. Ich zähle auf euch!`;

        const name = p.createDiv("Bärbel Barbe");
        name.id("nameBig");
        name.class("chelsea-market bigText");
        name.position(globalVariables.ui.sideSpace, globalVariables.ui.sideSpace);

        const bärbel = p.createImg(
            bärbelUrl,
            "Image of Bärbel",
        );
        bärbel.class("character-bg");
        // bärbel.parent("#game-container");
        bärbel.position(-280, 40);

        const size = 1.1;
        bärbel.size(p.width * size, p.height * size);
        bärbel.style("z-index", "-999");

        const text = p.createDiv(this.speech);
        text.class("chelsea-market smallText");
        text.size(500, 0);
        text.position(p.width - 570, p.height - 370);
        text.style("transform", "rotate(-1deg)");

        this.domElements.push(name, bärbel, text);
        this.uiManager.showAnswer("Norbert Nass, bring uns zur A43!");
    }

    draw(p) {
        this.uiManager.toggleLastSceneButton(true);
        this.uiManager.toggleNextSceneButton(true);
    }

    cleanup() {
        super.cleanup();
    }
}
