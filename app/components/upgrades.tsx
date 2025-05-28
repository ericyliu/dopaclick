import type { Game, Upgrade } from "~/types";

interface UpgradesProps {
  game: Game;
  upgrades: Upgrade[];
  onBuyUpgrade?: (upgrade: Upgrade) => void;
}

export function Upgrades({ game, upgrades, onBuyUpgrade }: UpgradesProps) {
  const getUpgradeCount = (upgradeName: string): number => {
    return game.upgrades.find((u) => u.name === upgradeName)?.amount || 0;
  };

  const canAfford = (cost: number): boolean => {
    return game.currency >= cost;
  };

  const isUnlocked = (unlock: number): boolean => {
    return game.totalDopamine >= unlock;
  };

  // Filter out locked upgrades
  const unlockedUpgrades = upgrades.filter((upgrade) =>
    isUnlocked(upgrade.unlock)
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-center h-full">
      <h2 className="text-2xl font-bold mb-4">Upgrades</h2>
      <div className="grid gap-4 overflow-y-auto">
        {unlockedUpgrades.reverse().map((upgrade) => {
          const count = getUpgradeCount(upgrade.name);
          const affordable = canAfford(upgrade.cost);

          return (
            <div
              key={upgrade.name}
              className={`p-3 border rounded-md transition-colors
                ${affordable ? "bg-blue-50 hover:bg-blue-100" : "bg-red-50"}
              `}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{upgrade.name}</h3>
                  <p className="text-sm text-gray-600">{upgrade.description}</p>
                  <div className="text-xs text-gray-500 mt-1 flex flex-col gap-1">
                    {upgrade.dopaminePerClick > 0 && (
                      <span className="mr-2">
                        +{upgrade.dopaminePerClick}d per click
                      </span>
                    )}
                    {upgrade.dopaminePerSecond > 0 && (
                      <span>+{upgrade.dopaminePerSecond}d per second</span>
                    )}
                    {upgrade.currencyPerClick > 0 && (
                      <span>+${upgrade.currencyPerClick} per click</span>
                    )}
                    {upgrade.currencyPerSecond > 0 && (
                      <span>+${upgrade.currencyPerSecond} per second</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{count}</div>
                  <button
                    onClick={() => onBuyUpgrade?.(upgrade)}
                    disabled={!affordable}
                    className={`px-3 py-1 rounded text-sm font-medium
                      ${
                        affordable
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-red-300 cursor-not-allowed"
                      }
                    `}
                  >
                    Buy (${upgrade.cost})
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
