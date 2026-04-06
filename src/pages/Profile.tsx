import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { mockSkills, mockEndorsements } from '@/lib/mock-data';

const Profile = () => {
  const { address } = useAccount();
  const displayAddr = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '0x7a3F...9b2E';
  const totalScore = 89;

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-3xl glow-primary">
              ⛓️
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">Anonymous Builder</h1>
              <p className="text-sm font-mono text-primary mb-3">{displayAddr}</p>
              <div className="flex flex-wrap gap-3">
                <span className="glass text-xs px-3 py-1.5 rounded-full text-primary">🛡️ Verified Builder</span>
                <span className="glass text-xs px-3 py-1.5 rounded-full text-accent">⭐ Top 5% Reputation</span>
                <span className="glass text-xs px-3 py-1.5 rounded-full text-muted-foreground">📅 Joined Jan 2024</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient">{totalScore}</div>
              <div className="text-xs text-muted-foreground">Trust Score</div>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <h2 className="text-xl font-bold mb-4">On-Chain Credentials</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {mockSkills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="glass glass-hover rounded-xl p-4 flex items-center gap-4"
              >
                <div className="text-2xl">{skill.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{skill.name}</div>
                  <div className="text-xs text-muted-foreground">by {skill.verifiedBy}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{skill.trustScore}%</div>
                  <div className="text-xs text-muted-foreground">{skill.endorsements} ✋</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Endorsements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-xl font-bold mb-4">Peer Endorsements</h2>
          <div className="space-y-4">
            {mockEndorsements.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="glass rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-primary">{e.from}</span>
                  <span className="text-xs glass px-2 py-1 rounded-full text-accent">{e.staked} staked</span>
                </div>
                <p className="text-sm text-foreground mb-2">"{e.message}"</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Skill: {e.skill}</span>
                  <span>•</span>
                  <span>{e.timestamp}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
