import { BaseScene } from './BaseScene.js';
import { globalVariables } from '../globalVariables.js';
import { bilderRaten } from '../games/bilderRaten.js';

import img1 from '../images/scene03/img1.png';
import img2 from '../images/scene03/img2.png';
import img3 from '../images/scene03/img3.png';
import img4 from '../images/scene03/img4.png';



export class scene03 extends BaseScene {
    constructor() {
        super("scene03");
        this.imageUrls = [img1, img2, img3, img4];
        this.game = new bilderRaten("scene03");

    }

    async setup(p) {
        await this.game.setup(p);
        await this.game.loadImages(p, this.imageUrls);
        console.log('scene03 setup complete!');
    }



    draw(p) {
        this.game.draw(p);
    }




    update(p) {
    }
    cleanup() {
    }
    keyPressed(p) {
    }
    mousePressed(p) {
    }
}
