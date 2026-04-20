import { Track } from "./types";

export const DUMMY_TRACKS: Track[] = [
  {
    id: "1",
    title: "Neon Horizon",
    artist: "SynthWave AI",
    duration: "3:45",
    cover: "https://picsum.photos/seed/synth1/400/400",
  },
  {
    id: "2",
    title: "Electric Dreams",
    artist: "Cyber Sonic",
    duration: "4:12",
    cover: "https://picsum.photos/seed/cyber2/400/400",
  },
  {
    id: "3",
    title: "Midnight Grid",
    artist: "Retro Pulse",
    duration: "2:58",
    cover: "https://picsum.photos/seed/retro3/400/400",
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const SPEED_INCREMENT = 2;
export const MIN_SPEED = 50;
