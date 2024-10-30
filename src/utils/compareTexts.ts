

export const compareTexts = (text: string, textTyped: string) => {

  const textToArray = text.split(' ');
  const textTypedToArray = textTyped.split(' ');

  let finalCorrectCharacters = 0;
  let finalIncorrectCharacters = 0;
  let finalMissingCharacters = 0;

  textToArray.forEach((word, i) => {

    
    const correctWord = Array.from(word);

    if (!textTypedToArray[i]) return finalMissingCharacters+= correctWord.length;

    const wordTyped = Array.from(textTypedToArray[i]);


    correctWord.forEach((letter, j) => {
      if (!wordTyped[j])
        finalMissingCharacters++;
      else if (letter === wordTyped[j])
        finalCorrectCharacters++;
      else
        finalIncorrectCharacters++;
    });

  })

  return { 
    finalCorrectCharacters, 
    finalIncorrectCharacters, 
    finalMissingCharacters,
  };

}