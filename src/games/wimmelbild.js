import { getRandomDegree, globalVariables } from '../globalVariables.js';
import { BaseGame } from './_BaseGame.js';

export class wimmelbild extends BaseGame {
    constructor(p, scene, uiManager, bgImageUrl, overlayImagesUrls) {
        super(p, scene, uiManager);

        this.imgSize = globalVariables.ui.objectWidth * 2;

        this.bgImageUrl = bgImageUrl;
        this.overlayImagesUrls = overlayImagesUrls;
        // console.log(overlayImagesUrls);
        this.container = null;

        this.positions = [
            { x: 306, y: 360, r: 100 },
            { x: 301, y: 150, r: 175 },
            { x: 471, y: 245, r: 100 },
            { x: 169, y: 172, r: 80 },
        ]

        this.counter = 0;
    }

    setup(p) {
        this.counter = 0;

        this.container = p.createDiv("");
        this.container.class("shadow wimmelbildContainer borderRadius shadow");


        const bgImage = p.createImg(this.bgImageUrl, "Wimmelbild vom Ökosystem Meer mit Plastikmüll");
        bgImage.parent(this.container);
        bgImage.class("wimmelbild");


        this.overlayImagesUrls.forEach((url, index) => {
            const field = p.createDiv("");
            field.parent(this.container);
            field.class("  borderRadius clickField"); //clickMe
            field.position(this.positions[index].x, this.positions[index].y);
            field.size(this.positions[index].r)
            field.mouseClicked(() => {
                if (field.hasClass("used")) return;
                field.addClass("used");
                this.counter++;
                const img = p.createImg(url, `Müll gefunden`);
                img.parent(this.container);
                img.class("wimmelbild");
                this.domElements.push(img);

                if (this.counter === 4) {
                    this.scene.completed = true;
                    this.uiManager.showSolutionUi(true);

                }

            })
            this.domElements.push(field);
        })

        this.domElements.push(this.container);
    }

    showSolution() {

    }

    draw() {
    }

    cleanup() {
        super.cleanup();

    }
}
