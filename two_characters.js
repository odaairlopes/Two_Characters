'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'alternate' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function alternate(s) {
    // Write your code here
    let arr = {};
    for(let i = 0; i < s.length; i++){
        arr[s[i]] = 0;
    }
    let min = 0;
    for (let i in arr) {
        for (let j in arr) {
            if (i !== j) {
                let check1 = replaceString(arr, s, i, j);
                if (isValidAlternatives(check1, i, j)) {
                    console.log(check1);
                    if (check1.length > min)
                        min = check1.length;
                }
            }
        }
    }
    return min;
}
function replaceString(arr, s, a, b) {
    let str = s;
    let pattern = "/{1}/g";
    let re = new RegExp(pattern);
    for (let i in arr) {
        if (i !== a && i !== b) {
            str = str.replace(new RegExp(i, "g"), "")
        }
    }
    return str;
}

function isValidAlternatives(str, a, b) {
    let check = true;
    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0 && str[i] !== a) {
            return false;
        }
        if (i % 2 === 1 && str[i] !== b) {
            return false;
        }
    }
    return check;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const l = parseInt(readLine().trim(), 10);

    const s = readLine();

    const result = alternate(s);

    ws.write(result + '\n');

    ws.end();
}
