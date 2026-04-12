import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import { bilderRaten } from "../games/bilderRaten.js";

import img1 from "../images/Upcycling_4Bilder/Glas.png";
import img2 from "../images/Upcycling_4Bilder/Konserve.png";
import img3 from "../images/Upcycling_4Bilder/Portmonnaie.png";
import img4 from "../images/Upcycling_4Bilder/Shirt.png";

import max1 from "../images/MaxMare_Icon.png";
import { drawGrid } from "../utils/drawGrid.js";

export class scene21 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene21", p, sceneManager, uiManager);

        this.imageUrls = [img1, img2, img3, img4];

        this.game = new bilderRaten(
            p,
            this,
            this.uiManager,
            this.imageUrls,
            "UPCYCLING",
        );
    }

    async setup(p) {
        this.uiManager.setup();

        // await this.game.loadImages(p, this.imageUrls, this.bgFieldUrls);
        await this.game.setup(p);

        const textArray = [
            `Vollkommen richtig. Wenn jeder etwas mehr auf diese Punkte achten würde, wäre das schon eine große Hilfe. `,
            `Und dabei kann es sogar Spaß machen nachhaltig zu handeln. <br><span class="highlight">Mir fällt nur gerade das Wort nicht ein. Helft mir auf die Sprünge. </span> `
        ];
        this.uiManager.displayCharacter(max1, "Max Mare", textArray);
    }

    draw(p) {
        this.game.draw(p);

        this.uiManager.toggleLastSceneButton(true);
        this.uiManager.toggleNextSceneButton(this.completed);
    }

    cleanup() {
        super.cleanup();
        this.game.cleanup();
    }
}
