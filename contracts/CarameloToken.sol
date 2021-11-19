pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CarameloToken is ERC20 {
    constructor(address _owner) public ERC20("Caramel","CT"){
        _mint(_owner, 1000000000000000000000000);
    }
}