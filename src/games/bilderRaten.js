import { getRandomDegree, globalVariables } from '../globalVariables.js';
import { BaseGame } from './_BaseGame.js';

export class bilderRaten extends BaseGame {
    constructor(p, scene, uiManager, imageUrls, text) {
        super(p, scene, uiManager);

        this.imgSize = globalVariables.ui.objectWidth * 2.5;

        this.correctLetters = text.split("");
        this.shuffledLetters = super.shuffle(this.correctLetters);
        this.typedLetters = [];

        this.imageURls = imageUrls;
        this.shuffledUrls = super.shuffle(this.imageURls);
    }

    setup(p) {

        this.typedLetters = [];
        this.shuffledLetters = super.shuffle(this.correctLetters);

        const letterSize = 70;
        const spacing = 40; // Spacing between images and keyboard
        const gap = globalVariables.ui.paddingLow;
        const keyboardWidth = letterSize * 3 + 60; // Width including padding/gaps

        this.imgBlockWidth = this.imgSize * 2 + gap;
        this.totalWidth = this.imgBlockWidth + spacing + keyboardWidth;
        const totalHeight = this.imgSize * 2 + gap;

        // const startX = 0;
        // const startY = 0;

        this.mainContainer = p.createDiv("");
        this.mainContainer.class("bilderRatenContainer");
        this.domElements.push(this.mainContainer);


        this.positions = [
            { x: this.imgSize + gap, y: this.imgSize + gap }, // index 0 (BR)
            { x: this.imgSize + gap, y: 0 },                  // index 1 (TR)
            { x: 0, y: 0 },                                    // index 2 (TL)
            { x: 0, y: this.imgSize + gap }                   // index 3 (BL)
        ];

        const imgContainer = p.createDiv("");
        imgContainer.parent(this.mainContainer);
        imgContainer.class("imgContainer");
        // imgContainer.position(startX, startY);
        imgContainer.size(this.imgBlockWidth, this.imgBlockWidth);
        this.domElements.push(imgContainer);

        this.shuffledUrls.forEach((url, index) => {
            const img = p.createImg(url, 'image ' + index);
            img.parent(imgContainer);
            img.position(this.positions[index].x, this.positions[index].y);
            img.size(this.imgSize, this.imgSize);
            img.style('transform', `rotate(${getRandomDegree() * 0.6}deg)`);
            img.class(" borderRadius shadow");
            img.style("background-color", "#fff")
            // No need to push to domElements individually if parent is pushed, but safe to keep
            this.domElements.push(img);
        });

        const letterContainer = p.createDiv("");
        letterContainer.parent(this.mainContainer);
        letterContainer.class("keyboard borderRadius");
        // letterContainer.position(startX + imgBlockWidth + spacing, startY);
        letterContainer.style('width', `${keyboardWidth}px`); // 3 columns + padding
        this.domElements.push(letterContainer);

        const log = p.createDiv("");
        log.parent(letterContainer);
        log.class("chelsea-market shadow borderRadius transition mediumText log");
        log.style('height', `${letterSize}px`);
        this.logDisplay = log;

        this.shuffledLetters.forEach((letter) => {
            const aLetter = p.createP(letter);
            aLetter.parent(letterContainer);
            aLetter.class("chelsea-market shadow borderRadius transition mediumText letter ");
            // aLetter.style('transform', `rotate(${getRandomDegree() * 2}deg)`);
            aLetter.mouseClicked(() => {
                if (aLetter.hasClass("used")) return;
                aLetter.addClass("used");
                aLetter.style("opacity", "0.2");
                this.typedLetters.push({ char: letter, el: aLetter });
                this.updateLog();
                this.checkSolution();
            });
            this.domElements.push(aLetter);
        });

        const deleteButton = p.createP("<");
        deleteButton.parent(letterContainer);
        deleteButton.class("chelsea-market shadow borderRadius transition mediumText letter");

        // Calculate remaining slots in the 3-column grid
        const remainingSlots = 3 - (this.shuffledLetters.length % 3);
        deleteButton.style('grid-column', `span ${remainingSlots}`);
        deleteButton.style('aspect-ratio', 'auto');
        deleteButton.style('height', `${letterSize}px`);
        // deleteButton.style('transform', `rotate(${getRandomDegree() * 2}deg)`);
        deleteButton.mouseClicked(() => {
            const last = this.typedLetters.pop();
            if (last) {
                last.el.removeClass("used");
                last.el.style("opacity", "1.0");
            }
            this.updateLog();
        });
        this.domElements.push(deleteButton);

    }

    updateLog() {
        if (this.typedLetters.length === 0) {
            this.logDisplay.addClass("logEmpty")
            this.logDisplay.html('Welches Wort?')
        } else {
            this.logDisplay.addClass("logFilled")
            const word = this.typedLetters.map(item => item.char).join('');
            this.logDisplay.html(word);
        }
    }

    checkSolution() {

        const iconSize = globalVariables.ui.objectHeight * 2;
        const startX = this.p.width / 2 - this.totalWidth / 2;

        const imgContainerMiddle = {
            x: startX + this.imgBlockWidth / 2 - iconSize / 2,
            y: this.p.height / 2 - iconSize / 2,
        }

        const currentWord = this.typedLetters.map(item => item.char).join('');
        if (currentWord === this.correctLetters.join('')) {
            this.scene.completed = true;
            this.uiManager.showSolutionUi(true, imgContainerMiddle);

        } else if (this.typedLetters.length === this.correctLetters.length) {
            this.uiManager.showSolutionUi(false, imgContainerMiddle);

            setTimeout(() => {
                this.cleanup();
                this.setup(this.p);
            }, globalVariables.timeOutTime)

        }
    }

    draw() {
        this.updateLog();

    }

    cleanup() {
        super.cleanup();
        this.correctGuesses = 0;
    }
}
