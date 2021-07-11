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



// ============================[Read file using argumens]=======================
// const readFile = require('fs').readFile;
// const yargs = require("yargs");


// const options = yargs
//   .usage("Usage: -f <file_path>")
//   .options("f", { alias: "file", describe: "give file", type: "string", demandOption: true })
//  .argv;

// const file = options.f;

// readFile(file, (err, dataBuffer) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log(dataBuffer.toString());
//     }
//   });
