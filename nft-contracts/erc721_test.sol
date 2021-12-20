// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomNFT is ERC721URIStorage, Ownable {
    constructor() ERC721("Some Custom NFT", "SCN") {
    }

    function mint(
        address to,
        uint256 tokenId,
        string memory _tokenURI
    ) public onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    function burn(
        uint256 tokenId
    ) public {
        _burn(tokenId);
    }
}