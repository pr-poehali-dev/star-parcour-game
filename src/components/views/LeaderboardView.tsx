import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface LeaderboardEntry {
  rank: number;
  nickname: string;
  stars: number;
  levels: number;
}

interface LeaderboardViewProps {
  onNavigate: (view: string) => void;
  leaderboardData: LeaderboardEntry[];
  playerNickname: string;
}

export default function LeaderboardView({
  onNavigate,
  leaderboardData,
  playerNickname
}: LeaderboardViewProps) {
  return (
    <div className="min-h-screen stars-bg p-8">
      <Card className="max-w-3xl mx-auto p-8 bg-card/95 backdrop-blur">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center">
            <Icon name="Trophy" className="mr-3 text-yellow-400" size={32} />
            Таблица лидеров
          </h2>
          <Button variant="ghost" onClick={() => onNavigate('menu')}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="space-y-3">
          {leaderboardData.map((entry) => (
            <Card
              key={entry.rank}
              className={`p-4 ${entry.nickname === playerNickname ? 'border-2 border-primary' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`text-2xl font-bold ${entry.rank <= 3 ? 'text-yellow-400' : ''}`}>
                    #{entry.rank}
                  </div>
                  <div>
                    <div className="font-bold">{entry.nickname}</div>
                    <div className="text-sm text-muted-foreground">
                      {entry.levels} уровней пройдено
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Icon name="Star" className="mr-2 text-yellow-400" size={20} />
                  {entry.stars}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
