type Quote = {
  title:     string;
  author:    string;
  lines:     string[];
  linecount: string;
}

export const fetchQuote = async() => {
  const url = 'https://poetrydb.org/random';
  const result: Promise<Quote[]> = await fetch(url).then(resp => resp.json());
  return result;
}