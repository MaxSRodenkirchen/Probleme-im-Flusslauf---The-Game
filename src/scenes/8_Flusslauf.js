import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import { ablaufRaten } from "../games/ablaufRaten.js";

import img1 from "../images/scene04/final/Verdunstung.png";
import img2 from "../images/scene04/final/Kondensation.png";
import img3 from "../images/scene04/final/Niederschlag.png";
import img4 from "../images/scene04/final/Versickerung.png";

import sonne from "../images/scene04/final/Sonne.png";

import field1 from "../images/scene04/final/arrow1.png";
import field2 from "../images/scene04/final/arrow2.png";
import field3 from "../images/scene04/final/arrow3.png";
import field4 from "../images/scene04/final/arrow4.png";
import nnass from "../images/nnass.png";

export class scene09 extends BaseScene {
  constructor(p, sceneManager, uiManager) {
    super("scene09", p, sceneManager, uiManager);

    this.imageUrls = [
      [img1, "Verdunstung"],
      [img2, "Kondensation"],
      [img3, "Niederschlag"],
      [img4, "Versickerung"],
    ];
    this.bgTilesUrls = [field1, field2, field3, field4];
    this.game = new ablaufRaten(
      p,
      this,
      this.bgTilesUrls,
      this.imageUrls,
      this.uiManager,
    );
  }

  async setup(p) {
    this.uiManager.setup();

    // await this.game.loadImages(p, this.imageUrls, this.bgFieldUrls);
    await this.game.setup(p);

    const sonnenImg = this.p.createImg(sonne, "An image of the sun");
    sonnenImg.parent("#game-container");
    // sonnenImg.class("transition shadow borderRadius");
    sonnenImg.style("z-index", "-999");
    sonnenImg.style("transform", "rotate(4deg)");
    const size = globalVariables.ui.objectHeight * 3.5;
    sonnenImg.size(size, size);
    sonnenImg.position(
      globalVariables.ui.sideSpace - size / 2,
      this.p.height / 2 - size / 2,
    );
    this.domElements.push(sonnenImg);

    const textArray = [
      `Hallo Freunde, danke für eure Hilfe. <br> Wisst ihr, auch mich belastet die Verschmutzung sehr.`,
      `Lasst uns als Erstes zum <span class= "highlight">Mittellauf</span>  des Flusses aufbrechen. Ich hörte von den Barben, dass dort nicht alles mit rechten Dingen zugeht.`,
      `Kennt ihr die Flussabschnitte? <br> Klickt in der richtigen Reihenfolge auf die Bilder rechts`,
    ];
    this.uiManager.displayCharacter(nnass, "Norbert Nass", textArray);
  }

  draw(p) {
    this.game.draw(p);

    this.uiManager.toggleLastSceneButton(true);
    this.uiManager.toggleNextSceneButton(this.completed);
  }

  cleanup() {
    super.cleanup();
    this.game.cleanup();
  }
}
