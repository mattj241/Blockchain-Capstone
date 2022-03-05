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


# Contract Abi's
Please see ```~/eth-contracts/build/contracts``` for all ABI's 

# OpenSea MarketPlace Storefront link's.






# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
