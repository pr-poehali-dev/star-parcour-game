import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface PlayerAccount {
  nickname: string;
  balance: number;
  id: string;
  background: string;
  completedLevels: number[];
}

interface AccountViewProps {
  onNavigate: (view: string) => void;
  player: PlayerAccount;
}

export default function AccountView({ onNavigate, player }: AccountViewProps) {
  return (
    <div className="min-h-screen stars-bg p-8">
      <Card className="max-w-2xl mx-auto p-8 bg-card/95 backdrop-blur">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Аккаунт</h2>
          <Button variant="ghost" onClick={() => onNavigate('menu')}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Ваш никнейм</div>
            <div className="text-2xl font-bold">{player.nickname}</div>
          </div>

          <div className="p-6 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">ID игрока</div>
            <div className="text-xl font-mono">{player.id}</div>
          </div>

          <div className="p-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg border-2 border-primary">
            <div className="text-sm text-muted-foreground mb-2">Баланс звёзд</div>
            <div className="text-3xl font-bold flex items-center">
              <Icon name="Star" className="mr-2 text-yellow-400" size={32} />
              {player.balance}
            </div>
          </div>

          <div className="p-6 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Текущий фон</div>
            <div className="text-xl">{player.background === 'default' ? 'Стандартный' : player.background}</div>
          </div>

          <div className="p-6 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Пройдено уровней</div>
            <div className="text-2xl font-bold">{player.completedLevels.length} / 2</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
