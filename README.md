# NFTPool

This repository contains a sample project that you can deposit or withdraw
an NFT on contract. 

## How to deploy

```sh
npx hardhat --network localhost run .\scripts\deployNFTPool.js 
```

## How to call this contract

- depositNFT
```sh
example:
const nftPool_address = '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1';
const doodles_address = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
let NFTPool = new ethers.Contract(
        nftPool_address,
        NFTPool_Artifact.abi,
        wallet
);
//depositNFT
await NFTPool.depositNFT(doodles_address, 0);

NFTPool ABI is located at https://github.com/anylots/directAward/tree/main/contracts
```

- withdrawNFT
```sh
Example of storing doodles:

const nftPool_address = '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1';
const doodles_address = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
let NFTPool = new ethers.Contract(
        nftPool_address,
        NFTPool_Artifact.abi,
        wallet
);
//depositNFT
await NFTPool.withdrawNFT(doodles_address, 0);

NFTPool ABI is located at https://github.com/anylots/directAward/tree/main/contracts
```
- Or you can refer to the following link to complete the call
https://github.com/anylots/directAward/blob/main/scripts/NFTPoolService.js


**Happy _building_!**
