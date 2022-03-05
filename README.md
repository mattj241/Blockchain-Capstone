# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Versions of SW used
Truffle v5.4.15 - a development framework for Ethereum

Solidity - 0.5.0 (solc-js)

Node v10.18.0

Zokrates 0.5.0

# How to install and test Solidity code locally
CD to the root (Blockchain-Capstone), and run the following:
```
npm install
```
After installing the required node packages, you can locally run the test environment using your installed truffle development console
Start with:
```
truffle develop
```
Then run the entire test suite using:
```
truffle test
```

# How to configure and generate proofs via Zokrates (Windows)
CD back to root and run the following commands in succession:
```
$ docker pull zokrates/zokrates:0.5.0
```
```
$ winpty docker run -v //c/Users/londo/documents/github/blockchain-capstone/zokrates/code:/home/zokrates/code -it zokrates/zokrates:0.5.0
```
```
$ cd code/square
```
```
$ ~/zokrates compile -i square.code
```
```
$ ~/zokrates setup
```
```
$ ~/zokrates compute-witness -a 3 9
```
```
$ ~/zokrates generate-proof
```
```
$ ~/zokrates export-verifier
```

# Rinkeby Contract Addresses
   Deploying 'SquareVerifier'
   --------------------------
   > transaction hash:    0x735f2c532e6dff11e0ff00bb552bff46c6965c8bfef021573b4674e82f82e95a
   > contract address:    0xAc479AB5D3f2335d7351124302f915f026d692de

   Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0x9ef83620f6dc2862ce40a7634470d0a9d6f1ec3cec2b9afe4b1669661fd0f892
   > contract address:    0xF8187895137a78DbB52F0C04133A0f876A458aD4

# Contract Abi's
Please see ```~/eth-contracts/build/contracts``` for all ABI's 

# OpenSea MarketPlace Storefront link's.

https://testnets.opensea.io/collection/udacity-bcnd-capstone-matt

# Mint info (10 tokens):

OWNER_ADDRESS:  0x1EAC401061445432635DB2Ff7dfCD6DAcFC2E63d
SMART_CONTRACT: 0xf8187895137a78dbb52f0c04133a0f876a458ad4

Minted item. Transaction: 0xefc06bba1abf1cb7d1c93debd8c3f804f457897a21c3b93f10c0abaff65099d4

Minted item. Transaction: 0x3f1e18684e64c84d245ae4238afbafdd1375a969ea7f504df3f5f6c81392f9bd

Minted item. Transaction: 0x57c8434b10e20131eb5deb82d1efde50083e8d37418141585bb6c5933f073754

Minted item. Transaction: 0xdac03a28a6fb571cd94e56ba3c46863543ff80788aa9e7f74de6693a4ded2d4e

Minted item. Transaction: 0x6c9261054c83b7c799fef39a154a6c172e3cac96718a91f178e6061dc0441dab

Minted item. Transaction: 0x37bba047acbcd5df8440f3e2eec03d6c022a08c03e4a01c6cb0a565560e33f7f

Minted item. Transaction: 0x90307202aec7ef0026d45b79c55d839dd9976cb0f72afa32b378cc0abe6293d4

Minted item. Transaction: 0x686bc454890992f0bdbe24a76244e28935bb0d067f788cae245e8535eb4eac33

Minted item. Transaction: 0xcebd0998c42a608e836d84df7477cca0468561d0fcddf27eefdd6ab42988a67c

Minted item. Transaction: 0x39e00d09423edee5561aece2e3ec4ebb3e96dadbf9dbf820360a0e53e45a625c

# Seller of 5 NFTs, from the original 10 mint stack:
https://rinkeby.etherscan.io/address/0x1EAC401061445432635DB2Ff7dfCD6DAcFC2E63d#tokentxnsErc721
(5 most recent ERC721  transactions)
# Buyer of 5 NFTs:

https://rinkeby.etherscan.io/address/0x0932eBDc592EAC3f436626e8C5E01bec660c50f4#tokentxnsErc721
(only 5 ERC721 transactions)




# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
