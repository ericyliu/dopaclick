export const happinessFromDopamine = (
  unprocessedDopamine: number,
  totalDopamine: number
): { dopamineConverted: number; happinessGained: number } => {
  if (unprocessedDopamine <= 0)
    return { dopamineConverted: 0, happinessGained: 0 };

  // Convert more dopamine as the input increases, but with diminishing returns
  // Ensure minimum of 1 when total dopamine < 100, and never exceed unprocessedDopamine
  const calculatedConversion = Math.max(
    1,
    Math.min(10 * Math.log(1 + unprocessedDopamine / 100), 100)
  );
  const dopamineConverted = Math.min(calculatedConversion, unprocessedDopamine);

  // Happiness gained increases with converted dopamine and is moderated by total dopamine
  // Base happiness from converted amount with logarithmic scaling
  const baseHappiness = Math.max(1, Math.log(1 + dopamineConverted)); // Normalized constant

  // Apply total dopamine as a moderating factor with a minimum of 1 for early game
  const happinessGained = Math.max(
    1,
    baseHappiness / getTolerance(totalDopamine)
  );

  return { dopamineConverted, happinessGained };
};

export const getTolerance = (totalDopamine: number): number => {
  return Math.sqrt(1 + totalDopamine / 200);
};
