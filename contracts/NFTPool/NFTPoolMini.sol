// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./XNFT.sol";

contract NFTPoolMini is IERC721Receiver, Ownable {
    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    event DepositNFT(address indexed owner, address to, address indexed nftAsset, uint256 indexed id);

    event WithdrawNFT(address indexed owner, address to, address indexed nftAsset, uint256 indexed id);


    // Mapping from NFT address to xNFT address
    mapping(address => address) internal nfts;

    // implement of xnft
    address public xnftImpl;


    //The byte codes of EIP-1167 standard are as follows:
    //3d602d80600a3d3981f3_363d3d37_3d3d3d363d73_bebebebebebebebebebebebebebebebebebebebe_5a_f4_3d82803e_903d91602b57fd5bf3
    //notes:
    //3d602d80600a3d3981f3 Copying runtime code into memory
    //---------------proxy contract----------------
    //363d3d37 Get the calldata
    //3d3d3d363d73 prepare input and output parmeter
    //bebebebebebebebebebebebebebebebebebebebe address of impl
    //5a gas
    //f4 Delegating the call
    //3d82803e Get the result of an external call
    //903d91602b57fd5bf3 return or revert
    //---------------proxy contract----------------

    /**
     * @dev Add nft->xnft address pair to nfts.
     * @param nftAsset The address of the underlying nft used as collateral
     * 
     */
    function addNft(address nftAsset, string memory xNftSymble) external onlyOwner returns (address instance){
        require(nftAsset != address(0), "NFTPool: nftAsset is zero address");

        assembly{
            let proxy :=mload(0x40)
            mstore(proxy, 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000)
            mstore(add(proxy, 0x14), nftAsset)
            mstore(add(proxy, 0x28),0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000)
            instance := create(0, proxy, 0x37)
        }
        
        (bool success, bytes memory returnData) = instance.call(abi.encodeWithSignature("init(address,address,string,string)", address(this), nftAsset, xNftSymble, xNftSymble));
        require(success == true,"xnft init fail");
        nfts[nftAsset] = instance;
        return instance;
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
