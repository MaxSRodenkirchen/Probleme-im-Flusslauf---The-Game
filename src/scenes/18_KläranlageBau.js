import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import bix from "../images/BixBiber.png";
import Kläranlage from "../images/Kläranlage_Bau_4.png";


export class scene19 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene19", p, sceneManager, uiManager);
        this.speech = null;
    }

    async setup(p) {
        this.uiManager.setup();

        this.speech = `Super Leute. Mit den von euch gesammelten Materialien und Organismen wird das Wasser ordentlich aufbereitet. Und die Anlage kann sich auch sehen lassen, oder?`;

        const name = p.createDiv("Bix Biber");
        name.id("nameBig");
        name.class("chelsea-market bigText");
        name.position(globalVariables.ui.sideSpace, globalVariables.ui.sideSpace);

        const bärbel = p.createImg(
            bix,
            "Image of Bix Biber",
        );
        bärbel.class("character-bg");
        bärbel.position(-280, 40);

        const size = 1.1;
        bärbel.size(p.width * size, p.height * size);
        bärbel.style("z-index", "-999");

        const bau = p.createImg(
            Kläranlage,
            "Image of the Kläranlage",
        );

        const s = 0.55;
        bau.style("width", p.width * s + "px");
        bau.style("height", "auto");
        // bau.class("transition shadow borderRadius");
        bau.style("mix-blend-mode", "multiply");

        bau.position(
            500,
            80
        );

        const text = p.createDiv(this.speech);
        text.class("chelsea-market smallText");
        text.size(500, 0);
        text.position(p.width - 690, p.height - 300);
        text.style("transform", "rotate(-1deg)");

        this.domElements.push(name, bärbel, text, bau);
        this.uiManager.showAnswer("Danke dir Bix! <br> Wir berichten nun Max Mare von unserem Erfolg.");
    }

    draw(p) {
        this.uiManager.toggleLastSceneButton(true);
        this.uiManager.toggleNextSceneButton(true);
    }

    cleanup() {
        super.cleanup();
    }
}
