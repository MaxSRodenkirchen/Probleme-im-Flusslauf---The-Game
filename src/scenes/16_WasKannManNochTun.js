import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import { faktenRaten } from "../games/faktenRaten.js";

import max1 from "../images/MaxMare_Icon.png";

export class scene17 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene17", p, sceneManager, uiManager);

        this.facts = [
            [
                "Ich kaufe nur noch 'Bioplastik'-Tüten, denn die verrotten in der Natur ganz schnell.",
                false,
            ],
            [
                "Ich nutze echte Naturkosmetik, da ist nämlich garantiert kein flüssiges Plastik drin.",
                true,
            ],
            [
                "Ich trage meine Polyester-Pullis ewig. Solange ich sie nur wasche und nicht wegwerfe, landet auch kein Plastik im Meer.",
                false,
            ],
            [
                "Auch wenn es umständlich ist: Ich trenne Plastik (wie den Aludeckel vom Joghurtbecher) immer restlos von anderen Materialien, bevor es in den Müll fliegt.",
                true,
            ],
            [
                "Ich verzichte an der Kasse auf Einweg-Papiertüten und habe für Spontankäufe einfach immer einen Stoffbeutel in der Jackentasche.",
                true,
            ],

            [
                "Ich mache mir keine Sorgen um meinen vielen Plastikmüll, denn unsere Anlagen machen aus dem Abfall einfach wieder komplett gleichwertiges Plastik.",
                false,
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
