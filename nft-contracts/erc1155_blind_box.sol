pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract NFTContract is ERC1155, Ownable {
    string private DEFAULT_URI;
    mapping(uint256 => string) private _uris;
    mapping(uint256 => bool) private _blindBoxState;
    
    uint[] ids;
    uint[] amounts;

    string private constant OPENED_NFT_URI = "https://ipfs.moralis.io:2053/ipfs/QmcsYrqrHW7LwuuvNdGo5DCiQ5U6XgzGTbcLHgdDYcJBug/moralis/0000000000000000000000000000000000000000000000000000000000007955.json";
    string private constant BLIND_BOX_METADATA_URI = "https://ipfs.moralis.io:2053/ipfs/QmcrYEgRU56bJpTYLs6TQybSK89rhqku3vgfhx4eaRNw3k/moralis/0000000000000000000000000000000000000000000000000000000000009686.json";
    uint256 private constant FIRST_MINT_NFTS_AMOUNT = 10;

    constructor() ERC1155("") payable {
        DEFAULT_URI = BLIND_BOX_METADATA_URI;
        mintBatch(msg.sender);
    }

    function _setBlindBoxState(
        uint256 id,
        bool state
    ) internal {
        _blindBoxState[id] = state;
    }

    function _setBlindBoxBatch() internal {
        for (uint256 i = 0; i < FIRST_MINT_NFTS_AMOUNT; i++) {
            _setBlindBoxState(i, false);
        }
    }

    function getSingleTokenBlindBoxState(
        uint256 id
    ) public onlyOwner view returns (bool) {
        return _blindBoxState[id];
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        _mint(to, id, amount, "");
    }

    function _setIdsAndAmounts() internal
    {

        for (uint256 i = 0; i < FIRST_MINT_NFTS_AMOUNT; i++) {
            ids.push(i);
            amounts.push(1);
            setTokenUri(i, DEFAULT_URI);
        }
    }


    function mintBatch(
        address to
    ) public onlyOwner {
        _setIdsAndAmounts();
        _setBlindBoxBatch();
        _mintBatch(
            to, ids, amounts, ""
        );
    }

    function burn(
        address to,
        uint256 id,
        uint256 amount
    ) public {
        require(msg.sender == to);
        _burn(to, id, amount);
    }

    function openBlindBox(
        uint256 id
    ) public onlyOwner {
        _setBlindBoxState(id, true);
        setTokenUri(id, OPENED_NFT_URI);
    }

    function uri(uint256 tokenId) override public view returns (string memory) {
        return _uris[tokenId];
    }

    function setTokenUri(
        uint256 tokenId,
        string memory uri_
    ) public onlyOwner {
        _uris[tokenId] = uri_;
    }
}