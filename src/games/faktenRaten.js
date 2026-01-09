import { getRandomDegree, globalVariables } from '../globalVariables.js';
import { BaseGame } from './_BaseGame.js';

export class faktenRaten extends BaseGame {
    constructor(p, scene, uiManager, facts) {
        super(p, scene, uiManager);
        this.facts = facts;
        this.shuffledFacts = [];
        this.amountOfCorrectFacts = 0;
        this.correctGuesses = 0;
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
        container.style('transform', `rotate(-0.65deg)`);

        this.shuffledFacts.forEach((factData, index) => {
            const factText = factData[0];
            const isCorrect = factData[1];

            if (isCorrect) {
                this.amountOfCorrectFacts++;
            }

            const card = this.p.createDiv("");
            card.parent(container);
            card.style('transform', `rotate(${getRandomDegree() * 0.75}deg)`);
            card.class("factCard shadow borderRadius");

            const p = this.p.createP(factText);
            p.parent(card);
            p.class("chelsea-market");

            card.mousePressed(() => {
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
        this.shuffledFacts = this.shuffle(this.facts);
        return this.shuffledFacts;
    }

    draw() {
    }

    cleanup() {
        super.cleanup();
        this.correctGuesses = 0;
    }
}
