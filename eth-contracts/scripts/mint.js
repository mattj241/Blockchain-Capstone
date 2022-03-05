const getReadFileSync = () => {

    var dir = __dirname;
    // actual directory
    // depends if you start from app path or out
    let readFileSyncVar;
    try {
      readFileSyncVar = fs.readFileSync('secret_properties.yml', 'utf8');
    } catch (error) {
    console.log("error0: "+ error);
      readFileSyncVar = fs.readFileSync('secret_properties.yml', 'utf8');
    }
  
    return readFileSyncVar;
  }
  
  const getInfuraKey = () => {
    try {
      let fileContents = getReadFileSync();
      let data = yaml.load(fileContents);
      let infuraKey = data.infura_projectID;
      console.log(infuraKey);
      return infuraKey;
    } catch (error) {
        console.log("error1: "+ error);
      return "";
    }
  }//"fj4jll3k.....";
  //
  const getPrivateKey = () => {
    try {
      let fileContents = getReadFileSync();
      let data = yaml.load(fileContents);
      let mnemonic = data.privateKey;
      console.log(mnemonic);
      return mnemonic;
    } catch (error) {
        console.log("error2: "+ error);
      return "";
    }
  }

  const yaml = require('js-yaml');
  const fs = require('fs');
  const HDWalletProvider = require("truffle-hdwallet-provider");
  const web3 = require("web3");
  const PRIVKEY = getPrivateKey();
  const NODE_API_KEY = getInfuraKey();
  const isInfura = !!getInfuraKey();
  const INFURA_KEY = getInfuraKey();
  
//   const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS;
  
  const CONTRACT_ADDRESS = "0xf8187895137a78dbb52f0c04133a0f876a458ad4";
  const OWNER_ADDRESS = "0x1EAC401061445432635DB2Ff7dfCD6DAcFC2E63d";
  const NETWORK = "rinkeby";
  
  if (!PRIVKEY || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error(
      "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
    );
    return;
  } else {
    console.log("Correctly set variables")
  }
  
  const contract = require('../build/contracts/SolnSquareVerifier.json');
  const ABI = contract.abi;
  
  async function main() {
    console.log("start main");
    const provider = new HDWalletProvider(PRIVKEY, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
      provider
    )
  
    console.log("finished set provider ");
    if (CONTRACT_ADDRESS) {
      //check abi and address
      console.log("CONTRACT_ADDRESS :" + CONTRACT_ADDRESS);
      console.log("ABI :" + ABI);
      const mintable = new web3Instance.eth.Contract(ABI, CONTRACT_ADDRESS, { gasLimit: "4500000" })
      const zokratesProof = [
        require("../../zokrates/code/square/proof.json")
      ];
      console.log("zokratesProof :" + JSON.stringify(zokratesProof[0].proof));
  
      // minting with Zokrates
      for (let i = 0; i < zokratesProof.length ; i++) {
          try {
              const tokenId = 12345;
              const proofs = Object.values(zokratesProof[i].proof);
              const inputs = zokratesProof[i].inputs;
              console.log("OWNER_ADDRESS "+ OWNER_ADDRESS + "\n");
              console.log("i "+i+ "\n");
              console.log("proofs "+ proofs+ "\n");
              console.log("inputs "+ inputs+ "\n");
              let tx2 = await mintable.methods
              .mintNFT(OWNER_ADDRESS, "Zokrates Token", "ZKTKN", tokenId, ...proofs, inputs)
              .send({ from: OWNER_ADDRESS });
              
              console.log("Minted item. Transaction: " + tx2.transactionHash);
          } catch (e) {
              console.log("error into minted function " + e);
          }
      }
    // minting 10 tokens without Zokrates
    //   for(var countMint = 0; countMint< 10; countMint++){
    //     try {
    //       const tokenId = countMint;
    //       console.log("OWNER_ADDRESS " + OWNER_ADDRESS + "\n");
    //       let tx = await mintable.methods
    //         .mint(
    //           OWNER_ADDRESS, 
    //           tokenId)
    //         .send({ from: OWNER_ADDRESS });
    
    //       console.log("Minted item. Transaction: " + tx.transactionHash);
    //     } catch (e) {
    //       console.log("error into minted function " + e);
    //     }
    //   }
    }
  }
  main()