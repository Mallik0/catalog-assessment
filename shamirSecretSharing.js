
const fs = require('fs');

function decodeValue(value, base) {
    return parseInt(value, parseInt(base));
}

function lagrangeInterpolation(points) {
    return function(x) {
        let result = 0;
        for (let i = 0; i < points.length; i++) {
            let term = points[i][1];
            for (let j = 0; j < points.length; j++) {
                if (i !== j) {
                    term = term * (x - points[j][0]) / (points[i][0] - points[j][0]);
                }
            }
            result += term;
        }
        return result;
    };
}

function findWrongPoints(points, polynomial, threshold = 1e-6) {
    return points.filter(([x, y]) => Math.abs(polynomial(x) - y) > threshold);
}

function processTestCase(testCase) {
    const { n, k } = testCase.keys;
    const points = Object.entries(testCase)
        .filter(([key]) => key !== 'keys')
        .map(([x, { base, value }]) => [parseInt(x), decodeValue(value, base)]);

    const interpolationPoints = points.slice(0, k);
    const polynomial = lagrangeInterpolation(interpolationPoints);
    const secret = Math.round(polynomial(0));

    return { secret, points, polynomial };
}

// Read the input JSON files
const testCase1 = JSON.parse(fs.readFileSync('testcase1.json', 'utf8'));
const testCase2 = JSON.parse(fs.readFileSync('testcase2.json', 'utf8'));

// Process both test cases
const result1 = processTestCase(testCase1);
const result2 = processTestCase(testCase2);

// Print secrets for both test cases simultaneously
console.log(`Secret for Test Case 1: ${result1.secret}`);
console.log(`Secret for Test Case 2: ${result2.secret}`);

// Find and print wrong points in the second test case
const wrongPoints = findWrongPoints(result2.points, result2.polynomial);
if (wrongPoints.length > 0) {
    console.log("Wrong points in Test Case 2:");
    wrongPoints.forEach(point => console.log(`  x: ${point[0]}, y: ${point[1]}`));
} else {
    console.log("No wrong points found in Test Case 2");
}

// Write results to output file
const output = `Secret for Test Case 1: ${result1.secret}\nSecret for Test Case 2: ${result2.secret}\n`;
fs.writeFileSync('output.txt', output);

console.log("Results have been written to output.txt");