// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

const overrides = {
  gasLimit: 9999999
}

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
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  //deploye contract
  const DirectAward = await ethers.getContractFactory("DirectAward");
  const directAward = await DirectAward.deploy();
  await directAward.deployed();

  console.log("directAward address:", directAward.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(directAward);
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
