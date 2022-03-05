var MintableNft = artifacts.require('MintableNft');

let myMintableContract = null;

contract('TestERC721Mintable', accounts => {

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

    describe('match erc721 spec', function () {
        before(async function () { 
            myMintableContract = await MintableNft.new(tokenName_one, tokenSymbol_one, {from: account_one});

            let success = await myMintableContract.mint(account_one, tokenId_one, {from: account_one});
            success = await myMintableContract.mint(account_two, tokenId_two, {from: account_one});
            success = await myMintableContract.mint(account_three, tokenId_three, {from: account_one});
            success = await myMintableContract.mint(account_four, tokenId_four, {from: account_one});

        })

        it('should return total supply', async function () { 
            let total = await myMintableContract.totalSupply.call({from: account_one});

            assert.equal(4, total);
        })

        it('should get token balance', async function () { 
            let accountTokenBal1 = await myMintableContract.balanceOf.call(account_one, {from: account_one});
            let accountTokenBal2 = await myMintableContract.balanceOf.call(account_two, {from: account_one});
            let accountTokenBal3 = await myMintableContract.balanceOf.call(account_three, {from: account_one});
            let accountTokenBal4 = await myMintableContract.balanceOf.call(account_four, {from: account_one});

            assert.equal(1, accountTokenBal1);
            assert.equal(1, accountTokenBal2);
            assert.equal(1, accountTokenBal3);
            assert.equal(1, accountTokenBal4);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI1 = await myMintableContract.getCompletetokenURI.call(tokenId_one, {from: account_one});
            let tokenURI2 = await myMintableContract.getCompletetokenURI.call(tokenId_two, {from: account_one});
            let tokenURI3 = await myMintableContract.getCompletetokenURI.call(tokenId_three, {from: account_one});
            let tokenURI4 = await myMintableContract.getCompletetokenURI.call(tokenId_four, {from: account_one});

            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/111", tokenURI1);
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/222", tokenURI2);
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/333", tokenURI3);
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/444", tokenURI4);
        })

        it('should transfer token from one owner to another', async function () { 
            //transfer token2 from wallet2 to wallet1
            await myMintableContract.safeTransferFrom(account_two, account_one, tokenId_two, {from: account_two});

            let newOwner = await myMintableContract.ownerOf.call(tokenId_two, {from: account_one});

            assert.equal(newOwner, account_one);
        })
    });

    describe('have ownership properties', function () {

        it('should fail when minting when address is not contract owner', async function () { 
            let success = null;
            try
            {
                success = await myMintableContract.mint(account_one, tokenId_one, {from: account_four});
            }
            catch(e)
            {
                success = false;
            }
            assert.equal(success, false);
        })

        it('should return contract owner', async function () { 
            let contractOwner = await myMintableContract.getContractOwner.call();
            assert.equal(contractOwner, account_one);
        })

    });

    describe('check admin functions like pausable and ownership transfer', function () {

        it('should pause by the contract owner', async function () { 
            let success = null;
            try
            {
                await myMintableContract.setPausedStatus(true, {from: account_one});
                success = await myMintableContract.balanceOf.call(account_one, {from: account_one});
            }
            catch(e)
            {
                success = false;
            }
            assert.equal(success, false);
        })

        it('contract owner should be able to transfer the contract ownership', async function () { 

            await myMintableContract.transferOwnership(account_two, {from: account_one});

            let contractOwner = await myMintableContract.getContractOwner.call();
            assert.equal(contractOwner, account_two);
        })
    });
})