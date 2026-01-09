import { getRandomDegree, globalVariables } from '../globalVariables.js';
import { BaseGame } from './_BaseGame.js';

export class bilderRaten extends BaseGame {
    constructor(p, scene, uiManager, imageUrls, text) {
        super(p, scene, uiManager);

        this.imgSize = globalVariables.ui.objectWidth * 2;

        this.correctLetters = text.split("");
        this.shuffledLetters = super.shuffle(this.correctLetters);
        this.typedLetters = [];

        this.imageURls = imageUrls;
        this.shuffledUrls = super.shuffle(this.imageURls);
    }

    setup(p) {

        this.typedLetters = [];
        this.shuffledLetters = super.shuffle(this.correctLetters);

        const letterSize = 60;
        const spacing = 40; // Spacing between images and keyboard
        const gap = globalVariables.ui.paddingLow / 2;
        const keyboardWidth = letterSize * 3 + 60; // Width including padding/gaps

        const imgBlockWidth = this.imgSize * 2 + gap;
        const totalWidth = imgBlockWidth + spacing + keyboardWidth;
        const totalHeight = this.imgSize * 2 + gap;

        const startX = (p.width - totalWidth) / 2;
        const startY = (p.height - totalHeight) / 2;

        // Image positions relative to the container (0, 0 is the top-left of the container)
        this.positions = [
            { x: this.imgSize + gap, y: this.imgSize + gap }, // index 0 (BR)
            { x: this.imgSize + gap, y: 0 },                  // index 1 (TR)
            { x: 0, y: 0 },                                    // index 2 (TL)
            { x: 0, y: this.imgSize + gap }                   // index 3 (BL)
        ];

        const imgContainer = p.createDiv("");
        imgContainer.class("imgContainer"); // We'll add a class for custom rotation if needed
        imgContainer.position(startX, startY);
        imgContainer.size(imgBlockWidth, imgBlockWidth);
        imgContainer.style('transform', 'rotate(-1.5deg)'); // Negative rotation as requested
        this.domElements.push(imgContainer);

        this.shuffledUrls.forEach((url, index) => {
            const img = p.createImg(url, 'image ' + index);
            img.parent(imgContainer);
            img.position(this.positions[index].x, this.positions[index].y);
            img.size(this.imgSize, this.imgSize);
            img.style('transform', `rotate(${getRandomDegree()}deg)`);
            img.class(" borderRadius shadow");
            // No need to push to domElements individually if parent is pushed, but safe to keep
            this.domElements.push(img);
        });



        const letterContainer = p.createDiv("");
        letterContainer.class("keyboard borderRadius shadow");

        letterContainer.position(startX + imgBlockWidth + spacing, startY);
        letterContainer.style('width', `${keyboardWidth}px`); // 3 columns + padding
        this.domElements.push(letterContainer);


        const log = p.createDiv("");
        log.parent(letterContainer);
        log.class("chelsea-market shadow borderRadius transition mediumText letter");
        log.style('width', '100%');
        log.style('grid-column', 'span 3');
        log.style('aspect-ratio', 'auto');
        log.style('height', `${letterSize}px`);
        this.logDisplay = log;

        this.shuffledLetters.forEach((letter) => {
            const aLetter = p.createP(letter);
            aLetter.parent(letterContainer);
            aLetter.class("chelsea-market shadow borderRadius transition mediumText letter clickMe");
            aLetter.style('width', '100%'); // Let grid handle size
            // aLetter.style('transform', `rotate(${getRandomDegree() * 2}deg)`);
            aLetter.mouseClicked(() => {
                this.typedLetters.push(letter);
                this.updateLog();
                this.checkSolution();
            });
            this.domElements.push(aLetter);
        });

        // Add delete button to the same grid
        const deleteButton = p.createP("←");
        deleteButton.parent(letterContainer);
        deleteButton.class("chelsea-market shadow borderRadius transition mediumText letter clickMe");
        deleteButton.style('width', '100%');

        // Calculate remaining slots in the 3-column grid
        const remainingSlots = 3 - (this.shuffledLetters.length % 3);
        deleteButton.style('grid-column', `span ${remainingSlots}`);

        deleteButton.style('aspect-ratio', 'auto');
        deleteButton.style('height', `${letterSize}px`);
        // deleteButton.style('transform', `rotate(${getRandomDegree() * 2}deg)`);
        deleteButton.mouseClicked(() => {
            this.typedLetters.pop();
            this.updateLog();
        });
        this.domElements.push(deleteButton);
    }

    updateLog() {
        this.logDisplay.html(this.typedLetters.join(''));
    }

    checkSolution() {
        if (this.typedLetters.join('') === this.correctLetters.join('')) {
            this.scene.completed = true;
            this.uiManager.showSolutionUi(true);
        }
    }

    draw() {

    }

    cleanup() {
        super.cleanup();
        this.correctGuesses = 0;
    }
}
