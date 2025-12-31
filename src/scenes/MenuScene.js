import { BaseScene } from './BaseScene.js';
import { state } from '../state.js';

// Example menu scene
export class MenuScene extends BaseScene {
    constructor(sceneManager) {
        super('menu');
        this.sceneManager = sceneManager;
        this.startButton = null;
    }

    setup(p) {
        console.log('MenuScene setup');

        // Create start button
        this.startButton = p.createButton('Start Game');
        this.startButton.position(p.width / 2 - 50, p.height / 2 + 50);
        this.startButton.size(100, 40);
        this.startButton.mousePressed(() => {
            this.sceneManager.switchScene('game', p);
        });
    }

    draw(p) {
        p.background(50);

        // Draw title
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(48);
        p.text('Probleme im Flusslauf', p.width / 2, p.height / 2 - 50);

        // Draw subtitle
        p.textSize(24);
        p.text('Press SPACE or click Start', p.width / 2, p.height / 2);
    }

    keyPressed(p) {
        if (p.key === ' ') {
            this.sceneManager.switchScene('game', p);
        }
    }

    cleanup() {
        console.log('MenuScene cleanup');
        if (this.startButton) {
            this.startButton.remove();
        }
    }
}
