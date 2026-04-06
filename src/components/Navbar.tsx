import { motion } from 'framer-motion';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const truncate = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
            <span className="text-primary font-bold text-lg">⛓</span>
          </div>
          <span className="font-bold text-lg text-foreground">
            Skill<span className="text-primary">Chain</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
          <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Profile</Link>
          <Link to="/governance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Governance</Link>
        </div>

        <div>
          {isConnected ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="text-xs font-mono text-primary glass px-3 py-1.5 rounded-lg">
                {truncate(address!)}
              </Link>
              <button
                onClick={() => disconnect()}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => connect({ connector: connectors[0] })}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors glow-primary"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
