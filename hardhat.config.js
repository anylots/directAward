require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    },
    goerli: {
      url: `https://goerli.infura.io/v3/8890b0405f0e4de4b2e24a90767e9114`,
      accounts: [`0x315bdde188acc16b06b41b3ccb06da359c2bbb5a60072b61aa13f907aaaeb782`]
    }
  }
};
