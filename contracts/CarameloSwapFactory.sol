pragma solidity ^0.8.0;

import "./CarameloSwapExchange.sol";

contract CarameloSwapFactory {
    event NewExchange(address indexed token, address indexed exchange);

    uint256 public tokenCount;
    mapping (address=>address) private tokenToExchange;
    mapping (address=>address) private exchangeToToken;
    mapping (uint256=>address) private idToToken;


    function createExchange(address token) public returns(address){
        require(token != address(0x00));
        require(tokenToExchange[token] == address(0x00));
        CarameloSwapExchange exchangeTemplate = new CarameloSwapExchange();
        exchangeTemplate.setup(token);
        tokenToExchange[token] = address(exchangeTemplate);
        exchangeToToken[address(exchangeTemplate)] = token;
        uint256 tokenId = tokenCount + 1;
        tokenCount = tokenId;
        idToToken[tokenId] = token;
        emit NewExchange(token, address(exchangeTemplate));
        return address(exchangeTemplate);
    }

    function getExchange(address token) public view returns(address){
        return tokenToExchange[token];
    }

    function getToken(address exchange) public view returns(address){
        return exchangeToToken[exchange];
    }

    function getTokenWithId(uint256 tokenid) public returns(address){
        return idToToken[tokenid];
    }
}