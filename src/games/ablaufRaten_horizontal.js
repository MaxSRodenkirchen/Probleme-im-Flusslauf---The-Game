import { getRandomDegree, globalVariables } from '../globalVariables.js';
import { BaseGame } from './_BaseGame.js';

export class ablaufRaten_horizontal extends BaseGame {
    constructor(p, scene, bgTilesUrls, imageUrls, uiManager) {
        super(p, scene, uiManager);

        this.currentField = 0;
        this.clickedOrder = [];

        this.bgTilesUrls = bgTilesUrls;
        this.imageUrls = imageUrls;
        this.shuffledImageUrlArray = [];
        this.bgTileDoms = [];
        this.imageDoms = [];
        this.correct = false;

        this.imageAmount = this.imageUrls.length;

        // Base height for the game area (dynamic)
        this.gameHeight = 400; // Slightly smaller height for horizontal layout
        this.imgSize = (this.gameHeight - globalVariables.ui.paddingLow);

        const gap = globalVariables.ui.paddingLow / 2;

        // Positions relative to imageContainer
        this.positions = null;
    }

    async setup(p) {
        const gap = globalVariables.ui.paddingLow / 2;
        const ablaufWidth = p.width * 0.9;

        this.gameContainer = p.createDiv();
        this.gameContainer.class("ablaufGameContainer ablaufHorizontal");
        this.gameContainer.parent("#game-container");

        this.imgSize = 160;

        const gridWidth = this.imageAmount * (this.imgSize + gap * 2);
        const gridOffset = (ablaufWidth - gridWidth) / 2;

        this.positions = [];
        for (let i = 0; i < this.imageAmount; i++) {
            this.positions.push({
                width: gridOffset + i * (this.imgSize + gap * 2),
                height: 0
            });
        }

        this.domElements.push(this.gameContainer);

        this.imageContainer = p.createDiv();
        this.imageContainer.class("imgContainer horizontalGrid");
        this.imageContainer.parent(this.gameContainer);

        this.imageContainer.size(ablaufWidth, this.imgSize + gap * 2);
        this.domElements.push(this.imageContainer);

        // Create container for the shuffle/pick images
        this.pickContainer = p.createDiv();
        this.pickContainer.class("pickContainer borderRadius shadow horizontalPick");
        this.pickContainer.parent(this.gameContainer);

        const pickContainerWidth = ablaufWidth / 2;
        this.pickItemSize = (pickContainerWidth - (globalVariables.ui.paddingMid * 2) - (globalVariables.ui.paddingLow * (this.imageAmount - 1))) / this.imageAmount;
        const pickContainerHeight = this.pickItemSize + (2 * globalVariables.ui.paddingMid);

        this.pickContainer.size(pickContainerWidth, pickContainerHeight);
        this.pickContainer.style('flex-shrink', '0');
        this.domElements.push(this.pickContainer);

        const iconSize = globalVariables.ui.objectHeight * 2;

        this.gridCenter = {
            x: (p.width - iconSize) / 2,
            y: (p.height / 2) - (iconSize / 2) - (pickContainerHeight / 2) // Roughly center of grid area
        };

        this.bgTilesUrls.forEach((url, index) => {
            if (index >= this.imageAmount) return;
            const img = p.createImg(url, 'image ' + index);
            img.parent(this.imageContainer);
            img.position(this.positions[index].width, this.positions[index].height);
            img.size(this.imgSize, this.imgSize);

            img.style("opacity", "0.25");
            img.class(" borderRadius clickMe shadow");

            this.bgTileDoms.push(img);
        });

        this.setupImages();
    }

    setupImages() {
        this.correct = false;
        this.clickedOrder = [];
        this.scene.completed = false;
        this.currentField = 0;
        this.shuffleImages();

        this.shuffledImageUrlArray.forEach(([data, originalIndex], shuffledIndex) => {
            const [url, description] = data;

            const container = this.p.createDiv();
            container.class("imageItemContainer transition shadow borderRadius");

            const img = this.p.createImg(url, description || ('image ' + shuffledIndex));
            img.parent(container);

            container.parent(this.pickContainer);
            container.addClass("clickMe")

            const posX = globalVariables.ui.paddingMid + shuffledIndex * (this.pickItemSize + globalVariables.ui.paddingLow);

            container.position(posX, globalVariables.ui.paddingMid);
            container.size(this.pickItemSize, this.pickItemSize);

            container.style('transform', `rotate(${getRandomDegree()}deg)`);
            container.mouseClicked(() => this.positionImages(container, originalIndex, shuffledIndex));

            this.imageDoms[originalIndex] = container;
        });
        this.styleCurrentBgTile();
    }

    positionImages(container, originalIndex, shuffledIndex) {
        if (this.clickedOrder.includes(originalIndex)) {
            return;
        }
        container.removeClass("clickMe");

        if (this.currentField < this.imageAmount) {
            container.parent(this.imageContainer);

            const newPosX = this.positions[this.currentField].width;
            const newPosY = this.positions[this.currentField].height;

            container.position(newPosX, newPosY);
            container.size(this.imgSize, this.imgSize);

            this.clickedOrder.push(originalIndex);
            this.nextField();
        }
    }

    nextField() {
        this.currentField++;

        if (this.currentField === this.imageAmount) {
            this.checkResult();
            this.scene.completed = this.correct;
        } else {
            this.styleCurrentBgTile();
        }
    }

    checkResult() {
        // Correct order check for 5 items
        let isCorrect = true;
        for (let i = 0; i < this.imageAmount; i++) {
            if (this.clickedOrder[i] !== i) {
                isCorrect = false;
                break;
            }
        }

        this.correct = isCorrect;
        this.uiManager.showSolutionUi(this.correct, this.gridCenter);

        if (this.correct === false) {
            setTimeout(() => {
                this.imageDoms.forEach(element => {
                    if (element) element.remove();
                });
                this.imageDoms = [];
                this.setupImages();
            }, globalVariables.timeOutTime)
        }
    }

    draw(p) {
    }

    styleCurrentBgTile() {
        this.bgTileDoms.forEach(tile => {
            tile.style("opacity", "0.15")
        });

        if (this.bgTileDoms[this.currentField]) {
            let tile = this.bgTileDoms[this.currentField];
            tile.style("opacity", "1")
        }
    }

    shuffleImages() {
        const pairs = this.imageUrls.map((data, index) => [data, index]);

        let shuffled;
        let isValid = false;
        let attempts = 0;

        while (!isValid && attempts < 200) {
            shuffled = this.shuffle(pairs);
            isValid = true;

            for (let i = 0; i < shuffled.length - 1; i++) {
                const indexA = shuffled[i][1];
                const indexB = shuffled[i + 1][1];

                // If original indices are consecutive (e.g. 0 and 1, 1 and 2), it's invalid
                if (Math.abs(indexA - indexB) === 1) {
                    isValid = false;
                    break;
                }
            }
            attempts++;
        }

        this.shuffledImageUrlArray = shuffled;
        return this.shuffledImageUrlArray;
    }

    cleanup() {
        super.cleanup();
        this.bgTileDoms = [];
        this.imageDoms = [];
        if (this.gameContainer) {
            this.gameContainer.remove();
        }
    }
}
