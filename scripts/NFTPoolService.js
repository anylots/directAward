// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const NFTPool_Artifact = require("../artifacts/contracts/NFTPool/NFTPool.sol/NFTPool.json")
const nftPool_address = '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1';

const XNFT_Artifact = require("../artifacts/contracts/NFTPool/XNFT.sol/XNFT.json")
const xdoodles_address = '0x610178dA211FEF7D417bC0e6FeD39F05609AD788';

const Doodles_Artifact = require("../artifacts/contracts/erc721/doodles/Doodles.sol/Doodles.json")
const doodles_address = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

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
