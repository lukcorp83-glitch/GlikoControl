import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export function GlikoSenseCollision() {
  const [stage, setStage] = useState<'initial' | 'approaching' | 'impact' | 'merged'>('initial');

  // Osobne cząsteczki dla wybuchu
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 350 + 80; 
      return {
        id: i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        size: Math.random() * 8 + 3,
        color: ['bg-purple-500', 'bg-pink-500', 'bg-blue-400', 'bg-white', 'bg-purple-300'][Math.floor(Math.random() * 5)],
        delay: Math.random() * 0.1
      };
    });
  }, []);

  useEffect(() => {
    let mounted = true;

    const runSequence = async () => {
      while (mounted) {
        setStage('initial');
        await new Promise(r => setTimeout(r, 800));
        if (!mounted) break;
        
        setStage('approaching');
        await new Promise(r => setTimeout(r, 1500)); // Zwolnione z 500ms
        if (!mounted) break;

        setStage('impact');
        await new Promise(r => setTimeout(r, 600)); // Wydłużony wstrząs
        if (!mounted) break;

        setStage('merged');
        await new Promise(r => setTimeout(r, 4000));
      }
    };

    runSequence();

    return () => { mounted = false; };
  }, []);

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center overflow-hidden bg-slate-950 rounded-[32px] border border-slate-800 shadow-2xl my-12">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-brand-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Screen shake container */}
      <motion.div 
        animate={stage === 'impact' ? {
          x: [-15, 15, -15, 15, -10, 10, -5, 5, 0],
          y: [-15, 15, -10, 10, -5, 5, -2, 2, 0]
        } : { x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 h-32 flex items-center justify-center w-full"
      >
        <AnimatePresence>
          {stage === 'approaching' && (
            <>
              <motion.div
                key="left-text"
                initial={{ x: -1000, opacity: 0, filter: 'blur(5px)' }}
                animate={{ x: -100, opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
                transition={{ duration: 1.5, ease: "easeIn" }}
                className="absolute text-5xl md:text-7xl font-black text-white px-4 whitespace-nowrap"
              >
                GlikoSense
              </motion.div>

              <motion.div
                key="right-text"
                initial={{ x: 1000, opacity: 0, filter: 'blur(5px)' }}
                animate={{ x: 100, opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
                transition={{ duration: 1.5, ease: "easeIn" }}
                className="absolute text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 px-4 whitespace-nowrap"
              >
                AI
              </motion.div>
            </>
          )}

          {/* Impact Flash and Particles */}
          {stage === 'impact' && (
            <>
              {/* Huge flash */}
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [2, 20], opacity: [1, 0] }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-32 h-32 bg-white rounded-full mix-blend-overlay blur-xl z-20"
              />
              
              {/* Particles explosion */}
              {particles.map(p => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{ 
                    x: p.x, 
                    y: p.y, 
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0]
                  }}
                  transition={{ 
                    duration: 0.8 + Math.random() * 0.5, 
                    ease: "easeOut",
                    delay: p.delay 
                  }}
                  className={cn("absolute rounded-full z-30 shadow-[0_0_10px_rgba(255,255,255,0.8)]", p.color)}
                  style={{ width: p.size, height: p.size }}
                />
              ))}
            </>
          )}

          {/* Merged Text */}
          {stage === 'merged' && (
            <motion.div
              key="merged-text"
              initial={{ scale: 3, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="absolute text-5xl md:text-7xl font-black text-center flex items-center justify-center gap-4 z-40 drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]"
            >
              <span className="text-white drop-shadow-xl z-10 relative">GlikoSense</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-2xl z-10 relative">AI</span>
              
              {/* Subtle continuous glow for the merged text */}
              <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-purple-500/20 blur-[30px] z-0" 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: stage === 'merged' ? 1 : 0,
          y: stage === 'merged' ? 0 : 20
        }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute bottom-16 flex items-center gap-3 text-slate-300 font-medium tracking-wide border border-slate-700/80 bg-slate-900/80 px-6 py-3 rounded-full backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.4)]"
      >
        <Zap size={18} className="text-pink-400 animate-pulse" />
        <span className="uppercase text-sm md:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
          sieć neuronowa idealnie współpracująca z AI
        </span>
      </motion.div>
    </div>
  );
}
