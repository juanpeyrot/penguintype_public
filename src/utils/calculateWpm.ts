

export const calculateWPM = (correctWords: number, seconds: number): number => {
  return Number(((correctWords * 60) / seconds).toFixed(2));
};