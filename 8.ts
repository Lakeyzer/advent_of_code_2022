import data, { test_data, test_result_1, test_result_2 } from "./data/8";

const countTrees = (grid) => {
  let visible = 0;
  grid.forEach((row, r) => {
    if(r === 0 || r === grid.length -1 ) { 
      visible += row.length;
    }
    else {
      [...row].forEach((tree, t) => {
        const vertical = grid.map(line => line[t]);
        if(t === 0 || t === grid.length -1) {
          visible++;
        } 
        else {
          const look_left = [...row.slice(0, t)];
          const look_right = [...row.slice(t+1, row.length)];
          const look_up = [...vertical.slice(0, r)];
          const look_down = [...vertical.slice(r+1, vertical.length)];

          if(
            look_left.every(height => tree > height) ||
            look_right.every(height => tree > height) ||
            look_up.every(height => tree > height) ||
            look_down.every(height => tree > height)
          ) {
            visible++;
          }
        }
      });
    }
  });
  return visible;
};

const scenicScore = (grid) => {
  let highest = 0;
  grid.forEach((row, r) => {
    if(r === 0 || r === row.length - 1) { return;  }
    [...row].forEach((tree, t) => {
      if(t === 0 || t === row.length - 1) { return; }
      const vertical = grid.map(line => line[t]);
      const directions = {
        left: [...row.slice(0, t)].reverse(),
        right: [...row.slice(t+1, row.length)],
        up: [...vertical.slice(0, r)].reverse(),
        down: [...vertical.slice(r+1, vertical.length)]
      }
      
      const scores = [];
      for(const direction of Object.values(directions)) {
        let score = 0;
        for(const height of direction) {
          score++;
          if(tree <= height) break;
        }
        scores.push(score);
      }
      const total = scores.reduce((a, b) => a * b);
      if(total > highest) highest = total;
    });
  });
  return highest;
}

console.log("Test 1:", countTrees(test_data), countTrees(test_data) === test_result_1);
console.log("Result 1:", countTrees(data));

console.log("Test 2:", scenicScore(test_data), scenicScore(test_data) === test_result_2);
console.log("Result 2:", scenicScore(data));