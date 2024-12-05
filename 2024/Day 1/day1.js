//* https://adventofcode.com/2024/day/1 *//

import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const file = fs.readFileSync(filePath, 'utf-8');

//============================================================//
//===========================PART 1===========================//
//============================================================//

const leftList = [];
const rightList = [];
for (const line of file.split('\n')) {
  if (line) {
    const [left, right] = line.split(/[ ]+/);
    leftList.push(parseInt(left));
    rightList.push(parseInt(right));
  }
}

const sortedLeftList = leftList.sort((a, b) => a - b);
const sortedRightList = rightList.sort((a, b) => a - b);

let distance = 0;
for (let i = 0; i < sortedLeftList.length; i++) {
  distance += Math.abs(sortedRightList[i] - sortedLeftList[i]);
}

//***************************RESULT***************************//
console.log(distance); // 2264607

//============================================================//
//===========================PART 2===========================//
//============================================================//
const rightMap = sortedRightList.reduce((acc, curr) => {
  if (!acc[curr]) {
    acc[curr] = 1;
  } else {
    acc[curr] = acc[curr] + 1;
  }
  return acc;
}, {});

const similarity = sortedLeftList.reduce((acc, value) => {
  if (rightMap[value]) {
    acc = acc + value * rightMap[value];
  }
  return acc;
}, 0);

//***************************RESULT***************************//
console.log(similarity); // 19457120
