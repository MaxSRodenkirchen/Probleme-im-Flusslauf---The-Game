import { globalVariables } from '../globalVariables.js';

export class UIManager {
    constructor(p) {
        this.p = p;
        this.elements = [];
    }

    setup() {
    }

    update() {
    }

    // Clean up all DOM elements to prevent memory leaks
    cleanup() {
        this.elements.forEach(element => {
            element.remove();
        });
        this.elements = [];
    }
}
