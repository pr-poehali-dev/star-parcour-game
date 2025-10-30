import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Game2D from '@/components/Game2D';

interface GameViewProps {
  onNavigate: (view: string) => void;
  currentLevel: number;
  onLevelChange: (level: number) => void;
  playerBalance: number;
  onCollectStar: (count: number) => void;
  onLevelComplete: (levelId: number) => void;
}

export default function GameView({
  onNavigate,
  currentLevel,
  onLevelChange,
  playerBalance,
  onCollectStar,
  onLevelComplete
}: GameViewProps) {
  return (
    <div className="min-h-screen stars-bg p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => onNavigate('menu')}>
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            В меню
          </Button>
          <div className="flex gap-4 items-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Icon name="Star" className="mr-2" size={20} />
              {playerBalance} звёзд
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Уровень {currentLevel}
            </Badge>
          </div>
        </div>

        <div className="flex justify-center">
          <Game2D
            onCollectStar={onCollectStar}
            onLevelComplete={onLevelComplete}
            currentLevel={currentLevel}
          />
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={() => onLevelChange(Math.max(1, currentLevel - 1))}
            disabled={currentLevel === 1}
            variant="outline"
          >
            <Icon name="ChevronLeft" className="mr-2" size={20} />
            Предыдущий
          </Button>
          <Button
            onClick={() => onLevelChange(Math.min(2, currentLevel + 1))}
            disabled={currentLevel === 2}
            variant="outline"
          >
            Следующий
            <Icon name="ChevronRight" className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
