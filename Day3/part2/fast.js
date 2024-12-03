var fs = require('fs');

let contents = fs.readFileSync('input.txt', { encoding: 'utf8' });

let mul = 'mul(';
let dont = "don't()";

let doo = "do()";
let words = [mul, dont, doo];
let currentWord = '';

let sum = 0;
let multiplying = true;
for (let i = 0; i < contents.length; i++) {
    let c = contents[i];
    let matched = false;
    words.forEach(w => {
        // First check to see if the current character is in the correct position of the current word to match any keywords
        if (w.indexOf(currentWord + c) == 0) {
            // console.log('Matched:', currentWord + c);
            // If we have a match, add the character to the current word
            currentWord += c;
            matched = true;
        }

        // Check to see if we have a match to the current word
        if (currentWord == w) {
            console.log('Found word:', w);

            if (currentWord == mul) {
                if (multiplying) {
                    // Handle multiplication logic
                    // Need the rest of the characters
                    let j = i+1;
                    let processing = true;
                    let matchedPattern = true;
                    let onFirstNum = true;
                    let firstNum = '';
                    let secondNum = '';
                    while (processing) {
                        let numChar = contents[j];
                        console.log('numChar:', numChar);
                        if (numChar == ',') {
                            if (!onFirstNum) {
                                // If we hit a second comma, bail out, not a match
                                matchedPattern = false;
                                processing = false;
                            }
                            onFirstNum = false;
                        } else if (numChar != ')') {
                            if (isNaN(parseInt(numChar))) {
                                matchedPattern = false;
                                processing = false;
                            }
                            if (onFirstNum) {
                                firstNum += numChar;
                            } else {
                                secondNum += numChar;
                            }
                        } else {
                            processing = false;
                        }
                        j++;
                    }

                    i = j-1;

                    if (matchedPattern) {
                        let num1 = parseInt(firstNum.split('(').join('').split(')').join(''));
                        let num2 = parseInt(secondNum.split('(').join('').split(')').join(''));
                        if (!isNaN(num1) && !isNaN(num2)) {
                            console.log('Adding ', num1, ' * ', num2, 'to ', sum);
                            sum += num1 * num2;
                        }
                    }
                }
            } else if (currentWord == dont) {
                // Handle don't logic
                multiplying = false;
            } else if (currentWord == doo) {
                // Handle do logic
                multiplying = true;
            } else {
                console.log('wtf');
            }

            // Reset the current word because we processed it
            currentWord = '';
        }
    })

    if (!matched) {
        // If we didn't match any words, reset the current word
        currentWord = '';
    }

}

console.log(sum);
