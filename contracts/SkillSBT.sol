// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title SkillSBT - Soulbound Token for Skill Verification
 * @notice Non-transferable ERC721 tokens representing verified skills
 * @dev Uses UUPS proxy pattern for upgradeability
 */
contract SkillSBT is ERC721Upgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    uint256 private _nextTokenId;

    struct SkillCredential {
        string skillName;
        string category;
        address verifiedBy;
        uint256 verifiedAt;
        string metadataURI; // IPFS hash
        uint256 trustScore;
    }

    mapping(uint256 => SkillCredential) public credentials;
    mapping(address => uint256[]) public userSkills;
    mapping(bytes32 => bool) public skillExists; // Prevent duplicate skills per user

    event SkillMinted(address indexed to, uint256 indexed tokenId, string skillName, address verifiedBy);
    event SkillRevoked(uint256 indexed tokenId, string reason);
    event TrustScoreUpdated(uint256 indexed tokenId, uint256 newScore);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address admin) public initializer {
        __ERC721_init("SkillChain SBT", "SKILL");
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(VERIFIER_ROLE, admin);
        _grantRole(UPGRADER_ROLE, admin);
    }

    /**
     * @notice Mint a new skill SBT to a user
     * @param to The recipient address
     * @param skillName Name of the skill
     * @param category Skill category
     * @param metadataURI IPFS URI for metadata
     */
    function mintSkill(
        address to,
        string memory skillName,
        string memory category,
        string memory metadataURI
    ) external onlyRole(VERIFIER_ROLE) returns (uint256) {
        bytes32 skillHash = keccak256(abi.encodePacked(to, skillName));
        require(!skillExists[skillHash], "Skill already minted for this user");

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        credentials[tokenId] = SkillCredential({
            skillName: skillName,
            category: category,
            verifiedBy: msg.sender,
            verifiedAt: block.timestamp,
            metadataURI: metadataURI,
            trustScore: 50 // Base score
        });

        userSkills[to].push(tokenId);
        skillExists[skillHash] = true;

        emit SkillMinted(to, tokenId, skillName, msg.sender);
        return tokenId;
    }

    /**
     * @notice Update trust score of a credential
     */
    function updateTrustScore(uint256 tokenId, uint256 newScore) external onlyRole(VERIFIER_ROLE) {
        require(newScore <= 100, "Score must be <= 100");
        credentials[tokenId].trustScore = newScore;
        emit TrustScoreUpdated(tokenId, newScore);
    }

    /**
     * @notice Get all skills for a user
     */
    function getUserSkills(address user) external view returns (uint256[] memory) {
        return userSkills[user];
    }

    // === SOULBOUND: Prevent transfers ===
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        require(from == address(0) || to == address(0), "SBT: Token is soulbound and non-transferable");
        return super._update(to, tokenId, auth);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Upgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
