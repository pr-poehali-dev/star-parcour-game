import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number;
  isJumping: boolean;
}

interface Star {
  x: number;
  y: number;
  collected: boolean;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Level {
  id: number;
  platforms: Platform[];
  stars: Star[];
  name: string;
}

const levels: Level[] = [
  {
    id: 1,
    name: "Космический старт",
    platforms: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 200, y: 450, width: 150, height: 20 },
      { x: 450, y: 350, width: 150, height: 20 },
      { x: 700, y: 250, width: 150, height: 20 },
    ],
    stars: [
      { x: 250, y: 400, collected: false },
      { x: 500, y: 300, collected: false },
      { x: 750, y: 200, collected: false },
    ]
  },
  {
    id: 2,
    name: "Прыжки через луну",
    platforms: [
      { x: 0, y: 550, width: 100, height: 50 },
      { x: 200, y: 500, width: 100, height: 20 },
      { x: 400, y: 400, width: 100, height: 20 },
      { x: 600, y: 300, width: 100, height: 20 },
      { x: 750, y: 550, width: 100, height: 50 },
    ],
    stars: [
      { x: 250, y: 450, collected: false },
      { x: 450, y: 350, collected: false },
      { x: 650, y: 250, collected: false },
      { x: 780, y: 500, collected: false },
    ]
  }
];

interface Game2DProps {
  onCollectStar: (count: number) => void;
  onLevelComplete: (levelId: number) => void;
  currentLevel: number;
}

