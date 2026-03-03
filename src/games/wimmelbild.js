import { getRandomDegree, globalVariables } from '../globalVariables.js';
import { BaseGame } from './_BaseGame.js';

export class wimmelbild extends BaseGame {
    constructor(p, scene, uiManager, bgImageUrl, overlayImagesUrls, pos) {
        super(p, scene, uiManager);

        this.imgSize = globalVariables.ui.objectWidth * 2;

        this.bgImageUrl = bgImageUrl;
        this.overlayImagesUrls = overlayImagesUrls;
        // console.log(overlayImagesUrls);
        this.container = null;

        this.positions = pos;

        this.counter = 0;
        this.debug = false; // Set to true to see hit areas and log coordinates
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

            field.position(this.positions[index].x - this.positions[index].r / 2, this.positions[index].y - this.positions[index].r / 2);
            field.size(this.positions[index].r);

            if (this.debug) {
                field.style("border", "2px solid red");
                field.style("background-color", "rgba(255, 0, 0, 0.2)");
            }

            // Create image but keep it hidden initially
            const img = p.createImg(url, `Müll gefunden`);
            img.parent(this.container);
            img.class("wimmelbild");
            img.style("opacity", "0");
            this.domElements.push(img);

            field.mouseClicked(() => {
                if (field.hasClass("used")) return;
                field.addClass("used");
                this.counter++;

                // Show the pre-created image instantly
                img.style("opacity", "1");

                if (this.counter === 4) {
                    this.scene.completed = true;
                    this.uiManager.showSolutionUi(true);
                }
            })
            this.domElements.push(field);
        })

        // Debug helper: Click anywhere to get coordinates
        this.container.elt.addEventListener('click', (e) => {
            if (!this.debug) return;
            const rect = this.container.elt.getBoundingClientRect();
            // We need to account for the CSS scale(1.28) in the coordinates
            const scale = rect.width / this.container.elt.offsetWidth;
            const x = Math.round((e.clientX - rect.left) / scale);
            const y = Math.round((e.clientY - rect.top) / scale);
            console.log(`New Position: { x: ${x}, y: ${y}, r: 100 },`);
        });

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
