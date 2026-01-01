import { BaseScene } from './BaseScene.js';
import { globalVariables } from '../globalVariables.js';
import { bilderRaten } from '../games/bilderRaten.js';

import img1 from '../images/scene03/img1.png';
import img2 from '../images/scene03/img2.png';
import img3 from '../images/scene03/img3.png';
import img4 from '../images/scene03/img4.png';

import bgImageUrl from '../images/ui/background.png';

export class scene03 extends BaseScene {
    constructor(sceneManager, uiManager) {
        super("scene03");
        this.sceneManager = sceneManager;
        this.uiManager = uiManager;
        this.imageUrls = [img1, img2, img3, img4];
        this.game = new bilderRaten("WASSER", this);
        this.bgImage = null;  // Hintergrundbild
    }

    async setup(p) {
        this.bgImage = await p.loadImage(bgImageUrl);

        await this.game.setup(p);
        await this.game.loadImages(p, this.imageUrls);
        this.uiManager.setup();

    }


    draw(p) {
        if (this.bgImage) {
            p.image(this.bgImage, 0, 0);
        }
        this.game.draw(p);

        this.uiManager.toggleLastSceneButton(true);
        this.uiManager.toggleNextSceneButton(this.completed);
    }

    cleanup() {
        this.game.cleanup();
        this.uiManager.cleanup();

    }
    keyPressed(p) {
    }
    mousePressed(p) {
    }
}
