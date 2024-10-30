export const addNumbers = (text: string) => {
    let newText = '';
    const words = text.split(' ');
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        newText += word;
        if (i < words.length - 1) {
            newText += ' ';

            if (i % 5 === 4 && i !== 0) {
                const randomNumber = Math.floor(Math.random() * 201);
                newText = newText.trim()
                newText += ` ${randomNumber} `;
            }
        }
        
    }
    
    return newText.trim();
}
