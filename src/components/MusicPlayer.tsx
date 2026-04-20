import React, { useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DUMMY_TRACKS } from "../constants";

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-sm bg-[#12122b] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
      <div className="relative aspect-square mb-6 overflow-hidden rounded-xl group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentTrack.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {isPlaying && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-cyan-500/30 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="h-full w-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{currentTrack.title}</h3>
          <p className="text-sm text-cyan-400 font-medium opacity-80">{currentTrack.artist}</p>
        </div>
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`p-2 rounded-full transition-colors ${isLiked ? 'text-pink-500 bg-pink-500/10' : 'text-white/40'}`}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Progress Bar placeholder */}
      <div className="mb-8">
        <div className="h-1 w-full bg-white/5 rounded-full relative overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-pink-500 shadow-[0_0_10px_#ec4899]"
            animate={{ width: isPlaying ? "100%" : "30%" }}
            transition={isPlaying ? { duration: 120, ease: "linear" } : { duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] font-mono text-white/30">0:45</span>
          <span className="text-[10px] font-mono text-white/30">{currentTrack.duration}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button 
          onClick={prevTrack}
          className="text-white/60 hover:text-cyan-400 transition-colors transform active:scale-95"
        >
          <SkipBack size={24} />
        </button>

        <button 
          onClick={togglePlay}
          className="w-14 h-14 flex items-center justify-center bg-cyan-500 text-black rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transform active:scale-90"
        >
          {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} className="ml-1" fill="currentColor" />}
        </button>

        <button 
          onClick={nextTrack}
          className="text-white/60 hover:text-cyan-400 transition-colors transform active:scale-95"
        >
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  );
};
