const { assert, expect } = require("chai");
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
        it("can add a post", async () => {
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

        it("can add multiple posts from the same account", async () => {
            const [owner] = await ethers.getSigners();
            const CRUD = await ethers.getContractFactory("CRUD");
            const crud = await CRUD.deploy("First.");
            await crud.deployed();

            await crud.addPost("Second.");
            const post1 = await crud.posts(1);
            const post2 = await crud.posts(2);

            assert.equal(post1.id, 1, "contains the correct id");
            assert.equal(post1.text, "First.", "contains the correct text");
            assert.equal(post1.creator, owner.address, "post is from creator address");

            assert.equal(post2.id, 2, "contains the correct id");
            assert.equal(post2.text, "Second.", "contains the correct text");
            assert.equal(post2.creator, owner.address, "post is from creator address");
        })

        it("can delete a post", async () => {
            const CRUD = await ethers.getContractFactory("CRUD");
            const crud = await CRUD.deploy("First.");
            await crud.deployed();

            await crud.deletePost(1);
            const post = await crud.posts(1);

            assert.equal(post.id, 1, "contains the correct id");
            assert.equal(post.text, "", "contains no text");
            assert.equal(post.creator, "0x0000000000000000000000000000000000000000", "creator has default address");
        })

        it("can't delete another account's post", async () => {
            const [owner, addr1] = await ethers.getSigners();
            const CRUD = await ethers.getContractFactory("CRUD");
            const crud = await CRUD.deploy("First.");
            await crud.deployed();

            await expect(crud.connect(addr1).deletePost(1)).to.be.revertedWith("Account didn't create post")
            const post = await crud.posts(1);

            assert.equal(post.id, 1, "contains the correct id");
            assert.equal(post.text, "First.", "contains the correct text");
            assert.equal(post.creator, owner.address, "post is from creator address");
        })
    })
})