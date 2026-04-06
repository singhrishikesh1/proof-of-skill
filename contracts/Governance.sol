// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title Governance - DAO Voting for SkillChain
 * @notice Token-based voting system for skill validation and protocol upgrades
 */
contract Governance is AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant PROPOSER_ROLE = keccak256("PROPOSER_ROLE");

    enum ProposalStatus { Active, Passed, Rejected, Executed }
    enum ProposalCategory { SkillValidation, FlagCredential, PlatformUpgrade }

    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        ProposalCategory category;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 startTime;
        uint256 endTime;
        ProposalStatus status;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => uint256) public votingPower;

    uint256 public proposalCount;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant QUORUM = 100; // Minimum total votes

    event ProposalCreated(uint256 indexed id, address proposer, string title, ProposalCategory category);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed id, ProposalStatus result);

    function initialize(address admin) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(PROPOSER_ROLE, admin);
    }

    /**
     * @notice Create a new governance proposal
     */
    function createProposal(
        string memory title,
        string memory description,
        ProposalCategory category
    ) external onlyRole(PROPOSER_ROLE) returns (uint256) {
        uint256 id = proposalCount++;
        proposals[id] = Proposal({
            id: id,
            proposer: msg.sender,
            title: title,
            description: description,
            category: category,
            votesFor: 0,
            votesAgainst: 0,
            startTime: block.timestamp,
            endTime: block.timestamp + VOTING_PERIOD,
            status: ProposalStatus.Active,
            executed: false
        });

        emit ProposalCreated(id, msg.sender, title, category);
        return id;
    }

    /**
     * @notice Vote on a proposal
     */
    function vote(uint256 proposalId, bool support) external {
        Proposal storage p = proposals[proposalId];
        require(p.status == ProposalStatus.Active, "Not active");
        require(block.timestamp <= p.endTime, "Voting ended");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        uint256 weight = votingPower[msg.sender];
        require(weight > 0, "No voting power");

        hasVoted[proposalId][msg.sender] = true;

        if (support) {
            p.votesFor += weight;
        } else {
            p.votesAgainst += weight;
        }

        emit Voted(proposalId, msg.sender, support, weight);
    }

    /**
     * @notice Finalize a proposal after voting period
     */
    function finalizeProposal(uint256 proposalId) external {
        Proposal storage p = proposals[proposalId];
        require(block.timestamp > p.endTime, "Voting not ended");
        require(p.status == ProposalStatus.Active, "Already finalized");

        uint256 totalVotes = p.votesFor + p.votesAgainst;
        if (totalVotes >= QUORUM && p.votesFor > p.votesAgainst) {
            p.status = ProposalStatus.Passed;
        } else {
            p.status = ProposalStatus.Rejected;
        }

        emit ProposalExecuted(proposalId, p.status);
    }

    /**
     * @notice Set voting power (based on reputation/token holdings)
     */
    function setVotingPower(address user, uint256 power) external onlyRole(DEFAULT_ADMIN_ROLE) {
        votingPower[user] = power;
    }

    function _authorizeUpgrade(address) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}
}
