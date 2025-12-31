import { state } from '../state.js';

// Manages persistent UI overlay using p5.js DOM elements
export class UIManager {
    constructor(p) {
        this.p = p;
        this.elements = [];
    }

    // Create and setup UI elements
    setup() {
        // Score display
        this.scoreDisplay = this.p.createDiv(`Score: ${state.score}`);
        this.scoreDisplay.position(10, 10);
        this.scoreDisplay.style('color', 'white');
        this.scoreDisplay.style('font-size', '20px');
        this.scoreDisplay.style('font-family', 'Arial');
        this.elements.push(this.scoreDisplay);

        // Lives display
        this.livesDisplay = this.p.createDiv(`Lives: ${state.lives}`);
        this.livesDisplay.position(10, 40);
        this.livesDisplay.style('color', 'white');
        this.livesDisplay.style('font-size', '20px');
        this.livesDisplay.style('font-family', 'Arial');
        this.elements.push(this.livesDisplay);

        // Level display
        this.levelDisplay = this.p.createDiv(`Level: ${state.currentLevel}`);
        this.levelDisplay.position(10, 70);
        this.levelDisplay.style('color', 'white');
        this.levelDisplay.style('font-size', '20px');
        this.levelDisplay.style('font-family', 'Arial');
        this.elements.push(this.levelDisplay);
    }

    // Update UI based on state changes
    update() {
        if (this.scoreDisplay) {
            this.scoreDisplay.html(`Score: ${state.score}`);
        }
        if (this.livesDisplay) {
            this.livesDisplay.html(`Lives: ${state.lives}`);
        }
        if (this.levelDisplay) {
            this.levelDisplay.html(`Level: ${state.currentLevel}`);
        }
    }

    // Clean up all DOM elements to prevent memory leaks
    cleanup() {
        this.elements.forEach(element => {
            element.remove();
        });
        this.elements = [];
    }
}
