import data, { test_data, test_result_1, test_result_2 } from "./data/7";

const total_available = 70000000;
const total_needed = 30000000;

const cd = (cmd, dirs) => {
  if(cmd.match(/\.\./)) {
    dirs.pop();
  } else {
    dirs.push(cmd.split(" cd ")[1]);
  }
  return dirs;
};

const getDirSize = (dir, list) => {
  let size = 0;
  for(const value of Object.values(dir) as number[]|object[]) {
    if(typeof value === "object") {
      size += getDirSize(value, list);
    } else {
      size += value;
    }
  }
  list.push(size);
  return size;
};

const getFileStructure = (lines) => {
  let dirs = [];
  let last_cmd = "";
  let cur_dir = [];
  const files = {};
  for(const line of lines) {
    // $ cd
    if(line.match(/^\$ cd/)) {
      dirs = cd(line, dirs);
      let temp = files;
      for(const d of dirs) {
        let dir = temp[d];
        if(!dir) { temp[d] = {}; }
        temp = temp[d];
      }
      cur_dir = dirs;
    }
    
    // $ ls
    if(last_cmd.match(/^\$ ls/)) {
      let dir = files;
      for(const d of cur_dir) {
        dir = dir[d];
      }
      if(!line.match(/^dir|\$/)) {
        const file = line.split(" ");
        if(!dir[file[1]]) dir[file[1]] = parseInt(file[0]);
      }
    }
    last_cmd = (line.match(/^\$/)) ? line : last_cmd;
  }
  return files;
}

const findTotal = (lines: string[]) => {
  let totals: number[] = [];
  const files = getFileStructure(lines);
  
  for(const dir of Object.values(files) as any[]) {
    dir.total = getDirSize(dir, totals);
  }
  totals = totals.filter(item => item <= 100000);

  return totals.reduce((a, b) => a + b, 0);;
};

const deleteDir = (lines: string[]) => {
  const files = getFileStructure(lines);
  const used = getDirSize(files["/"], []);
  const available = total_available - used;
  let options = [];
  getDirSize(files["/"], options);
  options = options.filter(item => item >= (total_needed - available));
  return options.reduce((a, b) => Math.min(a, b));
}

console.log("Test 1:", findTotal(test_data), findTotal(test_data) === test_result_1);
console.log("Result:", findTotal(data));

console.log("Test 2:", deleteDir(test_data), deleteDir(test_data) === test_result_2);
console.log("Result 2:", deleteDir(data));