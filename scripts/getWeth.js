const { ethers, getNamedAccounts, network } = require("hardhat");
const { networkConfig } = require("../chain-config");

const AMOUNT = ethers.utils.parseEther("0.001");

async function getWeth() {
  const { deployer } = await getNamedAccounts();

  const iWeth = await ethers.getContractAt(
    "IWeth",
    networkConfig[network.config.chainId].wethToken
  );
  const txResponse = await iWeth.deposit({
    value: AMOUNT,
  });
  await txResponse.wait(1);
  const wethBalance = await iWeth.balanceOf(deployer);
  console.log(`Got ${wethBalance.toString()} WETH`);
}

module.exports = { getWeth, AMOUNT };
