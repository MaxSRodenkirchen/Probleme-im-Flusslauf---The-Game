import { BaseScene } from "./_BaseScene.js";

export class scene10 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene10", p, sceneManager, uiManager);
    }

    setup(p) {
        this.domElements.forEach(el => el.remove());
        this.domElements = [];

        const title = p.createDiv("Level 2");
        title.class("chelsea-market");
        title.style("font-size", "5rem");
        title.style("font-weight", "bold");
        title.style("text-align", "center");
        title.style("width", "100%");
        title.style("color", "#333");
        title.position(0, p.height / 2 - 100);

        this.domElements.push(title);

        this.uiManager.setup();
        this.uiManager.toggleNextSceneButton(true);
        this.uiManager.toggleLastSceneButton(true);
    }

    draw(p) {
        p.background("#f0f4f8");
    }
}
