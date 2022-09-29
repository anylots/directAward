// import Doodles_Artifact from "../artifacts/contracts/erc721/doodles/Doodles.sol/Doodles.json";
const Doodles_Artifact = require("../artifacts/contracts/erc721/doodles/Doodles.sol/Doodles.json")
const doodles_address = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';

const overrides = {
    gasLimit: 9999999,
    gasPrice: 1000 * (10 ** 9)
}

async function main() {

    await tokenOfOwnerByIndex();
}

async function tokenOfOwnerByIndex() {
    let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let wallet = new ethers.Wallet(privateKey, customHttpProvider);

    //TODO
    let Doodles = new ethers.Contract(
        doodles_address,
        Doodles_Artifact.abi,
        wallet
    );

    let token = await ethers.getContractAt("Doodles", doodles_address);


    let tokenId1 = await token.tokenOfOwnerByIndex('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 0);
    console.log("tokenId1:" + tokenId1);

    let tokenId2 = await token.tokenOfOwnerByIndex('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 1);
    console.log("tokenId2:" + tokenId2);
}


async function mint() {
    let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let wallet = new ethers.Wallet(privateKey, customHttpProvider);

    let Doodles = new ethers.Contract(
        doodles_address,
        Doodles_Artifact.abi,
        wallet
    );

    await Doodles.mint(2, {
        value: ethers.utils.parseEther("1"), gasLimit: 9999999,
        gasPrice: 1000 * (10 ** 9)
    });

    console.log("mint complated");
}

async function setSaleState() {
    let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let wallet = new ethers.Wallet(privateKey, customHttpProvider);

    let Doodles = new ethers.Contract(
        doodles_address,
        Doodles_Artifact.abi,
        wallet
    );
    await Doodles.setSaleState(true, overrides);
    console.log("setSaleState complated");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
