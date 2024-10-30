

export const calcAccuracy = (finalCorrectCharacters: number, incorrectCharacters: number) => {
	
	if (finalCorrectCharacters == 0) return 0;
	
	return (finalCorrectCharacters * 100) /
    (finalCorrectCharacters + incorrectCharacters);
}