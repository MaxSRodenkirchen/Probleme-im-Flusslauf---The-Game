import { BaseScene } from './_BaseScene.js';
import { globalVariables } from '../globalVariables.js';
import { bilderRaten } from '../games/bilderRaten.js';

import img1 from '../images/sceneXX/img1.png';
import img2 from '../images/sceneXX/img2.png';
import img3 from '../images/sceneXX/img3.png';
import img4 from '../images/sceneXX/img4.png';


export class sceneXX extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("sceneXX", p, sceneManager, uiManager);
        this.imageUrls = [img1, img2, img3, img4];
        this.game = new bilderRaten("WASSER", this);
    }

    async setup(p) {
        await this.game.setup(p);
        await this.game.loadImages(p, this.imageUrls);
        this.uiManager.setup();

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
