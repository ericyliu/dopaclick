import { useState, useEffect } from "react";
import type { Game as GameType } from "~/types";

export function Game() {
  const [game, setGame] = useState<GameType>({
    dopamine: 0,
    happiness: 0,
    upgrades: [],
  });

  const handleClick = () => {
    setGame((prev) => ({
      ...prev,
      dopamine:
        prev.dopamine +
        1 +
        prev.upgrades.reduce(
          (acc, upgrade) => acc + upgrade.dopaminePerClick,
          0
        ),
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGame((prev) => ({
        ...prev,
        dopamine:
          prev.dopamine +
          prev.upgrades.reduce(
            (acc, upgrade) => acc + upgrade.dopaminePerSecond,
            0
          ),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-bold">
        Dopamine: {game.dopamine.toFixed(1)}
      </div>
      <div className="text-2xl">Happiness: {game.happiness}</div>
      <button
        onClick={handleClick}
        className="text-9xl animate-pulse hover:scale-110 transition-transform cursor-pointer select-none bg-transparent border-none"
        aria-label="Click to generate dopamine"
      >
        🧠
      </button>
    </div>
  );
}
