require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    testnet: {
      url: process.env.CHAINSTACK_ENDPOINT,
      accounts: [process.env.ACCOUNTS],
    },
  },
};
