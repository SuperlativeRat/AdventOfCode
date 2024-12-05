//* https://adventofcode.com/2024/day/2 *//

import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const file = fs.readFileSync(filePath, 'utf-8');

//============================================================//
//===========================PART 1===========================//
//============================================================//

const reports = file
  .split('\n')
  .map((line) => {
    if (!line) {
      return;
    }
    return line.split(' ').map(Number);
  })
  .filter((report) => report !== undefined);

const validateReport = (report) => {
  let direction = 0; // 1 = asc, -1 = desc, 0 = error
  for (let i = 1; i < report.length; i++) {
    // Same value
    if (report[i] === report[i - 1]) {
      return false;
    }

    // Ascending
    if (report[i] > report[i - 1]) {
      // Direction switch
      if (direction === -1) {
        return false;
      }
      // Gap too big
      if (report[i] >= report[i - 1] + 4) {
        return false;
      }
      direction = 1;
    }

    // Descending
    if (report[i] < report[i - 1]) {
      // Direction switch
      if (direction === 1) {
        return false;
      }
      // Gap too big
      if (report[i] <= report[i - 1] - 4) {
        return false;
      }
      direction = -1;
    }
  }
  return true;
};

const validReports = reports.reduce((acc, report, index) => {
  if (validateReport(report)) {
    acc++;
  }
  return acc;
}, 0);

//***************************RESULT***************************//
console.log(validReports); // 591

//============================================================//
//===========================PART 2===========================//
//============================================================//

// THIS DID NOT WORK
// Too many edge cases to consider
// const validateReportWithTolerance = (report) => {
//   let direction = 0; // 1 = asc, -1 = desc, 0 = error
//   for (let i = 1; i < report.length; i++) {
//     // Same value
//     if (report[i] === report[i - 1]) {
//       const newArr = [...report.slice(0, i), ...report.slice(i + 1)];
//       return validateReport(newArr);
//     }

//     // Ascending
//     if (report[i] > report[i - 1]) {
//       // Direction switch
//       if (direction === -1) {
//         const newArr = [...report.slice(0, i), ...report.slice(i + 1)];
//         return validateReport(newArr);
//       }
//       // Gap too big
//       if (report[i] >= report[i - 1] + 4) {
//         const newArr = [...report.slice(0, i), ...report.slice(i + 1)];
//         return validateReport(newArr);
//       }
//       direction = 1;
//     }

//     // Descending
//     if (report[i] < report[i - 1]) {
//       // Direction switch
//       if (direction === 1) {
//         const newArr = [...report.slice(0, i), ...report.slice(i + 1)];
//         return validateReport(newArr);
//       }
//       // Gap too big
//       if (report[i] <= report[i - 1] - 4) {
//         const newArr = [...report.slice(0, i), ...report.slice(i + 1)];
//         return validateReport(newArr);
//       }
//       direction = -1;
//     }
//   }
//   return true;
// };

// Basically brute force
const validateReportWithToleranceAgain = (report) => {
  if (validateReport(report)) {
    return true;
  } else {
    for (let i = 0; i < report.length; i++) {
      const newArr = [...report.slice(0, i), ...report.slice(i + 1)];
      if (validateReport(newArr)) {
        return true;
      }
    }
  }
  return false;
};

const validReportsWithTolerance = reports.reduce((acc, report, index) => {
  if (validateReportWithToleranceAgain(report)) {
    acc = acc + 1;
  }
  return acc;
}, 0);

//***************************RESULT***************************//
console.log(validReportsWithTolerance); // 621
