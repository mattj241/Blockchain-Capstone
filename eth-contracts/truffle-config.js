const HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "region laugh shrug grape expand van aware master tiny during thank loyal";

//For rinkeby
var privateKey = "182d1996d8faaebc19d24f167b81feecde982c8b34d7f6f740a6186b6c6d7f70";

module.exports = {
  networks: {
    contracts_build_directory: "./contracts/artifacts",
    develop: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*", // Match any network id
      provider: function() {
        // return new HDWalletProvider(mnemonic, "ws://127.0.0.1:9545/", 0 , 50);
        return new HDWalletProvider({
          mnemonic: mnemonic, 
          providerOrUrl: "ws://127.0.0.1:9545/",
          numberOfAddresses: 50,
          gasPrice: 100000000000,
          gas: 6721975 // gas limit
        })
      }
    },
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*", // Match any network id
      provider: function() {
        // return new HDWalletProvider(mnemonic, "ws://127.0.0.1:9545/", 0 , 50);
        return new HDWalletProvider({
          mnemonic: mnemonic, 
          providerOrUrl: "ws://127.0.0.1:9545/",
          numberOfAddresses: 50,
          gasPrice: 100000000000,
          gas: 6721975 // gas limit
        })
      }
    },
    GanacheGUI: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "5777",       // Any network (default: none)
      gasPrice: 100000000000,
      gas: 6721975 // gas limit
    },
    rinkeby: {
      provider: () => new HDWalletProvider(privateKey, `https://rinkeby.infura.io/v3/3a162730b0b243318c002b78c561e4f6`, 0),
        network_id: 4,       // rinkeby's id
        gas: 4500000,        // rinkeby has a lower block limit than mainnet
        gasPrice: 10000000000
    },
  },
  compilers: {
    solc: {
      version: "^0.5.0"
    }
  }
};