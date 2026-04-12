import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import { ablaufRaten_horizontal } from "../games/ablaufRaten_horizontal.js";

import img1 from "../images/Reihenfolge_Klaeranlage/Rechen.png";
import img2 from "../images/Reihenfolge_Klaeranlage/Sandfang.png";
import img3 from "../images/Reihenfolge_Klaeranlage/Vorklärbecken.png";
import img4 from "../images/Reihenfolge_Klaeranlage/Belebungsbecken.png";
import img5 from "../images/Reihenfolge_Klaeranlage/Nachklärbecken.png";

import field1 from "../images/scene04/final/arrow1.png";
import field2 from "../images/scene04/final/arrow2.png";
import field3 from "../images/scene04/final/arrow3.png";
import field4 from "../images/scene04/final/arrow4.png";
import field5 from "../images/scene04/final/arrow1.png"; // Placeholder
import bix from "../images/BixBiber_Icon.png";

export class scene14 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene14", p, sceneManager, uiManager);

        this.imageUrls = [
            [img1, "Rechen"],
            [img2, "Sandfang"],
            [img3, "Vorklärbecken"],
            [img4, "Belebungsbecken"],
            [img5, "Nachklärbecken"],
        ];

        this.bgTilesUrls = [field1, field2, field3, field4, field5];
        this.game = new ablaufRaten_horizontal(
            p,
            this,
            this.bgTilesUrls,
            this.imageUrls,
            this.uiManager,
        );
    }

    async setup(p) {
        this.uiManager.setup();

        await this.game.setup(p);

        const textArray = [
            `Huch, wo kommt ihr denn auf einmal her? <br> Sucht ihr nach etwas?`,
            `Ah, Max Mare  und Bärbel schicken euch also? <br> Dann wird es wichtig sein.`,
            `Ihr meint eine Kläranlage könnte eine Lösung für die Verschmutzung sein? <br> Da müsst ihr mir ein wenig helfen. <span class= "highlight">Wie wird eine solche Anlage aufgebaut?</span>`
        ];
        this.uiManager.displayCharacter(bix, "Bix Biber", textArray);
    }

    draw(p) {
        this.game.draw(p);

        this.uiManager.toggleLastSceneButton(true);
        this.uiManager.toggleNextSceneButton(this.completed);
    }

    onCompleted() {
        this.uiManager.showAnswer("Weiter geht's!");
    }

    cleanup() {
        super.cleanup();
        this.game.cleanup();
    }
}
