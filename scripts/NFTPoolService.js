// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const NFTPool_Artifact = require("../artifacts/contracts/NFTPool/NFTPool.sol/NFTPool.json")
const nftPool_address = '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e';

const XNFT_Artifact = require("../artifacts/contracts/NFTPool/XNFT.sol/XNFT.json")
const xdoodles_address = '0x610178dA211FEF7D417bC0e6FeD39F05609AD788';

const Doodles_Artifact = require("../artifacts/contracts/erc721/doodles/Doodles.sol/Doodles.json")
const doodles_address = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';

const path = require("path");

async function main() {

    // await deploy();
    // await depositNFT();
    await withdrawNFT();
}


async function depositNFT() {
    let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let wallet = new ethers.Wallet(privateKey, customHttpProvider);

    let Doodles = new ethers.Contract(
        doodles_address,
        Doodles_Artifact.abi,
        wallet
    );
    //approve NFTPool transfer
    await Doodles.approve(nftPool_address, 0);
    console.log("approve complated");

    let NFTPool = new ethers.Contract(
        nftPool_address,
        NFTPool_Artifact.abi,
        wallet
    );
    //depositNFT
    await NFTPool.depositNFT(doodles_address, 0);
    console.log("depositNFT complated");
}


async function withdrawNFT() {
    let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let wallet = new ethers.Wallet(privateKey, customHttpProvider);

    let NFTPool = new ethers.Contract(
        nftPool_address,
        NFTPool_Artifact.abi,
        wallet
    );
    //withdrawNFT
    await NFTPool.withdrawNFT(doodles_address, 0);
    console.log("withdrawNFT complated");
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
