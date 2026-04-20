import React, { useState } from "react";
import { SnakeGame } from "./components/SnakeGame";
import { MusicPlayer } from "./components/MusicPlayer";
import { Gamepad2, Music, Trophy } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative font-sans">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <header className="relative z-10 w-full max-w-6xl flex flex-col items-center mb-8">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-2"
        >
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Gamepad2 size={32} className="text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter bg-gradient-to-r from-cyan-400 via-white to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
            Neon Snake
          </h1>
        </motion.div>
        <p className="text-white/40 text-sm font-mono tracking-[0.3em] uppercase">Arcade Edition // Alpha 1.0</p>
      </header>

      <main className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_400px_1fr] gap-8 items-center">
        {/* Left Stats Section */}
        <div className="hidden lg:flex flex-col gap-6">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="text-yellow-500" size={24} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white/60">Session High</h2>
            </div>
            <div className="text-5xl font-black font-mono text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              {score.toString().padStart(4, '0')}
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
          >
            <h2 className="text-sm font-bold uppercase tracking-wider text-pink-500 mb-4 tracking-[0.2em]">Live Feed</h2>
            <div className="space-y-3 font-mono text-[10px] text-white/40 uppercase">
              <p className="flex justify-between border-b border-white/5 pb-1">
                <span>System</span>
                <span className="text-cyan-400">Online</span>
              </p>
              <p className="flex justify-between border-b border-white/5 pb-1">
                <span>Vibe Check</span>
                <span className="text-pink-500">Passed</span>
              </p>
              <p className="flex justify-between border-b border-white/5 pb-1">
                <span>Latency</span>
                <span>2ms</span>
              </p>
              <p className="flex justify-between">
                <span>Location</span>
                <span>Sector 7G</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Center Game Section */}
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="relative"
        >
           <SnakeGame onScoreChange={setScore} />
        </motion.div>

        {/* Right Music Player Section */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col gap-6 items-center lg:items-start"
        >
          <div className="lg:hidden flex items-center gap-6 w-full mb-4">
             <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded-2xl">
               <span className="block text-[10px] text-white/40 uppercase mb-1 font-bold">Score</span>
               <span className="text-2xl font-black font-mono text-cyan-400">{score}</span>
             </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2 lg:ml-2">
            <Music size={16} className="text-pink-500" />
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Now Vibrating</h2>
          </div>
          <MusicPlayer />
        </motion.div>
      </main>

      <footer className="relative z-10 mt-12 text-white/20 text-[9px] uppercase tracking-[0.5em] font-mono">
        &copy; 2026 DIGITAL DRIFT // NEON ARCADE
      </footer>

      {/* Decorative Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
}

