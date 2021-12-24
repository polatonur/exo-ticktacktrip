const {
  addRandomly,
  addEqually,
  addSpace,
  justifyText,
  justify80,
} = require("../utils");

test("should add 2  space between words and return new strin ", () => {
  const list = ["My", "name", "is", "Onur"];

  const result = addEqually(list, 2);
  expect(result).toBe("My  name  is  Onur");
});

test("should add 1 space after two random word of given list ", () => {
  const list = ["My", "name", "is", "Onur"];
  const sumOfLength = (arr) => {
    let sum = 0;
    for (const word of arr) {
      sum += word.length;
    }
    return sum;
  };
  const initialSum = sumOfLength(list);
  const result = addRandomly(list, 2);
  const spaceAddedSum = sumOfLength(result);

  expect(initialSum).toBe(spaceAddedSum - 2);
});

test("should create a justified line with given list of words ", () => {
  const words =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat. hey".split(
      " "
    );
  const result = addSpace(words);
  expect(result.length).toBe(80);
});
test("should crate an array of line words", () => {
  const text = "Lorem ipsum";
  const text1 = " test     test";
  const result = justify80(text);
  const result1 = justify80(text1);
  expect(result1).toEqual([["test", "test"]]);
  expect(result).toEqual([["Lorem", "ipsum"]]);
});

test("should justify given text ", () => {
  const text = "       Lorem";
  const result = justifyText(text);
  console.log(result);
  expect(result).toEqual("Lorem\n");
});
