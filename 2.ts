import matches from "./data/2";

const translate = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors"
}

const results = {
  X: "lose",
  Y: "draw",
  Z: "win"
}

const point_table = {
  rock: {
    points: 1,
    beats: "scissors",
    loses: "paper"
  },
  paper: {
    points: 2,
    beats: "rock",
    loses: "scissors"
  },
  scissors: {
    points: 3,
    beats: "paper",
    loses: "rock"
  }
}

const outcome = (left: string, right: string) => {
  if(right === left) return 3;
  if(point_table[right].beats === left) return 6;
  return 0;
}

const getScore = () => {
  let total = 0;
  for(const match of matches) {
    const result: string[] = match.split(" ");
    const left = translate[result[0]];
    const right = translate[result[1]];

    let score =  point_table[right].points + outcome(left, right);
    
    total = total + score;
  }
  console.log("Score 1:", total);
}

const getScore2 = () => {
  let total = 0;
  for(const match of matches) {
    const result: string[] = match.split(" ");
    const left = translate[result[0]];
    const end = results[result[1]];

    let input;
    if(end === "draw") input = left;
    if(end === "win") input = Object.entries(point_table).filter(([_, item]) => left === item.beats).map(([key, _]) => key)[0];
    if(end === "lose") input = Object.entries(point_table).filter(([_, item]) => left === item.loses).map(([key, _]) => key)[0];

    let score =  point_table[input].points + outcome(left, input); 
    total = total + score;
  }
  console.log("Score 2:", total);
}

getScore();
getScore2();