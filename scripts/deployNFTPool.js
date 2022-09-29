// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const NFTPool_Artifact = require("../artifacts/contracts/NFTPool/NFTPool.sol/NFTPool.json")
const XNFT_Artifact = require("../artifacts/contracts/NFTPool/XNFT.sol/XNFT.json")
const nftPool_address = '0x68B1D87F95878fE05B998F19b66F4baba5De1aed';
const xdoodles_address = '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE';
const doodles_address = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';

const path = require("path");

async function main() {

  // await deploy();
  await initNFTPool();

}


async function deploy() {
  // ethers is available in the global scope
  let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  // Connect a wallet to localhost
  let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  let deployer = new ethers.Wallet(privateKey, customHttpProvider);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  //deploye xNft
  const contract = await ethers.getContractFactory("XNFT");
  const xNft = await contract.deploy("XDoodles", "XDoodles");
  await xNft.deployed();
  console.log("xNft address:", xNft.address);

  //deploye xNft
  const NFTPool = await ethers.getContractFactory("NFTPool");
  const nftPool = await NFTPool.deploy();
  await nftPool.deployed();
  console.log("nftPool address:", nftPool.address);

  // We also save the contract's artifacts and address in the frontend directory
  // saveFrontendFiles(directAward);
}

async function initNFTPool() {
  let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  // Connect a wallet to localhost
  let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  let wallet = new ethers.Wallet(privateKey, customHttpProvider);

  let NFTPool = new ethers.Contract(
    nftPool_address,
    NFTPool_Artifact.abi,
    wallet
  );

  await NFTPool.addNfts(doodles_address, xdoodles_address);
  console.log("addNfts complated");
}

function saveFrontendFiles(contract) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ DirectAward: contract.address }, undefined, 2)
  );

  const DirectAward_Artifact = artifacts.readArtifactSync("DirectAward");

  fs.writeFileSync(
    path.join(contractsDir, "DirectAward.json"),
    JSON.stringify(DirectAward_Artifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
