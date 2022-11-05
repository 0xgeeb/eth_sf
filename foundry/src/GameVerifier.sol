// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ZKPVerifier.sol";
import "./GenesisUtils.sol";
import "./ICircuitValidator.sol";

contract GameVerifier is ZKPVerifier {

  uint64 public constant TRANSFER_REQUEST_ID = 1;

  mapping(uint256 => address) public idToAddress;
  mapping(address => uint256) public addressToId;

  


  function _beforeProofSubmit(uint64, uint256[] memory inputs, ICircuitValidator validator) internal view override {
    address _addr = GenesisUtils.int256ToAddress(inputs[validator.getChallengeInputIndex()]);
    require(msg.sender == _addr, "address in proof is not sender address");
  }

  function _afterProofSubmit(uint64 requestId, uint256[] memory inputs, ICircuitValidator validator) internal override {
    require(requestId == TRANSFER_REQUEST_ID && addressToId[msg.sender] == 0, "proof cannot be submitted more than once");
    uint256 id = inputs[validator.getChallengeInputIndex()];
    idToAddress[id] = msg.sender;
  }





}