var verifier = artifacts.require('SquareVerifier');
var soInVerifier = artifacts.require('SolnSquareVerifier');
var myProof = require('../../zokrates/code/square/proof.json');

let myVerifierContract = null;
let mySolnVerifierContract = null;

contract('TestSolnVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];

    const tokenId_one = 111;
    const tokenId_two = 222;
    const tokenId_three = 333;
    const tokenId_four = 444;

    const tokenName_one = "Bored Ape Yacht Club";
    // const tokenName_two = "CryptoKitties";
    // const tokenName_three = "LittleDudes";
    // const tokenName_four = "Four Eyes";

    const tokenSymbol_one = "BAYC";
    // const tokenSymbol_two = "CKS";
    // const tokenSymbol_three = "LDS";
    // const tokenSymbol_four = "FourI";

    describe('Test if you can Mint an NFT while being verified', function () {

        beforeEach(async function () { 
            myVerifierContract = await verifier.new({from: account_one});
            mySolnVerifierContract = await soInVerifier.new(myVerifierContract.address, tokenName_one, tokenSymbol_one, {from: account_two});
        })

        it('Test if a new solution can be added for contract', async function () {
            await mySolnVerifierContract.mintNFT(
                account_two,
                tokenName_one,
                tokenSymbol_one,
                tokenId_one,
                myProof.proof.a,
                myProof.proof.b,
                myProof.proof.c,
                myProof.inputs,
                {from: account_two}
            );
            
            let newOwner = await mySolnVerifierContract.ownerOf(tokenId_one, {from: account_two});
            assert.equal(newOwner, account_two);
        })

        it('Test if an incorrect solution can be added for contract', async function () {
            let success = true;
            try{
                await mySolnVerifierContract.mintNFT(
                    account_three,
                    tokenName_one,
                    tokenSymbol_one,
                    tokenId_one,
                    myProof.proof.a,
                    myProof.proof.b,
                    myProof.proof.a,
                    myProof.inputs,
                    {from: account_three}
                );
            }
            catch(e){
                success = false;
            }
            
            assert.equal(success, false);
        })

        it('Test if a stale solution can be added for contract', async function () {
            let success = true;
            try{
                await mySolnVerifierContract.mintNFT(
                    account_one,
                    tokenName_one,
                    tokenSymbol_one,
                    tokenId_one,
                    myProof.proof.a,
                    myProof.proof.b,
                    myProof.proof.c,
                    myProof.inputs,
                    {from: account_oneo}
                );
            }
            catch(e){
                success = false;
            }
            
            assert.equal(success, false);
        })

    })
});


// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
