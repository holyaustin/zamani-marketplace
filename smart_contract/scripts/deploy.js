const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const NFTMarketplace = await hre.ethers.getContractFactory("Zamani");
  const nft = await NFTMarketplace.deploy();
  await nft.deployed();
  console.log("hrcMarketplace deployed to:", nft.address);

  fs.writeFileSync('../client/config.js', `
  export const hrcMarketplaceAddress = "${nft.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
