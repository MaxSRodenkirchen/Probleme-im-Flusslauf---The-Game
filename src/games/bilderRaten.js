import { globalVariables } from '../globalVariables.js';
import { drawGrid } from '../utils/drawGrid.js';




export class bilderRaten {
    constructor(solution, scene) {
        this.solution = solution;
        this.scene = scene;  // Referenz zur Szene
        this.solutionLetters = this.solution.split('');
        this.currentWord = [];  // Aktuell aufgebautes Wort
        this.availableLetters = [];  // Verfügbare Buchstaben (gemischt)

        this.solutionButtons = [];  // Buttons für die Lösung (oben)
        this.letterButtons = [];    // Buttons für verfügbare Buchstaben (unten)

        this.loadedImages = [];
        this.imgSize = 200;
        this.gap = globalVariables.ui.paddingMid;

        // Erstelle gemischte Buchstaben-Liste
        this.availableLetters = this.shuffleArray([...this.solutionLetters]);
    }

    shuffleArray(array) {
        // Fisher-Yates Shuffle
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    async loadImages(p, imageUrls) {
        this.loadedImages = await Promise.all(
            imageUrls.map(url => p.loadImage(url))
        );
    }

    async setup(p) {
        // Cleanup alte Buttons falls vorhanden (bei Rückkehr zur Szene)
        if (this.solutionButtons.length > 0) {
            this.solutionButtons.forEach(btn => btn.remove());
            this.solutionButtons = [];
        }
        if (this.letterButtons.length > 0) {
            this.letterButtons.forEach(btn => btn.remove());
            this.letterButtons = [];
        }

        // Reset currentWord
        this.currentWord = [];

        const centerX = p.width / 2;
        let gap = globalVariables.ui.paddingMid;

        const buttonSize = globalVariables.ui.objectHeight / 2 - gap / 2;
        const buttonGap = globalVariables.ui.paddingMid;
        const lettersY = p.height - gap - buttonSize;
        const solutionY = p.height - gap * 2 - buttonSize * 2;


        // Berechne Start-X für Zentrierung
        const totalWidth = this.solutionLetters.length * (buttonSize + buttonGap) - buttonGap;
        const startX = centerX - totalWidth / 2;

        // Erstelle Lösungs-Buttons (oben) - anfangs leer
        this.solutionButtons = this.solutionLetters.map((letter, index) => {
            const btn = p.createButton('_');
            btn.position(startX + index * (buttonSize + buttonGap), solutionY);
            btn.style('font-size', `${globalVariables.ui.fontSize}px`);
            btn.style('width', `${buttonSize}px`);
            btn.style('height', `${buttonSize}px`);



            // Click: Buchstabe zurück in Auswahl
            btn.mousePressed(() => {
                this.removeLetter(index);
            });

            return btn;
        });

        // Erstelle verfügbare Buchstaben-Buttons (unten)
        this.letterButtons = this.availableLetters.map((letter, index) => {
            const btn = p.createButton(letter);
            btn.position(startX + index * (buttonSize + buttonGap), lettersY);
            btn.style('font-size', `${globalVariables.ui.fontSize}px`);
            btn.style('width', `${buttonSize}px`);
            btn.style('height', `${buttonSize}px`);
            btn.class("chelsea-market");
            btn.style('background-color', 'transparent');


            // Click: Buchstabe auswählen
            btn.mousePressed(() => {
                this.selectLetter(letter, index);
            });

            return btn;
        });
    }

    selectLetter(letter, buttonIndex) {
        // Finde ersten leeren Platz in der Lösung
        const emptyIndex = this.currentWord.findIndex(l => l === undefined);

        if (emptyIndex === -1 && this.currentWord.length < this.solutionLetters.length) {
            // Noch Platz am Ende
            this.currentWord.push(letter);
            this.solutionButtons[this.currentWord.length - 1].html(letter);
        } else if (emptyIndex !== -1) {
            // Leerer Platz gefunden
            this.currentWord[emptyIndex] = letter;
            this.solutionButtons[emptyIndex].html(letter);
        } else {
            // Kein Platz mehr
            return;
        }

        // Verstecke den Button
        this.letterButtons[buttonIndex].hide();

        // Prüfe Lösung
        this.checkSolution();
    }

    removeLetter(index) {
        const letter = this.currentWord[index];

        if (letter) {
            // Entferne Buchstaben aus currentWord
            this.currentWord[index] = undefined;
            this.solutionButtons[index].html('_');

            // Setze completed zurück, da Lösung nicht mehr vollständig
            this.scene.completed = false;

            // Re-aktiviere Buttons falls sie deaktiviert waren
            this.letterButtons.forEach(btn => btn.removeAttribute('disabled'));
            this.solutionButtons.forEach(btn => {
                btn.removeAttribute('disabled');
                btn.style('background-color', globalVariables.colors.light);
            });

            // Finde und zeige den entsprechenden Button wieder
            const btnIndex = this.availableLetters.findIndex((l, i) =>
                l === letter && this.letterButtons[i].style('display') === 'none'
            );

            if (btnIndex !== -1) {
                this.letterButtons[btnIndex].show();
            }
        }
    }

    checkSolution() {
        // Warte bis alle Buchstaben platziert sind
        if (this.currentWord.filter(l => l !== undefined).length !== this.solutionLetters.length) {
            return;
        }

        const currentWord = this.currentWord.join('');

        if (currentWord === this.solution) {
            console.log('✓ RICHTIG! Lösung gefunden:', currentWord);

            // Markiere Szene als abgeschlossen
            this.scene.completed = true;

            // Färbe Buttons grün
            this.solutionButtons.forEach(btn => {
                btn.style('background-color', globalVariables.colors.success);
                btn.style('cursor', 'default');
            });

            // Deaktiviere alle Buttons
            this.letterButtons.forEach(btn => btn.attribute('disabled', ''));
            this.solutionButtons.forEach(btn => btn.attribute('disabled', ''));
        } else {
            console.log('✗ Falsch:', currentWord, '≠', this.solution);
            this.scene.completed = false;

            // Optional: Kurz rot färben
            this.solutionButtons.forEach(btn => {
                btn.style('background-color', globalVariables.colors.error);
            });

            setTimeout(() => {
                this.solutionButtons.forEach(btn => {
                    btn.style('background-color', globalVariables.colors.light);
                });
            }, 500);
        }
    }

    update(p) {
        // Spiel-Logik hier (falls nötig)
    }

    draw(p) {
        p.translate(p.width / 2, p.height / 2);

        const gridSize = 2;
        this.loadedImages.forEach((img, index) => {
            if (img) {
                const col = index % gridSize;
                const row = Math.floor(index / gridSize);
                const x = col * (this.imgSize + this.gap) - this.imgSize - this.gap / 2;
                const y = row * (this.imgSize + this.gap) - this.imgSize - this.gap / 2;
                p.image(img, x, y, this.imgSize, this.imgSize, 0, 0, img.width, img.height, p.COVER);
            }
        });
    }

    cleanup() {
        // Entferne alle Buttons
        this.solutionButtons.forEach(btn => btn.remove());
        this.letterButtons.forEach(btn => btn.remove());
    }
}