import { getRandomDegree, globalVariables } from '../globalVariables.js';
import arrowRightImg from '../images/ui/arrow-right.png';
import arrowLeftImg from '../images/ui/arrow-left.png';
import fullscreen from '../images/ui/fullscreen.png';
import correct from '../images/ui/correct.png';
import wrong from '../images/ui/wrong.png';

export class UIManager {
    constructor(p, sceneManager) {
        this.p = p;
        this.sceneManager = sceneManager;
        this.elements = [];
        this.lastSceneButton = null;
        this.nextSceneButton = null;
        this.fullscreenButton = null;

    }

    setup() {


        let w = globalVariables.ui.objectWidth;
        let h = globalVariables.ui.objectHeight;
        let gap = globalVariables.ui.sideSpace;


        this.lastSceneButton = this.p.createButton('');
        this.lastSceneButton.position(gap, this.p.height - gap - h);
        this.lastSceneButton.size(w, h);
        this.lastSceneButton.class("dropShadow")
        this.lastSceneButton.style('background-image', `url(${arrowLeftImg})`);
        this.lastSceneButton.style('background-size', 'contain');
        this.lastSceneButton.style('background-repeat', 'no-repeat');
        this.lastSceneButton.style('background-position', 'center');
        this.lastSceneButton.style('background-color', 'transparent');
        this.lastSceneButton.style('z-index', '9999');
        this.lastSceneButton.mousePressed(async () => {

            await globalVariables.currentScene--;
            await this.sceneManager.switchScene(globalVariables.currentScene, this.p);

        });
        this.elements.push(this.lastSceneButton);


        this.nextSceneButton = this.p.createButton('');
        this.nextSceneButton.position(this.p.width - gap - w, this.p.height - gap - h);
        this.nextSceneButton.size(w, h);
        this.nextSceneButton.class("dropShadow");
        this.nextSceneButton.style('background-image', `url(${arrowRightImg})`);
        this.nextSceneButton.style('background-size', 'contain');
        this.nextSceneButton.style('background-repeat', 'no-repeat');
        this.nextSceneButton.style('background-position', 'center');
        this.nextSceneButton.style('background-color', 'transparent');
        this.nextSceneButton.style('z-index', '9999');
        this.nextSceneButton.mousePressed(async () => {
            await globalVariables.currentScene++;
            await this.sceneManager.switchScene(globalVariables.currentScene, this.p);
        });
        this.elements.push(this.nextSceneButton);


        const fullscreenSize = w / 2;
        this.fullscreenButton = this.p.createButton('');
        const offsetY = (globalVariables.ui.objectHeight - fullscreenSize) / 2;
        this.fullscreenButton.position(this.p.width - gap - fullscreenSize * 1.5, gap + offsetY);
        this.fullscreenButton.size(fullscreenSize, fullscreenSize);
        this.fullscreenButton.class("dropShadow")
        this.fullscreenButton.style('background-image', `url(${fullscreen})`);
        this.fullscreenButton.style('background-size', 'contain');
        this.fullscreenButton.style('background-repeat', 'no-repeat');
        this.fullscreenButton.style('background-position', 'center');
        this.fullscreenButton.style('background-color', 'transparent');
        this.fullscreenButton.style('z-index', '9999');
        this.fullscreenButton.mousePressed(() => {
            let fs = this.p.fullscreen();
            this.p.fullscreen(!fs);
        });
        this.elements.push(this.fullscreenButton);

    }

    toggleLastSceneButton(bool) {
        if (bool) {
            this.lastSceneButton.show();
        } else {
            this.lastSceneButton.hide();
        }
    }
    toggleNextSceneButton(bool) {
        if (bool) {
            this.nextSceneButton.show();

        } else {
            this.nextSceneButton.hide();
        }
    }

    showSolutionUi(condition, pos) {

        const imgUrl = condition ? correct : wrong;
        const img = this.p.createImg(imgUrl, condition ? 'Correct' : 'Wrong');
        img.parent("#game-container");

        const size = globalVariables.ui.objectHeight * 2;

        const posX = pos?.x ?? (this.p.width - size) / 2;
        const posY = pos?.y ?? (this.p.height - size) / 2;

        img.position(posX, posY);
        img.size(size, size);
        img.class("dropShadow iconOverlay borderRadius shadow");
        img.style('transform', `rotate(${getRandomDegree() * 0.6}deg)`);

        if (condition) {
            img.style("background-color", globalVariables.colors.darkBlue)
        } else {
            img.style("background-color", globalVariables.colors.error)
        }

        setTimeout(() => {
            img.remove();
        }, globalVariables.timeOutTime);
    }

    displayCharacter(url, name, text) {
        const container = this.p.createDiv("");
        const posX = globalVariables.ui.sideSpace;
        const posY = globalVariables.ui.sideSpace;
        const size = globalVariables.ui.objectHeight;

        container.position(posX, posY);
        container.size(size, size);
        container.style('transform', `rotate(-1deg)`);
        container.class("shadow borderRadius characterContainer");

        const img = this.p.createImg(url, "An image of the Character");
        img.parent(container);
        img.class("characterImage");

        const nameTag = this.p.createP(name);
        nameTag.position(posX + globalVariables.ui.paddingLow, posY + size + globalVariables.ui.paddingLow);
        nameTag.class("nameTag chelsea-market");
        nameTag.style('transform', `rotate(0.7deg)`);

        const speech = this.p.createP(text);
        speech.position(posX + size + globalVariables.ui.paddingMid, posY + globalVariables.ui.paddingMid);
        speech.class("nameTag chelsea-market");
        speech.style('transform', `rotate(-0.3deg)`);


        this.elements.push(container, nameTag, speech);

    }

    showAnswer(answer) {
        const text = this.p.createP(answer);
        text.class("chelsea-market mediumText");
        text.style("text-align", "right");


        const posX = this.p.width - globalVariables.ui.sideSpace - globalVariables.ui.objectHeight / 2 - 45 - globalVariables.ui.paddingMid;
        const posY = this.p.height - globalVariables.ui.sideSpace - globalVariables.ui.objectHeight / 2 + 15;

        text.position(posX, posY);

        // Move the anchor point from top-left (0,0) to bottom-right (100%, 100%)
        text.style("transform", `translate(-100%, -100%) rotate(${getRandomDegree()}deg)`);

        this.elements.push(text);
    }


    // Clean up all DOM elements to prevent memory leaks
    cleanup() {
        this.elements.forEach(element => {
            element.remove();
        });
        this.elements = [];
    }
}
