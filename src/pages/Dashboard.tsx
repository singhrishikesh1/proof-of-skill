import { motion } from 'framer-motion';
import { mockSkills, reputationHistory, skillDistribution } from '@/lib/mock-data';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(174, 72%, 56%)', 'hsl(265, 70%, 60%)', 'hsl(200, 60%, 50%)', 'hsl(40, 80%, 55%)', 'hsl(340, 65%, 55%)'];

const Dashboard = () => {
  const totalScore = 89;
  const totalEndorsements = mockSkills.reduce((a, s) => a + s.endorsements, 0);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Your on-chain skill portfolio at a glance.</p>
        </motion.div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Reputation Score', value: totalScore, suffix: '/100', accent: true },
            { label: 'Verified Skills', value: mockSkills.length, suffix: ' SBTs' },
            { label: 'Endorsements', value: totalEndorsements, suffix: '' },
            { label: 'DAO Validations', value: 4, suffix: '' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass rounded-2xl p-5 ${s.accent ? 'glow-primary border-primary/30' : ''}`}
            >
              <div className="text-xs text-muted-foreground mb-2">{s.label}</div>
              <div className="text-3xl font-bold">
                <span className={s.accent ? 'text-gradient' : 'text-foreground'}>{s.value}</span>
                <span className="text-sm text-muted-foreground font-normal">{s.suffix}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Reputation Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-4">Reputation Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={reputationHistory}>
                <defs>
                  <linearGradient id="repGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(174, 72%, 56%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(174, 72%, 56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="hsl(215, 12%, 50%)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(215, 12%, 50%)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(220, 18%, 7%)', border: '1px solid hsl(220, 16%, 14%)', borderRadius: '12px', color: 'hsl(210, 20%, 92%)' }} />
                <Area type="monotone" dataKey="score" stroke="hsl(174, 72%, 56%)" fill="url(#repGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Skill Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-4">Skill Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={skillDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                  {skillDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(220, 18%, 7%)', border: '1px solid hsl(220, 16%, 14%)', borderRadius: '12px', color: 'hsl(210, 20%, 92%)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {skillDistribution.map((s, i) => (
                <div key={s.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className="ml-auto text-foreground font-medium">{s.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="font-semibold text-lg mb-4">Verified Skills (SBTs)</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSkills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="glass glass-hover rounded-2xl p-5 group cursor-default"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{skill.icon}</div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-primary glass px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    SBT
                  </div>
                </div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{skill.name}</h4>
                <p className="text-xs text-muted-foreground mb-3">{skill.category}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Trust: <span className="text-primary font-semibold">{skill.trustScore}%</span></span>
                  <span className="text-muted-foreground">{skill.endorsements} endorsements</span>
                </div>
                <div className="mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground">
                  Verified by <span className="text-foreground">{skill.verifiedBy}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
