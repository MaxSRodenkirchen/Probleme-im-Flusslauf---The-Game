import { globalVariables } from '../globalVariables.js';
import { drawGrid } from '../utils/drawGrid.js';




export class ablaufRaten {
    constructor(scene) {
        this.scene = scene;

        this.imgSize = 200;

        this.currentField = 0;
        this.loadedImages = []; //correct array 
        this.loadedBgFields = [];
        this.shuffledArray = [];
        this.imageUrls = []; // URLs für DOM-Elemente
        this.domImages = []; // DOM <img> Elemente

        this.positions = [
            { width: -this.imgSize, height: -this.imgSize }, // index 0
            { width: 0, height: -this.imgSize },              // index 1
            { width: -this.imgSize, height: 0 },              // index 2
            { width: 0, height: 0 }                           // index 3
        ];
    }

    async loadImages(p, imageUrls, bgFieldUrls) {
        // URLs speichern für DOM-Elemente
        this.imageUrls = imageUrls;

        this.loadedImages = await Promise.all(
            imageUrls.map(url => p.loadImage(url))
        );
        this.loadedBgFields = await Promise.all(
            bgFieldUrls.map(url => p.loadImage(url))
        );
    }

    async setup(p) {

        this.shuffleImages();

        p.push();
        p.translate(p.width / 2, p.height / 2);
        // drawGrid(p, 50);
        this.loadedBgFields.forEach((img, index) => this.drawImage(p, index, img));

        // this.imageUrls.forEach((url, index) => {
        //     const imgElement = p.createImg(url, 'image ' + index);
        //     const pos = this.positions[index];
        //     imgElement.position(p.width / 2 + pos.width, p.height / 2 + pos.height);
        //     imgElement.size(this.imgSize, this.imgSize);
        //     imgElement.mouseClicked(() => console.log("hi"));
        //     this.domImages.push(imgElement);
        // });

        this.shuffledArray.forEach((url, index) => {
            const imgElement = p.createImg(url, 'image ' + index);
            const size = this.imgSize / 2 - globalVariables.ui.paddingMid / 2;
            imgElement.position(p.width / 2 - this.imgSize + (index * this.imgSize / 2), p.height - globalVariables.ui.paddingMid - size);
            imgElement.size(size, size);
            imgElement.mouseClicked(() => console.log("hi"));
            this.domImages.push(imgElement);
        });

        p.pop();
    }

    shuffleImages() {
        this.shuffledArray = [...this.imageUrls];

        // Fisher-Yates Shuffle Algorithmus
        for (let i = this.shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledArray[i], this.shuffledArray[j]] = [this.shuffledArray[j], this.shuffledArray[i]];
        }

        return this.shuffledArray;
    }

    drawImage(p, index, img) {

        switch (index) {
            case 0:
                p.image(img, -this.imgSize, -this.imgSize, this.imgSize, this.imgSize);
                return;
            case 1:
                p.image(img, 0, -this.imgSize, this.imgSize, this.imgSize);
                return;
            case 2:
                p.image(img, -this.imgSize, 0, -this.imgSize, this.imgSize);
                return;
            case 3:
                p.image(img, 0, 0, this.imgSize, this.imgSize);
                return;

        }

    }

    draw(p) {


    }
}