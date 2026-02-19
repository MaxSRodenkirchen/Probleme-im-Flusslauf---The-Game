import { getRandomDegree, globalVariables } from "../globalVariables.js";
import arrowRightImg from "../images/ui/arrow-right.png";
import arrowLeftImg from "../images/ui/arrow-left.png";
import fullscreen from "../images/ui/fullscreen.png";
import correct from "../images/ui/correct.png";
import wrong from "../images/ui/wrong.png";
import background from "../images/ui/background.png";

export class UIManager {
  constructor(p, sceneManager) {
    this.p = p;
    this.sceneManager = sceneManager;
    this.elements = [];
    this.lastSceneButton = null;
    this.nextSceneButton = null;
    this.fullscreenButton = null;
    this.isGoingBack = false;
  }

  setup() {
    let w = globalVariables.ui.objectWidth;
    let h = globalVariables.ui.objectHeight;
    let gap = globalVariables.ui.sideSpace;

    this.lastSceneButton = this.p.createButton("");
    this.lastSceneButton.position(gap, this.p.height - gap - h);
    this.lastSceneButton.size(w, h);
    this.lastSceneButton.class("dropShadow");
    this.lastSceneButton.style("background-image", `url(${arrowLeftImg})`);
    this.lastSceneButton.style("background-size", "contain");
    this.lastSceneButton.style("background-repeat", "no-repeat");
    this.lastSceneButton.style("background-position", "center");
    this.lastSceneButton.style("background-color", "transparent");
    this.lastSceneButton.style("z-index", "9999");
    this.lastSceneButton.mousePressed(async () => {
      this.isGoingBack = true;
      await globalVariables.currentScene--;
      await this.sceneManager.switchScene(globalVariables.currentScene, this.p);
    });
    this.elements.push(this.lastSceneButton);

    this.nextSceneButton = this.p.createButton("");
    this.nextSceneButton.position(
      this.p.width - gap - w,
      this.p.height - gap - h,
    );
    this.nextSceneButton.size(w, h);
    this.nextSceneButton.class("dropShadow");
    this.nextSceneButton.style("background-image", `url(${arrowRightImg})`);
    this.nextSceneButton.style("background-size", "contain");
    this.nextSceneButton.style("background-repeat", "no-repeat");
    this.nextSceneButton.style("background-position", "center");
    this.nextSceneButton.style("background-color", "transparent");
    this.nextSceneButton.style("z-index", "9999");
    this.nextSceneButton.mousePressed(async () => {
      this.isGoingBack = false;
      await globalVariables.currentScene++;
      await this.sceneManager.switchScene(globalVariables.currentScene, this.p);
    });
    this.elements.push(this.nextSceneButton);

    const fullscreenSize = w / 2;
    this.fullscreenButton = this.p.createButton("");
    const offsetY = (globalVariables.ui.objectHeight - fullscreenSize) / 2;
    this.fullscreenButton.position(
      this.p.width - gap - fullscreenSize * 1.5,
      gap + offsetY,
    );
    this.fullscreenButton.size(fullscreenSize, fullscreenSize);
    this.fullscreenButton.class("dropShadow");
    this.fullscreenButton.style("background-image", `url(${fullscreen})`);
    this.fullscreenButton.style("background-size", "contain");
    this.fullscreenButton.style("background-repeat", "no-repeat");
    this.fullscreenButton.style("background-position", "center");
    this.fullscreenButton.style("background-color", "transparent");
    this.fullscreenButton.style("z-index", "9999");
    this.fullscreenButton.mousePressed(() => {
      let fs = this.p.fullscreen();
      this.p.fullscreen(!fs);
    });
    this.elements.push(this.fullscreenButton);
  }

  toggleLastSceneButton(bool) {
    if (bool) {
      this.lastSceneButton.show();
    } else {
      this.lastSceneButton.hide();
    }
  }
  toggleNextSceneButton(bool) {
    if (bool) {
      this.nextSceneButton.show();
    } else {
      this.nextSceneButton.hide();
    }
  }

  showSolutionUi(condition, pos) {
    const imgUrl = condition ? correct : wrong;
    const img = this.p.createImg(imgUrl, condition ? "Correct" : "Wrong");
    img.parent("#game-container");

    const size = globalVariables.ui.objectHeight * 2;

    const posX = pos?.x ?? (this.p.width - size) / 2;
    const posY = pos?.y ?? (this.p.height - size) / 2;

    img.position(posX, posY);
    img.size(size, size);
    img.class("dropShadow iconOverlay borderRadius shadow");
    img.style("transform", `rotate(${getRandomDegree() * 0.6}deg)`);

    this.elements.push(img); // Wichtig für den Cleanup bei Szenenwechsel

    if (condition) {
      img.style("background-color", globalVariables.colors.darkBlue);
    } else {
      img.style("background-color", globalVariables.colors.error);
    }

    setTimeout(() => {
      img.remove();
    }, globalVariables.timeOutTime);
  }

