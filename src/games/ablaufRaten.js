import { globalVariables } from '../globalVariables.js';
import { drawGrid } from '../utils/drawGrid.js';




export class ablaufRaten {
    constructor(p, scene, bgTilesUrls, imageUrls) {
        this.scene = scene;
        this.p = p;

        this.imgSize = 200;
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
        this.positions = [
            { width: center.w - this.imgSize, height: center.h - this.imgSize }, // index 0
            { width: center.w, height: center.h - this.imgSize },              // index 1
            { width: center.w - this.imgSize, height: center.h },              // index 2
            { width: center.w, height: center.h }                           // index 3
        ];
    }

    async setup(p) {

        // drawGrid(p, 50);

        this.bgTilesUrls.forEach((url, index) => {
            const img = p.createImg(url, 'image ' + index);
            img.position(this.positions[index].width, this.positions[index].height);
            img.size(this.imgSize, this.imgSize);

            this.bgTileDoms.push(img);
        });

        this.setupImages();

    }

    setupImages() {
        this.currentField = 0;
        this.shuffleImages();
        this.shuffledImageUrlArray.forEach(([url, originalIndex], shuffledIndex) => {
            const img = this.p.createImg(url, 'image ' + shuffledIndex);
            const size = this.imgSize / 2 - globalVariables.ui.paddingMid / 2;
            img.position(this.p.width / 2 - this.imgSize + (shuffledIndex * this.imgSize / 2), this.p.height - globalVariables.ui.paddingMid - size);
            img.size(size, size);
            img.mouseClicked(() => this.positionImages(img, originalIndex, shuffledIndex));

            this.imageDoms[originalIndex] = img;
        });
        this.styleCurrentBgTile();

    }

    positionImages(img, originalIndex, shuffledIndex) {
        if (this.currentField < this.imageAmount) {
            img.position(this.positions[this.currentField].width, this.positions[this.currentField].height);
            img.size(this.imgSize, this.imgSize);
            this.clickedOrder.push(originalIndex);
            this.nextField();
            // console.log('Clicked order:', this.clickedOrder);
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
        for (let i = 0; i < this.imageAmount; i++) {
            if (this.clickedOrder[i] === i) {
                // this.correct = true
            } else {
                console.log("lost");
                this.imageDoms.forEach(element => {
                    element.remove();
                });
                this.imageDoms = [];
                this.setupImages();
            }
        }

    }

    draw(p) {
    }

    styleCurrentBgTile() {
        this.bgTileDoms.forEach(tile => {
            tile.removeClass('activeElement');
        });

        let tile = this.bgTileDoms[this.currentField];
        tile.addClass('activeElement');
    }
    shuffleImages() {
        // Erstelle Array mit [url, originalIndex] Paaren
        this.shuffledImageUrlArray = this.imageUrls.map((url, index) => [url, index]);

        // Fisher-Yates Shuffle Algorithmus
        for (let i = this.shuffledImageUrlArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledImageUrlArray[i], this.shuffledImageUrlArray[j]] = [this.shuffledImageUrlArray[j], this.shuffledImageUrlArray[i]];
        }

        return this.shuffledImageUrlArray;
    }
    cleanup() {

        this.bgTileDoms.forEach(element => {
            element.remove();
        });
        this.bgTileDoms = [];

        this.imageDoms.forEach(element => {
            element.remove();
        });
        this.imageDoms = [];
    }
}