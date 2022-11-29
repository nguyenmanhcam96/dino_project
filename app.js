async function readDataDino() {
  try {
    const res = await fetch("dino.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  let dataDino;
  const humanData = getHumanDetail();
  dataDino = await readDataDino();
  const dinoArr = createDinoList(dataDino.Dinos, "metric");
  const errorMessage = document.getElementById("error-display");
  if (humanData.name === "") {
    errorMessage.innerHTML = "<p>Please enter a name</p>";
    return;
  } else if (humanData.height.inch < 1 || humanData.height.feet < 1) {
    errorMessage.innerHTML = "<p>Please enter a height more than 0</p>";
    return;
  } else if (humanData.weight < 1) {
    errorMessage.innerHTML = "<p>Please enter a weight more than 0</p>";
    return;
  } else {
    // Remove form from screen
    document.getElementById("dino-compare").style.display = "none";
    document.getElementById("try-again").style.display = "block";
    errorMessage.innerHTML = '';
    addDataToGrid(dinoArr, humanData);
  }
}

// Create Dino Constructor
class Dino {
  constructor(dinoDataSource, unit) {
    this.dinoWeight = dinoDataSource.weight;
    this.dinoHeight = dinoDataSource.height;
    this.dinoSpecies = dinoDataSource.species;
    this.dinoDiet = dinoDataSource.diet;
    this.dinoWhere = dinoDataSource.where;
    this.dinoWhen = dinoDataSource.when;
    this.dinoFact = dinoDataSource.fact;
  }
  // Create Dino Compare Method 1
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareDinoHeight(humanHeight) {
    const correctHeight = isNaN(humanHeight.inch)
      ? humanHeight.feet * 12
      : humanHeight.inch;
    const heightRatio = (this.dinoHeight / correctHeight).toFixed(1);
    let heightCompareResult;
    switch (true) {
      case heightRatio > 1:
        heightCompareResult = `${this.dinoSpecies} was ${(
          this.dinoHeight / correctHeight
        ).toFixed(1)} times taller than you!`;
        break;
      case heightRatio < 1:
        heightCompareResult = `You are ${(
          correctHeight / this.dinoHeight
        ).toFixed(1)} times taller than ${this.dinoSpecies}!`;
        break;
      default:
        heightCompareResult = `You are the same height as ${this.dinoSpecies}!`;
        break;
    }
    return heightCompareResult;
  }
  // Create Dino Compare Method 2
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareDinoWeight(humanWeight) {
    humanWeight = parseInt(humanWeight);
    const weightRatio = (this.dinoWeight / humanWeight).toFixed(1);
    let weightCompareResult;
    switch (true) {
      case weightRatio > 1:
        weightCompareResult = `${this.dinoSpecies} weighed ${(
          this.dinoWeight / humanWeight
        ).toFixed(1)} times more than you!`;
        break;
      case weightRatio < 1:
        weightCompareResult = `You weighed ${(
          humanWeight / this.dinoWeight
        ).toFixed(1)} times more than ${this.dinoSpecies}!`;
      default:
        weightCompareResult = `You are the same weight as ${this.dinoSpecies}!`;
        break;
    }
    return weightCompareResult;
  }
  // Create Dino Compare Method 3
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareDinoDiet(humanDiet) {
    const isAorAn = humanDiet === "Omnivore" ? "an" : "a";
    if (humanDiet === this.diet) {
      return `You are ${isAorAn} ${humanDiet} and ${this.dinoDiet} was too!`;
    } else {
      return `You are ${isAorAn} ${humanDiet}, but ${this.dinoSpecies} was a ${this.dinoDiet}.`;
    }
  }
}

// };

function createDinoList(dinoSource, unit) {
  const dinoList = [];
  if (dinoSource) {
    dinoSource.forEach((dino) => {
      // Create Dino Objects
      const dinoObject = new Dino(dino, unit);
      dinoList.push(dinoObject);
    });
  }
  dinoList.splice(4, 0, "Human Center Box");
  return dinoList;
}

class classHuman {
  constructor(name, height, weight, diet, unit) {
    this.name = name;
    this.height = {
      inch: height.inch,
      feet: height.feet,
    };
    this.weight = weight;
    this.diet = diet;
    this.unit = unit;
  }
}
function changeFeet() {
  document.getElementById("inches").value = "";
}
function changeInch() {
  document.getElementById("feet").value = "";
}

function getHumanDetail() {
  // Create Human Object
  let humanInput = {
    name: document.getElementById("name").value,
    height: {
      inch: document.getElementById("inches").value,
      feet: document.getElementById("feet").value,
    },
    weight: document.getElementById("weight").value,
    diet: document.getElementById("diet").value,
  };

  let humanData = new classHuman(
    humanInput.name,
    humanInput.height,
    humanInput.weight,
    humanInput.diet,
    humanInput.unit
  );

  humanData.height.inch = parseInt(humanData.height.inch);
  humanData.height.feet = parseInt(humanData.height.feet);
  return humanData;
}

function compareFunc() {
  const humanDetail = getHumanDetail();
  if (humanDetail) {
    document.getElementById("dino-compare").style.display = "none";
    document.getElementById("grid").style.display = "block";
  }
}

// Generate Tiles for each Dino in Array
function createDinoItem(dinoData, humanData) {
  let fact;
  let random;

  if (dinoData.dinoSpecies === "Pigeon") {
    random = 2;
  } else {
    random = Math.round(Math.random() * 5);
  }
  switch (random) {
    case 0:
      fact = `The ${dinoData.dinoSpecies} lived in ${dinoData.dinoWhere}.`;
      break;
    case 1:
      fact = `The ${dinoData.dinoSpecies} lived in the ${dinoData.dinoWhen} period.`;
      break;
    case 2:
      fact = dinoData.dinoFact;
      break;
    case 3:
      fact = dinoData.compareDinoWeight(humanData.weight);
      break;
    case 4:
      fact = dinoData.compareDinoHeight(humanData.height);
      break;
    case 5:
      fact = dinoData.compareDinoDiet(humanData.diet);
      break;
    default:
      fact = "";
  }
  let newDinoDiv = document.createElement("div");
  newDinoDiv.className = "grid-item";
  newDinoDiv.innerHTML = `<h3>${dinoData.dinoSpecies}
      </h3><img src="images/${dinoData.dinoSpecies}.png" alt="image of ${dinoData.species}"/><p>${fact}</p>`;
  return newDinoDiv;
}

function createHumanItem(human) {
  let newHumanDiv = document.createElement("div");
  newHumanDiv.className = "grid-item";
  newHumanDiv.innerHTML = `<h3>${human.name}</h3><img src="images/human.png" alt="image of human">`;
  return newHumanDiv;
}
// Add tiles to DOM
function addDataToGrid(dinoArr, humanDt) {
  const gridView = document.getElementById("grid");
  for (let index = 0; index < 9; index++) {
    if (index === 4) {
      gridView.appendChild(createHumanItem(humanDt));
    } else {
      gridView.appendChild(createDinoItem(dinoArr[index], humanDt));
    }
  }
}

// On button click, prepare and display infographic
function compareFunc() {
  
  main();
}

function tryAgain() {
  document.getElementById("grid").innerHTML = null;
  document.getElementById("dino-compare").style.display = "block";
  document.getElementById("try-again").style.display = "none";
}
