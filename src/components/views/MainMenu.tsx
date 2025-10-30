import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface MainMenuProps {
  onNavigate: (view: string) => void;
  completedLevelsCount: number;
}

export default function MainMenu({ onNavigate, completedLevelsCount }: MainMenuProps) {
  return (
    <div className="min-h-screen stars-bg flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl p-8 bg-card/95 backdrop-blur">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in">
            Космический Паркур
          </h1>
          <p className="text-muted-foreground">Собирай звёзды и покоряй галактику!</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => onNavigate('game')}
            className="w-full h-16 text-xl"
            size="lg"
          >
            <Icon name="Play" className="mr-2" size={24} />
            Играть
          </Button>

          <Button
            onClick={() => onNavigate('game')}
            variant="outline"
            className="w-full h-16 text-xl"
            size="lg"
          >
            <Icon name="CheckCircle2" className="mr-2" size={24} />
            Пройденные уровни ({completedLevelsCount})
          </Button>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <Button variant="secondary" size="lg" asChild>
              <a href="https://t.me/+QgiLIa1gFRY4Y2Iy" target="_blank" rel="noopener noreferrer">
                <Icon name="Send" className="mr-2" size={20} />
                Telegram
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Icon name="Youtube" className="mr-2" size={20} />
                YouTube
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                <Icon name="Heart" className="mr-2" size={20} />
                ВК
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button onClick={() => onNavigate('shop')} variant="outline" size="lg">
              <Icon name="ShoppingCart" className="mr-2" size={20} />
              Магазин
            </Button>
            <Button onClick={() => onNavigate('account')} variant="outline" size="lg">
              <Icon name="User" className="mr-2" size={20} />
              Аккаунт
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => onNavigate('rules')} variant="ghost" size="lg">
              <Icon name="BookOpen" className="mr-2" size={20} />
              Правила
            </Button>
            <Button onClick={() => onNavigate('leaderboard')} variant="ghost" size="lg">
              <Icon name="Trophy" className="mr-2" size={20} />
              Рейтинг
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => onNavigate('news')} variant="ghost" size="lg">
              <Icon name="Newspaper" className="mr-2" size={20} />
              Новости
            </Button>
            <Button onClick={() => onNavigate('support')} variant="ghost" size="lg">
              <Icon name="MessageCircle" className="mr-2" size={20} />
              Поддержка
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
