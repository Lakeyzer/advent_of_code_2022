import data, { matrix, test_matrix, test_moves, test_result_1, test_result_2 } from "./data/5";

const transpose = (table) => {
  table = table[0].map((col, c) => table.map((row, r) => table[r][c]));
  for(const i in table) {
    table[i] = table[i].filter(col => col !== null);
  }
  return table
}

const moveCrates = (moves, table: string[][]) => {
  table = transpose(table.reverse());

  for(const move of moves) {
    const count = move.match(/\d+/g)[0];
    const from = parseInt(move.match(/\d+/g)[1]) - 1;
    const to = parseInt(move.match(/\d+/g)[2]) - 1;

    for(let i = count; i >= 1; i--) {
      const from_row = table[from];
      const crate = from_row[from_row.length - 1];
      from_row.pop();
      table[to].push(crate)
    }
  }
  let result = "";
  for(const row of table) {
    result += row.pop();
  }
  return result;
};

const moveCratesKeepOrder = (moves, table: string[][]) => {
  table = transpose(table.reverse());

  for(const move of moves) {
    const count = move.match(/\d+/g)[0];
    const from = parseInt(move.match(/\d+/g)[1]) - 1;
    const from_row = table[from];
    const to = parseInt(move.match(/\d+/g)[2]) - 1;

    const crates = from_row.slice(Math.max(from_row.length - count, 0));
    table[from] = from_row.slice(0, -count);
    table[to] = table[to].concat(crates);
  }
  let result = "";
  for(const row of table) {
    result += row.pop();
  }
  return result;
};

console.log("Test 1:", moveCrates(test_moves, [...test_matrix]) === test_result_1);
console.log("Result:", moveCrates(data, [...matrix]));

console.log("Test 2:", moveCratesKeepOrder(test_moves, [...test_matrix]) === test_result_2);
console.log("Result 2:", moveCratesKeepOrder(data, matrix));