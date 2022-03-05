pragma solidity ^0.5.0;

import "./ERC721Mintable.sol";
import "./SquareVerifier.sol";

contract SolnSquareVerifier is MintableNft {

    SquareVerifier public squareVerifier;

    uint256 globalIndexCounter;

    struct Solution
    {
        uint256 index;
        address verifierAddress;
    }
    

    mapping(bytes32 => Solution) mappingSolutions;
    // mapping(uint256 => bytes32) solutionIndex;
    bytes32[] solutionArray;

    constructor(address squareVerifierAddress,
                string memory tokenName, 
                string memory tokenSymbol) public
                MintableNft(tokenName, tokenSymbol)
    {
        globalIndexCounter = 0;
        squareVerifier = SquareVerifier(squareVerifierAddress);
    }

    function getGlobalIndexCounter() public returns (uint256){
        return globalIndexCounter;
    }

    function checkForUniqueSolution(bytes32 solutionKey) internal returns (bool) {
        bool uniqueSolution = true;
        uint256 i = 0;
        while (i < solutionArray.length && uniqueSolution == true)
        {
            if (solutionKey == solutionArray[i])
            {
                uniqueSolution = false;
            }
            i++;
        }
        return uniqueSolution;
    }

    event solutionAdded(uint256 index);
    function addSolution(address inputAddress, bytes32 solutionKey) internal
    {
        solutionArray.push(solutionKey);
        mappingSolutions[solutionKey] = Solution(globalIndexCounter, inputAddress);
        emit solutionAdded(globalIndexCounter);
        globalIndexCounter++;
    }

    function verifyProof(address inputAddress,
                         uint[2] memory a,
                         uint[2][2] memory b,
                         uint[2] memory c,
                         uint[2] memory input) 
                         internal
    {
        //FlightSurety reference
        bytes32 solutionKey = keccak256(abi.encodePacked(a, b, c, input));
        bool uniqueSolution = checkForUniqueSolution(solutionKey);
        //Check for unique solution before continuing
        require(uniqueSolution == true, "Not a unique solution");

        bool valid = squareVerifier.verifyTx(a, b, c, input);
        require(valid == true, "Not a valid solution");

        addSolution(inputAddress, solutionKey);
    }

    function mintNFT(address to,
                    string memory tokenName, 
                    string memory tokenSymbol,
                    uint256 tokenId,
                    uint[2] memory a,
                    uint[2][2] memory b,
                    uint[2] memory c,
                    uint[2] memory input)
                    public
    {
        verifyProof(to, a, b, c, input);
        super.mint(to, tokenId);
    }
}

  


























