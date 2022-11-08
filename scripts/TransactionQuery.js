var ethers = require("ethers");
// const Token_Artifact = require("../artifacts/contracts/USDT.sol/Token.json")
const NFT_Artifact = require("./erc721abi.json");

// var url = "https://goerli.infura.io/v3/8890b0405f0e4de4b2e24a90767e9114";
var url = "http://localhost:8545";

// var init = async function () {
//     var customWsProvider = new ethers.providers.WebSocketProvider(url);

//     let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
//     // Connect a wallet to localhost
//     let customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
//     let wallet = new ethers.Wallet(privateKey, customHttpProvider);
  
//     let Token = new ethers.Contract(
//       "0x5FbDB2315678afecb367f032d93F642f64180aa3",
//       Token_Artifact.abi,
//       wallet
//     );

//     let filter = Token.filters.Transfer("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//     console.log(filter);

//     let eventsWith = await Token.queryFilter(filter);
//     console.log(eventsWith);

//     // let filter = {
//     //     address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
//     //     fromBlock: "0",
//     //     toBlock: "latest",
//     //     topics: [
//     //         ethers.utils.id("Transfer(address,address,uint256)")
//     //     ]
//     // }

//     // customWsProvider.on(filter, (tx) => {
//     //     customWsProvider.getTransaction(tx).then(function (transaction) {
//     //         console.log(transaction);
//     //     });
//     // });

//     // customWsProvider._websocket.on("error", async () => {
//     //     console.log(`Unable to connect to infura retrying in 3s...`);
//     //     setTimeout(init, 3000);
//     // });
//     // customWsProvider._websocket.on("close", async (code) => {
//     //     console.log(
//     //         `Connection lost with code infura Attempting reconnect in 3s...`
//     //     );
//     //     customWsProvider._websocket.terminate();
//     //     setTimeout(init, 3000);
//     // });
// };


let query_erc721_history = async function () {

    let provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/8890b0405f0e4de4b2e24a90767e9114");
  
    let Token = new ethers.Contract(
      "0x0f869D9855B9bC52012C538424A04c434fD3c393",
      NFT_Artifact.abi,
      provider
    );

    let filter = Token.filters.Transfer(null,"0xD21aF0508E13Fc62DbA4D1539A5dD8D89cf8Df14");
    console.log(filter);

    let events = await Token.queryFilter(filter);
    console.log(events);
};

query_erc721_history();