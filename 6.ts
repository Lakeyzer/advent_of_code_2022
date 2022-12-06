import string, { test_string, test_result_1, test_result_2 } from "./data/6";

const firstPacketMarker = (buffer, n) => {
  const stream = [];
  let result;
  [...buffer].forEach((char, i) => {
    stream.push(char);
    if(stream.length === n) {
      if(stream.some((v, i) => stream.indexOf(v) < i)) {
        stream.shift();
      } else {
        result = i+1;
      }
    }
  });
  return result;
};

console.log("Test 1:", firstPacketMarker(test_string, 4), firstPacketMarker(test_string, 4) === test_result_1);
console.log("Result:", firstPacketMarker(string, 4));

console.log("Test 2:", firstPacketMarker(test_string, 14), firstPacketMarker(test_string, 14) === test_result_2);
console.log("Result 2:", firstPacketMarker(string, 14));