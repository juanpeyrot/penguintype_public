import { fetchQuote } from "../../fetch/fetchQuote"

export const quoteGenerator = async(wordsQuantity: number) => {

  const resp = await fetchQuote();
  let result: string[] = [];

  let lastIndex = parseInt(resp[0].linecount);

  while(result.length < wordsQuantity){
    lastIndex--;

    const words = resp[0].lines[lastIndex].split(' ');

    for (let i = words.length; i >= 0; i--) {
      if (result.length < wordsQuantity && words[i]){
        result.push(words[i]);
      }
    }
  }

  return result.join(' ');
}