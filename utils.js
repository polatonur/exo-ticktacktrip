const addEqually = (words, number) => {
  const space = " ".repeat(number);
  let result = words.join(space);
  return result;
};

const addRandomly = (words, number) => {
  let addedWords = [];
  for (let i = 0; i < number; i++) {
    // select random word to add space after this word (❌ <== not last word)
    let randomWord = Math.floor(Math.random() * (words.length - 1));

    while (addedWords.indexOf(words[randomWord]) !== -1) {
      randomWord = Math.floor(Math.random() * (words.length - 1));
    }
    words[randomWord] += " ";
    addedWords.push(words[randomWord]);
  }
  return words;
};

const addSpace = (words) => {
  // calculate needed space to justify;
  let sum = 0; //👈 needed space between each word  n-1
  for (const word of words) {
    sum += word.length;
  }
  const neededSpace = 80 - sum;
  console.log("needed space ", neededSpace);
  console.log(" sum is ==>", sum);
  //step 1 => if needed space = words.length => add ane space between each word
  if (neededSpace === words.length - 1) {
    return addEqually(words, neededSpace);
  }
  //step 2 => if needed space < words.length => add space randomly;
  if (neededSpace < words.length - 1) {
    return words.join(" ");
  }
  // step 3 => if needed space > words.length firs do step 2 after do step 1
  if (neededSpace > words.length - 1) {
    console.log("step 3");
    const equalSpace = Math.floor(neededSpace / (words.length - 1));
    console.log("equal space is==>", equalSpace);
    const randomSpace = neededSpace - equalSpace * (words.length - 1);
    console.log("tandom space==>", randomSpace);
    words = addRandomly(words, randomSpace);
    return addEqually(words, equalSpace);
  }
};

const justify80 = (str) => {
  // remove spaces
  str = str.replace(/\n/g, "").trim();
  // separate words
  const words = str.split(" ");
  // track length of line
  let totalLength = 0;

  const lines = []; // 👈 justified line list
  let line = []; // 👈 word list of a line

  words.forEach((word, index) => {
    // first word of a line add if it fits
    if (line.length === 0) {
      line.push(word);
      totalLength += word.length;
    } else if (word.length + 1 + totalLength <= 80) {
      totalLength += word.length + 1;
      line.push(word);
    } else {
      lines.push(line);
      line = [word];
      totalLength = word.length;
    }

    // no remaining word  push line
    if (index === words.length - 1) {
      console.log("lastword is ===>", word);
      lines.push(line);
    }
  });
  for (const line of lines) {
    let count = 0;
    for (const word of line) {
      count += word.length;
    }
    count = 0;
  }
  return lines;
};

const separateParagraphes = (text) => {
  //before justifying  we will separate paragraphes
  //detect "/n" =>  if there are  two "\n" back to back replace with "⏎"
  // After delete all remaining "\n" and
  // use split and "⏎" separator to create  list of  paragraphes
  const paragrahps = text.split(/\n\n/);
  const result = [];
  for (const paragraph of paragrahps) {
    const justifiedParagraph = justify80(paragraph);
    result.push(justifiedParagraph);
  }
  return result;
};

module.exports = { separateParagraphes, addEqually, addRandomly, addSpace };
