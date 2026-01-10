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
            { x: 575, y: this.p.height / 2 + 140, r: 100 },
            { x: 570, y: this.p.height / 2 - 70, r: 175 },
            { x: 740, y: this.p.height / 2 + 30, r: 100 },
            { x: 438, y: this.p.height / 2 - 43, r: 80 },
        ]
    }

    setup(p) {


        this.container = p.createDiv("");
        this.container.class("shadow wimmelbildContainer borderRadius shadow");



        const bgImage = p.createImg(this.bgImageUrl, "Wimmelbild vom Ökosystem Meer mit Plastikmüll");
        bgImage.parent(this.container);
        bgImage.class("wimmelbild");


        this.overlayImagesUrls.forEach((url, index) => {
            const field = p.createDiv("");
            field.class("  borderRadius clickField");
            field.position(this.positions[index].x, this.positions[index].y);
            field.size(this.positions[index].r)
            field.mouseClicked(() => {
                if (field.hasClass("used")) return;
                field.addClass("used");

                const img = p.createImg(url, `Müll gefunden`);
                img.parent(this.container);
                img.class("wimmelbild");
                this.domElements.push(img);
            })
            this.domElements.push(field);
        })

        this.domElements.push(this.container);
    }

    draw() {


    }

    cleanup() {
        super.cleanup();

    }
}
