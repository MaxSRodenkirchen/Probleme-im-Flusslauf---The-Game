// Abstract base class for all game scenes
// All scenes must extend this class and implement the required methods

export class BaseScene {
    constructor(name, p, sceneManager, uiManager) {
        this.name = name;
        this.p = p;
        this.sceneManager = sceneManager;
        this.uiManager = uiManager;
        this.completed = false;  // Szene abgeschlossen?
        this.domElements = [];
    }

    // Called once when scene is activated
    async setup(p) {
        throw new Error('setup() must be implemented by subclass');
    }

    // Called every frame for game logic updates
    update(p) {
        // Optional - can be overridden
    }

    // Called every frame for rendering
    draw(p) {
        throw new Error('draw() must be implemented by subclass');
    }

    // Called when scene is deactivated
    cleanup() {
        this.domElements.forEach(el => {
            if (el && typeof el.remove === 'function') {
                el.remove();
            }
        });
        this.domElements = [];
        this.uiManager.cleanup();
    }

}


