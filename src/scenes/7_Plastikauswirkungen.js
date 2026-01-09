import { BaseScene } from './_BaseScene.js';
import { globalVariables } from '../globalVariables.js';

import { bilderRaten } from '../games/bilderRaten.js';


import img1 from '../images/scene07/img1.png';
import img2 from '../images/scene07/img2.png';
import img3 from '../images/scene07/img3.png';
import img4 from '../images/scene07/img4.png';

import max1 from '../images/scene04/MaxMare1.png';



export class scene07 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene07", p, sceneManager, uiManager);


        this.imageUrls = [img1, img2, img3, img4];

        this.game = new bilderRaten(p, this, this.uiManager, this.imageUrls);

    }

    async setup(p) {
        this.uiManager.setup();

        // await this.game.loadImages(p, this.imageUrls, this.bgFieldUrls);
        await this.game.setup(p);



        const text = "Ich muss euch allerdings erstmal prüfen:<br>Wie funktioniert ein Wasserkreislauf? ";
        this.uiManager.displayCharacter(max1, "Max Mare", text);

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
