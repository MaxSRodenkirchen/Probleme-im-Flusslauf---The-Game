// Centralized state management - Single Source of Truth
// This object is shared across all scenes and UI components

export const globalVariables = {

    canvasWidth: 1194,
    canvasHeight: 834,



    currentScene: 'menu',


    ui: {
        objectWidth: 100,
        objectHeight: 100,
        paddingLow: 4,
        paddingMid: 12
    },

    colors: {
        light: "#fff",
        dark: "#000",
        accent: "#afe0e6ff",
    }
};
