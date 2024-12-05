//* https://adventofcode.com/2024/day/3 *//

import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const file = fs.readFileSync(filePath, 'utf-8');

//============================================================//
//===========================PART 1===========================//
//============================================================//

const input = file.split('\n').join('.');
const mulPattern = /mul\(\d+,\d+\)/g;
const numberPattern = /\d+/g;
const matches = input.match(mulPattern).join('').match(numberPattern).map(Number);

let sum = 0;
for (let i = 1; i < matches.length; i += 2) {
  sum += matches[i - 1] * matches[i];
}

//***************************RESULT***************************//
console.log(sum); // 188741603

//============================================================//
//===========================PART 2===========================//
//============================================================//

let sum2 = 0;
const firstOccurence = /^(?:.*?)(?=don\'t\(\)|do\(\))/;
const firstOccurenceMatch = input.match(firstOccurence)[0];
const numbers = firstOccurenceMatch.match(mulPattern).join('').match(numberPattern).map(Number);
for (let j = 1; j < numbers.length; j += 2) {
  sum2 += numbers[j - 1] * numbers[j];
}

const doDontMulPattern = /(?:don\'t\(\)|do\(\))(.*?)(?=don\'t\(\)|do\(\)|$)/gs;
const matches2 = input.match(doDontMulPattern);
for (let i = 0; i < matches2.length; i++) {
  if (matches2[i].startsWith('do()')) {
    const numbers = matches2[i].match(mulPattern).join('').match(numberPattern).map(Number);
    for (let j = 1; j < numbers.length; j += 2) {
      sum2 += numbers[j - 1] * numbers[j];
    }
  }
}

//***************************RESULT***************************//
console.log(sum2); // 67269798
