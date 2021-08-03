const hre = require("hardhat");

async function main() {
    const CRUD = await hre.ethers.getContractFactory("CRUD");
    const crud = await CRUD.deploy("First.");

    await crud.deployed();

    console.log("CRUD deployed to: ", crud.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
