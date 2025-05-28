import { happinessFromDopamine } from "./game";

const testDopamineConversion = (): void => {
  const testCases = [
    { unprocessed: 10, total: 50 },
    { unprocessed: 100, total: 50 },
    { unprocessed: 1000, total: 50 },
    { unprocessed: 10, total: 500 },
    { unprocessed: 100, total: 500 },
    { unprocessed: 1000, total: 500 },
    { unprocessed: 10, total: 5000 },
    { unprocessed: 100, total: 5000 },
    { unprocessed: 1000, total: 5000 },
  ];

  console.log("Dopamine Conversion Test Results:");
  console.log("------------------------------------------------------------");
  console.log("Unprocessed | Total    | Converted | Happiness | Notes");
  console.log("------------------------------------------------------------");

  testCases.forEach(({ unprocessed, total }) => {
    const { dopamineConverted, happinessGained } = happinessFromDopamine(
      unprocessed,
      total
    );

    let notes = "";
    if (total < 100) notes = "Early game boost active";
    else if (dopamineConverted === 100) notes = "Max conversion reached";
    else if (happinessGained === 1) notes = "Min happiness reached";

    console.log(
      `${unprocessed.toString().padEnd(10)} | ${total
        .toString()
        .padEnd(8)} | ${dopamineConverted
        .toFixed(2)
        .padEnd(9)} | ${happinessGained.toFixed(2).padEnd(9)} | ${notes}`
    );
  });
};

testDopamineConversion();
