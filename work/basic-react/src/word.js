const secretWord = "recat";

export function matchingWord(word) {
    if (word.toLowerCase() === secretWord) {
        return true;
    }
    return false;
};

export function compare(word) {
    let matches = 0;
    const letterCount = {};

    for (let letter of word.toLowerCase()) {
        letterCount[letter] = letterCount + 1 || 1;
    }

    for (let letter of secretWord.toLowerCase()) {
        if (letterCount[letter]) {
            letterCount[letter] -= 1;
            matches += 1;
        };
    };

    return matches;
};

export function isFiveWord(word) {
    if (word.length === 5) {
        return true;
    }
    return false;
};

export function output(word) {
    let result = '';
    if (!isFiveWord(word)) {
        result = `${word} was Not a Valid Word`;
    } else if (matchingWord(word)) {
        result = 'RECAT is the Secret Word!!';
    } else if (compare(word)) {
        result = `${word} had ${compare(word)} letters in Common`
    } else {
        result = 'Not Matching';
    }
    return result;
};