// deploy code will go here
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