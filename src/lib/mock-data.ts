export interface Skill {
  id: string;
  name: string;
  category: string;
  verifiedBy: string;
  verifiedAt: string;
  trustScore: number;
  endorsements: number;
  tokenId: string;
  icon: string;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  endDate: string;
  category: 'skill-validation' | 'flag-credential' | 'platform-upgrade';
}

export interface PeerEndorsement {
  from: string;
  skill: string;
  message: string;
  timestamp: string;
  staked: string;
}

export const mockSkills: Skill[] = [
  { id: '1', name: 'Solidity Developer', category: 'Smart Contracts', verifiedBy: 'Ethereum Foundation DAO', verifiedAt: '2024-01-15', trustScore: 95, endorsements: 42, tokenId: '0x...a1b2', icon: '⛓️' },
  { id: '2', name: 'React Engineer', category: 'Frontend', verifiedBy: 'Web3 Dev Guild', verifiedAt: '2024-02-20', trustScore: 88, endorsements: 31, tokenId: '0x...c3d4', icon: '⚛️' },
  { id: '3', name: 'ZK Proof Researcher', category: 'Cryptography', verifiedBy: 'ZK Research DAO', verifiedAt: '2024-03-10', trustScore: 92, endorsements: 18, tokenId: '0x...e5f6', icon: '🔐' },
  { id: '4', name: 'DeFi Protocol Designer', category: 'DeFi', verifiedBy: 'DeFi Alliance', verifiedAt: '2024-04-05', trustScore: 85, endorsements: 27, tokenId: '0x...g7h8', icon: '💰' },
  { id: '5', name: 'Smart Contract Auditor', category: 'Security', verifiedBy: 'OpenZeppelin DAO', verifiedAt: '2024-05-12', trustScore: 97, endorsements: 56, tokenId: '0x...i9j0', icon: '🛡️' },
  { id: '6', name: 'Rust Developer', category: 'Systems', verifiedBy: 'Solana Foundation', verifiedAt: '2024-06-01', trustScore: 79, endorsements: 14, tokenId: '0x...k1l2', icon: '🦀' },
];

export const mockProposals: Proposal[] = [
  { id: '1', title: 'Add "MEV Researcher" as verified skill', description: 'Proposal to add MEV research as a recognized and verifiable skill category.', proposer: '0x1234...abcd', votesFor: 1420, votesAgainst: 230, status: 'active', endDate: '2024-12-15', category: 'skill-validation' },
  { id: '2', title: 'Flag suspicious "AI Engineer" credential', description: 'Multiple reports of unverified AI engineering claims from address 0x9876.', proposer: '0x5678...efgh', votesFor: 890, votesAgainst: 120, status: 'active', endDate: '2024-12-10', category: 'flag-credential' },
  { id: '3', title: 'Upgrade reputation scoring v2', description: 'Implement quadratic scoring to reduce whale influence on endorsements.', proposer: '0xabcd...1234', votesFor: 2100, votesAgainst: 450, status: 'passed', endDate: '2024-11-30', category: 'platform-upgrade' },
  { id: '4', title: 'Add cross-chain skill bridging', description: 'Enable skill SBTs to be recognized across Polygon, Arbitrum, and Optimism.', proposer: '0xdef0...5678', votesFor: 670, votesAgainst: 890, status: 'rejected', endDate: '2024-11-25', category: 'platform-upgrade' },
];

export const mockEndorsements: PeerEndorsement[] = [
  { from: '0x1a2b...3c4d', skill: 'Solidity Developer', message: 'Brilliant contract architecture. Reviewed their code in audit.', timestamp: '2024-03-15', staked: '50 SKILL' },
  { from: '0x5e6f...7g8h', skill: 'React Engineer', message: 'Built production dApp frontend with clean code.', timestamp: '2024-04-02', staked: '30 SKILL' },
  { from: '0x9i0j...1k2l', skill: 'ZK Proof Researcher', message: 'Published groundbreaking ZK research paper.', timestamp: '2024-05-20', staked: '100 SKILL' },
];

export const reputationHistory = [
  { month: 'Jan', score: 45 },
  { month: 'Feb', score: 52 },
  { month: 'Mar', score: 61 },
  { month: 'Apr', score: 68 },
  { month: 'May', score: 75 },
  { month: 'Jun', score: 82 },
  { month: 'Jul', score: 85 },
  { month: 'Aug', score: 89 },
];

export const skillDistribution = [
  { name: 'Smart Contracts', value: 35 },
  { name: 'Frontend', value: 25 },
  { name: 'Security', value: 20 },
  { name: 'Cryptography', value: 12 },
  { name: 'DeFi', value: 8 },
];
