// Centralized state management - Single Source of Truth
// This object is shared across all scenes and UI components

export const globalVariables = {

    canvasWidth: 1194,
    canvasHeight: 834,

    currentScene: 0,  // Index der aktuellen Szene


    ui: {
        objectWidth: 100,
        objectHeight: 100,
        paddingLow: 4,
        paddingMid: 24,
        sideSpace: 100,
        fontSize: 20,
        borderWidth: 2
    },

    colors: {
        light: "#fff",
        dark: "#000",
        accent: "#afe0e6ff",
        success: "#afe0e6ff",
        error: "#f87171"
    }
};


export function getRandomDegree() {
    const randomRotation = (Math.random() * 2) - 1; // -1 to 1 degrees
    return randomRotation;
}