  displayCharacter(url, name, textArray) {
    let textCounter = 0;

    // 1. Fullscreen Overlay (Blocker & Dimmer)
    const overlay = this.p.createImg(background, "The background image");
    overlay.class("characterOverlay");
    overlay.parent(document.body); // Raus aus dem transformierten Game-Container
    this.elements.push(overlay);

    const posX = globalVariables.ui.sideSpace;
    const posY = globalVariables.ui.sideSpace;
    const size = globalVariables.ui.objectHeight;

    // 2. Character Dialog Container
    const fullContainer = this.p.createDiv("");
    fullContainer.class("fullCharacterContainer borderRadius shadow is-active");
    fullContainer.parent(document.body); // Auch raus aus dem transformierten Container
    this.elements.push(fullContainer);

    const imgContainer = this.p.createDiv("");
    imgContainer.parent(fullContainer);
    imgContainer.size(size * 2, size * 2);
    imgContainer.class("shadow borderRadius characterContainer");

    const img = this.p.createImg(url, "An image of the Character");
    img.parent(imgContainer);
    img.class("characterImage");

    const speechContent = this.p.createDiv("");
    speechContent.parent(fullContainer);
    speechContent.class("speech-content");

    const nameTag = this.p.createP(name);
    nameTag.parent(speechContent);
    nameTag.class("nameTag chelsea-market smallText");

    const speech = this.p.createP(textArray[textCounter]);
    speech.parent(speechContent);
    speech.class("chelsea-market mediumText speech");

    const nextButton = this.p.createButton("");
    const w = globalVariables.ui.objectWidth;
    const h = globalVariables.ui.objectHeight;
    nextButton.size(w, h);
    nextButton.class("dropShadow borderRadius nextSpeechButton");
    nextButton.parent(fullContainer);
    nextButton.style("background-image", `url(${arrowRightImg})`);
    nextButton.style("background-size", "contain");
    nextButton.style("background-repeat", "no-repeat");
    nextButton.style("background-position", "center");
    // nextButton.style('background-color', 'transparent');
    nextButton.style("z-index", "100001");

    const finishDialogue = () => {
      overlay.remove();
      nextButton.remove();

      nameTag.removeClass("smallText");
      speech.removeClass("mediumText");

      imgContainer.style("transform", `rotate(-1deg)`);
      nameTag.style("transform", `rotate(-0.7deg)`);
      speech.style("transform", `rotate(-0.3deg)`);

      // CSS-Klasse entfernen, damit der Kasten nicht mehr zentriert wird
      fullContainer.removeClass("is-active");
      fullContainer.removeClass("shadow");

      // Zurück in den Game-Container verschieben
      fullContainer.parent("#game-container");
      fullContainer.position(posX, posY);
      imgContainer.size(size, size);
    };

    if (this.isGoingBack) {
      speech.html(textArray[textArray.length - 1]);
      finishDialogue();
    }

    nextButton.mousePressed(() => {
      textCounter++;

      if (textCounter < textArray.length) {
        speech.html(textArray[textCounter]);
      } else {
        finishDialogue();
      }
    });

    this.elements.push(fullContainer);
  }

  showAnswer(answer) {
    const text = this.p.createP(answer);
    text.class("chelsea-market smallText");
    text.style("text-align", "right");

    const posX =
      this.p.width -
      globalVariables.ui.sideSpace -
      globalVariables.ui.objectHeight / 2 -
      150 -
      globalVariables.ui.paddingMid;
    const posY =
      this.p.height -
      globalVariables.ui.sideSpace -
      globalVariables.ui.objectHeight * 0.62;

    text.position(posX, posY);

    // Move the anchor point from top-left (0,0) to bottom-right (100%, 100%)
    text.style(
      "transform",
      `translate(-100 %, -100 %) rotate(${getRandomDegree()}deg)`,
    );

    this.elements.push(text);
  }

  // Clean up all DOM elements to prevent memory leaks
  cleanup() {
    this.elements.forEach((element) => {
      element.remove();
    });
    this.elements = [];
  }
}
