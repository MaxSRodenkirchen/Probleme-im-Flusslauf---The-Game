import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import { bilderRaten } from "../games/bilderRaten.js";

import img1 from "../images/Klaeranlage_4Bilder/Bakterien.png";
import img2 from "../images/Klaeranlage_4Bilder/Becken.png";
import img3 from "../images/Klaeranlage_4Bilder/Rechen.png";
import img4 from "../images/Klaeranlage_4Bilder/Schmutzwasser.png";

import bärbel from "../images/bbarbe_besorgt.jpeg";
import { drawGrid } from "../utils/drawGrid.js";

export class scene12 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene12", p, sceneManager, uiManager);

        this.imageUrls = [img1, img2, img3, img4];

        this.game = new bilderRaten(
            p,
            this,
            this.uiManager,
            this.imageUrls,
            "KLÄRANLAGE",
        );
    }

    async setup(p) {
        this.uiManager.setup();

        // await this.game.loadImages(p, this.imageUrls, this.bgFieldUrls);
        await this.game.setup(p);

        const textArray = [
            `Ich glaube ihr seht jetzt was unser Problem ist, oder? `,
            `Gegen die Verschmutzung der Menschen kommen wir mit unserer biologischen Reinigung einfach nicht mehr gegen.`,
            `Habt ihr eine Idee was wir noch gegen die Verschmutzung machen könnten? `,
        ];
        this.uiManager.displayCharacter(bärbel, "Bärbel Barbe", textArray);
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
