
// Utility functions

export type Song = {
    name: string;
    artist: string;
};

/**
 * Sorts an array of songs alphabetically by song name.
 * @param songs The array of songs to sort.
 * @returns A new array of songs sorted alphabetically by name.
 */

export const sortSongsByName = (songs: Song[]): Song[] => {
    return songs.slice().sort((a, b) => a.name.localeCompare(b.name));
};
