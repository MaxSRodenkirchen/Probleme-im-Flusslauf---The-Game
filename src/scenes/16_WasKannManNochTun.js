import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import { faktenRaten } from "../games/faktenRaten.js";

// import img1 from '../images/scene04/verdunstung.png';
// import img2 from '../images/scene04/wolkenbildung.png';
// import img3 from '../images/scene04/regen.png';
// import img4 from '../images/scene04/ablauf.png';

// import field from '../images/ui/arrowTurnLeft.png';
import max1 from "../images/scene04/MaxMare1.png";

export class scene17 extends BaseScene {
  constructor(p, sceneManager, uiManager) {
    super("scene17", p, sceneManager, uiManager);

    this.facts = [
      [
        "Die Gezeiten (Ebbe und Flut) entstehen dadurch, dass riesige Unterwasservulkane am Meeresboden zweimal täglich gleichzeitig ausbrechen und das Wasser an die Küsten drücken.",
        false,
      ],
      [
        "Nur etwa 5 % bis 10 % der Weltmeere sind bisher erforscht. Der Großteil der Tiefsee bleibt für uns Menschen ein ungelöstes Rätsel.",
        true,
      ],
      [
        "Blauwale sind so riesig, dass sie bei jedem Tauchgang bis zu 500 Liter Salzwasser durch ihre Haut aufsaugen können, um ihren Durst zu löschen.",
        false,
      ],
      [
        "Der tiefste Punkt der Erde liegt im Pazifischen Ozean. Er wird Marianengraben genannt und ist mit rund 11.000 Metern tiefer als der Mount Everest hoch ist.",
        true,
      ],
      [
        "Wale sind die einzigen Tiere, die kein Wasser trinken müssen, da sie ihren gesamten Flüssigkeitsbedarf durch das Filtern von Wolken decken.",
        false,
      ],

      [
        "In den Ozeanen gibt es riesige Müllstrudel. Der bekannteste ist der „Great Pacific Garbage Patch“.",
        true,
      ],
    ];

    this.game = new faktenRaten(p, this, this.uiManager, this.facts);
  }

  async setup(p) {
    await this.game.setup();

    this.uiManager.setup();

    const textArray = [
      "Sehr gut! Dann wisst ihr bestimmt auch noch viel mehr über die Meere.",
      ` Welche Fakten stimmen? <br>Klickt auf die <span class = "highlight"> drei </span> richtigen Felder!`,
    ];
    this.uiManager.displayCharacter(max1, "Max Mare", textArray);
  }

  draw(p) {
    this.game.draw();

    this.uiManager.toggleLastSceneButton(true);
    this.uiManager.toggleNextSceneButton(this.completed);
  }

  cleanup() {
    super.cleanup();
    this.game.cleanup();
  }
}
