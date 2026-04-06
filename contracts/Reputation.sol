// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title Reputation - On-Chain Reputation Scoring
 * @notice Calculates and manages user reputation scores
 */
contract Reputation is AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant UPDATER_ROLE = keccak256("UPDATER_ROLE");

    struct UserReputation {
        uint256 baseScore;
        uint256 skillCount;
        uint256 endorsementCount;
        uint256 daoValidations;
        uint256 lastUpdated;
    }

    mapping(address => UserReputation) public reputations;
    mapping(address => mapping(address => bool)) public hasEndorsed;

    uint256 public constant SKILL_WEIGHT = 15;
    uint256 public constant ENDORSEMENT_WEIGHT = 5;
    uint256 public constant DAO_VALIDATION_WEIGHT = 25;

    event ReputationUpdated(address indexed user, uint256 newScore);
    event EndorsementGiven(address indexed from, address indexed to);

    function initialize(address admin) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(UPDATER_ROLE, admin);
    }

    /**
     * @notice Add a verified skill to user reputation
     */
    function addSkill(address user) external onlyRole(UPDATER_ROLE) {
        reputations[user].skillCount++;
        _recalculate(user);
    }

    /**
     * @notice Endorse a user (peer validation)
     */
    function endorse(address user) external {
        require(msg.sender != user, "Cannot endorse yourself");
        require(!hasEndorsed[msg.sender][user], "Already endorsed");

        hasEndorsed[msg.sender][user] = true;
        reputations[user].endorsementCount++;
        _recalculate(user);

        emit EndorsementGiven(msg.sender, user);
    }

    /**
     * @notice Record a DAO validation
     */
    function addDaoValidation(address user) external onlyRole(UPDATER_ROLE) {
        reputations[user].daoValidations++;
        _recalculate(user);
    }

    /**
     * @notice Calculate composite reputation score (0-100)
     */
    function getScore(address user) external view returns (uint256) {
        return _calculateScore(user);
    }

    function _recalculate(address user) internal {
        uint256 score = _calculateScore(user);
        reputations[user].baseScore = score;
        reputations[user].lastUpdated = block.timestamp;
        emit ReputationUpdated(user, score);
    }

    function _calculateScore(address user) internal view returns (uint256) {
        UserReputation memory rep = reputations[user];
        uint256 score = (rep.skillCount * SKILL_WEIGHT) +
                        (rep.endorsementCount * ENDORSEMENT_WEIGHT) +
                        (rep.daoValidations * DAO_VALIDATION_WEIGHT);
        return score > 100 ? 100 : score;
    }

    function _authorizeUpgrade(address) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}
}
