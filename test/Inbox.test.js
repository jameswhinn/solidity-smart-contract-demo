// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // capatilisation as importing constructor function
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

const INITIAL_MSG = 'Hi there!';
let accounts;
let inbox;

beforeEach(async() => {
    // Get a list of all accs
    accounts = await web3.eth.getAccounts();
    // Use acc to deploy acc
    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: [INITIAL_MSG],
        })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {

    it('deploys a contract', () => {
        assert.ok(inbox.options.address); // checks inbox object has an expected property therefore is not null or empty
    });

    it('has a default messagge', async() => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MSG);
    });

    it('msg can be set', async() => {
        await inbox.methods.setMessage('oioi').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'oioi');
    });
});