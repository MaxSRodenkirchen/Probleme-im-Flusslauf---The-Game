import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import bix from "../images/BixBiber.png";
import Kläranlage from "../images/Kläranlage_Bau.png";


export class scene16 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene16", p, sceneManager, uiManager);
        this.speech = null;
    }

    async setup(p) {
        this.uiManager.setup();

        this.speech = `Platzhalter: Diese neue Szene dient als Überleitung zwischen der Materialsuche und den weiteren Taten. Hier könnte Max Mare oder eine andere Figur etwas Wichtiges sagen!`;

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

        const s = 0.4; // 60% of width
        bau.style("width", p.width * s + "px");
        bau.style("height", "auto");
        bau.class("transition shadow borderRadius");
        bau.position(
            500,
            100
        );

        const text = p.createDiv(this.speech);
        text.class("chelsea-market smallText");
        text.size(500, 0);
        text.position(p.width - 570, p.height - 370);
        text.style("transform", "rotate(-1deg)");

        this.domElements.push(name, bärbel, text, bau);
        this.uiManager.showAnswer("Weiter zum nächsten Schritt!");
    }

    draw(p) {
        this.uiManager.toggleLastSceneButton(true);
        this.uiManager.toggleNextSceneButton(true);
    }

    cleanup() {
        super.cleanup();
    }
}
