const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTAfrica");
  const nft = await NFTMarketplace.deploy();
  await nft.deployed();
  console.log("nftMarketplace deployed to:", nft.address);

  fs.writeFileSync('./config.js', `
  export const nftmarketplaceAddress = "${nft.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
