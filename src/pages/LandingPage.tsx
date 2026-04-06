import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { Link } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const features = [
  { icon: '🧾', title: 'Soulbound Tokens', desc: 'Non-transferable NFTs representing verified skills. Once earned, forever yours.' },
  { icon: '📜', title: 'On-Chain Resume', desc: 'Your wallet IS your resume. All achievements fetched directly from the blockchain.' },
  { icon: '🏢', title: 'Decentralized Verification', desc: 'Companies and DAOs verify credentials by signing on-chain transactions.' },
  { icon: '⭐', title: 'Reputation Protocol', desc: 'Dynamic scoring based on verified skills, DAO validations, and peer endorsements.' },
  { icon: '🗳', title: 'DAO Governance', desc: 'Community-driven validation through token-based voting on skills and credentials.' },
  { icon: '🔒', title: 'Token-Gated Access', desc: 'Premium features unlocked through NFT/token ownership. Prove it, access it.' },
];

const roadmap = [
  { phase: 'Phase 1', title: 'MVP Launch', items: ['SBT Minting', 'Basic Profile', 'Wallet Auth'], status: 'done' },
  { phase: 'Phase 2', title: 'Verification Layer', items: ['DAO Verification', 'Peer Endorsements', 'Reputation Score'], status: 'current' },
  { phase: 'Phase 3', title: 'Governance', items: ['Token Launch', 'DAO Voting', 'Staking Mechanism'], status: 'upcoming' },
  { phase: 'Phase 4', title: 'Scale', items: ['Multi-chain', 'ZK Proofs', 'Enterprise API'], status: 'upcoming' },
];

const stats = [
  { value: '12,847', label: 'Skills Verified' },
  { value: '3,291', label: 'Active Users' },
  { value: '847', label: 'DAOs Connected' },
  { value: '99.7%', label: 'Uptime' },
];

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">Live on Polygon Testnet</span>
          </motion.div>

          <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
            Proof of Skill
            <br />
            <span className="text-gradient">{'>'}  Proof of Degree</span>
          </motion.h1>

          <motion.p variants={item} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            The decentralized skill verification protocol. Earn verifiable on-chain credentials.
            No centralized authority — everything is trust-minimized.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isConnected ? (
              <Link
                to="/dashboard"
                className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-primary"
              >
                Open Dashboard →
              </Link>
            ) : (
              <button
                onClick={() => connect({ connector: connectors[0] })}
                className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-primary"
              >
                Connect Wallet to Start
              </button>
            )}
            <a href="#features" className="px-8 py-3.5 rounded-xl glass glass-hover text-foreground font-medium">
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Built for the <span className="text-gradient">Trustless Era</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every feature is designed to eliminate centralized gatekeepers from skill verification.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass glass-hover rounded-2xl p-6 group cursor-default"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 border-y border-border/30">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16"
          >
            How <span className="text-gradient">SkillChain</span> Works
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Connect Wallet', desc: 'Link your MetaMask or WalletConnect wallet.' },
              { step: '02', title: 'Submit Skills', desc: 'Claim your skills with proof of work.' },
              { step: '03', title: 'Get Verified', desc: 'DAOs and companies verify via on-chain signatures.' },
              { step: '04', title: 'Build Reputation', desc: 'Earn SBTs and grow your trust score.' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-primary/20 mb-4 font-mono">{s.step}</div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16"
          >
            Roadmap
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {roadmap.map((r, i) => (
              <motion.div
                key={r.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`glass rounded-2xl p-6 relative ${r.status === 'current' ? 'border-primary/50 glow-primary' : ''}`}
              >
                {r.status === 'current' && (
                  <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Current
                  </span>
                )}
                <div className="text-xs font-mono text-primary mb-2">{r.phase}</div>
                <h3 className="font-semibold text-foreground mb-3">{r.title}</h3>
                <ul className="space-y-1.5">
                  {r.items.map((it) => (
                    <li key={it} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${r.status === 'done' ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="py-24 border-t border-border/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto glow-primary"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the <span className="text-gradient">Revolution</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Get early access to SkillChain. Be among the first to prove your skills on-chain.
            </p>
            {joined ? (
              <div className="text-primary font-semibold">✓ You're on the list! We'll be in touch.</div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={() => email && setJoined(true)}
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Join Waitlist
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/30">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold">⛓ SkillChain</span>
            <span className="text-xs text-muted-foreground">© 2024</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">Discord</a>
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
