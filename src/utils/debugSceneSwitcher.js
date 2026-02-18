/**
 * Initializes a debug scene switcher with a sidebar for scene selection.
 * Only active in development mode.
 *
 * Usage in main.js setup:
 * initDebugSceneSwitcher(p, sceneManager);
 *
 * @param {p5} p - The p5 instance
 * @param {SceneManager} sceneManager - The SceneManager instance
 */
import { globalVariables } from "../globalVariables.js";

export function initDebugSceneSwitcher(p, sceneManager) {
  // List of scene filenames corresponding to indices
  const sceneFilenames = [
    "0_startScreen.js",
    "1_NameGen.js",
    "2_MaxMare-Intro.js",
    "3_Wasserkreislauf.js",
    "4_MeerFakten.js",
    "5_Plastikverschmutzung.js",
    "6_Plastikauswirkungen.js",
    "7_MaxMare-Mission.js",
    "8_Flusslauf.js",
    "9_BioReinigung.js",
    "10_UrsacheVerschmutzung.js",
    "11_Kläranlage.js",
    "12_BixBiber.js",
    "13_AufbauKläranlage.js",
    "14_MaterialSuchen.js",
    "15_WortZuFluss.js",
    "16_WasKannManNochTun.js",
    "17_MaxMareEnde.js",
    "99_demoEnd.js",
  ];

  // Create sidebar container
  const sidebar = document.createElement("div");
  sidebar.id = "debug-scene-sidebar";
  sidebar.style.position = "fixed";
  sidebar.style.top = "0";
  sidebar.style.left = "10px";
  sidebar.style.height = "100vh";
  sidebar.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  sidebar.style.color = "white";
  sidebar.style.padding = "10px";
  sidebar.style.borderRadius = "5px";
  sidebar.style.zIndex = "1000";
  sidebar.style.fontFamily = "Arial, sans-serif";
  sidebar.style.fontSize = "12pt";
  sidebar.style.overflowY = "auto";
  sidebar.style.textAlign = "left";

  // Add title
  const title = document.createElement("div");
  title.textContent = "Debug Scenes";
  title.style.fontWeight = "bold";
  title.style.marginBottom = "10px";
  sidebar.appendChild(title);

  // Array to hold buttons for updating highlights
  const buttons = [];

  // Function to update button highlights
  const updateHighlights = () => {
    const currentIndex = globalVariables.currentScene;
    buttons.forEach((button, index) => {
      if (index === currentIndex) {
        button.style.backgroundColor = "#666";
        button.style.fontWeight = "bold";
      } else {
        button.style.backgroundColor = "#444";
        button.style.fontWeight = "normal";
      }
    });
  };

  // Add scene buttons
  for (let i = 0; i < sceneManager.scenes.length; i++) {
    const filename = sceneFilenames[i] || `scene${i}`;
    const button = document.createElement("button");
    button.textContent = `${filename}`;
    button.style.display = "block";
    button.style.width = "100%";
    button.style.marginBottom = "9px";
    button.style.padding = "5px";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "3px";
    button.style.cursor = "pointer";
    button.style.textAlign = "left";
    button.style.fontSize = "10pt";
    button.addEventListener("click", () => {
      console.log(`Debug: Switching to scene index ${i} (${filename})`);
      sceneManager.switchScene(i, p);
      updateHighlights();
    });
    sidebar.appendChild(button);
    buttons.push(button);
  }

  // Initial highlight
  updateHighlights();

  // Add to body
  document.body.appendChild(sidebar);
}
