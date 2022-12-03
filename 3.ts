import backpacks from "./data/3";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const findPriority = () => {
    let priority = 0;
    for(const backpack of backpacks) {
        const middle = Math.floor(backpack.length / 2);
        
        const comp_1 = [...backpack.substr(0, middle)];
        const comp_2 = [...backpack.substr(middle)];
        const unique_1 = [...new Set(comp_1)];
        const unique_2 = [...new Set(comp_2)];

        for(const char of unique_1) {
            if(unique_2.includes(char)) {
                priority += (alphabet.indexOf(char) + 1);
            }
        }
    }
    console.log("Total priority:", priority);
};

const findBadgesPriority = () => {
    const groupSize = 3;
    let priority = 0;
    for(let i = 0; i < backpacks.length; i += groupSize) {
        const group = backpacks.slice(i, i + groupSize);
        
        const backpack = [...group[0]];
        for(const char of [...new Set(backpack)]) {
            if(group[1].indexOf(char) > -1 && group[2].indexOf(char) > -1) {
                priority = priority + (alphabet.indexOf(char) + 1);
            }
        }
    }
    console.log("Total group priority", priority);
};

findPriority();
findBadgesPriority();