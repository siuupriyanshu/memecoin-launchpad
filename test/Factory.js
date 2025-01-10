const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Factory", function () {
    const FEE = ethers.parseUnits("0.01", 18);

    async function deployFactoryFixtures() {
        // Fetch Accounts
        const [deployer] = await ethers.getSigners();

        // Fetch the contract
        const Factory = await ethers.getContractFactory("Factory", deployer);
        // Deploy the contract
        const factory = await Factory.deploy(FEE);

        return { factory, deployer };
    }

    describe("Deployment", function () {
        it("Should set the fee", async function () {
            const { factory } = await loadFixture(deployFactoryFixtures);
            expect(await factory.fee()).to.equal(FEE);
        });
        it("Should set the owner", async function () {
            const { factory, deployer } = await loadFixture(deployFactoryFixtures);
             expect(await factory.owner()).to.equal(deployer.address);
        });
    });
});
