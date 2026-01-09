import { getRandomDegree, globalVariables } from '../globalVariables.js';
import { BaseGame } from './_BaseGame.js';

export class ablaufRaten extends BaseGame {
    constructor(p, scene, bgTilesUrls, imageUrls, uiManager) {
        super(p, scene, uiManager);

        this.imgSize = globalVariables.ui.objectWidth * 2;
        this.currentField = 0;
        this.clickedOrder = [];

        this.bgTilesUrls = bgTilesUrls;
        this.imageUrls = imageUrls;
        this.shuffledImageUrlArray = [];
        this.bgTileDoms = [];
        this.imageDoms = [];
        this.correct = false;

        this.imageAmount = this.imageUrls.length;

        const center = {
            w: p.width / 2,
            h: p.height / 2
        };
        const gap = globalVariables.ui.paddingLow / 2;
        this.positions = [
            { width: center.w + gap, height: center.h + gap },                           // index 0 (BR)
            { width: center.w + gap, height: center.h - this.imgSize - gap },              // index 1 (TR)
            { width: center.w - this.imgSize - gap, height: center.h - this.imgSize - gap }, // index 2 (TL)
            { width: center.w - this.imgSize - gap, height: center.h + gap }              // index 3 (BL)
        ];
    }

    async setup(p) {
        this.bgTilesUrls.forEach((url, index) => {
            const img = p.createImg(url, 'image ' + index);
            img.position(this.positions[index].width, this.positions[index].height);
            img.size(this.imgSize, this.imgSize);
            const rotations = [-270, 0, -90, 180]; // degrees for each index
            const rot = rotations[index] + (getRandomDegree() * 8);
            img.style('transform', `rotate(${rot}deg)`);
            img.style("opacity", "0.15")
            img.class(" borderRadius");

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
        this.shuffledImageUrlArray.forEach(([url, originalIndex], shuffledIndex) => {
            const img = this.p.createImg(url, 'image ' + shuffledIndex);
            const size = this.imgSize / 2 - globalVariables.ui.paddingMid / 2;
            const posX = this.p.width / 2 - this.imgSize + (shuffledIndex * this.imgSize / 2);
            const posY = this.p.height - globalVariables.ui.sideSpace - size;
            img.position(posX, posY);
            img.size(size, size);
            img.class("transition shadow borderRadius ");
            img.style('transform', `rotate(${getRandomDegree()}deg)`);
            if (originalIndex === 0) {
                img.addClass("clickMe");
            }

            img.mouseClicked(() => this.positionImages(img, originalIndex, shuffledIndex));

            this.imageDoms[originalIndex] = img;
        });
        this.styleCurrentBgTile();
    }

    positionImages(img, originalIndex, shuffledIndex) {
        if (this.clickedOrder.includes(originalIndex)) {
            return;
        }

        if (originalIndex === 0) {
            img.removeClass("clickMe");
        }
        if (this.currentField < this.imageAmount) {
            const newPosX = this.positions[this.currentField].width;
            const newPosY = this.positions[this.currentField].height;

            img.position(newPosX, newPosY);
            img.size(this.imgSize, this.imgSize);

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
        const pairs = this.imageUrls.map((url, index) => [url, index]);
        this.shuffledImageUrlArray = this.shuffle(pairs);
        return this.shuffledImageUrlArray;
    }

    cleanup() {
        super.cleanup();
        this.bgTileDoms.forEach(element => element.remove());
        this.bgTileDoms = [];
        this.imageDoms.forEach(element => element.remove());
        this.imageDoms = [];
    }
}
