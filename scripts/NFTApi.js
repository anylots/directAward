const NFT_Artifact = require("./erc721abi.json");
// import Doodles_Artifact from "../artifacts/contracts/erc721/doodles/Doodles.sol/Doodles.json";
const Doodles_Artifact = require("../artifacts/contracts/erc721/doodles/Doodles.sol/Doodles.json")
const JoyBoySBT_Artifact = require("../artifacts/contracts/erc721/doodles/JoyBoySBT.sol/JoyBoySBT.json")

const nft_address = '0x0f869D9855B9bC52012C538424A04c434fD3c393';
const sbt_address = '0xaEF708ec673bAE6f8B628C63CEd082cBfa39A54E';

const rpc_ethereum = "https://goerli.infura.io/v3/8890b0405f0e4de4b2e24a90767e9114";//ethereum测试网rpc地址


const overrides = {
    gasLimit: 9999999,
    gasPrice: 10 * (10 ** 9)
}

async function main() {

    await transferFrom();
    // await setAllowList();
}

function transferEvent() {
    // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    let privateKey = "0x315bdde188acc16b06b41b3ccb06da359c2bbb5a60072b61aa13f907aaaeb782";
    // let privateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";

    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    //goerli testnet
    const provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.infura.io/v3/8890b0405f0e4de4b2e24a90767e9114'
    );

    let wallet = new ethers.Wallet(privateKey, provider);

    let NFT = new ethers.Contract(
        sbt_address,
        JoyBoySBT_Artifact.abi,
        wallet
    );

    let filterFromMe = NFT.filters.Transfer('0x193E70F5E72e838AdC6ee2A926C02979639D243d');

    // NFT.on(filterFromMe, (fromAddress, toAddress, value, event) => {
    //     console.log('I sent', value);
    // });

    let filter = {
        address: "0x193E70F5E72e838AdC6ee2A926C02979639D243d",
        topics: [
            ethers.utils.id("Transfer(address,address,uint256)")
        ]
    }

    provider.on(filter, (log, event) => {
        console.log(event);
        console.log(log);
    })

    //传入mint个数和支付金额，进行NFT的mint
    // await NFT.transferFrom('0x70997970C51812dc3A010C7d01b50e0d17dc79C8','0xd21af0508e13fc62dba4d1539a5dd8d89cf8df14','2');

    console.log("transferFrom complated");
}


async function getName() {
    let privateKey = "0x542015b8a4f49eccd210032572ad03d19ccbdc60ffcd565f414203938372756a";
    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider(rpc_ethereum);
    let wallet = new ethers.Wallet(privateKey, customHttpProvider);

    let NFT = new ethers.Contract(
        '0x0f869D9855B9bC52012C538424A04c434fD3c393',
        Doodles_Artifact.abi,
        wallet
    );
    let name = await NFT.name();
    console.log("name:" + name);
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
    // let privateKey = "0x315bdde188acc16b06b41b3ccb06da359c2bbb5a60072b61aa13f907aaaeb782";
    // let privateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
    let privateKey = "0x542015b8a4f49eccd210032572ad03d19ccbdc60ffcd565f414203938372756a";


    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    //goerli testnet
    const provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.infura.io/v3/8890b0405f0e4de4b2e24a90767e9114'
    );

    let wallet = new ethers.Wallet(privateKey, provider);

    let NFT = new ethers.Contract(
        sbt_address,
        JoyBoySBT_Artifact.abi,
        wallet
    );

    //传入mint个数和支付金额，进行NFT的mint
    await NFT.mintAllowList();

    console.log("mint complated");
}

async function setAllowList() {
    // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    let privateKey = "0x315bdde188acc16b06b41b3ccb06da359c2bbb5a60072b61aa13f907aaaeb782";

    //     Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
    // Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

    // Connect a wallet to localhost
    let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    //goerli testnet
    const provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.infura.io/v3/8890b0405f0e4de4b2e24a90767e9114'
    );

    let wallet = new ethers.Wallet(privateKey, provider);

    let NFT = new ethers.Contract(
        sbt_address,
        JoyBoySBT_Artifact.abi,
        wallet
    );

    //传入mint个数和支付金额，进行NFT的mint
    await NFT.setAllowList(['0xd21af0508e13fc62dba4d1539a5dd8d89cf8df14', '0x193E70F5E72e838AdC6ee2A926C02979639D243d'], overrides);

    console.log("setAllowList complated");
}


async function transferFrom() {
    // let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    let privateKey = "0x315bdde188acc16b06b41b3ccb06da359c2bbb5a60072b61aa13f907aaaeb782";
    // let privateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";

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
    await NFT.transferFrom('0x193E70F5E72e838AdC6ee2A926C02979639D243d', '0xd21af0508e13fc62dba4d1539a5dd8d89cf8df14', '5');

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
