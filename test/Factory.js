const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Factory", function () {
    const FEE = ethers.parseUnits("0.01", 18);

    async function deployFactoryFixtures() {
        // Fetch Accounts
        const [deployer, creator, buyer] = await ethers.getSigners();

        // Fetch the contract
        const Factory = await ethers.getContractFactory("Factory", deployer);

        // Deploy the contract
        const factory = await Factory.deploy(FEE);

        // Create token
        const transcation = await factory.connect(creator).create("Dapp Uni", "DAPP", { value: FEE })
        await transcation.wait();

        // Get token address
        const tokenAddress = await factory.tokens(0);
        const token = await ethers.getContractAt("Token", tokenAddress)

        // Return values
        return { factory, deployer, creator, token, buyer };
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

    describe("Creating", function () {
        it("Should set the owner", async function () {
            const { factory, token } = await loadFixture(deployFactoryFixtures);
            expect(await token.owner()).to.equal(await factory.getAddress());
        })
        it("Should set the creator", async function () {
            const { token, creator } = await loadFixture(deployFactoryFixtures);
            expect(await token.creator()).to.equal(creator.address);
        })
        it("Should set the supply", async function () {
            const { token, factory } = await loadFixture(deployFactoryFixtures);
            const totalSupply = ethers.parseUnits("1000000", 18);
            expect(await token.balanceOf(await factory.getAddress())).to.equal(totalSupply);
        })
        it("Should update ETH balance", async function () {
            const { factory } = await loadFixture(deployFactoryFixtures)

            const balance = await ethers.provider.getBalance(await factory.getAddress())

            expect(balance).to.equal(FEE)
        })
        it("Should create the sale", async function () {
            const { factory, token, creator } = await loadFixture(deployFactoryFixtures)
      
            const count = await factory.totalTokens()
            expect(count).to.equal(1)
      
            const sale = await factory.getTokenSale(0)
      
            expect(sale.token).to.equal(await token.getAddress())
            expect(sale.creator).to.equal(creator.address)
            expect(sale.sold).to.equal(0)
            expect(sale.raised).to.equal(0)
            expect(sale.isOpen).to.equal(true)
          })
    })
});
