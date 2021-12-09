pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract NFTContract is ERC1155, Ownable {
    uint256 private constant ARTWORK_ID = 0;
    uint256 private constant PHOTO_ID = 1;

    constructor() ERC1155("") {
        _mint(msg.sender, ARTWORK_ID, 1, "");
        _mint(msg.sender, PHOTO_ID, 2, "");
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        _mint(to, id, amount, "");
    }

    function burn(
        address to,
        uint256 id,
        uint256 amount
    ) public {
        require(msg.sender == to);
        _burn(to, id, amount);
    }
}