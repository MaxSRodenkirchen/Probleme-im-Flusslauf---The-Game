// Centralized state management - Single Source of Truth
// This object is shared across all scenes and UI components

export const state = {
    // Game state
    currentScene: 'menu',
    score: 0,
    lives: 3,
    currentLevel: 1,

    // UI configuration
    ui: {
        objectWidth: 100,
        objectHeight: 100,
        paddingLow: 5
    }
};
