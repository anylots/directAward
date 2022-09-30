// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./XNFT.sol";

contract NFTPool is IERC721Receiver, Ownable {
    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    event DepositNFT(address indexed owner, address to, address indexed nftAsset, uint256 indexed id);

    event WithdrawNFT(address indexed owner, address to, address indexed nftAsset, uint256 indexed id);


    // Mapping from NFT address to xNFT address
    mapping(address => address) internal nfts;

    /**
     * @dev Add nft->xnft address pair to nfts.
     * @param nftAsset The address of the underlying nft used as collateral
     * 
     */
    function addNft(address nftAsset, string memory xNftSymble) external onlyOwner returns (address){
        require(nftAsset != address(0), "NFTPool: nftAsset is zero address");

        XNFT xnft = new XNFT(address(this), nftAsset, xNftSymble, xNftSymble);
        nfts[nftAsset] = address(xnft);
        return address(xnft);
    }

    /**
     * @dev Deposits an `amount` of underlying asset into the reserve, receiving in return overlying bTokens.
     * - E.g. User deposits 100 USDC and gets in return 100 bUSDC
     * @param nftAsset The address of the underlying nft used as collateral
     * @param nftTokenId The token ID of the underlying nft used as collateral
     **/
    function depositNFT(address nftAsset, uint256 nftTokenId) external {
        require(
            IERC721(nftAsset).ownerOf(nftTokenId) == msg.sender,
            "NFTPool: caller is not nftAsset owner"
        );
        IERC721(nftAsset).safeTransferFrom(
            msg.sender,
            nfts[nftAsset],
            nftTokenId
        );

        XNFT(nfts[nftAsset]).mint(msg.sender, nftTokenId);

        emit DepositNFT(msg.sender, address(this), nftAsset,nftTokenId);
    }

    /**
     * @dev Withdraws an `amount` of underlying asset into the reserve, burning the equivalent bTokens owned.
     * - E.g. User deposits 100 USDC and gets in return 100 bUSDC
     * @param nftAsset The address of the underlying nft used as collateral
     * @param nftTokenId The token ID of the underlying nft used as collateral
     **/
    function withdrawNFT(address nftAsset, uint256 nftTokenId) external {
        require(
            IERC721(nfts[nftAsset]).ownerOf(nftTokenId) == msg.sender,
            "NFTPool: caller is not xnftAsset owner"
        );

        XNFT(nfts[nftAsset]).burn(msg.sender, nftTokenId);

        emit WithdrawNFT(msg.sender, address(this), nftAsset, nftTokenId);

    }

    /**
     * @dev get Address of xNft
     * @param nftAsset The address of the underlying nft used as collateral
     **/
    function getXNftAddress(address nftAsset) public view returns(address){
        require(nftAsset != address(0), "NFTPool: nftAsset is zero address");
        return nfts[nftAsset];
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
