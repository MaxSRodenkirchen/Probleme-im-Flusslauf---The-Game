import { BaseScene } from "./_BaseScene.js";
import { globalVariables, getRandomDegree } from "../globalVariables.js";
import { wimmelbild } from "../games/wimmelbild.js";

import bgImageUrl from "../images/Wimmelbild_Mittellauf/Wimmelbild.png";
import img1 from "../images/Wimmelbild_Mittellauf/Muelldeponie.png";
import img2 from "../images/Wimmelbild_Mittellauf/Personen.png";
import img3 from "../images/Wimmelbild_Mittellauf/Picknick.png";
import img4 from "../images/Wimmelbild_Mittellauf/Kanalrohr.png";
import bärbel from "../images/bbarbe.png";

export class scene11 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene11", p, sceneManager, uiManager);

        this.game = new wimmelbild(p, this, this.uiManager, bgImageUrl, [
            img1,
            img2,
            img3,
            img4,
        ]);
    }

    async setup(p) {
        const textArray = [
            `Es scheint als hätte Max Mare nicht ohne Grund euch, die <span class="highlight">${globalVariables.teamName}</span> ausgewählt. <br> Vielleicht könnt ihr uns ja tatsächlich helfen.`,
            `Schaut euch mal genau um. Seht ihr wie der Müll in Wasser kommt? <br> Klickt auf die <span class = "highlight"> vier Ursachen der Verschmutzung.</span>`,
        ];
        this.uiManager.displayCharacter(bärbel, "Bärbel Barbe", textArray);

        this.uiManager.setup();
        this.game.setup(p);
        // this.domElements.push();
    }

    draw(p) {
        this.game.draw();
        // this.uiManager.toggleLastSceneButton(true);
        this.uiManager.toggleNextSceneButton(this.completed);
    }

    cleanup(p) {
        this.game.cleanup();
        super.cleanup();
    }
}
