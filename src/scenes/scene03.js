import { BaseScene } from './BaseScene.js';
import { globalVariables } from '../globalVariables.js';
import { bilderRaten } from '../games/bilderRaten.js';

export class scene03 extends BaseScene {
    constructor() {
        super("scene03");
        this.game = new bilderRaten("scene03");
    }

    async setup(p) {
        await this.game.setup(p);
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
