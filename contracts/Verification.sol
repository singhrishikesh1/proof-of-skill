// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title Verification - Decentralized Skill Verification
 * @notice Manages company/DAO verification of user credentials
 */
contract Verification is AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant DAO_ROLE = keccak256("DAO_ROLE");

    struct VerificationRecord {
        address verifier;
        address subject;
        uint256 skillTokenId;
        uint256 timestamp;
        string evidence; // IPFS hash of proof
        bool isValid;
    }

    mapping(uint256 => VerificationRecord) public verifications;
    mapping(address => bool) public registeredVerifiers;
    mapping(address => uint256) public verifierStake;
    
    uint256 public verificationCount;
    uint256 public constant MIN_STAKE = 0.1 ether;
    uint256 public constant SLASH_AMOUNT = 0.05 ether;

    event VerifierRegistered(address indexed verifier, uint256 stake);
    event SkillVerified(uint256 indexed verificationId, address indexed subject, uint256 skillTokenId);
    event VerifierSlashed(address indexed verifier, uint256 amount, string reason);

    function initialize(address admin) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(DAO_ROLE, admin);
    }

    /**
     * @notice Register as a verifier by staking tokens
     */
    function registerVerifier() external payable {
        require(msg.value >= MIN_STAKE, "Insufficient stake");
        require(!registeredVerifiers[msg.sender], "Already registered");

        registeredVerifiers[msg.sender] = true;
        verifierStake[msg.sender] = msg.value;
        _grantRole(VERIFIER_ROLE, msg.sender);

        emit VerifierRegistered(msg.sender, msg.value);
    }

    /**
     * @notice Verify a user's skill credential
     */
    function verifySkill(
        address subject,
        uint256 skillTokenId,
        string memory evidence
    ) external onlyRole(VERIFIER_ROLE) returns (uint256) {
        uint256 vId = verificationCount++;
        verifications[vId] = VerificationRecord({
            verifier: msg.sender,
            subject: subject,
            skillTokenId: skillTokenId,
            timestamp: block.timestamp,
            evidence: evidence,
            isValid: true
        });

        emit SkillVerified(vId, subject, skillTokenId);
        return vId;
    }

    /**
     * @notice Slash a verifier for false verification (DAO only)
     */
    function slashVerifier(address verifier, string memory reason) external onlyRole(DAO_ROLE) {
        require(registeredVerifiers[verifier], "Not a verifier");
        require(verifierStake[verifier] >= SLASH_AMOUNT, "Insufficient stake to slash");

        verifierStake[verifier] -= SLASH_AMOUNT;
        emit VerifierSlashed(verifier, SLASH_AMOUNT, reason);
    }

    function _authorizeUpgrade(address) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}
}
