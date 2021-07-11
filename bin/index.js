#!/usr/bin/env node
"use strict";

const yargs = require("yargs");
const readline = require('readline');

const options = yargs
  .usage("Usage: -e <exp1> <exp2>")
  .options("e", { alias: "exp", describe: "Give number regex sperated by space to replace input string", type: "array", demandOption: false })
 .argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


if(!rl.input._readableState.needReadable){
  rl.on('line', (line) => {
    if ("exp" in options) {
      let inputText = `${line.trim()}`;
      options.exp.forEach(element => {
        let regexText = `${element.trim().replace("^'", '').replace("'$",'')}`;
        let regexStr =  new RegExp(regexText, 'g');
        inputText = inputText.replace(regexStr, '').replace(/(?:\r\n|\r|\n)/g,'')
        let regexSlaceStr =  new RegExp('(^{)(\\\\)+(")(.*)(}$)');
        while (true) {
          if (regexSlaceStr.test(inputText)){
            inputText = '"' + inputText + '"';
            inputText = JSON.parse(inputText)
          } else{
            break;
          }
        }   
      });
      //process.stdout.write(`${inputText.trim()}`)
      console.log(`${inputText.trim()}`)
    } else {
      process.stdout.write(`${line.trim()}`)
    }
  }).on('close', () => {
    process.exit(0);
  });
} else {
  rl.close()
  process.exit(0);
}









// --------------------------------------

// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', function() {
//   var chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write('data: ' + chunk);
//   }
// });

// process.stdin.on('end', function() {
//   process.stdout.write('end');
// });


// ------------------
// var readline = require('readline');
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });


// rl.on('line', function(line){
//     console.log(line);
// })
// --------------
//process.stdin.resume();
//process.stdin.setEncoding('utf8');
//process.stdin.on('data', function(data) {
//  process.stdout.write(data);
//});