// Abstract base class for all game scenes
// All scenes must extend this class and implement the required methods

export class BaseScene {
    constructor(name, p, sceneManager, uiManager) {
        this.name = name;
        this.p = p;
        this.sceneManager = sceneManager;
        this.uiManager = uiManager;
        this._completed = false;  // Szene abgeschlossen?
        this.domElements = [];
    }

    get completed() {
        return this._completed;
    }

    set completed(value) {
        if (value === true && this._completed === false) {
            this.onCompleted();
        }
        this._completed = value;
    }

    // Triggered automatically when the game is won
    onCompleted() {
        // Can be overridden by subclasses
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


