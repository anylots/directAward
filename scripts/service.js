// import Doodles_Artifact from "../artifacts/contracts/erc721/doodles/Doodles.sol/Doodles.json";
const Doodles_Artifact = require("../artifacts/contracts/erc721/doodles/Doodles.sol/Doodles.json")


const doodles_address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

async function main() {

    await mint();
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

    await Doodles.mint(2,{value: ethers.utils.parseEther("1")});

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
    await Doodles.setSaleState(true);
    console.log("setSaleState complated");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
