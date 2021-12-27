// compile code will go here
const path = require('path');
// using path rather than ref dir directly ensures cross platform compatablity MacOS Windows Linux etc
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts); // Use this before the below line to see byte code and interface (ABI - appliction binary interface) to determine values below for eg :Inbox
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Inbox.sol'
].Inbox; // export to make available globally. 1 = number of contracts to compile