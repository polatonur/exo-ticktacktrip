// function to justify a text

//👇 add equal space between each word
const addEqually = (words, number) => {
  const space = " ".repeat(number);
  let result = words.join(space);
  return result;
};

// 👇 add space between randomly selected word to have best text format
const addRandomly = (words, number) => {
  let addedWords = []; //👈 this array will keep track the list of the words we added a space after
  for (let i = 0; i < number; i++) {
    // select random word to add space after  (❌ <== not last word, no space after last word of line)
    let randomWord = Math.floor(Math.random() * (words.length - 1));

    // if the word has aleady selected repeat function to select different word
    while (addedWords.indexOf(words[randomWord]) !== -1) {
      randomWord = Math.floor(Math.random() * (words.length - 1));
    }
    words[randomWord] += " ";
    addedWords.push(words[randomWord]);
  }
  return words;
};

const addSpace = (words) => {
  // calculate needed space to justify line;
  let sum = 0; //👈 needed space between each word  n-1
  for (const word of words) {
    sum += word.length;
  }
  const neededSpace = 80 - sum;

  //step 1 => if needed space = words.length => add ane space between each word
  if (neededSpace === words.length - 1) {
    // console.log(addEqually(words, 1));
    return addEqually(words, 1);
  }
  //step 2 => if needed space < words.length => add space randomly;
  if (neededSpace < words.length - 1) {
    // console.log(addRandomly(words).join(" "));
    return addRandomly(words).join(" ");
  }
  // step 3 => if needed space > words.length then first  step 2 after  step 1
  if (neededSpace > words.length - 1) {
    const equalSpace = Math.floor(neededSpace / (words.length - 1));
    const randomSpace = neededSpace - equalSpace * (words.length - 1);
    words = addRandomly(words, randomSpace);
    return addEqually(words, equalSpace);
  }
};

const justify80 = (str) => {
  // remove line brakers and replace with space
  str = str.replace(/\n/g, " ").trim();
  // separate words
  const words = str.split(/\s+/); // /\s+/ regex for one or more spaces
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
      lines.push(line);
    }
  });

  return lines;
};

const justifyText = (text) => {
  //before justifying  we will separate paragraphes
  //detect "/n" =>  if there are  two "\n" back to back replace with "⏎"
  // After delete all remaining "\n" and
  const paragrahps = text.split(/\n\n+/); // /\n\n+/ ===> regex two or more \n

  const separatedList = [];
  for (const paragraph of paragrahps) {
    const justifiedParagraph = justify80(paragraph);
    separatedList.push(justifiedParagraph);
  }

  // we have list of paragraphs and list of words to crate our justifiedParagraph
  let result = "";
  for (const list of separatedList) {
    let justifiedParagraph = "";
    for (let i = 0; i < list.length; i++) {
      if (i !== list.length - 1) {
        justifiedParagraph += addSpace(list[i]) + "\n";
      } else {
        justifiedParagraph += list[i].join(" ") + "\n";
      }
    }
    result += justifiedParagraph;
    justifiedParagraph = "";
  }
  return result;
};

const isEmailValid = (email) => {
  // we willl use basic validation  like x@x.x
  const indexOfDot = email.indexOf(".");
  const indexOfAt = email.indexOf("@");
  if (
    indexOfAt > 0 && // "@"is not first chararcter
    indexOfDot !== email.length - 1 && // "." is not last character
    indexOfAt !== -1 && // should contain "@" and "."
    indexOfDot !== -1 &&
    indexOfDot - indexOfAt > 1 // "@" comes before "."
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  justifyText,
  addEqually,
  addRandomly,
  addSpace,
  justify80,
  isEmailValid,
};
