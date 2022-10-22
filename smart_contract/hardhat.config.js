require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
   
    testnet: {
      url: "https://api.s0.b.hmny.io",
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      url: "https://api.harmony.one",
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
