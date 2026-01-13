import { getRandomDegree, globalVariables } from '../globalVariables.js';
import { BaseGame } from './_BaseGame.js';

export class ablaufRaten extends BaseGame {
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
        this.gameHeight = 500; // Matches CSS height for now, but can be dynamic
        this.imgSize = (this.gameHeight - globalVariables.ui.paddingLow) / 2;

        const gap = globalVariables.ui.paddingLow / 2;

        // Positions relative to imageContainer (now filling the container height)
        this.positions = null;
    }

    async setup(p) {
        const gap = globalVariables.ui.paddingLow / 2;

        this.gameContainer = p.createDiv();
        this.gameContainer.class("ablaufGameContainer");
        this.gameContainer.parent("#game-container");
        this.imgSize = (this.gameHeight - gap * 2) / 2;

        this.positions = [
            { width: 0, height: this.imgSize + gap * 2 },                        // index 0 (BL)
            { width: 0, height: 0 },                                          // index 1 (TL)
            { width: this.imgSize + gap * 2, height: 0 },                       // index 2 (TR)
            { width: this.imgSize + gap * 2, height: this.imgSize + gap * 2 } // index 3 (BR)
        ];

        this.domElements.push(this.gameContainer);

        this.imageContainer = p.createDiv();
        this.imageContainer.class("imgContainer");
        this.imageContainer.parent(this.gameContainer);
        this.imageContainer.size(this.gameHeight, this.gameHeight);
        this.domElements.push(this.imageContainer);

        // Create container for the shuffle/pick images
        this.pickContainer = p.createDiv();
        this.pickContainer.class("pickContainer borderRadius");
        this.pickContainer.parent(this.gameContainer);
        // Set width for pickContainer so flex layout works and it doesn't collapse
        const pickItemSize = (this.gameHeight - (2 * globalVariables.ui.paddingLow)) / 3;
        this.pickContainer.size(pickItemSize, this.gameHeight);
        this.domElements.push(this.pickContainer);

        this.bgTilesUrls.forEach((url, index) => {
            const img = p.createImg(url, 'image ' + index);
            img.parent(this.imageContainer);
            img.position(this.positions[index].width, this.positions[index].height);
            img.size(this.imgSize, this.imgSize);
            const rotations = [270, 0, 90, 180]; // degrees for each index (BL, TL, TR, BR)
            const rot = rotations[index] + (getRandomDegree() * 0.35);
            img.style('transform', `rotate(${rot}deg) scaleX(-1)`);
            img.style("opacity", "0.15")
            img.class(" borderRadius shadow clickMe");

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

        // Calculate size for selection items (3 items fit vertically)
        const pickItemSize = (this.gameHeight - (globalVariables.ui.paddingMid * 2) - (globalVariables.ui.paddingLow * 2)) / 3;

        this.shuffledImageUrlArray.forEach(([data, originalIndex], shuffledIndex) => {
            const [url, description] = data;

            const container = this.p.createDiv();
            container.class("imageItemContainer transition shadow borderRadius");

            const img = this.p.createImg(url, description || ('image ' + shuffledIndex));
            img.parent(container);

            // Create label
            // if (description) {
            //     const label = this.p.createP(description);
            //     label.class("imageLabel chelsea-market smallestText");
            //     label.parent(container);
            // }

            if (originalIndex === 0) {
                // Auto-place the first image in the grid
                container.parent(this.imageContainer);
                container.position(this.positions[0].width, this.positions[0].height);
                container.size(this.imgSize, this.imgSize);
                this.clickedOrder.push(0);
                this.currentField = 1;
            } else {
                container.parent(this.pickContainer);
                container.addClass("clickMe")
                // Position logic for vertical list in flex pickContainer
                // Using absolute within the relative/flex container for transition stability
                const adjustedShuffledIndex = shuffledIndex - (this.shuffledImageUrlArray.findIndex(item => item[1] === 0) < shuffledIndex ? 1 : 0);
                const posY = globalVariables.ui.paddingMid + adjustedShuffledIndex * (pickItemSize + globalVariables.ui.paddingLow);

                container.position(globalVariables.ui.paddingMid, posY);
                container.size(pickItemSize, pickItemSize);
                container.style('transform', `rotate(${getRandomDegree()}deg)`);
                container.mouseClicked(() => this.positionImages(container, originalIndex, shuffledIndex));
            }

            this.imageDoms[originalIndex] = container;
        });
        this.styleCurrentBgTile();
    }

    positionImages(container, originalIndex, shuffledIndex) {
        if (this.clickedOrder.includes(originalIndex)) {
            return;
        }
        container.removeClass("clickMe");
        if (originalIndex === 0) {

        }
        if (this.currentField < this.imageAmount) {
            // Reparent to imageContainer when moving to the grid
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
        if (this.clickedOrder[0] === 0 &&
            this.clickedOrder[1] === 1 &&
            this.clickedOrder[2] === 2 &&
            this.clickedOrder[3] === 3) {
            this.correct = true;
            this.uiManager.showSolutionUi(this.correct);
            return;
        };
        this.uiManager.showSolutionUi(this.correct);

        if (this.correct === false) {
            setTimeout(() => {
                this.imageDoms.forEach(element => {
                    element.remove();
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
            tile.style("opacity", "0.05")
        });

        let tile = this.bgTileDoms[this.currentField];
        tile.style("opacity", "1")
    }

    shuffleImages() {
        const pairs = this.imageUrls.map((data, index) => [data, index]);
        this.shuffledImageUrlArray = this.shuffle(pairs);
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
