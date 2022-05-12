export const generatorPassword = (numberCharacters) => {
  const arrayCharacters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "Z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "K",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "@",
    "-",
  ];

  let generateWord = "";
  for (let i = 0; i < numberCharacters; i++) {
    const indexObtain = parseInt(
      Math.round(Math.random() * (arrayCharacters.length - 1))
    );
    const letterRandom = arrayCharacters[indexObtain];
    generateWord = `${generateWord}${letterRandom}`;
  }

  return `${generateWord}`;
};
