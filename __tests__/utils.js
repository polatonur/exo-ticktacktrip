const {
  addRandomly,
  addEqually,
  addSpace,
  justifyText,
  justify80,
  isEmailValid,
} = require("../utils");

test("should add 2 space between words and return new string ", () => {
  const list = ["My", "name", "is", "Onur"];

  const result = addEqually(list, 2);
  expect(result).toBe("My  name  is  Onur");
});

test("should add 1 space after two random word of given list and last length must be 2 more than first length", () => {
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
  const text = "       Lorem     \n\n   Lorem           ";
  const result = justifyText(text);
  console.log(result);
  expect(result).toEqual("Lorem\nLorem\n");
});

test("should retrun true because email format is true ", () => {
  const email = "x@x.com";
  const result = isEmailValid(email);
  expect(result).toBe(true);
  const email2 = "x@x.io";
  const result2 = isEmailValid(email2);
  expect(result2).toBe(true);
  const email3 = "xxx@xxx.com";
  const result3 = isEmailValid(email3);
  expect(result3).toBe(true);
  const email4 = "x@x.comx";
  const result4 = isEmailValid(email4);
  expect(result4).toBe(true);
});

test("should retrun false because email format is false ", () => {
  const email = "x.@x";
  const result = isEmailValid(email);
  expect(result).toBe(false);
  const email2 = "x.@.c";
  const result2 = isEmailValid(email2);
  expect(result2).toBe(false);
  const email3 = "@x.io";
  const result3 = isEmailValid(email3);
  expect(result3).toBe(false);
  const email4 = "x.@x";
  const result4 = isEmailValid(email4);
  expect(result4).toBe(false);
  const email5 = "x.@x.";
  const result5 = isEmailValid(email5);
  expect(result5).toBe(false);
});
