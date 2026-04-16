import React, { useState, useEffect, useCallback, ReactNode, useRef, ErrorInfo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Share2, ShieldAlert, Fingerprint, Lock, 
  Database, Users, Activity, Hexagon, Key, Link2, Search, CheckCircle2,
  AlertTriangle, Network, Zap, TerminalSquare, ShieldCheck,
  Server, Smartphone, Play, Loader2, Check, ExternalLink, ActivitySquare, Eye, AlertOctagon
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Production Error Boundary ---
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Applet Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen bg-bg text-text-main flex flex-col items-center justify-center font-mono p-8 text-center">
          <AlertOctagon className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">SYSTEM FAILURE DETECTED</h1>
          <p className="text-text-dim max-w-lg mb-6">
            The presentation encountered a fatal error during rendering. Please refresh the page to try again.
          </p>
          <div className="bg-card border border-border p-4 text-left text-sm text-red-400 overflow-auto max-w-2xl w-full">
            {this.state.error?.message}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-8 border border-accent bg-accent-soft text-accent px-6 py-2 hover:bg-accent/20 transition-colors"
          >
            REBOOT SYSTEM
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// UI Components
interface FuturisticButtonProps {
  key?: string | number;
  onClick: () => void;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  pulsing?: boolean;
}

const FuturisticButton = ({ onClick, children, active, disabled, pulsing }: FuturisticButtonProps) => (
  <motion.button 
    whileHover={{ scale: disabled ? 1 : 1.02, backgroundColor: disabled ? '' : 'var(--color-accent-soft)' }}
    whileTap={{ scale: disabled ? 1 : 0.98 }}
    className={`relative flex items-center justify-center gap-[8px] border border-border bg-card px-[16px] py-[8px] font-mono text-[12px] uppercase transition-all duration-300
      ${disabled ? 'opacity-50 cursor-not-allowed text-text-dim' : 'cursor-pointer text-accent hover:border-accent hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]'}
      ${active ? 'border-accent bg-accent-soft shadow-[0_0_10px_rgba(6,182,212,0.2)]' : ''}
    `}
    onClick={onClick}
    disabled={disabled}
  >
    {pulsing && !disabled && (
      <span className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[3px] h-[12px] bg-accent shadow-[0_0_8px_var(--color-accent)] animate-pulse" />
    )}
    {children}
  </motion.button>
);

const SectionHeader = ({ title, moduleNum }: { title: string, moduleNum: string }) => (
  <div className="flex flex-col gap-[4px] mb-[24px]">
    <div className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] flex items-center gap-[8px]">
      <TerminalSquare className="w-3 h-3" /> Module {moduleNum}
    </div>
    <h2 className="text-[24px] font-bold tracking-tight text-text-main">{title}</h2>
  </div>
);

