// pragma solidity ^0.6.0;
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Wallet {
    address[] public approvers;
    uint256 public quorum;

    struct Transfer {
        uint256 id;
        uint256 amount;
        address payable to;
        uint256 approvers;
        bool sent;
    }

    Transfer[] public transfers;
    mapping(address => mapping(uint256 => bool)) public approvals;

    constructor(address[] memory _approvers, uint256 _quorum) public {
        approvers = _approvers;
        quorum = _quorum;
    }

    function getApprovers() external view returns (address[] memory) {
        return approvers;
    }

    function getTransfers() external view returns (Transfer[] memory) {
        return transfers;
    }

    function createTransfer(uint256 amount, address payable to)
        external
        onlyApproval()
    {
        transfers.push(Transfer(transfers.length, amount, to, 0, false));
    }

    function approveTransfers(uint256 id) external onlyApproval() {
        require(
            transfers[id].sent == false,
            "Transfer was already approve for this id"
        );
        require(
            approvals[msg.sender][id] == false,
            "you can not approve this transfer twice"
        );

        approvals[msg.sender][id] = true;
        transfers[id].approvers++;

        if (transfers[id].approvers >= quorum) {
            transfers[id].sent = true;
            address payable to = transfers[id].to;
            uint256 amount = transfers[id].amount;
            to.transfer(amount);
        }
    }

    receive() external payable {}

    modifier onlyApproval() {
        bool allowed = false;
        for (uint256 i = 0; i < approvers.length; i++) {
            if (approvers[i] == msg.sender) {
                allowed = true;
            }
        }
        require(allowed == true, "Only appover allowed");
        _;
    }
}
