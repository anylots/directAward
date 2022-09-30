// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// We import this library to be able to use console.log
import "hardhat/console.sol";

contract XNFT is ERC721, ERC721Enumerable, IERC721Receiver, Ownable {
  /*//////////////////////////////////////////////////////////////
                    NFTPool STORAGE
  //////////////////////////////////////////////////////////////*/
  address private _underlyingAsset;
  address internal _nftPool;
  string private _baseURIextended;

  modifier onlyNftPool() {
    require(
      msg.sender == _nftPool,
      "The caller of this function must be a nftPool"
    );
    _;
  }

  /**
   * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
   */
  constructor(
    address nftPool,
    address underlyingAsset,
    string memory name_,
    string memory symbol_
  ) ERC721(name_, symbol_) {
    _nftPool = nftPool;
    _underlyingAsset = underlyingAsset;
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function setBaseURI(string memory baseURI_) external onlyOwner {
    _baseURIextended = baseURI_;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseURIextended;
  }

  /**
   * @dev Mint xnft of tokenId to `user`
   * - Only callable by the NftPool, as extra state updates there need to be managed
   * @param user The address receiving the minted tokens
   * @param tokenId The tokenId of xnft getting minted
   */
  function mint(address user, uint256 tokenId) public onlyNftPool {
    //mint xnft to user
    _mint(user, tokenId);
  }

  /**
   * @dev Burn xnft of tokenId from `user`
   * - Only callable by the NftPool, as extra state updates there need to be managed
   * @param tokenId The tokenId of xnft getting burned
   **/
  function burn(address user, uint256 tokenId) public onlyNftPool {
    //burn user's xnft
    _burn(tokenId);

    //transfer nft to user
    IERC721(_underlyingAsset).safeTransferFrom(address(this), user, tokenId);
  }

  function onERC721Received(
    address operator,
    address from,
    uint256 tokenId,
    bytes calldata data
  ) external pure override returns (bytes4) {
    operator;
    from;
    tokenId;
    data;
    return IERC721Receiver.onERC721Received.selector;
  }
}
