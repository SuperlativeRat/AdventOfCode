//* https://adventofcode.com/2024/day/5 *//

import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const file = fs.readFileSync(filePath, 'utf-8');

//============================================================//
//===========================PART 1===========================//
//============================================================//

const [rules, updates] = file.split('\n\n').map((section) => section.split('\n'));

const rulesMap = rules.reduce((acc, rule) => {
  const [key, value] = rule.split('|').map(Number);
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(value);
  acc[key].sort((a, b) => a - b);

  return acc;
}, {});

// rulesMap;

const incorrectUpdates = [];
const result = updates
  .map((update) => update.split(',').map(Number))
  .map((update) => {
    for (let i = 0; i < update.length; i++) {
      for (let j = i + 1; j < update.length; j++) {
        if (!rulesMap[update[i]].includes(update[j])) {
          // For part 2
          incorrectUpdates.push(update);
          return 0;
        }
      }
    }
    return update[Math.floor(update.length / 2)];
  })
  .reduce((acc, curr) => acc + curr, 0);

//***************************RESULT***************************//

console.log(result); // 4578

//============================================================//
//===========================PART 2===========================//
//============================================================//

const sorted = incorrectUpdates.map((update) => update.sort((a, b) => a - b));

const resultPart2 = sorted
  .map((update) => {
    const proper = [update[0]];
    for (let i = 1; i < update.length; i++) {
      const slotBeforeIndex = proper.findIndex((el) => rulesMap[update[i]].includes(el));
      if (slotBeforeIndex === -1) {
        proper.push(update[i]);
      } else {
        proper.splice(slotBeforeIndex, 0, update[i]);
      }
    }
    return proper;
  })
  .map((update) => update[Math.floor(update.length / 2)])
  .reduce((acc, curr) => acc + curr, 0);

//***************************RESULT***************************//

console.log(resultPart2); // 6179
