import { globalVariables } from '../globalVariables.js';
import arrowRightImg from '../images/ui/arrow-right.png';
import arrowLeftImg from '../images/ui/arrow-left.png';

export class UIManager {
    constructor(p, sceneManager) {
        this.p = p;
        this.sceneManager = sceneManager;
        this.elements = [];
        this.lastSceneButton = null;
        this.nextSceneButton = null;
    }

    setup() {


        let w = globalVariables.ui.objectWidth;
        let h = globalVariables.ui.objectHeight;
        let gap = globalVariables.ui.paddingMid;


        this.lastSceneButton = this.p.createButton('');
        this.lastSceneButton.position(gap, this.p.height - gap - h);
        this.lastSceneButton.size(w, h);
        this.lastSceneButton.style('background-image', `url(${arrowLeftImg})`);
        this.lastSceneButton.style('background-size', 'contain');
        this.lastSceneButton.style('background-repeat', 'no-repeat');
        this.lastSceneButton.style('background-position', 'center');
        this.lastSceneButton.style('background-color', 'transparent');
        this.lastSceneButton.mousePressed(async () => {

            await globalVariables.currentScene--;
            await this.sceneManager.switchScene(globalVariables.currentScene, this.p);

        });
        this.elements.push(this.lastSceneButton);


        this.nextSceneButton = this.p.createButton('');
        this.nextSceneButton.position(this.p.width - gap - w, this.p.height - gap - h);
        this.nextSceneButton.size(w, h);
        this.nextSceneButton.style('background-image', `url(${arrowRightImg})`);
        this.nextSceneButton.style('background-size', 'contain');
        this.nextSceneButton.style('background-repeat', 'no-repeat');
        this.nextSceneButton.style('background-position', 'center');
        this.nextSceneButton.style('background-color', 'transparent');
        this.nextSceneButton.mousePressed(async () => {
            await globalVariables.currentScene++;
            await this.sceneManager.switchScene(globalVariables.currentScene, this.p);
        });
        this.elements.push(this.nextSceneButton);
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

    // Clean up all DOM elements to prevent memory leaks
    cleanup() {
        this.elements.forEach(element => {
            element.remove();
        });
        this.elements = [];
    }
}
