import { BaseScene } from "./_BaseScene.js";
import { globalVariables, getRandomDegree } from "../globalVariables.js";
import { wimmelbild } from "../games/wimmelbild.js";

import bgImageUrl from "../images/Wimmelbild_Material/Wimmelbild_Material.png";
import img1 from "../images/Wimmelbild_Material/Bakterien.png";
import img2 from "../images/Wimmelbild_Material/Sand.png";
import img3 from "../images/Wimmelbild_Material/Steine.png";
import img4 from "../images/Wimmelbild_Material/Algen.png";
import bix from "../images/BixBiber_Icon.png";

export class scene15 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene15", p, sceneManager, uiManager);


        const positions = [
            { x: 365, y: 29, r: 100 },
            { x: 62, y: 190, r: 200 },
            { x: 625, y: 190, r: 130 },
            { x: 351, y: 385, r: 160 },
        ]

        this.game = new wimmelbild(p, this, this.uiManager, bgImageUrl, [
            img1,
            img2,
            img3,
            img4,
        ], positions);
    }

    async setup(p) {
        const textArray = [
            "Ihr seid gut. Dann ahnt ihr bestimmt auch schon was unser Problem ist.",
            `Was gehört hier nicht ins Meer? <br> Findet und klickt auf die <span class = "highlight"> vier Gegenstände.</span>`,
        ];
        this.uiManager.displayCharacter(bix, "Bix Biber", textArray);

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
