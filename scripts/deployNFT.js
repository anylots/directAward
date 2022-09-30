const Doodles_Artifact = require("../artifacts/contracts/erc721/doodles/Doodles.sol/Doodles.json")


// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
      "gets automatically created and destroyed every time. Use the Hardhat" +
      " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  // const [deployer] = await ethers.getSigners();

  let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  // Connect a wallet to localhost
  let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  let deployer = new ethers.Wallet(privateKey, customHttpProvider);

  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ERC721 = await ethers.getContractFactory("Doodles");
  const erc721 = await ERC721.deploy();
  await erc721.deployed();

  console.log("erc721 address:", erc721.address);

  let Doodles = new ethers.Contract(
    erc721.address,
    Doodles_Artifact.abi,
    deployer
);

await Doodles.setSaleState(true);
console.log("setSaleState complated");

await Doodles.mint(2, {
  value: ethers.utils.parseEther("1"), gasLimit: 9999999,
  gasPrice: 1000 * (10 ** 9)
});

console.log("mint complated");

  // We also save the contract's artifacts and address in the frontend directory
  // saveFrontendFiles(erc721);
}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/Doodles-address.json",
    JSON.stringify({ Doodles: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Doodles");

  fs.writeFileSync(
    contractsDir + "/Doodles.json",
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
