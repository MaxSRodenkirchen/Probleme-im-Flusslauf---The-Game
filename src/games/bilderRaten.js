import { globalVariables } from '../globalVariables.js';
import { drawGrid } from '../utils/drawGrid.js';




export class bilderRaten {
    constructor(folderName) {
        this.folderName = folderName;
        this.loadedImages = [];
        this.imgSize = 200;
        this.gap = globalVariables.ui.paddingMid;
    }

    async loadImages(p, imageUrls) {
        this.loadedImages = await Promise.all(
            imageUrls.map(url => p.loadImage(url))
        );
    }
    async setup(p) {

        // console.log(p.height)
    }

    update(p) {

    }

    draw(p) {
        p.translate(p.width / 2, p.height / 2);
        // drawGrid(p, 50);

        p.imageMode(p.CORNER);

        const gridSize = 2;
        this.loadedImages.forEach((img, index) => {
            if (img) {

                const col = index % gridSize;
                const row = Math.floor(index / gridSize);

                const x = col * (this.imgSize + this.gap) - this.imgSize - this.gap / 2;
                const y = row * (this.imgSize + this.gap) - this.imgSize - this.gap / 2;

                p.image(img, x, y, this.imgSize, this.imgSize, 0, 0, img.width, img.height, p.COVER);
            }
        });
    }
}