import { BaseScene } from './BaseScene.js';
import { globalVariables } from '../globalVariables.js';

import { ablaufRaten } from '../games/ablaufRaten.js';


import img1 from '../images/scene04/verdunstung.png';
import img2 from '../images/scene04/wolkenbildung.png';
import img3 from '../images/scene04/regen.png';
import img4 from '../images/scene04/ablauf.png';

import field from '../images/ui/arrowTurnLeft.png';
import max1 from '../images/scene04/MaxMare1.png';



export class scene04 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene04");
        this.sceneManager = sceneManager;
        this.uiManager = uiManager;
        this.p = p;


        this.imageUrls = [img1, img2, img3, img4];
        this.bgTilesUrls = [field, field, field, field];
        this.game = new ablaufRaten(p, this, this.bgTilesUrls, this.imageUrls, this.uiManager);

    }

    async setup(p) {
        // await this.cleanup();


        // await this.game.loadImages(p, this.imageUrls, this.bgFieldUrls);
        await this.game.setup(p);

        this.uiManager.setup();

        const text = "Ich muss euch allerdings erstmal prüfen:<br>Wie funktioniert ein Wasserkreislauf? ";
        this.uiManager.displayCharacter(max1, "Max Mare", text);

    }

    draw(p) {
        this.game.draw(p);

        this.uiManager.toggleLastSceneButton(true);
        this.uiManager.toggleNextSceneButton(this.completed);
    }

    cleanup() {
        this.uiManager.cleanup();
        this.game.cleanup();
    }
    keyPressed(p) {
    }
    mousePressed(p) {
    }
}
