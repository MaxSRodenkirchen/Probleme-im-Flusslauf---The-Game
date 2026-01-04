import { BaseScene } from './BaseScene.js';
import { globalVariables } from '../globalVariables.js';

import { ablaufRaten } from '../games/ablaufRaten.js';

import bgImageUrl from '../images/ui/background.png';

import img1 from '../images/scene03/img1.png';
import img2 from '../images/scene03/img2.png';
import img3 from '../images/scene03/img3.png';
import img4 from '../images/scene03/img4.png';

import field from '../images/ablaufRaten/arrow-right.png';


export class scene02 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene02");
        this.sceneManager = sceneManager;
        this.uiManager = uiManager;
        this.p = p;

        this.bgImage = null;

        this.imageUrls = [img1, img2, img3, img4];
        this.bgTilesUrls = [field, field, field, field];
        this.game = new ablaufRaten(p, this, this.bgTilesUrls, this.imageUrls);

    }

    async setup(p) {
        this.bgImage = await p.loadImage(bgImageUrl);
        p.image(this.bgImage, 0, 0);

        // await this.game.loadImages(p, this.imageUrls, this.bgFieldUrls);
        await this.game.setup(p);

        this.uiManager.setup();
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
