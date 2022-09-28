// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract NFTPool is IERC721Receiver {
    // Mapping from NFT address to aNFT address
    mapping(address => address) internal nfts;


        /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor() {
        // nfts[]
    }

    /**
     * @dev Deposits an `amount` of underlying asset into the reserve, receiving in return overlying bTokens.
     * - E.g. User deposits 100 USDC and gets in return 100 bUSDC
     * @param nftAsset The address of the underlying nft used as collateral
     * @param nftTokenId The token ID of the underlying nft used as collateral
     **/
    function depositNFT(address nftAsset, uint256 nftTokenId) external {
        IERC721(nftAsset).safeTransferFrom(
            msg.sender,
            address(this),
            nftTokenId
        );
    }

    /**
     * @dev Withdraws an `amount` of underlying asset into the reserve, burning the equivalent bTokens owned.
     * - E.g. User deposits 100 USDC and gets in return 100 bUSDC
     * @param nftAsset The address of the underlying nft used as collateral
     * @param nftTokenId The token ID of the underlying nft used as collateral
     **/
    function withdrawNFT(address nftAsset, uint256 nftTokenId) external {
        IERC721(nftAsset).safeTransferFrom(
            address(this),
            msg.sender,
            nftTokenId
        );
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
