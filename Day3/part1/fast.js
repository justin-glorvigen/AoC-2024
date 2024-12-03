var fs = require('fs');

let contents = fs.readFileSync('input.txt', { encoding: 'utf8' });
let regex = /mul\([0-9]*,[0-9]*\)/g;

let matches = [...contents.matchAll(regex)];

let sum = 0;

matches.forEach(d => {
    if (d[0].indexOf('mul(') == 0) {
        // Format: mul(%d,%d)

        let nums = d[0].split('mul(').join('').split(')').join('').split(',');
        let num1 = parseInt(nums[0]);
        let num2 = parseInt(nums[1]);

        console.log(num1, num2);

        sum += num1 * num2;
    }
})

console.log(sum);


