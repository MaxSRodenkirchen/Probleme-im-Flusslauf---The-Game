import { BaseScene } from './_BaseScene.js';
import { getRandomDegree, globalVariables } from '../globalVariables.js';

import clickHere from '../images/ui/clickHere.png'
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

        this.getALetter();
        this.getAdj();
        this.getAnimal();
        this.setName();
    }

    async setup(p) {
        this.uiManager.setup();



        const header = p.createP("Bevor ihr losreisen könnt<br> braucht ihr einen Teamnamen.")
        header.class("chelsea-market bigText");
        header.style("transform", 'rotate(-4deg)');
        header.position(globalVariables.ui.sideSpace, globalVariables.ui.sideSpace * 1.8)


        const genContainer = p.createDiv("");
        genContainer.position(globalVariables.ui.sideSpace, p.height / 2);
        genContainer.class("chelsea-market bigText genContainer borderRadius transition");


        const rotAmount = 0.7;

        const die = p.createP("");
        die.parent(genContainer);
        die.class("shadow borderRadius genText click");
        die.style("transform", `rotate(${getRandomDegree() * rotAmount}deg)`);
        const dieSpan = p.createSpan("Die");
        dieSpan.parent(die);

        const adjDom = p.createP("");
        adjDom.parent(genContainer);
        adjDom.class("shadow borderRadius genText ");
        adjDom.style("transform", `rotate(${getRandomDegree() * rotAmount}deg)`);
        const adjSpan = p.createSpan(this.adj);
        adjSpan.parent(adjDom);

        adjDom.mouseClicked(() => {
            adjDom.style("transform", `rotate(${getRandomDegree() * rotAmount}deg)`);
            this.getAdj();
            this.setName();
            adjSpan.html(this.adj)
        })

        const animalDom = p.createP("");
        animalDom.parent(genContainer);
        animalDom.class("shadow borderRadius genText ");
        animalDom.style("transform", `rotate(${getRandomDegree() * rotAmount}deg)`);
        const animalSpan = p.createSpan(this.animal);
        animalSpan.parent(animalDom);

        animalDom.mouseClicked(() => {
            animalDom.style("transform", `rotate(${getRandomDegree() * rotAmount}deg)`);
            this.getAnimal();
            this.setName();
            animalSpan.html(this.animal)
        })

        die.mouseClicked(() => {
            die.style("transform", `rotate(${getRandomDegree() * rotAmount}deg)`);
            this.getALetter();
            this.getAdj();
            this.getAnimal();
            this.setName();
            adjSpan.html(this.adj);
            animalSpan.html(this.animal)
        })

        const offsetX = -10;
        const offsetY = -20;
        const rotation = 32;
        const size = globalVariables.ui.objectWidth / 2.6;

        const click1 = p.createImg(clickHere, "click here");
        click1.parent(die);
        click1.class("clickHereButton dropShadow borderRadius");
        click1.position(offsetX, offsetY);
        click1.size(size, size);
        click1.style("transform", `rotate(${getRandomDegree() * rotation + 270}deg)`);

        const click2 = p.createImg(clickHere, "click here");
        click2.parent(adjDom);
        click2.class("clickHereButton dropShadow borderRadius");
        click2.position(offsetX, offsetY);
        click2.size(size, size);
        click2.style("transform", `rotate(${getRandomDegree() * rotation + 270}deg)`);

        const click3 = p.createImg(clickHere, "click here");
        click3.parent(animalDom);
        click3.class("clickHereButton dropShadow borderRadius");
        click3.position(offsetX, offsetY);
        click3.size(size, size);
        click3.style("transform", `rotate(${getRandomDegree() * rotation + 270}deg)`);


        this.domElements.push(header);
        this.domElements.push(genContainer);

        this.uiManager.showAnswer("Zufrieden?");

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
