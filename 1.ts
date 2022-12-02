import elfs from "./data/1";

const findHighest = () => {
  let highest = 0;
  for(const elf of elfs) {
    const total = elf.reduce((acc, curr) => { return acc + curr }, 0);
    highest = (total > highest) ? total : highest;
  };
  console.log("Highest:", highest);
};

const findHighest3 = () => {
  const totals: number[] = [];
  for(const elf of elfs) {
    const total = elf.reduce((acc, curr) => { return acc + curr }, 0);
    totals.push(total);
  };
  totals.sort((a,b) => b-a);
  const top = totals.slice(0, 3);
  console.log("Top 3 total:", top.reduce((acc, curr) => { return acc + curr }, 0))
};

findHighest();
findHighest3();