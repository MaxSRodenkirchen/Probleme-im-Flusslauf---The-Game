// Abstract base class for all game scenes
// All scenes must extend this class and implement the required methods

export class BaseScene {
    constructor(name) {
        this.name = name;
    }

    // Called once when scene is activated
    setup(p) {
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
        // Optional - can be overridden
    }

    // Handle keyboard input
    keyPressed(p) {
        // Optional - can be overridden
    }

    // Handle mouse clicks
    mousePressed(p) {
        // Optional - can be overridden
    }
}
