import { BaseScene } from "./_BaseScene.js";
import { globalVariables } from "../globalVariables.js";

import { faktenRaten } from "../games/faktenRaten.js";

import max1 from "../images/MaxMare_Icon.png";

export class scene20 extends BaseScene {
    constructor(p, sceneManager, uiManager) {
        super("scene20", p, sceneManager, uiManager);

        this.facts = [
            [
                "Man sollte mehr Bioplastik-Tüten nutzen. Sie sind völlig unbedenklich, denn sie verrotten in der Natur ganz schnell.",
                false,
            ],
            [
                "Man sollte echte Naturkosmetik nutzen, denn dort ist garantiert kein flüssiges Plastik enthalten.",
                true,
            ],
            [
                "Solange man Polyester-Kleidung nur wäscht und nicht wegwirft, gelangt davon auch kein Plastik ins Meer.",
                false,
            ],
            [
                "Auch wenn es umständlich ist: Man sollte Plastik immer restlos von anderen Materialien trennen, bevor es im Müll landet.",
                true,
            ],
            [
                "Für Spontankäufe sollte man immer einen Stoffbeutel in der Tasche haben, um an der Kasse auf Einweg-Tüten verzichten zu können.",
                true,
            ],

            [
                "Die Menge an Plastikmüll ist kein Problem, denn Recyclinganlagen machen aus dem Abfall einfach wieder komplett gleichwertiges Plastik.",
                false,
            ],
        ];

        this.game = new faktenRaten(p, this, this.uiManager, this.facts);
    }

    async setup(p) {
        await this.game.setup();

        this.uiManager.setup();

        const textArray = [
            "Wie schön, dass ihr zurück seid. <br> Erzählt mir was ihr rausgefunden habt.",
            `Aha, die Stadt im Mittellauf verursacht also viel Müll. <br> Konntet ihr mit Bärbel eine Lösung finden?`,
            `Wie bitte? Ihr habt mit Bix Biber gleich eine ganze Kläranlage gebaut? <br> Ihr seid wirklich große Klasse.`,
            `Um die Ursache zu beheben, müssten die Menschen allerdings mehr auf ihr Verhalten achten. <br><span class="highlight">Habt ihr eine Ahnung, was sie besser machen könnten?</span>`
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
