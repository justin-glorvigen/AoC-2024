const { match } = require('assert');
var fs = require('fs');
const { start } = require('repl');

var input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

let lines = input.split('\n').filter(l => l != '');

let searchingFor = 'MAS';
let matchCount = 0;

for (let i = 0; i < lines.length; i++) {
    for (let x = 0; x < lines[i].length; x++) {
        console.log(`Checking ${lines[i][x]}`);
        // Check for a match going forwards and down first.
        if (checkDiagDownForward(lines, i, x, searchingFor)) {
            // console.log('Found DiagDownForward at line ' + i + ' and column ' + x);

            // If we found it diagonally down and forwards, we then need to move 2 characters forward in the line and then check down and backwards
            if (checkDiagDownBack(lines, i, x+2, searchingFor)) {
                console.log('Found DiagDownBack at line ' + i + ' and column ' + x);
                matchCount += 1;
            }
        }
    }
}

console.log(`Found ${matchCount} matches`);

function checkDiagDownBack(lines, i, x, searchingFor) {
    let diagBack = '' + lines[i][x];
    for (let d = 1; d < searchingFor.length; d++) {
        let lineIndex = i + d;
        let charIndex = x - d;
        if (lineIndex >= lines.length || charIndex < 0) {
            // We're out of bounds
            break;
        }
        diagBack += lines[lineIndex][charIndex];
        // console.log(`Checking ${lineIndex} and ${charIndex} found ${diagBack}`);
    }

    if (diagBack == searchingFor){
        return true;
    } else {
        let reversed = diagBack.split('').reverse().join('')
        console.log(`forward: ${diagBack} == ${searchingFor}`);
        console.log(`reversed: ${reversed} == ${searchingFor}`);
        return reversed == searchingFor;
    }
}

function checkDiagDownForward(lines, i, x, searchingFor) {
    let diagForward = '' + lines[i][x];
    for (let d = 1; d < searchingFor.length; d++) {
        let lineIndex = i + d;
        let charIndex = x + d;
        if (lineIndex >= lines.length || charIndex >= lines[lineIndex].length) {
            // We're out of bounds
            break;
        }
        diagForward += lines[lineIndex][charIndex];
        // console.log(`Checking ${lineIndex} and ${charIndex} found ${diagForward}`);
    }


    if (diagForward == searchingFor){
        return true;
    } else {
        let reversed = diagForward.split('').reverse().join('')
        console.log(`forward: ${diagForward} == ${searchingFor}`);
        console.log(`reversed: ${reversed} == ${searchingFor}`);
        return reversed == searchingFor;
    }
}