export default function Game2D({ onCollectStar, onLevelComplete, currentLevel }: Game2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [player, setPlayer] = useState<GameObject>({
    x: 50,
    y: 500,
    width: 30,
    height: 30,
    velocityY: 0,
    isJumping: false
  });
  const [stars, setStars] = useState<Star[]>(levels[currentLevel - 1]?.stars || []);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [allStarsCollected, setAllStarsCollected] = useState(false);
  const [exitPortal, setExitPortal] = useState<{x: number, y: number} | null>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const animationFrameId = useRef<number>();

  const GRAVITY = 0.4;
  const JUMP_FORCE = -10;
  const MOVE_SPEED = 3;

  const currentLevelData = levels[currentLevel - 1];

  useEffect(() => {
    setStars(levels[currentLevel - 1]?.stars || []);
    setPlayer({
      x: 50,
      y: 500,
      width: 30,
      height: 30,
      velocityY: 0,
      isJumping: false
    });
    setGameStarted(false);
    setAllStarsCollected(false);
    setExitPortal(null);
  }, [currentLevel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' '].includes(e.key)) {
        e.preventDefault();
        keysPressed.current.add(e.key);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!gameStarted || isPaused || !currentLevelData) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();
    const targetFPS = 60;
    const frameDelay = 1000 / targetFPS;

    const gameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime < frameDelay) {
        animationFrameId.current = requestAnimationFrame(gameLoop);
        return;
      }
      
      lastTime = currentTime - (deltaTime % frameDelay);
      setPlayer(prevPlayer => {
        const newPlayer = { ...prevPlayer };

        if (keysPressed.current.has('ArrowLeft')) {
          newPlayer.x = Math.max(0, newPlayer.x - MOVE_SPEED);
        }
        if (keysPressed.current.has('ArrowRight')) {
          newPlayer.x = Math.min(canvas.width - newPlayer.width, newPlayer.x + MOVE_SPEED);
        }
        if ((keysPressed.current.has('ArrowUp') || keysPressed.current.has(' ')) && !newPlayer.isJumping) {
          newPlayer.velocityY = JUMP_FORCE;
          newPlayer.isJumping = true;
        }

        newPlayer.velocityY += GRAVITY;
        newPlayer.y += newPlayer.velocityY;

        let onPlatform = false;
        currentLevelData.platforms.forEach(platform => {
          if (
            newPlayer.x < platform.x + platform.width &&
            newPlayer.x + newPlayer.width > platform.x &&
            newPlayer.y + newPlayer.height > platform.y &&
            newPlayer.y + newPlayer.height < platform.y + platform.height &&
            newPlayer.velocityY > 0
          ) {
            newPlayer.y = platform.y - newPlayer.height;
            newPlayer.velocityY = 0;
            newPlayer.isJumping = false;
            onPlatform = true;
          }
        });

        if (newPlayer.y > canvas.height) {
          newPlayer.y = 500;
          newPlayer.x = 50;
          newPlayer.velocityY = 0;
        }

        return newPlayer;
      });

      setStars(prevStars => {
        const newStars = prevStars.map(star => {
          if (
            !star.collected &&
            player.x < star.x + 20 &&
            player.x + player.width > star.x &&
            player.y < star.y + 20 &&
            player.y + player.height > star.y
          ) {
            onCollectStar(1);
            return { ...star, collected: true };
          }
          return star;
        });

        const allCollected = newStars.every(s => s.collected);
        if (allCollected && newStars.length > 0 && !allStarsCollected) {
          setAllStarsCollected(true);
          setExitPortal({ x: canvas.width - 100, y: canvas.height - 100 });
        }

        return newStars;
      });

      if (exitPortal && allStarsCollected) {
        if (
          player.x < exitPortal.x + 50 &&
          player.x + player.width > exitPortal.x &&
          player.y < exitPortal.y + 50 &&
          player.y + player.height > exitPortal.y
        ) {
          setTimeout(() => {
            onLevelComplete(currentLevel);
            setAllStarsCollected(false);
            setExitPortal(null);
          }, 300);
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0A0E27');
      gradient.addColorStop(1, '#1a1033');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
      }

      currentLevelData.platforms.forEach(platform => {
        ctx.fillStyle = '#8B5CF6';
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        ctx.strokeStyle = '#D946EF';
        ctx.lineWidth = 2;
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
      });

      stars.forEach(star => {
        if (!star.collected) {
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(star.x + 10, star.y + 10, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FFF';
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('⭐', star.x + 10, star.y + 15);
        }
      });

      if (exitPortal) {
        const portalGradient = ctx.createRadialGradient(
          exitPortal.x + 25, exitPortal.y + 25, 10,
          exitPortal.x + 25, exitPortal.y + 25, 30
        );
        portalGradient.addColorStop(0, '#D946EF');
        portalGradient.addColorStop(0.5, '#8B5CF6');
        portalGradient.addColorStop(1, 'rgba(139, 92, 246, 0.3)');
        ctx.fillStyle = portalGradient;
        ctx.beginPath();
        ctx.arc(exitPortal.x + 25, exitPortal.y + 25, 30, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFF';
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🌀', exitPortal.x + 25, exitPortal.y + 35);
      }

      ctx.fillStyle = '#D946EF';
      ctx.fillRect(player.x, player.y, player.width, player.height);
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2;
      ctx.strokeRect(player.x, player.y, player.width, player.height);

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameStarted, isPaused, player.x, player.y, currentLevelData]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        className="border-4 border-primary rounded-lg"
      />
      
      {!gameStarted && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">{currentLevelData?.name}</h3>
            <p className="text-muted-foreground">Используй стрелки ← → для движения</p>
            <p className="text-muted-foreground">Пробел или ↑ для прыжка</p>
            <Button onClick={() => setGameStarted(true)} size="lg">
              <Icon name="Play" className="mr-2" size={20} />
              Начать игру
            </Button>
          </div>
        </div>
      )}

      {isPaused && gameStarted && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Пауза</h3>
            <div className="flex gap-4">
              <Button onClick={() => setIsPaused(false)}>
                <Icon name="Play" className="mr-2" size={20} />
                Продолжить
              </Button>
              <Button variant="outline" onClick={() => {
                setGameStarted(false);
                setIsPaused(false);
                setPlayer({
                  x: 50,
                  y: 500,
                  width: 30,
                  height: 30,
                  velocityY: 0,
                  isJumping: false
                });
                setStars(levels[currentLevel - 1]?.stars || []);
              }}>
                <Icon name="RotateCcw" className="mr-2" size={20} />
                Заново
              </Button>
            </div>
          </div>
        </div>
      )}

      {gameStarted && !isPaused && (
        <Button
          className="absolute top-4 right-4"
          variant="secondary"
          size="icon"
          onClick={() => setIsPaused(true)}
        >
          <Icon name="Pause" size={20} />
        </Button>
      )}
    </div>
  );
}