import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import maxMareUrl from "../images/scene08/maxMare.png";

export class scene13 extends BaseScene {
  constructor(p, sceneManager, uiManager) {
    super("scene13", p, sceneManager, uiManager);
    this.speech = null;
  }

  async setup(p) {
    this.uiManager.setup();
    this.speech = `Die <span class="highlight">${globalVariables.teamName}</span> haben sich bewiesen. Euch möchte ich diese äußerst wichtige Mission anvertrauen. Aber nun schreitet los. Mein Freund <span class="highlight">Norbert Nass</span>  wird euch unterstützen. `;

    const name = p.createDiv("Max Mare");
    name.id("nameBig");
    name.class("chelsea-market bigText");
    name.position(globalVariables.ui.sideSpace, globalVariables.ui.sideSpace);

    const maxMare = p.createImg(
      maxMareUrl,
      "Image with Text: Probleme im Flusslauf",
    );
    maxMare.position(-320, 150);
    maxMare.id("maxMare01");

    const size = 0.92;
    maxMare.size(p.width * size, p.height * size);

    const text = p.createDiv(this.speech);
    text.class("chelsea-market smallText");
    text.size(500, 0);
    text.position(p.width - 570, p.height - 370);
    text.style("transform", "rotate(-1deg)");

    this.domElements.push(name, maxMare, text);
    this.uiManager.showAnswer("Los geht's!");
  }

  draw(p) {
    this.uiManager.toggleLastSceneButton(true);
    this.uiManager.toggleNextSceneButton(true);
  }

  cleanup() {
    super.cleanup();
  }
}
