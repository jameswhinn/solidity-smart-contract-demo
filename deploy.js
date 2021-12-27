// deploy code will go here
// https://rinkeby.infura.io/v3/97ff9a09557144a09b9898a84df18892
// project id 97ff9a09557144a09b9898a84df18892
// project secret 0de06967a75d4f2d9a94e7a1b9515abc

// section brother embrace winner race enlist leader keep song chimney thunder impact
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.RINKEBY_API
);
const web3 = new Web3(provider);

const deploy = async() => { // only reason to build function here is so we can use the async await syntax since it cannot be used outside a function
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying from account', accounts[0]);
    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] });
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};

deploy();

//deployed to 0xF94aC241012a3bA1d90aDd93bE42D875d34Be35a