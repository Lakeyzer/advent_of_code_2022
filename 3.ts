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
                console.log(char, alphabet.indexOf(char) + 1);
                priority = priority + (alphabet.indexOf(char) + 1);
            }
        }
    }
    console.log("Total priority:", priority);
};

findPriority();