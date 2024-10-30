import { Gamemode } from "../types/types";
import { GAMEMODES } from "../utils/constants";

const maxWordsPerParagraph = 15;

type Paragraphs = {
  paragraph?: string;
  paragraphTextTyped: string;
}

export const useParagraph = (text: string, textTyped: string, gamemode: Gamemode): Paragraphs => {
  if (gamemode === GAMEMODES.FREE){
    
    const paragraphs = divideByParagraph(textTyped);
    const textTypedWords = textTyped.split(' ');

    const currentParagraph = Math.ceil(textTypedWords.length/maxWordsPerParagraph);

    return {
      paragraphTextTyped: paragraphs[currentParagraph-1] ?? '',
    };
  }

  const paragraphs: string[] = divideByParagraph(text);
  const paragraphTextTyped: string[] = divideByParagraph(textTyped);

  const textTypedWords = textTyped.split(' ');

  let currentParagraph = Math.ceil(textTypedWords.length / maxWordsPerParagraph);  

  const currentParagraphWords = paragraphs[currentParagraph-1].split(' ');

  const textTypedLastWord = textTypedWords.slice(-1)[0];
  const paragraphLastWord = currentParagraphWords.slice(-1)[0];
  
  if (textTypedWords.length % maxWordsPerParagraph === 0 
      && textTypedLastWord.length === paragraphLastWord.length){
    currentParagraph++;
  }

	return {
    paragraph: paragraphs[currentParagraph-1] ?? '',
    paragraphTextTyped: paragraphTextTyped[currentParagraph-1] ?? '',
  };

}

function divideByParagraph (text: string): string[] {
  const words = text.split(' ');
  let paragraphs: string[] = [];

  let temp: string[] = [];

  words.forEach((elem, index) => {
    temp.push(elem);
    
    if ((index+1) % (maxWordsPerParagraph) === 0 && index !== 0){

      paragraphs.push(temp.join(' '));
      temp = [];
    }
    else if (index === words.length - 1) paragraphs.push(temp.join(' '));
  });

  return paragraphs;
}

export function removeParagraphSpaces(text: string) {
  const divided = divideByParagraph(text);
  return divided.join('');
}