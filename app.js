async function readDataDino () {
    try {
        const res = await fetch("dino.json");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

async function main() {
    let dataDino
    dataDino = await readDataDino();
    console.log(dataDino);
    createDinoList(dataDino.Dinos, 'metric');
    
}

// Create Dino Constructor
class Dino {
    constructor(dinoDataSource, unit) {
        this.dinoName = dinoDataSource.name;
        this.dinoWeight = dinoDataSource.weight;
        this.dinoHeight = dinoDataSource.height;
        this.dinoSpecies = dinoDataSource.species;
        this.dinoDiet = dinoDataSource.diet;
        this.dinoWhere = dinoDataSource.where;
        this.dinoWhen = dinoDataSource.when;
        this.dinoFact = dinoDataSource.fact;
    }
    
}

function createDinoList(dinoSource, unit) {
    console.log(dinoSource);
  const dinoList = [];
  if(dinoSource) {
    dinoSource.forEach(dino => {
        const dinoObject = new Dino(dino, unit);
        dinoList.push(dinoObject);
    });
    console.log(dinoList);
  }
  dinoList.splice(4, 0, 'Human Center Box');
  return dinoList;
}
createDinoList();

class Human {
    constructor(weight, height) {
        this.humanWeight = weight;
        this.humanHeight = height;
    }

    
}

// Create Dino Objects
let dino = new Dino('TRex', 30, 20);

// Create Human Object
class classHuman {
    constructor(name, height, weight, diet, unit) {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.diet = diet;
        this.unit = unit;
    }
}
// Use IIFE to get human data from form
function getHumanDetail() {
    let humanData = {
        name: document.getElementById('name').value,
        height: {
            inch: document.getElementById('inches').value,
            feet:document.getElementById('feet').value
        },
        weight: document.getElementById('weight').value,
        diet: document.getElementById('diet').value
    }
    return humanData;
}

function compareFunc() {
        const humanDetail = getHumanDetail();
        console.log(humanDetail);
        if(humanDetail) {
            document.getElementById('dino-compare').style.display = 'none';
            document.getElementById('grid').style.display = 'block';
        }
}
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array
    function createDinoItem(dinoData, humanData) {
        
    }
// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic

main();