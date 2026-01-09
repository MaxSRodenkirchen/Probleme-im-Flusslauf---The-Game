import { BaseScene } from './_BaseScene.js';
import { getRandomDegree, globalVariables } from '../globalVariables.js';

import nameData from '../names.json';

export class scene02 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene02", p, sceneManager, uiManager);

        // 1. Alle Buchstaben als Array holen (['A', 'B', 'C', ...])
        this.letters = Object.keys(nameData);
        this.randomLetter = null;
        this.group = null;
        this.adj = null;
        this.animal = null;

        // 4. Zufälliges Adjektiv und Tier aus der Gruppe ziehen

    }

    async setup(p) {
        this.uiManager.setup();

        this.getALetter();
        this.getAdj();
        this.getAnimal();


        const header = p.createP("Bevor ihr losreisen könnt<br> braucht ihr einen Teamnamen.")
        header.class("chelsea-market bigText");
        header.style("transform", 'rotate(-4deg)');
        header.position(globalVariables.ui.sideSpace, globalVariables.ui.sideSpace)


        const genContainer = p.createDiv("");
        genContainer.position(globalVariables.ui.sideSpace, p.height / 2);
        genContainer.class("chelsea-market bigText genContainer borderRadius transition");


        const rotAmount = 2;

        const die = p.createP("Die");
        die.parent(genContainer);
        die.class("shadow borderRadius genText");
        die.style("transform", `rotate(${getRandomDegree() * rotAmount}deg)`);

        const adjDom = p.createP(this.adj);
        adjDom.parent(genContainer);
        adjDom.class("shadow borderRadius genText");
        adjDom.style("transform", `rotate(${getRandomDegree() * rotAmount}deg)`);
        adjDom.mouseClicked(() => {
            this.getAdj();
            this.setName();
            adjDom.html(this.adj)
        })

        const animalDom = p.createP(this.animal);
        animalDom.parent(genContainer);
        animalDom.class("shadow borderRadius genText");
        animalDom.style("transform", `rotate(${getRandomDegree() * rotAmount}deg)`);
        animalDom.mouseClicked(() => {
            this.getAnimal();
            this.setName();
            animalDom.html(this.animal)
        })

        die.mouseClicked(() => {
            this.getALetter();
            this.getAdj();
            this.getAnimal();
            this.setName();
            adjDom.html(this.adj);
            animalDom.html(this.animal)


        })



        this.domElements.push(header);
        this.domElements.push(genContainer);

    }

    getALetter() {
        // 2. Einen zufälligen Buchstaben auswählen
        this.randomLetter = this.letters[Math.floor(this.p.random(this.letters.length))];

        // 3. Die Gruppe für diesen Buchstaben holen
        this.group = nameData[this.randomLetter];
    }
    getAdj() {
        this.adj = this.group.adjectives[Math.floor(this.p.random(this.group.adjectives.length))];

    }
    getAnimal() {
        this.animal = this.group.animals[Math.floor(this.p.random(this.group.animals.length))];
    }

    setName() {
        globalVariables.teamName = this.adj + " " + this.animal
    }

    draw(p) {
        // this.uiManager.toggleLastSceneButton(true);
        // this.uiManager.toggleNextSceneButton(true);
    }

    cleanup(p) {
        super.cleanup();
    }
}
