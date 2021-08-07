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

    function deletePost(uint _id) public {
        require(posts[_id].creator == msg.sender, "Account didn't create post");

        posts[_id] = Post(_id, "", address(0));
    }

    constructor (string memory _text) {
        addPost(_text);
    }
}