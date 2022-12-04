import data, { test, test_result, test_result_2 } from "./data/4";

const contains = (left: string[], right: string[]) => {
 return parseInt(left[0]) <= parseInt(right[0]) && parseInt(left[1]) >= parseInt(right[1])
};

const isBetween = (a: string, range: string[]) => {
    return parseInt(a) >= parseInt(range[0]) && parseInt(a) <= parseInt(range[1]);
};

const findFullOverlap = (schedule: string[]) => {
    let count = 0;

    for(const sections of schedule) {
        const areas = sections.split(",");
        const left = areas[0].split("-");
        const right = areas[1].split("-");

        if(contains(left, right) || contains(right, left)) {
            count++;
        }
    };
    return count;
};

const findOverlap = (schedule: string[]) => {
    let count = 0;

    for(const sections of schedule) {
        const areas = sections.split(",");
        const left = areas[0].split("-");
        const right = areas[1].split("-");

        if(isBetween(left[0], right) || isBetween(left[1], right) || isBetween(right[0], left) || isBetween(right[1], left)) {
            count++;
        }
    };
    return count;
};

console.log("Test 1:", findFullOverlap(test) === test_result);
console.log("Result:", findFullOverlap(data));

console.log("Test 2:", findOverlap(test) === test_result_2);
console.log("Result:", findOverlap(data));