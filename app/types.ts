export interface Game {
  dopamine: number;
  happiness: number;
  upgrades: BoughtUpgrade[];
}

export interface BoughtUpgrade extends Upgrade {
  dopaminePerClick: number;
  dopaminePerSecond: number;
  amount: number;
}

export interface Upgrade {
  name: string;
  description: string;
  cost: number;
}
