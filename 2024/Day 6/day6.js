//* https://adventofcode.com/2024/day/6 *//

import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const file = fs.readFileSync(filePath, 'utf-8');

//============================================================//
//===========================PART 1===========================//
//============================================================//

// I am well aware that this is what you would call "pure trash"
// It's 3am and I just want to save the chief and go to bed :)

let currentPosition = {
  row: 0,
  col: 0,
};
let rowObstructions = {};
let colObstructions = {};
const grid = file.split('\n').map((row, index) => {
  const t = row.split('');
  t.forEach((el, i) => {
    if (el === '^') {
      currentPosition = { row: index, col: i };
    }
    if (el === '#') {
      if (!rowObstructions[index]) {
        rowObstructions[index] = [i];
      } else {
        rowObstructions[index].push(i);
      }
      if (!colObstructions[i]) {
        colObstructions[i] = [index];
      } else {
        colObstructions[i].push(index);
      }
    }
  });
  return t;
});

let direction = 0;
let obstruction = true;
const visited = new Set();
visited.add(`${currentPosition.row},${currentPosition.col}`);

const moveUp = () => {
  if (colObstructions[currentPosition.col]) {
    const closestRowObstruction = colObstructions[currentPosition.col]
      .sort((a, b) => b - a)
      .filter((el) => el < currentPosition.row)[0];

    if (!isNaN(closestRowObstruction)) {
      for (let i = currentPosition.row - 1; i > closestRowObstruction; i--) {
        visited.add(`${i},${currentPosition.col}`);
      }
      currentPosition = { row: closestRowObstruction + 1, col: currentPosition.col };
      obstruction = !isNaN(closestRowObstruction) ? { row: closestRowObstruction, col: currentPosition.col } : null;
    } else {
      for (let i = currentPosition.row - 1; i >= 0; i--) {
        visited.add(`${i},${currentPosition.col}`);
      }
      obstruction = null;
    }
  } else {
    for (let i = currentPosition.row - 1; i >= 0; i--) {
      visited.add(`${i},${currentPosition.col}`);
    }
    obstruction = null;
  }
};

const moveRight = () => {
  if (rowObstructions[currentPosition.row]) {
    const closestColObstruction = rowObstructions[currentPosition.row]
      .sort((a, b) => a - b)
      .filter((el) => el > currentPosition.col)[0];
    if (!isNaN(closestColObstruction)) {
      for (let i = currentPosition.col + 1; i < closestColObstruction; i++) {
        visited.add(`${currentPosition.row},${i}`);
      }
      currentPosition = { row: currentPosition.row, col: closestColObstruction - 1 };
      obstruction = !isNaN(closestColObstruction) ? { row: currentPosition.row, col: closestColObstruction } : null;
    } else {
      for (let i = currentPosition.col + 1; i < grid[0].length; i++) {
        visited.add(`${currentPosition.row},${i}`);
      }
      obstruction = null;
    }
  } else {
    for (let i = currentPosition.col + 1; i < grid[0].length; i++) {
      visited.add(`${currentPosition.row},${i}`);
    }
    obstruction = null;
  }
};

const moveDown = () => {
  if (colObstructions[currentPosition.col]) {
    const closestRowObstruction = colObstructions[currentPosition.col]
      .sort((a, b) => a - b)
      .filter((el) => el > currentPosition.row)[0];

    if (!isNaN(closestRowObstruction)) {
      for (let i = currentPosition.row + 1; i < closestRowObstruction; i++) {
        visited.add(`${i},${currentPosition.col}`);
      }
      currentPosition = { row: closestRowObstruction - 1, col: currentPosition.col };
      obstruction = !isNaN(closestRowObstruction) ? { row: closestRowObstruction, col: currentPosition.col } : null;
    } else {
      for (let i = currentPosition.row + 1; i < grid.length; i++) {
        visited.add(`${i},${currentPosition.col}`);
      }
      obstruction = null;
    }
  } else {
    for (let i = currentPosition.row + 1; i < grid.length; i++) {
      visited.add(`${i},${currentPosition.col}`);
    }
    obstruction = null;
  }
};

const moveLeft = () => {
  if (rowObstructions[currentPosition.row]) {
    const closestColObstruction = rowObstructions[currentPosition.row]
      .sort((a, b) => b - a)
      .filter((el) => el < currentPosition.col)[0];
    if (!isNaN(closestColObstruction)) {
      for (let i = currentPosition.col - 1; i > closestColObstruction; i--) {
        visited.add(`${currentPosition.row},${i}`);
      }
      currentPosition = { row: currentPosition.row, col: closestColObstruction + 1 };
      obstruction = !isNaN(closestColObstruction) ? { row: currentPosition.row, col: closestColObstruction } : null;
    } else {
      for (let i = currentPosition.col - 1; i >= 0; i--) {
        visited.add(`${currentPosition.row},${i}`);
      }
      obstruction = null;
    }
  } else {
    for (let i = currentPosition.col - 1; i >= 0; i--) {
      visited.add(`${currentPosition.row},${i}`);
    }
    obstruction = null;
  }
};

while (obstruction) {
  // up
  if (direction === 0) {
    moveUp();
  }

  // right
  if (direction === 1) {
    moveRight();
  }

  // down
  if (direction === 2) {
    moveDown();
  }

  // left
  if (direction === 3) {
    moveLeft();
  }

  if (direction === 3) {
    direction = 0;
  } else {
    direction++;
  }
}

//***************************RESULT***************************//

console.log(visited.size); // 5131

//============================================================//
//===========================PART 2===========================//
//============================================================//

// For later
// You know you'll be in a loop if
// 1. You have visited the same position twice
// AND
// 2. You are in the same direction you were when having visited the same position
