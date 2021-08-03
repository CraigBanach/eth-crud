const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("CRUD", () => {
    it("Should deploy with a single post", async () => {
        const [owner] = await ethers.getSigners();
        const CRUD = await ethers.getContractFactory("CRUD");
        const crud = await CRUD.deploy("First.");
        await crud.deployed();

        const post = await crud.posts(1);

        assert.equal(post.id, 1, "contains the correct id");
        assert.equal(post.text, "First.", "contains the correct text");
        assert.equal(post.creator, owner.address, "post is from creator address");
    })

    describe("posts", () => {
        it("can add a post", async() => {
            const [owner, addr1] = await ethers.getSigners();
            const CRUD = await ethers.getContractFactory("CRUD");
            const crud = await CRUD.deploy("First.");
            await crud.deployed();

            await crud.connect(addr1).addPost("Second.");
            const post = await crud.posts(2);

            assert.equal(post.id, 2, "contains the correct id");
            assert.equal(post.text, "Second.", "contains the correct text");
            assert.equal(post.creator, addr1.address, "post is from the correct address");            
        })
    })
})