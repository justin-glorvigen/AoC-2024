var fs = require('fs');

var input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

let lines = input.split('\n').filter(l => l != '');

let searchingFor = 'XMAS';
let matchCount = 0;

for (let i = 0; i < lines.length; i++) {
    // To start with, look for X in the current line. Then move right, left, up, down, and diagonally to see if we have any matches for the rest of the letters.
    let line = lines[i];
    for (let x = 0; x < line.length; x++) {
        if (line[x] == searchingFor[0]) {
            // We found our first letter, check around to see if we have the next ones

            // First, check to see if it's completely in line
            if (checkLtoRInline(line, x, searchingFor)) {
                console.log('Found LtoR at line ' + i + ' and column ' + x);
                matchCount += 1;
            }

            // Second, check to see if it's in line but reversed
            if (checkRtoLInline(line, x, searchingFor)) {
                console.log('Found RtoL at line ' + i + ' and column ' + x);
                matchCount += 1;
            }
            
            // Third, check to see if it's diagonally up and backwards
            if (checkDiagUpBack(lines, i, x, searchingFor)) {
                console.log('Found DiagUpBack at line ' + i + ' and column ' + x);
                matchCount += 1;
            }

            // Fourth, check to see if it's diagonally up and forwards
            if (checkDiagUpForward(lines, i, x, searchingFor)) {
                console.log('Found DiagUpForward at line ' + i + ' and column ' + x);
                matchCount += 1;
            }

            // Fifth, check to see if it's vertically above
            if (checkVertUp(lines, i, x, searchingFor)) {
                console.log('Found VertUp at line ' + i + ' and column ' + x);
                matchCount += 1;
            }

            // Sixth, check to see if it's diagonally down and backwards
            if (checkDiagDownBack(lines, i, x, searchingFor)) {
                console.log('Found DiagDownBack at line ' + i + ' and column ' + x);
                matchCount += 1;
            }

            // Seventh, check to see if it's diagonally down and forwards
            if (checkDiagDownForward(lines, i, x, searchingFor)) {
                console.log('Found DiagDownForward at line ' + i + ' and column ' + x);
                matchCount += 1;
            }

            // Eighth, check to see if it's vertically below
            if (checkVertDown(lines, i, x, searchingFor)) {
                console.log('Found VertDown at line ' + i + ' and column ' + x);
                matchCount += 1;
            }
        }
    }
}

console.log(`Found ${matchCount} matches`);

function checkLtoRInline(line, x, searchingFor) {
    return line.substring(x, x + searchingFor.length) == searchingFor;
}

function checkRtoLInline(line, x, searchingFor) {
    let startIndex = x - searchingFor.length + 1;


    let found = line.substring(startIndex, startIndex + searchingFor.length).split('').reverse().join('');

    // console.log(`Checking ${found} against ${searchingFor}`);

    return found == searchingFor;
}

function checkDiagUpBack(lines, i, x, searchingFor) {
    let diagBack = searchingFor[0];
    for (let d = 1; d < searchingFor.length; d++) {
        let lineIndex = i - d;
        let charIndex = x - d;
        if (lineIndex < 0 || charIndex < 0) {
            // We're out of bounds
            break;
        }
        diagBack += lines[lineIndex][charIndex];
    }

    return diagBack == searchingFor;
}

function checkDiagUpForward(lines, i, x, searchingFor) {
    let diagForward = searchingFor[0];
    for (let d = 1; d < searchingFor.length; d++) {
        let lineIndex = i - d;
        let charIndex = x + d;
        if (lineIndex < 0 || charIndex >= lines[lineIndex].length) {
            // We're out of bounds
            break;
        }
        diagForward += lines[lineIndex][charIndex];
    }

    return diagForward == searchingFor;
}

function checkVertUp(lines, i, x, searchingFor) {
    let vertUp = searchingFor[0];
    for (let d = 1; d < searchingFor.length; d++) {
        let lineIndex = i - d;
        if (lineIndex < 0) {
            // We're out of bounds
            break;
        }
        vertUp += lines[lineIndex][x];
    }

    return vertUp == searchingFor;
}

function checkDiagDownBack(lines, i, x, searchingFor) {
    let diagBack = searchingFor[0];
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

    return diagBack == searchingFor;
}

function checkDiagDownForward(lines, i, x, searchingFor) {
    let diagForward = searchingFor[0];
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

    // console.log(`Checking ${diagForward} against ${searchingFor}`);
    return diagForward == searchingFor;
}

function checkVertDown(lines, i, x, searchingFor) {
    let vertDown = searchingFor[0];
    for (let d = 1; d < searchingFor.length; d++) {
        let lineIndex = i + d;
        if (lineIndex >= lines.length) {
            // We're out of bounds
            break;
        }
        vertDown += lines[lineIndex][x];
    }

    return vertDown == searchingFor;
}
