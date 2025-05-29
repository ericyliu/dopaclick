import { useState, useEffect } from "react";
import type { Game as GameType, Upgrade } from "~/types";
import { saveGame, loadGame } from "~/services/save";
import { useHydrated } from "~/hooks/useHydrated";
import { happinessFromDopamine, getTolerance } from "~/util/game";
import { Upgrades } from "~/components/upgrades";
import { upgrades } from "~/util/upgrades";

export function Game() {
  const isHydrated = useHydrated();
  const [game, setGame] = useState<GameType>(() => {
    const savedGame = loadGame();
    return (
      savedGame || {
        currency: 0,
        unprocessedDopamine: 0,
        totalDopamine: 0,
        happiness: 0,
        upgrades: [],
      }
    );
  });

  const handleClick = () => {
    setGame((prev) => ({
      ...prev,
      unprocessedDopamine:
        prev.unprocessedDopamine +
        1 +
        prev.upgrades.reduce(
          (acc, upgrade) => acc + upgrade.dopaminePerClick,
          0
        ),
      totalDopamine:
        prev.totalDopamine +
        1 +
        prev.upgrades.reduce(
          (acc, upgrade) => acc + upgrade.dopaminePerClick,
          0
        ),
      currency:
        prev.currency +
        1 +
        prev.upgrades.reduce(
          (acc, upgrade) => acc + upgrade.currencyPerClick,
          0
        ),
    }));
  };

  const handleReset = () => {
    const initialState = {
      currency: 0,
      unprocessedDopamine: 0,
      totalDopamine: 0,
      happiness: 0,
      upgrades: [],
    };
    setGame(initialState);
    saveGame(initialState);
  };

  const handleBuyUpgrade = (upgrade: Upgrade) => {
    setGame((prev) => {
      if (prev.currency < upgrade.cost) return prev;

      return {
        ...prev,
        currency: prev.currency - upgrade.cost,
        upgrades: [
          ...prev.upgrades.filter((u) => u.name !== upgrade.name),
          {
            ...upgrade,
            amount:
              (prev.upgrades.find((u) => u.name === upgrade.name)?.amount ||
                0) + 1,
          },
        ],
      };
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGame((prev) => {
        const newUnprocessedDopamine =
          prev.unprocessedDopamine +
          prev.upgrades.reduce(
            (acc, upgrade) => acc + upgrade.dopaminePerSecond,
            0
          );
        const newTotalDopamine =
          prev.totalDopamine +
          prev.upgrades.reduce(
            (acc, upgrade) => acc + upgrade.dopaminePerSecond,
            0
          );
        const newCurrency =
          prev.currency +
          prev.upgrades.reduce(
            (acc, upgrade) => acc + upgrade.currencyPerSecond,
            0
          );
        const { dopamineConverted, happinessGained } = happinessFromDopamine(
          newUnprocessedDopamine,
          newTotalDopamine
        );
        return {
          ...prev,
          unprocessedDopamine: newUnprocessedDopamine - dopamineConverted,
          totalDopamine: newTotalDopamine,
          happiness: prev.happiness + happinessGained,
          currency: newCurrency,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Save game whenever state changes
  useEffect(() => {
    if (isHydrated) {
      saveGame(game);
    }
  }, [game, isHydrated]);

  // Initial values for server-side rendering
  const displayValues = {
    totalDopamine: 0,
    unprocessedDopamine: 0,
    happiness: 0,
    currency: 0,
    upgrades: [],
  };

  // Use saved values only after hydration
  const values = isHydrated ? game : displayValues;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative">
      <div className="absolute top-4 left-4 bottom-4">
        <Upgrades
          game={values}
          upgrades={upgrades}
          onBuyUpgrade={isHydrated ? handleBuyUpgrade : undefined}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="text-4xl font-bold">
          Total Dopamine: {Math.round(values.totalDopamine)}
        </div>
        <div className="text-2xl">
          Dopamine: {Math.round(values.unprocessedDopamine)}
          <br />
          Happiness: {Math.round(values.happiness)}
          <br />
          Currency: {Math.round(values.currency)}
          <br />
          Tolerance: {Math.round(getTolerance(values.totalDopamine))}
        </div>
        <button
          onClick={handleClick}
          className="text-9xl animate-pulse hover:scale-110 transition-transform cursor-pointer select-none bg-transparent border-none"
          aria-label="Click to generate dopamine"
        >
          🧠
        </button>
      </div>
      <button
        onClick={handleReset}
        className="fixed bottom-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        aria-label="Reset game"
      >
        Reset Game
      </button>
    </div>
  );
}
