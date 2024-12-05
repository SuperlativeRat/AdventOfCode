//* https://adventofcode.com/2024/day/4 *//

import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const file = fs.readFileSync(filePath, 'utf-8');

//============================================================//
//===========================PART 1===========================//
//============================================================//

let count = 0;
const wordRegex = /XMAS/g;

const lines = file.split('\n');
lines.forEach((line, index) => {
  // Forwards
  let res = line.match(wordRegex);
  if (res) {
    count = count + res.length;
  }

  // Backwards
  let res2 = line.split('').reverse().join('').match(wordRegex);
  if (res2) {
    count = count + res2.length;
  }
});

const transposedLines = lines[0].split('').map((_, colIndex) => lines.map((row) => row[colIndex]).join(''));
transposedLines.forEach((line, index) => {
  // Downwards
  let res = line.match(wordRegex);
  if (res) {
    count = count + res.length;
  }

  // Upwards
  let res2 = line.split('').reverse().join('').match(wordRegex);
  if (res2) {
    count = count + res2.length;
  }
});

// Diagoal top left to bottom right
for (let startRow = 0; startRow < lines.length; startRow++) {
  let diagonal = '';
  let row = startRow;
  let col = 0;
  while (row < lines.length && col < lines[0].split('').length) {
    diagonal += lines[row][col];
    row++;
    col++;
  }

  let res = diagonal.match(wordRegex);
  if (res) {
    count = count + res.length;
  }

  let res2 = diagonal.split('').reverse().join('').match(wordRegex);
  if (res2) {
    count = count + res2.length;
  }
}

for (let startCol = 1; startCol < lines[0].split('').length; startCol++) {
  // Upper half
  let diagonal = '';
  let row = 0;
  let col = startCol;
  while (row < lines.length && col < lines[0].split('').length) {
    diagonal += lines[row][col];
    row++;
    col++;
  }

  let res = diagonal.match(wordRegex);
  if (res) {
    count = count + res.length;
  }

  let res2 = diagonal.split('').reverse().join('').match(wordRegex);
  if (res2) {
    count = count + res2.length;
  }
}

// Diagonal top right to bottom left
for (let startRow = 0; startRow < lines.length; startRow++) {
  // Upper half
  let diagonal = '';
  let row = startRow;
  let col = lines[0].split('').length - 1;
  while (row < lines.length && col >= 0) {
    diagonal += lines[row][col];
    row++;
    col--;
  }
  let res = diagonal.match(wordRegex);
  if (res) {
    count = count + res.length;
  }

  let res2 = diagonal.split('').reverse().join('').match(wordRegex);
  if (res2) {
    count = count + res2.length;
  }
}

// Lower half
for (let startCol = lines[0].split('').length - 2; startCol >= 0; startCol--) {
  let diagonal = '';
  let row = 0;
  let col = startCol;
  while (row < lines.length && col >= 0) {
    diagonal += lines[row][col];
    row++;
    col--;
  }
  let res = diagonal.match(wordRegex);
  if (res) {
    count = count + res.length;
  }

  let res2 = diagonal.split('').reverse().join('').match(wordRegex);
  if (res2) {
    count = count + res2.length;
  }
}

//***************************RESULT***************************//
console.log(count); // 2554

//============================================================//
//===========================PART 2===========================//
//============================================================//

const linesArray = file.split('\n').map((line) => line.split(''));

// Possible shapes
const shapes = [
  [
    ['M', null, 'M'],
    [null, 'A', null],
    ['S', null, 'S'],
  ],
  [
    ['S', null, 'M'],
    [null, 'A', null],
    ['S', null, 'M'],
  ],
  [
    ['S', null, 'S'],
    [null, 'A', null],
    ['M', null, 'M'],
  ],
  [
    ['M', null, 'S'],
    [null, 'A', null],
    ['M', null, 'S'],
  ],
];

// Check how many times any of the shapes appear in lines

let total = 0;
for (let i = 0; i < linesArray.length - 2; i++) {
  for (let j = 0; j < linesArray[i].length - 2; j++) {
    for (let k = 0; k < shapes.length; k++) {
      let shape = shapes[k];
      let match = true;
      for (let m = 0; m < shape.length; m++) {
        for (let n = 0; n < shape[m].length; n++) {
          if (shape[m][n] && shape[m][n] !== linesArray[i + m][j + n]) {
            match = false;
            break;
          }
        }
        if (!match) break;
      }
      if (match) total++;
    }
  }
}

//***************************RESULT***************************//
console.log(total); // 1916
