//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CRUD {
    struct Post {
        uint id;
        string text;
        address creator;
    }

    mapping(uint => Post) public posts;

    uint public postsCount;

    function addPost(string memory _text) public {
        postsCount ++;
        posts[postsCount] = Post(postsCount, _text, msg.sender);
    }

    constructor (string memory _text) {
        addPost(_text);
    }
}