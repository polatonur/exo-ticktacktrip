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

module.exports = { separateParagraphes };
