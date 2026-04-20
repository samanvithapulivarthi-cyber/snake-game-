import React, { useEffect, useRef, useState, useCallback } from "react";
import { Point, Direction } from "../types";
import { GRID_SIZE, INITIAL_SPEED, SPEED_INCREMENT, MIN_SPEED } from "../constants";

interface SnakeGameProps {
  onScoreChange: (score: number) => void;
}

export const SnakeGame: React.FC<SnakeGameProps> = ({ onScoreChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const gameLoopRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef<number>(0);
  const speedRef = useRef(INITIAL_SPEED);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection("RIGHT");
    setIsGameOver(false);
    setScore(0);
    onScoreChange(0);
    speedRef.current = INITIAL_SPEED;
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        case " ":
          if (isGameOver) resetGame();
          else setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, isGameOver]);

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case "UP": newHead.y -= 1; break;
        case "DOWN": newHead.y += 1; break;
        case "LEFT": newHead.x -= 1; break;
        case "RIGHT": newHead.x += 1; break;
      }

      // Border collision
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setIsGameOver(true);
        setIsPaused(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => {
          const newScore = s + 10;
          onScoreChange(newScore);
          return newScore;
        });
        setFood(generateFood(newSnake));
        speedRef.current = Math.max(MIN_SPEED, speedRef.current - SPEED_INCREMENT);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, generateFood, onScoreChange]);

  useEffect(() => {
    const animate = (time: number) => {
      if (!isPaused && !isGameOver) {
        if (time - lastUpdateTimeRef.current > speedRef.current) {
          moveSnake();
          lastUpdateTimeRef.current = time;
        }
      }

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx && canvas) {
        const cellSize = canvas.width / GRID_SIZE;

        // Clear
        ctx.fillStyle = "#0c0c1e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Grid (Subtle)
        ctx.strokeStyle = "rgba(45, 45, 90, 0.3)";
        ctx.lineWidth = 1;
        for (let i = 0; i <= GRID_SIZE; i++) {
          ctx.beginPath();
          ctx.moveTo(i * cellSize, 0);
          ctx.lineTo(i * cellSize, canvas.height);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, i * cellSize);
          ctx.lineTo(canvas.width, i * cellSize);
          ctx.stroke();
        }

        // Draw Food (Neon Pink)
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff00ff";
        ctx.fillStyle = "#ff00ff";
        ctx.beginPath();
        ctx.arc(
          food.x * cellSize + cellSize / 2,
          food.y * cellSize + cellSize / 2,
          cellSize / 2.5,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Draw Snake (Neon Cyan)
        ctx.shadowColor = "#00ffff";
        ctx.fillStyle = "#00ffff";
        snake.forEach((segment, index) => {
          ctx.shadowBlur = index === 0 ? 20 : 10;
          const padding = 2;
          ctx.fillRect(
            segment.x * cellSize + padding,
            segment.y * cellSize + padding,
            cellSize - padding * 2,
            cellSize - padding * 2
          );
        });

        // Reset shadow
        ctx.shadowBlur = 0;
      }

      gameLoopRef.current = requestAnimationFrame(animate);
    };

    gameLoopRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [snake, food, isPaused, isGameOver, moveSnake]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative group p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="rounded-lg cursor-none"
          style={{ width: "min(90vw, 400px)", height: "min(90vw, 400px)" }}
        />
        
        {(isPaused || isGameOver) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg transition-all duration-300">
            {isGameOver ? (
              <div className="text-center">
                <h2 className="text-4xl font-black text-pink-500 mb-2 uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
                  Game Over
                </h2>
                <p className="text-cyan-400 font-mono mb-6">Final Score: {score}</p>
                <button
                  onClick={resetGame}
                  className="px-6 py-2 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-400 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                >
                  REPLAY
                </button>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-4xl font-black text-cyan-400 mb-2 uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                  Paused
                </h2>
                <p className="text-pink-400/80 text-sm font-mono animate-pulse">
                  Press SPACE to Resume
                </p>
                <button
                  onClick={() => setIsPaused(false)}
                  className="mt-6 px-6 py-2 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                >
                  START
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-white/40 font-mono uppercase tracking-[0.2em]">
          Move: Arrow Keys | Pause: Space
        </p>
      </div>
    </div>
  );
};
