pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract NFTContract is ERC1155, Ownable {
    string private DEFAULT_URI;
    mapping(uint256 => string) private _uris;
    mapping(uint256 => bool) private _blindBoxState;

    string private constant OPENED_NFT_URI = "https://ipfs.moralis.io:2053/ipfs/QmcsYrqrHW7LwuuvNdGo5DCiQ5U6XgzGTbcLHgdDYcJBug/moralis/0000000000000000000000000000000000000000000000000000000000007955.json";
    string private constant BLIND_BOX_METADATA_URI = "https://ipfs.moralis.io:2053/ipfs/QmcrYEgRU56bJpTYLs6TQybSK89rhqku3vgfhx4eaRNw3k/moralis/0000000000000000000000000000000000000000000000000000000000009686.json";
    uint256 private constant FIRST_MINT_NFTS_AMOUNT = 10;

    constructor() ERC1155("") {
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

    function mintBatch(
        address to
    ) public onlyOwner {
        for (uint256 i = 0; i < FIRST_MINT_NFTS_AMOUNT; i++) {
            mint(to, i, 1);
            setTokenUri(i, DEFAULT_URI);
        }
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

    function approvedTransferOnce(
        address contractOwnerAddress,
        address operator,
        uint256 id,
        uint256 amount
    ) public {
        // 驗證機制
        // 必須有部分基礎access控管寫在合約，產生token id的邏輯或許可以寫在前端或後端
        // 需要在特定token id上做紀錄？

        // 直接呼叫interval method
        // transfer
        // _safeTransferFrom(contractOwnerAddress, operator, id, amount);
        

        // 採用白名單機制可能不安全
        // 加入白名單
        // _setApprovalForAll(contractOwnerAddress, operator, true);
        // transfer
        // safeTransferFrom(contractOwnerAddress, operator, id, amount);
        // 從白名單移除
        // _setApprovalForAll(contractOwnerAddress, operator, false);
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