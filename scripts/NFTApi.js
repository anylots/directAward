const NFT_Artifact = require("./erc721abi.json");
// import Doodles_Artifact from "../artifacts/contracts/erc721/doodles/Doodles.sol/Doodles.json";
const Doodles_Artifact = require("../artifacts/contracts/erc721/doodles/Doodles.sol/Doodles.json")
const nft_address = '0x0f869D9855B9bC52012C538424A04c434fD3c393';

const overrides = {
    gasLimit: 9999999,
    gasPrice: 1000 * (10 ** 9)
}

async function main() {

    await transferFrom();
}

async function tokenOfOwnerByIndex() {
    let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let wallet = new ethers.Wallet(privateKey, customHttpProvider);

    //TODO
    let NFT = new ethers.Contract(
        nft_address,
        NFT_Artifact.abi,
        wallet
    );

    let token = await ethers.getContractAt("Doodles", nft_address);


    let tokenId1 = await token.tokenOfOwnerByIndex('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 0);
    console.log("tokenId1:" + tokenId1);

    let tokenId2 = await token.tokenOfOwnerByIndex('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 1);
    console.log("tokenId2:" + tokenId2);
}


async function mint() {
    // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    let privateKey = "0x315bdde188acc16b06b41b3ccb06da359c2bbb5a60072b61aa13f907aaaeb782";
    
    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    //goerli testnet
    const provider = new ethers.providers.JsonRpcProvider(
    'https://goerli.infura.io/v3/8890b0405f0e4de4b2e24a90767e9114'
    );

    let wallet = new ethers.Wallet(privateKey, provider);

    let NFT = new ethers.Contract(
        nft_address,
        NFT_Artifact.abi,
        wallet
    );

    //传入mint个数和支付金额，进行NFT的mint
    await NFT.mint(2);

    console.log("mint complated");
}


async function transferFrom() {
    // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    let privateKey = "0x315bdde188acc16b06b41b3ccb06da359c2bbb5a60072b61aa13f907aaaeb782";
    
    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    //goerli testnet
    const provider = new ethers.providers.JsonRpcProvider(
    'https://goerli.infura.io/v3/8890b0405f0e4de4b2e24a90767e9114'
    );

    let wallet = new ethers.Wallet(privateKey, provider);

    let NFT = new ethers.Contract(
        nft_address,
        NFT_Artifact.abi,
        wallet
    );

    //传入mint个数和支付金额，进行NFT的mint
    await NFT.transferFrom('0x193E70F5E72e838AdC6ee2A926C02979639D243d','0xd21af0508e13fc62dba4d1539a5dd8d89cf8df14','1');

    console.log("transferFrom complated");
}

async function setSaleState() {
    let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let wallet = new ethers.Wallet(privateKey, customHttpProvider);

    let NFT = new ethers.Contract(
        nft_address,
        NFT_Artifact.abi,
        wallet
    );
    await NFT.setSaleState(true);
    console.log("setSaleState complated");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
