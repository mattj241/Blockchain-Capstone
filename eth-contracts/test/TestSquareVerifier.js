var verifier = artifacts.require('SquareVerifier');
var myProof = require('../../zokrates/code/square/proof.json');

let myVerifierContract = null;

contract('TestVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];

    before(async function () { 
        myVerifierContract = await verifier.new({from: account_one});
    })

    describe('Test TX verification', function () {

        it('Test verification with correct proof', async function () {
            let success = await myVerifierContract.verifyTx.call(
                myProof.proof.a,
                myProof.proof.b,
                myProof.proof.c,
                myProof.inputs,
                {from: account_one}
            );
            assert.equal(true, success);
        })

        it('Test verification with incorrect proof', async function () {
            let success = await myVerifierContract.verifyTx.call(
                myProof.proof.a,
                myProof.proof.b,
                myProof.proof.a,
                myProof.inputs,
                {from: account_one}
            );
            assert.equal(false, success);
        })
    });
});
