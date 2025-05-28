import type { Game } from "~/types";

const SAVE_KEY = "dopaclick_save";

export function saveGame(game: Game): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SAVE_KEY, JSON.stringify(game));
}

export function loadGame(): Game | null {
  if (typeof window === "undefined") return null;

  const savedGame = localStorage.getItem(SAVE_KEY);
  if (!savedGame) return null;

  try {
    return JSON.parse(savedGame) as Game;
  } catch (error) {
    console.error("Failed to load saved game:", error);
    return null;
  }
}
