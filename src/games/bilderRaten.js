import { BaseGame } from './_BaseGame.js';

export class bilderRaten extends BaseGame {
    constructor(p, scene, uiManager, imageUrls) {
        super(p, scene, uiManager);
        this.imageURls = imageUrls;
    }

    setup(p) {
    }

    draw() {
    }

    cleanup() {
        super.cleanup();
        this.correctGuesses = 0;
    }
}
