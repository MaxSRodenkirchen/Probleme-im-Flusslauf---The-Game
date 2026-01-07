import { getRandomDegree, globalVariables } from '../globalVariables.js';
import { drawGrid } from '../utils/drawGrid.js';




export class faktenRaten {
    constructor(p, scene, uiManager, facts) {
        this.scene = scene;
        this.p = p;
        this.uiManager = uiManager;
        this.facts = facts;
        this.domElements = [];
    }

    setup() {
        const w = this.p.width - globalVariables.ui.sideSpace * 4 - globalVariables.ui.objectWidth;
        const h = this.p.height - globalVariables.ui.sideSpace * 4;

        const container = this.p.createDiv("");
        container.class("factGrid");
        container.size(w, h);
        container.position((this.p.width - w) / 2, (this.p.height - h) / 2);
        container.style('transform', `rotate(-0.65deg)`);


        this.facts.forEach((factData, index) => {
            const factText = factData[0];
            const isCorrect = factData[1];

            const card = this.p.createDiv("");
            card.parent(container);
            card.style('transform', `rotate(${getRandomDegree()}deg)`);
            card.class("factCard shadow borderRadius");

            const p = this.p.createP(factText);
            p.parent(card);
            p.class("chelsea-market");
            p.style("font-size", "1.2rem");
            p.style("line-height", "1.4");

            // Responsive font size adjustment if text is too long
            if (factText.length > 100) {
                p.style("font-size", "1rem");
            }
            if (factText.length > 150) {
                p.style("font-size", "0.9rem");
            }

            card.mousePressed(() => {
                console.log(`Clicked fact ${index}: ${isCorrect}`);
            });

            this.domElements.push(card, p);
        });

        this.domElements.push(container);
    }

    draw() {
    }

    cleanup() {
        this.domElements.forEach(el => el.remove());
        this.domElements = [];
    }
}