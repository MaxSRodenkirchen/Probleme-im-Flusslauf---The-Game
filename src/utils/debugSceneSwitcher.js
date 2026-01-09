/**
 * Initializes a debug scene switcher that listens for number key presses (1-9)
 * to quickly switch between scenes.
 * 
 * Usage in main.js setup:
 * initDebugSceneSwitcher(p, sceneManager);
 * 
 * @param {p5} p - The p5 instance
 * @param {SceneManager} sceneManager - The SceneManager instance
 */
export function initDebugSceneSwitcher(p, sceneManager) {
    window.addEventListener('keydown', (e) => {
        // If 1-9 is pressed, switch to that scene index (0-8)
        if (e.key >= '1' && e.key <= '9') {
            const sceneIndex = parseInt(e.key) - 1;
            console.log(`Debug: Switching to scene index ${sceneIndex}`);
            sceneManager.switchScene(sceneIndex, p);
        }
    });
}
