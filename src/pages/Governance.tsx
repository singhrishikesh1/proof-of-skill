import { motion } from 'framer-motion';
import { useState } from 'react';
import { mockProposals, type Proposal } from '@/lib/mock-data';

const statusColors: Record<string, string> = {
  active: 'text-primary bg-primary/10',
  passed: 'text-green-400 bg-green-400/10',
  rejected: 'text-destructive bg-destructive/10',
  pending: 'text-muted-foreground bg-muted',
};

const categoryLabels: Record<string, string> = {
  'skill-validation': '🧾 Skill Validation',
  'flag-credential': '🚩 Flag Credential',
  'platform-upgrade': '⚙️ Platform Upgrade',
};

const Governance = () => {
  const [voted, setVoted] = useState<Record<string, 'for' | 'against'>>({});

  const handleVote = (id: string, type: 'for' | 'against') => {
    setVoted(prev => ({ ...prev, [id]: type }));
  };

  const getVotePercent = (p: Proposal) => {
    const total = p.votesFor + p.votesAgainst;
    return total > 0 ? Math.round((p.votesFor / total) * 100) : 50;
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-1">DAO Governance</h1>
          <p className="text-muted-foreground">Vote on skill validations, flag fake credentials, and shape the protocol.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active Proposals', value: mockProposals.filter(p => p.status === 'active').length },
            { label: 'Total Votes Cast', value: '5,350' },
            { label: 'Your Voting Power', value: '120 SKILL' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Proposals */}
        <div className="space-y-4">
          {mockProposals.map((proposal, i) => {
            const pct = getVotePercent(proposal);
            const userVote = voted[proposal.id];

            return (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[proposal.status]}`}>
                        {proposal.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">{categoryLabels[proposal.category]}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">{proposal.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{proposal.description}</p>

                {/* Vote Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-primary">For: {proposal.votesFor.toLocaleString()}</span>
                    <span className="text-destructive">Against: {proposal.votesAgainst.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    by <span className="font-mono text-foreground">{proposal.proposer}</span> • Ends {proposal.endDate}
                  </div>

                  {proposal.status === 'active' && (
                    <div className="flex gap-2">
                      {userVote ? (
                        <span className="text-xs text-primary glass px-3 py-1.5 rounded-lg">
                          ✓ Voted {userVote === 'for' ? 'For' : 'Against'}
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleVote(proposal.id, 'for')}
                            className="text-xs px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                          >
                            Vote For
                          </button>
                          <button
                            onClick={() => handleVote(proposal.id, 'against')}
                            className="text-xs px-4 py-2 rounded-lg glass glass-hover text-foreground font-medium"
                          >
                            Vote Against
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Governance;
