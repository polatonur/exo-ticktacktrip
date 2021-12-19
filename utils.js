const slice = (str) => {
  str.trim();
  let slicePoint = 81;
  while (str[slicePoint] !== " ") {
    slicePoint--;
  }
  const newLine = str.slice(0, slicePoint);
  return newLine.trim();
};

const split = (str) => {
  const lines = [];
  while (str.trim().length > 80) {
    const newLine = slice(str);
    console.log(newLine.length);
    lines.push(newLine);
    str = str.slice(newLine.length + 1);
  }
  lines.push(str.trim());
  return lines;
};

// add exra space after each word
const addOrdinarySpace = (str, number) => {
  const spaceToAdd = " ".repeat(number + 1);
  return str.split(" ").join(spaceToAdd);
};

const addRandomSpace = (str, numberOfSpaceToAdd, arrayOfSpaceIndexes) => {
  console.log(str);

  str = str.split("");

  while (numberOfSpaceToAdd !== 0) {
    // select random index in index list
    const randomIndex = Math.floor(Math.random() * arrayOfSpaceIndexes.length);

    // find index value
    const indexOfSpaceToAdd = arrayOfSpaceIndexes[randomIndex];
    if (!indexOfSpaceToAdd) {
      return str;
    }
    console.log("hey", randomIndex, indexOfSpaceToAdd);

    // add space after this index value
    str.splice(indexOfSpaceToAdd, 0, " ");
    arrayOfSpaceIndexes.splice(randomIndex, 1);
    for (let j = randomIndex; j < arrayOfSpaceIndexes.length; j++) {
      arrayOfSpaceIndexes[j]++;
    }

    numberOfSpaceToAdd--;
  }
  return str.join("");
};

const justifyLine = (str) => {
  str;
  if (str.length === 80) {
    return str;
  } else {
    const numberOfSpaceToAdd = 80 - str.length;
    console.log(numberOfSpaceToAdd);
    //first find space indexes
    let indexOfSpacesInTheString = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        indexOfSpacesInTheString.push(i);
      }
    }
    if (indexOfSpacesInTheString.length === 0) {
      return str;
    }
    console.log(indexOfSpacesInTheString.length);
    // then iterate space indexes and add some space and validate if length === 80 and break
    //case 1 ===> if numberOfSpaceToAdd === indexOfSpacesInTheString.lenght add 1 space to each sapace and return
    if (numberOfSpaceToAdd === indexOfSpacesInTheString.length) {
      console.log("ordinary");
      str = addOrdinarySpace(str, 1);
    }
    //cese 2 ===> if numberOfSpaceToAdd < indexOfSpacesInTheString.lenght add randomly
    if (numberOfSpaceToAdd < indexOfSpacesInTheString.length) {
      console.log("random");
      str = addRandomSpace(str, numberOfSpaceToAdd, indexOfSpacesInTheString);
    }
    //case 3 ===> if numberOfSpaceToAdd > indexOfSpacesInTheString.lenght add 1 space to each sapace and return and repeat second step add randomly

    if (numberOfSpaceToAdd > indexOfSpacesInTheString.length) {
      console.log("mix");
      const spaceToAddBetweenEachWord = Math.floor(
        numberOfSpaceToAdd / indexOfSpacesInTheString.lenght
      );
      str = addOrdinarySpace(str, spaceToAddBetweenEachWord);
      indexOfSpacesInTheString = indexOfSpacesInTheString.map(
        (item) => item + spaceToAddBetweenEachWord
      );
      str = addRandomSpace(str, numberOfSpaceToAdd, indexOfSpacesInTheString);
    }
  }
  return str;
};

const text =
  "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint.";

const initialLines = split(text);
initialLines.forEach((line) => {
  setTimeout(() => {
    justifyLine(line);
  }, 5000);
});
