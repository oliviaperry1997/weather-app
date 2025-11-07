// favorites.js - Local storage management for favorite locations

const FAVORITES_KEY = 'weather-app-favorites';

// Get all favorites from localStorage
export function getFavorites() {
    try {
        const favorites = localStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Error reading favorites from localStorage:', error);
        return [];
    }
}

// Add a location to favorites
export function addFavorite(location) {
    try {
        const favorites = getFavorites();
        
        // Check if location already exists (case-insensitive)
        const locationExists = favorites.some(
            fav => fav.toLowerCase() === location.toLowerCase()
        );
        
        if (!locationExists && location.trim()) {
            favorites.push(location.trim());
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
            return true; // Successfully added
        }
        return false; // Already exists or invalid
    } catch (error) {
        console.error('Error adding favorite to localStorage:', error);
        return false;
    }
}

// Remove a location from favorites
export function removeFavorite(location) {
    try {
        const favorites = getFavorites();
        const filteredFavorites = favorites.filter(
            fav => fav.toLowerCase() !== location.toLowerCase()
        );
        
        if (filteredFavorites.length !== favorites.length) {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(filteredFavorites));
            return true; // Successfully removed
        }
        return false; // Not found
    } catch (error) {
        console.error('Error removing favorite from localStorage:', error);
        return false;
    }
}

// Check if a location is in favorites
export function isFavorite(location) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.toLowerCase() === location.toLowerCase());
}

// Clear all favorites
export function clearAllFavorites() {
    try {
        localStorage.removeItem(FAVORITES_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing favorites from localStorage:', error);
        return false;
    }
}