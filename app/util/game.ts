export const happinessFromDopamine = (
  unprocessedDopamine: number,
  totalDopamine: number
): { dopamineConverted: number; happinessGained: number } => {
  if (unprocessedDopamine <= 0)
    return { dopamineConverted: 0, happinessGained: 0 };
  // Convert more dopamine as the input increases, but with diminishing returns
  // Ensure minimum of 1 when total dopamine < 100, and never exceed unprocessedDopamine
  const calculatedConversion = Math.min(
    10 * Math.log(1 + unprocessedDopamine / 100),
    100
  );
  const dopamineConverted =
    totalDopamine < 100
      ? Math.max(1, Math.min(calculatedConversion, unprocessedDopamine))
      : Math.min(calculatedConversion, unprocessedDopamine);

  // Happiness gained increases with unprocessed dopamine and is moderated by total dopamine
  // Base happiness from unprocessed amount with logarithmic scaling
  const baseHappiness = Math.log(1 + unprocessedDopamine / 50) * 20;

  // Apply total dopamine as a moderating factor
  const happinessGained = baseHappiness / Math.sqrt(1 + totalDopamine / 200);

  return { dopamineConverted, happinessGained };
};
