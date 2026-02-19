import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import { bilderRaten } from "../games/bilderRaten.js";

import img1 from "../images/scene07/final/reifen.png";
import img2 from "../images/scene07/final/shirt.png";
import img3 from "../images/scene07/final/flasche.png";
import img4 from "../images/scene07/final/zahnpasta.png";

import max1 from "../images/MaxMare_Icon.png";
import { drawGrid } from "../utils/drawGrid.js";

export class scene12 extends BaseScene {
  constructor(p, sceneManager, uiManager) {
    super("scene12", p, sceneManager, uiManager);

    this.imageUrls = [img1, img2, img3, img4];

    this.game = new bilderRaten(
      p,
      this,
      this.uiManager,
      this.imageUrls,
      "MIKROPLASTIK",
    );
  }

  async setup(p) {
    this.uiManager.setup();

    // await this.game.loadImages(p, this.imageUrls, this.bgFieldUrls);
    await this.game.setup(p);

    const textArray = [
      `Gut erkannt. Das Plastik ist wirklich ein großes Problem für uns.`,
      `Manche Teilchen erkennen wir nicht einmal richtig. Wisst ihr was ich meine?`,
      `Die Buchstaben in der Tastatur ergeben das gemeinte Wort. Welches ist es wohl?`,
    ];
    this.uiManager.displayCharacter(max1, "Max Mare", textArray);
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
