const readDataDino = async function () {
    try {
        const res = await fetch("dino.json");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
var dataDino;
async function main() {
   
    dataDino = await readDataDino();
    console.log(dataDino);
    return dataDino;
    
}
main();
setTimeout(()=>{
    console.log(dataDino);
}, 1000)


// Create Dino Constructor
class Dino {
    constructor(name, weight, height) {
        this.dinoName = name;
        this.dinoWeight = weight;
        this.dinoHeight = height;
     }
    
     dinoInfo() {
        alert(this.dinoName);
        console.log(dataDino);
     }
}

class Human {
    constructor(weight, height) {
        this.humanWeight = weight;
        this.humanHeight = height;
    }

    
}

// Create Dino Objects
let dino = new Dino('TRex', 30, 20);
dino.dinoInfo();
// Create Human Object
let human
// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
