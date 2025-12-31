import { BaseScene } from './BaseScene.js';
import { state } from '../state.js';

// Example game scene with three sub-levels
export class GameScene extends BaseScene {
    constructor(sceneManager) {
        super('game');
        this.sceneManager = sceneManager;
        this.subLevel = 1;
        this.colors = ['red', 'green', 'blue'];
    }

    setup(p) {
        console.log('GameScene setup');
        this.subLevel = 1;
    }

    update(p) {
        // Game logic updates here
    }

    draw(p) {
        // Draw background based on sub-level
        p.background(this.colors[this.subLevel - 1]);

        // Draw instructions
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(32);
        p.text(`Level ${this.subLevel}/3`, p.width / 2, p.height / 2 - 50);
        p.textSize(20);
        p.text('Press LEFT/RIGHT to change level', p.width / 2, p.height / 2);
        p.text('Press ESC to return to menu', p.width / 2, p.height / 2 + 40);

        // Update state
        state.currentLevel = this.subLevel;
    }

    keyPressed(p) {
        console.log('GameScene keyPressed:', p.key, p.keyCode);

        // Navigate between sub-levels
        // Using hardcoded keyCodes: LEFT=37, RIGHT=39, ESC=27
        if (p.keyCode === 37) { // LEFT_ARROW
            console.log('LEFT pressed');
            this.subLevel = Math.max(1, this.subLevel - 1);
        } else if (p.keyCode === 39) { // RIGHT_ARROW
            console.log('RIGHT pressed');
            this.subLevel = Math.min(3, this.subLevel + 1);
        } else if (p.keyCode === 27) { // ESCAPE
            console.log('ESC pressed');
            this.sceneManager.switchScene('menu', p);
        }

        // Prevent default browser behavior
        return false;
    }

    cleanup() {
        console.log('GameScene cleanup');
    }
}
