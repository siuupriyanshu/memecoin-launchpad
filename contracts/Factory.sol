// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.2 <0.9.0;

contract Factory {
    uint256 public immutable fee;
    address public owner;

    constructor(uint256 _fee) {
        fee = _fee;
        owner = msg.sender;
    }
}
