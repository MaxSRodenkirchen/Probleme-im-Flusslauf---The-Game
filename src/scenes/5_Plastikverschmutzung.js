import { BaseScene } from "./_BaseScene.js";
import { globalVariables, getRandomDegree } from "../globalVariables.js";
import { wimmelbild } from "../games/wimmelbild.js";

import bgImageUrl from "../images/scene06/wimmelbild.png";
import img1 from "../images/scene06/flasche.png";
import img2 from "../images/scene06/netz.png";
import img3 from "../images/scene06/shirt.png";
import img4 from "../images/scene06/tüte.png";
import max1 from "../images/MaxMare_Icon.png";

export class scene06 extends BaseScene {
  constructor(p, sceneManager, uiManager) {
    super("scene06", p, sceneManager, uiManager);

    const positions = [
      { x: 306, y: 360, r: 100 },
      { x: 301, y: 150, r: 175 },
      { x: 471, y: 245, r: 100 },
      { x: 169, y: 172, r: 80 },
    ]

    this.game = new wimmelbild(p, this, this.uiManager, bgImageUrl, [
      img1,
      img2,
      img3,
      img4,
    ], positions);
  }

  async setup(p) {
    const textArray = [
      "Ihr seid gut. Dann ahnt ihr bestimmt auch schon was unser Problem ist.",
      `Was gehört hier nicht ins Meer? <br> Findet und klickt auf die <span class = "highlight"> vier Gegenstände.</span>`,
    ];
    this.uiManager.displayCharacter(max1, "Max Mare", textArray);

    this.uiManager.setup();
    this.game.setup(p);
    // this.domElements.push();
  }

  draw(p) {
    this.game.draw();
    // this.uiManager.toggleLastSceneButton(true);
    this.uiManager.toggleNextSceneButton(this.completed);
  }

  cleanup(p) {
    this.game.cleanup();
    super.cleanup();
  }
}
