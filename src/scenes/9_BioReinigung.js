import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import { faktenRaten } from "../games/faktenRaten.js";

// import img1 from '../images/scene04/verdunstung.png';
// import img2 from '../images/scene04/wolkenbildung.png';
// import img3 from '../images/scene04/regen.png';
// import img4 from '../images/scene04/ablauf.png';

// import field from '../images/ui/arrowTurnLeft.png';
import bärbel from "../images/bbarbe.png";

export class scene10 extends BaseScene {
  constructor(p, sceneManager, uiManager) {
    super("scene10", p, sceneManager, uiManager);

    this.facts = [
      [
        "Bakterien und Pilze wirken als „Destruenten“ und bauen organisches Material wie Laub, Exkremente und tote Lebewesen im Wasser ab.",
        true,
      ],
      [
        "Moderne Kläranlagen arbeiten heute rein technisch; man verzichtet dort komplett auf den Einsatz von Lebewesen wie Bakterien.",
        false,
      ],
      [
        " Algen unterstützen die Reinigung indirekt, indem sie durch Photosynthese den Sauerstoff produzieren, den die Bakterien für den Abbau von Schmutz benötigen.",
        true,
      ],
      [
        "Die Selbstreinigung im Fluss funktioniert nur im kalten Wasser der Quelle; sobald der Fluss im Unterlauf wärmer wird, hört der biologische Abbau auf.",
        false,
      ],
      [
        "Wenn zu wenig Sauerstoff im Wasser ist, entsteht bei der Reinigung Schwefelwasserstoff – ein giftiges Gas, das für Fische gefährlich ist.",
        true,
      ],

      [
        "Fische sind die Hauptverantwortlichen für die Wasserreinigung, da sie Giftstoffe aus dem Wasser filtern und in reine Energie für ihr Wachstum umwandeln.",
        false,
      ],
    ];

    this.game = new faktenRaten(p, this, this.uiManager, this.facts);
  }

  async setup(p) {
    await this.game.setup();

    this.uiManager.setup();

    //<span class = "highlight"> drei </span>
    const textArray = [
      `Was sucht ihr denn hier bei uns im Mittellauf? <br> Wollt ihr noch mehr Unheil anrichten?`,
      `Achso, <span class = "highlight">Max Mare</span> schickt euch um zu helfen? <br> Wisst ihr denn überhaupt wie hier im Fluss unsere Systeme funktionieren? `,
      `Welche Fakten stimmen? Klickt auf die <span class = "highlight"> drei </span> richtigen Felder.`
    ];
    this.uiManager.displayCharacter(bärbel, "Bärbel Barbe", textArray);
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
