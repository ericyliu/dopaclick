export interface Game {
  currency: number;
  unprocessedDopamine: number;
  totalDopamine: number;
  happiness: number;
  upgrades: BoughtUpgrade[];
}

export interface BoughtUpgrade extends Upgrade {
  amount: number;
}

export interface Upgrade {
  name: string;
  description: string;
  cost: number;
  dopaminePerClick: number;
  dopaminePerSecond: number;
  currencyPerClick: number;
  currencyPerSecond: number;
  unlock: number; // Total dopamine required to unlock this upgrade
}
