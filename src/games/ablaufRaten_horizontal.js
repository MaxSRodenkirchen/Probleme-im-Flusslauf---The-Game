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

        this.gameContainer = p.createDiv();
        this.gameContainer.class("ablaufGameContainer ablaufHorizontal");
        this.gameContainer.parent("#game-container");

        // In horizontal layout, we want 5 images side by side.
        // Let's define imgSize based on a reasonable height
        this.imgSize = 160;

        this.positions = [];
        for (let i = 0; i < this.imageAmount; i++) {
            this.positions.push({
                width: i * (this.imgSize + gap * 2),
                height: 0
            });
        }

        this.domElements.push(this.gameContainer);

        this.imageContainer = p.createDiv();
        this.imageContainer.class("imgContainer horizontalGrid");
        this.imageContainer.parent(this.gameContainer);

        const containerWidth = this.imageAmount * (this.imgSize + gap * 2);
        this.imageContainer.size(containerWidth, this.imgSize + gap * 2);
        this.domElements.push(this.imageContainer);

        // Create container for the shuffle/pick images
        this.pickContainer = p.createDiv();
        this.pickContainer.class("pickContainer borderRadius shadow horizontalPick");
        this.pickContainer.parent(this.gameContainer);

        // For horizontal pick container, we might want it below or to the side. 
        // The user said "5 images horizontal", usually this refers to the target grid.
        // Let's keeps the pick container to the side for now but adjust its size.
        const remainingImages = this.imageAmount - 1;
        this.pickItemSize = (this.gameHeight - (globalVariables.ui.paddingMid * 2) - (globalVariables.ui.paddingLow * (remainingImages - 1))) / remainingImages;
        const pickContainerWidth = this.pickItemSize + (2 * globalVariables.ui.paddingMid);

        this.pickContainer.size(pickContainerWidth, this.gameHeight);
        this.pickContainer.style('flex-shrink', '0');
        this.domElements.push(this.pickContainer);

        const flexGap = 80;
        const totalContentWidth = containerWidth + flexGap + pickContainerWidth;

        const iconSize = globalVariables.ui.objectHeight * 2;

        this.gridCenter = {
            x: (p.width - totalContentWidth) / 2 + (containerWidth / 2) - (iconSize / 2),
            y: (p.height / 2) - (iconSize / 2)
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

                const adjustedShuffledIndex = shuffledIndex - (this.shuffledImageUrlArray.findIndex(item => item[1] === 0) < shuffledIndex ? 1 : 0);
                const posY = globalVariables.ui.paddingMid + adjustedShuffledIndex * (this.pickItemSize + globalVariables.ui.paddingLow);

                container.position(globalVariables.ui.paddingMid, posY);
                container.size(this.pickItemSize, this.pickItemSize);

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
