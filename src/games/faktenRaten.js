import { getRandomDegree, globalVariables } from '../globalVariables.js';
import { drawGrid } from '../utils/drawGrid.js';




export class faktenRaten {
    constructor(p, scene, uiManager, facts) {
        this.scene = scene;
        this.p = p;
        this.uiManager = uiManager;
        this.facts = facts;
        this.shuffledFacts = [];
        this.amountOfCorrectFacts = 0;
        this.correctGuesses = 0;
        this.domElements = [];
    }

    setup() {
        this.amountOfCorrectFacts = 0;
        this.shuffleFacts();
        const w = this.p.width - globalVariables.ui.sideSpace * 4 - globalVariables.ui.objectWidth;
        const h = this.p.height - globalVariables.ui.sideSpace * 4;

        const container = this.p.createDiv("");
        container.class("factGrid");
        container.size(w, h);
        container.position((this.p.width - w) / 2, (this.p.height - h) / 2);
        container.style('transform', `rotate(-0.65deg)`); //alles etwas rotieren


        this.shuffledFacts.forEach((factData, index) => {
            const factText = factData[0];
            const isCorrect = factData[1];

            if (isCorrect) {
                this.amountOfCorrectFacts++;
            }

            const card = this.p.createDiv("");
            card.parent(container);
            card.style('transform', `rotate(${getRandomDegree()}deg)`);
            card.class("factCard shadow borderRadius");

            const p = this.p.createP(factText);
            p.parent(card);
            p.class("chelsea-market");

            card.mousePressed(() => {
                // console.log(`Clicked fact ${index}: ${isCorrect}`);

                if (isCorrect) {
                    card.addClass("factCardCorrect");
                    this.correctGuesses++;
                    if (this.correctGuesses === this.amountOfCorrectFacts) {
                        this.uiManager.showSolutionUi(true);
                        this.scene.completed = true;
                    }
                } else {
                    card.addClass("factCardFalse");
                    this.uiManager.showSolutionUi(false);


                    setTimeout(() => {
                        this.cleanup();
                        this.setup();
                    }, globalVariables.timeOutTime)

                }
            });

            this.domElements.push(card, p);
        });

        this.domElements.push(container);
    }

    shuffleFacts() {
        this.shuffledFacts = [...this.facts];

        // Fisher-Yates Shuffle Algorithmus
        for (let i = this.shuffledFacts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledFacts[i], this.shuffledFacts[j]] = [this.shuffledFacts[j], this.shuffledFacts[i]];
        }

        return this.shuffledFacts;
    }

    draw() {
    }

    cleanup() {
        this.scene.completed = false;
        this.correctGuesses = 0;

        this.domElements.forEach(el => el.remove());
        this.domElements = [];
    }
}