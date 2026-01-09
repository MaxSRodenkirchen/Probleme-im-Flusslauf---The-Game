export class BaseGame {
    constructor(p, scene, uiManager) {
        this.p = p;
        this.scene = scene;
        this.uiManager = uiManager;
        this.domElements = [];
    }

    async setup(p) {
        // To be implemented by subclasses
    }

    draw(p) {
        // To be implemented by subclasses
    }

    shuffle(array) {
        // Fisher-Yates Shuffle Algorithmus
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    cleanup() {
        this.scene.completed = false;
        if (this.domElements) {
            this.domElements.forEach(el => {
                if (el && typeof el.remove === 'function') {
                    el.remove();
                }
            });
            this.domElements = [];
        }
    }
}
