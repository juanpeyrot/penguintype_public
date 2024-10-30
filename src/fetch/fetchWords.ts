export const fetchWords = async (results: number): Promise<string[]> => {
  try {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=6&number=${results}`);
    if (!response.ok) {
      throw new Error('Error getting random words');
    }
    const data: string[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
