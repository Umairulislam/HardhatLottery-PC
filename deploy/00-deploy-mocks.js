const { deployments, network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const BASE_FEE = ethers.utils.parseEther("0.25") // Cost 0.25 Link
const GAS_PRICE_LINK = 1e9 // Link per gas

module.exports = async function ({ getNamedAccounts, deployments }) {

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! deploying mocks...")
        // deploy a mock contract
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args
        })
        log("Mocks Deployed")
        log("---------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]