// SLIDES
const TitleSlide = ({ nextSlide }: { nextSlide: () => void }) => {
  const [init, setInit] = useState(0);

  const initialize = () => {
    setInit(1);
    setTimeout(() => setInit(2), 2000);
    setTimeout(() => {
      setInit(3);
      setTimeout(() => nextSlide(), 1000);
    }, 4000);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative p-[40px] overflow-y-auto">
      <AnimatePresence>
        {init === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            className="flex flex-col items-center text-center max-w-4xl z-10"
          >
            <div className="w-[80px] h-[80px] border border-border bg-card flex items-center justify-center transform rotate-45 mb-[40px] relative">
               <Fingerprint className="w-10 h-10 text-accent -rotate-45" />
               <motion.div 
                 animate={{ rotate: 360 }} 
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-[-10px] border border-dashed border-accent opacity-20 rounded-full"
               />
            </div>
            
            <h1 className="text-[48px] md:text-[64px] font-bold mb-[24px] leading-[1.1] tracking-[-0.04em]">
              Self-Sovereign Identity <br/>
              <span className="text-[20px] md:text-[28px] font-mono font-normal text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500 tracking-[0.1em] uppercase block mt-4">
                Created by Aryan Chavan & Tagor Naidu
              </span>
            </h1>
            <p className="text-[18px] text-text-main mb-[16px] font-mono leading-relaxed max-w-2xl bg-card border border-border p-6 rounded-lg break-words">
              How giving people control of their own digital identity makes the internet safer and stops giant companies from hoarding all our data.
            </p>
            <p className="text-[14px] text-text-dim mb-[40px] max-w-2xl text-center">
               This presentation explains how we can stop hackers and data leaks by changing how we log in to websites. Instead of giving websites our passwords and personal details, we keep them safe on our own devices using mathematics and blockchain.
            </p>
            
            <FuturisticButton onClick={initialize} pulsing active>
              <Zap className="w-4 h-4" /> Start The Guide
            </FuturisticButton>
          </motion.div>
        )}

        {init > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="absolute inset-0 flex items-center justify-center bg-bg z-20"
          >
            <div className="flex flex-col items-center gap-[24px] font-mono text-[14px]">
               <div className="w-[200px] h-[2px] bg-border relative overflow-hidden">
                 <motion.div 
                   className="absolute top-0 left-0 bottom-0 bg-accent"
                   initial={{ width: '0%' }}
                   animate={{ width: init === 1 ? '50%' : init >= 2 ? '100%' : '0%' }}
                   transition={{ duration: 1.5, ease: "easeInOut" }}
                 />
               </div>
               <div className="flex items-center gap-[12px]">
                 {init === 1 && <Loader2 className="w-4 h-4 text-accent animate-spin" />}
                 {init >= 2 && <Check className="w-4 h-4 text-green-400" />}
                 <span>{init === 1 ? 'PREPARING SIMPLE EXPLANATIONS...' : init === 2 ? 'LOADING VISUAL DIAGRAMS...' : 'READY TO LEARN'}</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ArchitectureSlide = () => {
  const [phase, setPhase] = useState<0|1|2|3>(0); 

  const triggerNext = () => {
    if (phase === 0) {
      setPhase(1);
      setTimeout(() => setPhase(2), 2500);
    } else if (phase === 2) {
       setPhase(3);
    } else if (phase === 3) {
       setPhase(0);
    }
  };

  return (
    <div className="h-full w-full p-[40px] flex flex-col overflow-y-auto">
      <SectionHeader title="How it Works: The Trust Triangle" moduleNum="01" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] flex-1">
        <div className="flex flex-col gap-[24px]">
          <p className="text-[15px] text-text-main leading-relaxed">
            Today, you leave your personal data on every website you visit. <strong>Self-Sovereign Identity (SSI)</strong> fixes this by creating a "Trust Triangle" between three parties. It works exactly like a physical passport, but entirely digital and matematically secure.
          </p>
          
          <div className="bg-card border border-border p-[24px] rounded-[8px] flex flex-col gap-[16px] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            <h3 className="text-[14px] font-mono text-accent uppercase flex justify-between items-center">
              <span>Interactive Analogy</span> 
              <span className="px-[6px] py-[2px] border border-border bg-bg text-[10px] rounded animate-pulse">LIVE</span>
            </h3>
            
            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.div key="p0" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-[13px] text-text-dim font-mono leading-relaxed">
                  &gt; STATUS: Waiting for your digital ID.<br/>
                  &gt; You (The User) have a secure digital wallet on your phone.<br/>
                  &gt; <span className="text-blue-400 font-bold">Action Required: Click '1. GET ID FROM GOV' to start.</span>
                </motion.div>
              )}
              {phase === 1 && (
                <motion.div key="p1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-[13px] text-accent font-mono leading-relaxed">
                  &gt; ACTION: The Authority (like a DMV or University) is verifying who you are...<br/>
                  &gt; They are mathematically signing your new digital card...<br/>
                  &gt; The digital card is being sent safely directly to your phone.
                </motion.div>
              )}
              {phase === 2 && (
                <motion.div key="p2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-[13px] text-green-400 font-mono leading-relaxed">
                  &gt; STATUS: You now keep the digital card on your phone!<br/>
                  &gt; The Authority DOES NOT track where you use it.<br/>
                  &gt; <span className="text-white font-bold">Action Required: Click '2. LOG IN TO WEBSITE'.</span>
                </motion.div>
              )}
              {phase === 3 && (
                <motion.div key="p3" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-[13px] text-purple-400 font-mono leading-relaxed">
                  &gt; ACTION: A Website asks "Are you over 18?"<br/>
                  &gt; Your phone uses math to prove "Yes" WITHOUT revealing your exact birthday.<br/>
                  &gt; SUCCESS: You are safely logged in without a password!
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 border-t border-border pt-4">
               <FuturisticButton 
                 onClick={triggerNext} 
                 active={phase === 0 || phase === 2}
                 disabled={phase === 1}
                 pulsing={phase === 0 || phase === 2}
               >
                 {phase === 0 ? "1. GET DIGITAL ID" : phase === 1 ? "Processing..." : phase === 2 ? "2. LOG IN TO WEBSITE" : "Reset Simulation"}
               </FuturisticButton>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            <div className="p-[16px] border border-border bg-card">
              <div className="font-mono text-[12px] text-accent mb-2 uppercase">1. Issuer</div>
              <div className="text-[13px] text-text-dim">The trusted organization (like a government) that gives you the digital credential.</div>
            </div>
            <div className="p-[16px] border border-border bg-card">
              <div className="font-mono text-[12px] text-green-400 mb-2 uppercase">2. Holder</div>
              <div className="text-[13px] text-text-dim">That's YOU. You keep the ID in your digital wallet on your phone.</div>
            </div>
            <div className="p-[16px] border border-border bg-card">
              <div className="font-mono text-[12px] text-purple-400 mb-2 uppercase">3. Verifier</div>
              <div className="text-[13px] text-text-dim">The website or app that asks to see your ID to let you log in or buy something.</div>
            </div>
          </div>
        </div>

        <div className="relative border border-border bg-bg flex items-center justify-center rounded-[8px] overflow-hidden min-h-[450px]">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Diagram Nodes */}
          <div className="relative w-full h-full p-[40px]">
            {/* Issuer */}
            <motion.div className={`absolute top-[40px] left-[50%] -translate-x-[50%] w-[140px] p-[16px] border border-border bg-card flex flex-col items-center gap-[8px] z-10 transition-colors ${phase === 1 ? 'border-accent shadow-[0_0_20px_rgba(6,182,212,0.3)]' : ''}`}>
              <Server className={`w-10 h-10 ${phase === 1 ? 'text-accent' : 'text-text-dim'}`} />
              <span className="font-mono text-[12px] uppercase">1. Issuer</span>
            </motion.div>
            
            {/* Wallet (Holder) */}
            <motion.div className={`absolute bottom-[80px] left-[40px] w-[140px] p-[16px] border border-border bg-card flex flex-col items-center gap-[8px] z-10 transition-colors ${phase === 2 ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.3)]' : ''}`}>
              <Smartphone className={`w-10 h-10 ${phase >= 2 ? 'text-green-400' : 'text-text-dim'}`} />
              <span className="font-mono text-[12px] uppercase">2. You (Wallet)</span>
            </motion.div>

            {/* Verifier */}
            <motion.div className={`absolute bottom-[80px] right-[40px] w-[140px] p-[16px] border border-border bg-card flex flex-col items-center gap-[8px] z-10 transition-colors ${phase === 3 ? 'border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.3)]' : ''}`}>
              <Search className={`w-10 h-10 ${phase === 3 ? 'text-purple-400' : 'text-text-dim'}`} />
              <span className="font-mono text-[12px] uppercase">3. Website</span>
            </motion.div>

            {/* Connecting Lines / Animations */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              {/* Line: Issuer -> Holder */}
              <line x1="50%" y1="90" x2="110" y2="100%" transform="translate(0, -80)" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="4 4" className="opacity-30" />
              {/* Line: Holder -> Verifier */}
              <line x1="110" y1="100%" x2="100%" y2="100%" transform="translate(0, -80)" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="4 4" className="opacity-30" />
              
              {/* Active Particle: Issuer -> Holder */}
              {phase === 1 && (
                <motion.circle r="6" fill="var(--color-accent)"
                  initial={{ cx: '50%', cy: 90 }}
                  animate={{ cx: '15%', cy: '80%' }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                  style={{ filter: 'drop-shadow(0 0 8px var(--color-accent))' }}
                />
              )}
              {/* Active Particle: Holder -> Verifier */}
              {(phase === 3) && (
                <motion.circle r="6" fill="#a855f7"
                  initial={{ cx: '15%', cy: '80%' }}
                  animate={{ cx: '85%', cy: '80%' }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  style={{ filter: 'drop-shadow(0 0 8px #a855f7)' }}
                />
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const MethodologyOSN = () => {
  const [running, setRunning] = useState(false);
  const [scores, setScores] = useState({ monopoly: 0, privacy: 0, shadow: 0 });

  const runDiagnostics = () => {
    setRunning(true);
    setScores({ monopoly: 0, privacy: 0, shadow: 0 });
    
    let iterations = 0;
    const interval = setInterval(() => {
      setScores({
        monopoly: Math.floor(Math.random() * 100),
        privacy: Math.floor(Math.random() * 100),
        shadow: Math.floor(Math.random() * 100),
      });
      iterations++;
      if (iterations > 15) {
        clearInterval(interval);
        setScores({ monopoly: 94, privacy: 88, shadow: 91 }); // Final bad Web2 scores
        setRunning(false);
      }
    }, 100);
  };

  const metrics = [
    { label: "Data Monopoly (Trapping You)", value: scores.monopoly },
    { label: "Privacy Violations (Spying)", value: scores.privacy },
    { label: "Bot Army Fake Accounts", value: scores.shadow }
  ];

  return (
    <div className="h-full w-full p-[40px] flex flex-col overflow-y-auto">
      <div className="flex justify-between items-start mb-[24px]">
        <SectionHeader title="What's Wrong With Today's Internet?" moduleNum="02" />
        <FuturisticButton onClick={runDiagnostics} pulsing disabled={running}>
          <ActivitySquare className="w-4 h-4" /> Scan Current Social Networks
        </FuturisticButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] flex-1">
        <div className="flex flex-col gap-[20px]">
          <p className="text-[16px] text-text-main leading-relaxed mb-4">
            Today's internet (like Facebook, X, and Google) is quite broken. When cyber-security experts evaluate how these central systems work, they find three massive problems: they trap your data, they spy on you, and they can't stop fake robot accounts.
          </p>

          <div className="bg-card border border-border p-[24px] flex flex-col gap-[20px]">
            <h3 className="font-mono text-[12px] text-accent uppercase tracking-widest border-b border-border pb-2">Vulnerability Scan Results</h3>
            <div className="flex flex-col gap-[24px]">
              {metrics.map((m, i) => (
                <div key={i} className="flex flex-col gap-[8px]">
                  <div className="flex justify-between font-mono text-[11px] text-text-main">
                    <span>{m.label}</span>
                    <span className={m.value > 80 ? 'text-red-400 font-bold' : 'text-accent'}>{m.value}%</span>
                  </div>
                  <div className="h-[6px] bg-bg w-full relative overflow-hidden rounded-full border border-border">
                    <motion.div 
                      className={`absolute top-0 left-0 bottom-0 ${m.value > 80 && !running ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-accent'}`}
                      animate={{ width: `${m.value}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {!running && scores.monopoly > 0 && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-4 p-[16px] border border-red-500/30 bg-red-500/10 text-red-200 text-[13px] font-mono leading-relaxed">
                &gt; CRITICAL ALERT: Traditional social networks show extremely dangerous levels of data hoarding. Because they keep millions of passwords in one place, they are a giant, incredibly rewarding target for hackers to steal from. 
              </motion.div>
            )}
          </div>
        </div>

        <div className="grid grid-rows-[auto_1fr_auto] gap-[16px]">
           {[
             { step: "Problem 1: Trapped Data", desc: "Big social networks lock your identity and friends list inside their walls. You can't just pick up your data and move to a competing app easily. They hold your online life hostage." },
             { step: "Problem 2: Hidden Tracking", desc: "These platforms track what you buy, read, and watch across the entire internet. They build a secret profile about you to sell targeted ads without asking for real permission." },
             { step: "Problem 3: Fake Accounts (Bots)", desc: "Because all it takes to make an account is a simple email and password, social networks are filled with millions of bots that spread scams and fake news." }
           ].map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="p-[20px] bg-card border border-border hover:border-accent hover:bg-accent-soft transition-colors cursor-default"
             >
               <h4 className="font-mono text-[14px] text-accent font-bold mb-[8px]">{item.step}</h4>
               <p className="text-[14px] text-text-dim leading-relaxed">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

const SecurityIssues = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const issues = [
    { 
      title: "The Giant Hacker Target", 
      icon: Database,
      subtitle: "Data Breaches",
      details: "Right now, websites store millions of user passwords in one giant database. It's like putting all of the town's gold into a single glass safe. If a hacker breaks in just once, millions of identities are stolen at the exact same time. Billions of passwords have already been stolen this way.",
      sim: "Hacker breaking into website database... \nBypassing firewall... \nStealing 1,000,000 passwords... \nPublishing them all online.",
      cost: "Results in Billions of dollars stolen globally"
    },
    { 
      title: "Fake Logins & Phishing",
      icon: Network,
      subtitle: "MitM Attacks",
      details: "Hackers constantly create fake websites or send text messages that look exactly like your real bank. Because the internet relies on you typing in a password, if you get tricked into typing yours on their fake site, they steal your account completely instantly.",
      sim: "Hacker sends fake text message to user... \nUser clicks fake 'Reset Password' link... \nUser types password... \nPassword Stolen! Account Drained.",
      cost: "The #1 way bank accounts are drained today"
    },
    { 
      title: "Secret Creeping",
      icon: Eye,
      subtitle: "Shadow Profiling",
      details: "Social networks track almost everything you do on the internet, even when you aren't using their app. They secretly watch your shopping habits, what articles you read, and who your family is, just so they can sell highly targeted advertisements.",
      sim: "Tracking user across 50 different websites... \nLogging shopping habits... \nTracking location data... \nBuilding secret marketing profile.",
      cost: "Massive loss of human privacy and freedom"
    }
  ];

  return (
    <div className="h-full w-full p-[40px] flex flex-col overflow-y-auto">
      <SectionHeader title="How Hackers Steal Your Identity Today" moduleNum="03" />

      <div className="flex flex-wrap gap-[12px] mb-[24px]">
        {issues.map((issue, idx) => (
          <FuturisticButton 
            key={idx} 
            onClick={() => setActiveTab(idx)} 
            active={activeTab === idx}
          >
            <issue.icon className="w-4 h-4" /> {issue.title}
          </FuturisticButton>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-[40px]">
        <motion.div 
          key={activeTab + "-text"}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-[20px]"
        >
          <div className="border border-border p-[32px] bg-card h-full flex flex-col justify-between shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
             <div>
               <div className="font-mono text-accent uppercase tracking-widest text-[12px] mb-2">{issues[activeTab].subtitle}</div>
               <h3 className="text-[32px] font-bold text-white mb-[24px] leading-tight">{issues[activeTab].title}</h3>
               <p className="text-[16px] text-text-dim leading-relaxed mb-[24px]">
                 {issues[activeTab].details}
               </p>
             </div>
             
             <div className="bg-bg border border-border p-[20px]">
                <div className="font-mono text-[10px] text-text-dim uppercase mb-[8px]">The Real World Cost</div>
                <div className="text-[18px] font-bold text-red-400">{issues[activeTab].cost}</div>
             </div>
          </div>
        </motion.div>

        <motion.div 
          key={activeTab + "-visual"}
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="relative border border-border bg-[#050505] overflow-hidden flex items-center justify-center font-mono text-[14px] p-[32px]"
        >
           {/* Hacker terminal simulation effect */}
           <div className="absolute top-0 left-0 w-full p-[8px] bg-[#111] border-b border-border text-[#444] text-[10px]">
             /var/log/sys/hacker_simulation.log
           </div>
           
           <div className="w-full text-green-500/80 break-words mt-[20px] leading-relaxed">
             <Typewriter text={`> INITIATING ATTACK VECTOR: ${issues[activeTab].subtitle.toUpperCase()}\n\n> ${issues[activeTab].sim}\n\n> STATUS: CRITICAL DAMAGE ALERTS TRIPPED.`} />
           </div>
           
           <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#000] to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

// Typewriter helper
const Typewriter = ({ text }: { text: string }) => {
  const [content, setContent] = useState('');
  useEffect(() => {
    let i = 0;
    setContent('');
    const t = setInterval(() => {
      setContent(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [text]);
  return <div className="whitespace-pre-wrap">{content}<span className="animate-pulse">_</span></div>;
}


interface GraphData {
  time: number;
  breachSeverity: number;
  ssiAdoption: number;
}

const LiveGraphSlide = () => {
  const [data, setData] = useState<GraphData[]>([]);
  const [paused, setPaused] = useState(false);
  
  // Predict live data
  useEffect(() => {
    const initial = [];
    let currentBreach = 100;
    let currentSSI = 20;
    
    for(let i=0; i<30; i++) {
       currentBreach = Math.max(10, currentBreach - (Math.random() * 5));
       currentSSI = currentSSI + (Math.random() * 6);
       initial.push({
         time: i,
         breachSeverity: Math.round(currentBreach),
         ssiAdoption: Math.round(currentSSI)
       });
    }
    setData(initial);
    
    let timeIndex = 30;
    const interval = setInterval(() => {
      if(paused) return;
      setData(prev => {
        const last = prev[prev.length - 1];
        const newData = [...prev.slice(1)];
        newData.push({
          time: timeIndex++,
          breachSeverity: Math.max(2, last.breachSeverity - (Math.random() * 3)),
          ssiAdoption: Math.min(100, last.ssiAdoption + (Math.random() * 4))
        });
        return newData;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="h-full w-full p-[40px] flex flex-col overflow-y-auto">
      <SectionHeader title="The Solution: Erasing Identity Theft" moduleNum="04" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] flex-1">
        <div className="bg-card border border-border p-[24px] flex flex-col gap-[20px] relative w-full min-h-[350px]">
          <div className="flex flex-col gap-[12px] z-10 relative">
            <div className="flex justify-between items-center w-full mb-4">
               <FuturisticButton onClick={() => setPaused(!paused)} active={!paused}>
                 {paused ? <Play className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />} {paused ? 'RESUME GRAPH' : 'LIVE PREDICTION GRAPH'}
               </FuturisticButton>
            </div>
            
            <div className="flex items-center gap-[16px] mb-2 scale-90 origin-left">
              <div className="flex items-center gap-2 font-mono text-[12px]">
                 <div className="w-4 h-4 bg-red-500 rounded-sm"></div> Hacks & Identity Theft
              </div>
              <div className="flex items-center gap-2 font-mono text-[12px]">
                 <div className="w-4 h-4 bg-accent rounded-sm"></div> People Switching to SSI
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBreach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSSI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="var(--color-text-dim)" fontSize={11} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text-main)', fontSize: '12px', fontFamily: 'monospace' }}
                  itemStyle={{ color: 'var(--color-text-main)' }}
                />
                <Area type="monotone" dataKey="breachSeverity" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorBreach)" isAnimationActive={false} />
                <Area type="monotone" dataKey="ssiAdoption" stroke="var(--color-accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorSSI)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-[20px] justify-center">
            <div className="border-l-4 border-accent pl-6 bg-card/50 p-6">
              <h3 className="text-[20px] font-bold mb-4">What this graph shows in plain English:</h3>
              <p className="text-[16px] text-text-dim leading-relaxed mb-4">
                The <strong className="text-accent">Blue Line</strong> shows more people adopting SSI—meaning they stop using passwords and start keeping their identity safe directly on their own phones using mathematics.
              </p>
              <p className="text-[16px] text-text-dim leading-relaxed">
                As this happens, the <strong className="text-red-400">Red Line</strong> (Identity Theft) completely collapses. Why? Because hackers no longer have giant databases full of passwords to attack. To steal identities, a hacker would literally have to steal millions of physical phones one by one from people's hands, which is physically impossible. 
                <br/><br/>By giving control back to the user, we permanently solve mass identity theft.
              </p>
            </div>
        </div>

      </div>
    </div>
  );
};

const Conclusion = () => {
  const [status, setStatus] = useState(0); // 0: idle, 1: deploying, 2: done
  
  const points = [
    { icon: Users, title: "1. You Own Your Identity", desc: "No big tech company can sell your habits or spy on you without your explicit permission.", color: "text-accent", bg: "bg-accent-soft", border: "border-accent" },
    { icon: CheckCircle2, title: "2. Businesses Stop Getting Hacked", desc: "Companies no longer store your passwords. Hackers have no giant databases left to steal from.", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/50" },
    { icon: Lock, title: "3. The End of Passwords", desc: "You never have to remember a password or get tricked by a fake website ever again.", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/50" }
  ];

  return (
    <div className="h-full w-full p-[40px] flex flex-col items-center justify-center relative overflow-y-auto">
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center z-10 my-auto">
        
        {/* Left Column: Summary */}
        <div className="flex flex-col gap-[24px]">
          <div className="mb-[16px]">
            <div className="font-mono text-[12px] text-accent uppercase tracking-[0.2em] flex items-center gap-[8px] mb-4">
              <TerminalSquare className="w-4 h-4" /> Final Summary
            </div>
            <h1 className="text-[36px] md:text-[48px] font-bold leading-tight text-white mb-6">
              A Safer Internet <br/><span className="text-accent">For Everyone</span>
            </h1>
            <p className="text-[16px] text-text-dim leading-relaxed">
              Moving away from giant social networks to Self-Sovereign Identity changes the internet forever in three major ways.
            </p>
          </div>

          <div className="flex flex-col gap-[16px]">
            {points.map((pt, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.15) }}
                className={`flex gap-[16px] items-start p-[20px] bg-card border border-border hover:border-accent hover:bg-accent-soft transition-colors rounded-[8px]`}
              >
                <div className={`p-3 rounded-full border ${pt.bg} ${pt.border} shrink-0`}>
                   <pt.icon className={`w-5 h-5 ${pt.color}`} />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-white mb-2">{pt.title}</h3>
                  <p className="text-text-dim text-[14px] leading-relaxed">{pt.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Terminal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="border border-border bg-[#050505] rounded-[8px] p-[40px] flex flex-col relative overflow-hidden h-[500px] shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        >
          <div className={`absolute top-0 left-0 w-full p-[8px] bg-[#111] border-b ${status === 2 ? 'border-green-500/50 text-green-400' : 'border-border text-[#666]'} text-[10px] font-mono flex justify-between transition-colors`}>
             <span>/system/web3_deployment.exe</span>
             <span>{status === 2 ? 'SECURE_MODE_ACTIVE' : 'AWAITING_DEPLOYMENT'}</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center mt-[24px] z-10 w-full relative">
            <AnimatePresence mode="wait">
              {status === 0 && (
                <motion.div key="s0" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col items-center w-full">
                  <ShieldAlert className="w-20 h-20 text-text-dim mb-8" />
                  <p className="text-[14px] font-mono text-text-dim mb-8">Legacy internet architecture detected. <br/>Centralized servers at maximum vulnerability.</p>
                  <FuturisticButton onClick={() => { setStatus(1); setTimeout(() => setStatus(2), 4000); }} pulsing active>
                    <Zap className="w-4 h-4" /> UPGRADE TO SECURE WEB
                  </FuturisticButton>
                </motion.div>
              )}
              {status === 1 && (
                <motion.div key="s1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col items-center w-full font-mono">
                  <Loader2 className="w-16 h-16 text-accent animate-spin mb-8" />
                  <div className="w-full h-[4px] bg-border rounded-full overflow-hidden mb-6">
                    <motion.div 
                      className="h-full bg-accent relative"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                    >
                       <span className="absolute top-0 right-0 w-[10px] h-full bg-white blur-[2px]"></span>
                    </motion.div>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[13px] text-accent uppercase"
                  >
                    <Typewriter text="Removing passwords... Detaching data silos... Initializing Sovereign Keys..." />
                  </motion.div>
                </motion.div>
              )}
              {status === 2 && (
                <motion.div key="s2" initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center w-full">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <ShieldCheck className="w-24 h-24 text-green-400 mb-8 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]" />
                  </motion.div>
                  <h2 className="text-[24px] font-bold text-green-400 mb-4 font-mono uppercase tracking-widest drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">System Secured</h2>
                  <p className="text-[14px] font-mono text-white/50">Welcome to the decentralized future.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Background Glow */}
          <motion.div 
             animate={{ opacity: status === 2 ? 0.15 : 0 }}
             className="absolute inset-0 bg-green-500 pointer-events-none transition-opacity duration-1000"
          />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {status === 2 && (
          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 0.1 }}
             className="absolute inset-0 pointer-events-none"
             style={{
               backgroundImage: 'linear-gradient(0deg, var(--color-bg) 10%, transparent 80%), repeating-linear-gradient(0deg, transparent, transparent 2px, #22c55e 3px, #22c55e 4px)',
               backgroundSize: '100% 100%, 100% 4px'
             }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ThankYouSlide = () => {
  return (
    <div className="h-full w-full p-[40px] flex flex-col items-center justify-center text-center relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl flex flex-col items-center z-10"
      >
        <div className="w-[100px] h-[100px] border border-accent bg-accent-soft flex items-center justify-center transform rotate-45 mb-[40px] relative shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-75 md:scale-100">
           <Hexagon className="w-12 h-12 text-accent -rotate-45 relative z-10" />
           <Fingerprint className="w-6 h-6 text-accent -rotate-45 absolute z-20" />
           <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute inset-[-15px] border border-dashed border-accent opacity-30 rounded-full"
           />
        </div>

        <h1 className="text-[64px] md:text-[80px] font-bold mb-[16px] leading-[1.1] tracking-[-0.04em] text-white">
          THANK YOU
        </h1>
        <div className="w-[60px] h-[4px] bg-accent mb-[32px]"></div>

        <p className="text-[18px] md:text-[20px] text-text-dim mb-[16px] font-mono leading-relaxed">
          Questions? Thoughts? Decentralized Musings?
        </p>
        
        <p className="text-[14px] text-accent font-mono uppercase tracking-[0.2em] mt-8 bg-card border border-border px-6 py-3">
          Presentation by Aryan Chavan & Tagor Naidu
        </p>
      </motion.div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-bg to-bg" />
      </div>
    </div>
  );
};

// SLIDE ORCHESTRATION
const slides = [
  { id: 'start', title: "Introduction", component: TitleSlide },
  { id: 'arch', title: "How It Works", component: ArchitectureSlide },
  { id: 'osn', title: "What's Wrong Today?", component: MethodologyOSN },
  { id: 'vuln', title: "How Hackers Steal Identities", component: SecurityIssues },
  { id: 'pred', title: "The Solution & Prediction", component: LiveGraphSlide },
  { id: 'end', title: "Conclusion", component: Conclusion },
  { id: 'thanks', title: "Thank You", component: ThankYouSlide }
];

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = 0;
      if (next >= slides.length) next = slides.length - 1;
      return next;
    });
  }, []);

  const goToSlide = (index: number) => {
    if(index === currentSlide) return;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent scrolling on space
      if(e.key === 'Space') e.preventDefault(); 
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const CurrentComponent = slides[currentSlide].component;

  return (
    <div className="w-screen h-screen bg-bg relative overflow-hidden flex flex-col text-text-main">
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
           key={currentSlide}
           custom={direction}
           initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: direction < 0 ? 50 : -50 }}
           transition={{ duration: 0.4, ease: "circOut" }}
           className="absolute inset-0"
        >
          <CurrentComponent nextSlide={() => goToSlide(1)} />
        </motion.div>
      </AnimatePresence>

      {/* Floating UI for controls */}
      <div className="absolute bottom-6 right-6 z-50 flex items-center gap-4">
        <div className="font-mono text-[12px] text-accent/50 bg-card/50 px-3 py-1 rounded-full border border-border/50 backdrop-blur-md">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
        <div className="flex bg-card/50 border border-border/50 rounded-full backdrop-blur-md overflow-hidden">
          <button 
            onClick={() => paginate(-1)} 
            disabled={currentSlide === 0}
            className="p-3 text-accent/70 hover:text-accent hover:bg-accent/10 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => paginate(1)} 
            disabled={currentSlide === slides.length - 1}
            className="p-3 text-accent/70 hover:text-accent hover:bg-accent/10 disabled:opacity-30 border-l border-border/50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
