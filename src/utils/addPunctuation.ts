export const addPunctuation = (text: string): string => {
    let newText = '';
    const words = text.split(' ');
    const symbols = ['?', ',', '.', '-', '"', '!', ':', ';'];
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        newText += word;
        if (i < words.length - 1) {
            newText += ' ';

            if (i % 5 === 4 && i !== 0) {
                const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                newText = newText.trim();
                newText += `${randomSymbol} `;
            }
        }
    }
    
    return newText.trim();
};
