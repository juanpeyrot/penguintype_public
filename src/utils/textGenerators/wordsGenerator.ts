import { fetchWords } from "../../fetch/fetchWords";
import { addNumbers } from "../addNumbers";
import { addPunctuation } from "../addPunctuation";

interface Props {
  punctuationEnabled: boolean; 
  numbersEnabled: boolean;
  wordsQuantity: number;
}

export const wordsGenerator = async({ 
  punctuationEnabled, 
  numbersEnabled, 
  wordsQuantity }: Props) => {

  let arrayText: string[] = await fetchWords(wordsQuantity);
  let newText = arrayText.join(' ');

  if (punctuationEnabled){
    newText = addPunctuation(newText);
  }

  if (numbersEnabled){
    newText = addNumbers(newText);
  }

  return newText;
}