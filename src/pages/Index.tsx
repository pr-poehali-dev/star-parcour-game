import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Game2D from '@/components/Game2D';

interface PlayerAccount {
  nickname: string;
  balance: number;
  id: string;
  background: string;
  completedLevels: number[];
}

interface ShopItem {
  id: string;
  name: string;
  price: number;
  type: 'skin' | 'game-bg' | 'profile-bg';
  image: string;
  purchased: boolean;
}

export default function Index() {
  const [currentView, setCurrentView] = useState<'menu' | 'game' | 'account' | 'shop' | 'rules' | 'leaderboard' | 'news' | 'support'>('menu');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [player, setPlayer] = useState<PlayerAccount>({
    nickname: 'TEST-PIL-124',
    balance: 0,
    id: '000001',
    background: 'default',
    completedLevels: []
  });
  const [shopItems, setShopItems] = useState<ShopItem[]>([
    { id: '1', name: 'Космический герой', price: 50, type: 'skin', image: '🚀', purchased: false },
    { id: '2', name: 'Звёздный странник', price: 75, type: 'skin', image: '⭐', purchased: false },
    { id: '3', name: 'Галактика', price: 100, type: 'game-bg', image: '🌌', purchased: false },
    { id: '4', name: 'Туманность', price: 120, type: 'game-bg', image: '🌠', purchased: false },
    { id: '5', name: 'Звёздное небо', price: 80, type: 'profile-bg', image: '✨', purchased: false },
  ]);
  const [selectedShopCategory, setSelectedShopCategory] = useState<'skin' | 'game-bg' | 'profile-bg'>('skin');

  const handleCollectStar = (count: number) => {
    setPlayer(prev => ({ ...prev, balance: prev.balance + count * 10 }));
  };

  const handleLevelComplete = (levelId: number) => {
    setPlayer(prev => ({
      ...prev,
      completedLevels: [...new Set([...prev.completedLevels, levelId])]
    }));
  };

  const handlePurchase = (itemId: string) => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item || item.purchased || player.balance < item.price) return;

    setPlayer(prev => ({ ...prev, balance: prev.balance - item.price }));
    setShopItems(prev => prev.map(i => i.id === itemId ? { ...i, purchased: true } : i));
  };

  const leaderboardData = [
    { rank: 1, nickname: 'STAR-MASTER', stars: 1250, levels: 10 },
    { rank: 2, nickname: 'COSMIC-HERO', stars: 980, levels: 8 },
    { rank: 3, nickname: player.nickname, stars: player.balance, levels: player.completedLevels.length },
    { rank: 4, nickname: 'SPACE-ACE', stars: 750, levels: 7 },
    { rank: 5, nickname: 'GALAXY-PRO', stars: 620, levels: 6 },
  ];

  const newsItems = [
    { id: 1, title: 'Новый уровень "Прыжки через луну"', date: '25.10.2025', content: 'Добавлен сложный уровень с новыми препятствиями!' },
    { id: 2, title: 'Система достижений', date: '20.10.2025', content: 'Скоро появятся специальные награды за прохождение!' },
    { id: 3, title: 'Обновление магазина', date: '15.10.2025', content: 'Новые скины и фоны теперь доступны!' },
  ];

  const MainMenu = () => (
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
            onClick={() => setCurrentView('game')}
            className="w-full h-16 text-xl"
            size="lg"
          >
            <Icon name="Play" className="mr-2" size={24} />
            Играть
          </Button>

          <Button
            onClick={() => setCurrentView('game')}
            variant="outline"
            className="w-full h-16 text-xl"
            size="lg"
          >
            <Icon name="CheckCircle2" className="mr-2" size={24} />
            Пройденные уровни ({player.completedLevels.length})
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
            <Button onClick={() => setCurrentView('shop')} variant="outline" size="lg">
              <Icon name="ShoppingCart" className="mr-2" size={20} />
              Магазин
            </Button>
            <Button onClick={() => setCurrentView('account')} variant="outline" size="lg">
              <Icon name="User" className="mr-2" size={20} />
              Аккаунт
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => setCurrentView('rules')} variant="ghost" size="lg">
              <Icon name="BookOpen" className="mr-2" size={20} />
              Правила
            </Button>
            <Button onClick={() => setCurrentView('leaderboard')} variant="ghost" size="lg">
              <Icon name="Trophy" className="mr-2" size={20} />
              Рейтинг
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => setCurrentView('news')} variant="ghost" size="lg">
              <Icon name="Newspaper" className="mr-2" size={20} />
              Новости
            </Button>
            <Button onClick={() => setCurrentView('support')} variant="ghost" size="lg">
              <Icon name="MessageCircle" className="mr-2" size={20} />
              Поддержка
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const GameView = () => (
    <div className="min-h-screen stars-bg p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => setCurrentView('menu')}>
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            В меню
          </Button>
          <div className="flex gap-4 items-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Icon name="Star" className="mr-2" size={20} />
              {player.balance} звёзд
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Уровень {currentLevel}
            </Badge>
          </div>
        </div>

        <div className="flex justify-center">
          <Game2D
            onCollectStar={handleCollectStar}
            onLevelComplete={handleLevelComplete}
            currentLevel={currentLevel}
          />
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={() => setCurrentLevel(Math.max(1, currentLevel - 1))}
            disabled={currentLevel === 1}
            variant="outline"
          >
            <Icon name="ChevronLeft" className="mr-2" size={20} />
            Предыдущий
          </Button>
          <Button
            onClick={() => setCurrentLevel(Math.min(2, currentLevel + 1))}
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

  const AccountView = () => (
    <div className="min-h-screen stars-bg p-8">
      <Card className="max-w-2xl mx-auto p-8 bg-card/95 backdrop-blur">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Аккаунт</h2>
          <Button variant="ghost" onClick={() => setCurrentView('menu')}>
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

  const ShopView = () => (
    <div className="min-h-screen stars-bg p-8">
      <Card className="max-w-4xl mx-auto p-8 bg-card/95 backdrop-blur">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Магазин</h2>
          <div className="flex gap-4 items-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Icon name="Star" className="mr-2" size={20} />
              {player.balance} звёзд
            </Badge>
            <Button variant="ghost" onClick={() => setCurrentView('menu')}>
              <Icon name="X" size={24} />
            </Button>
          </div>
        </div>

        <Tabs value={selectedShopCategory} onValueChange={(v) => setSelectedShopCategory(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skin">Скины</TabsTrigger>
            <TabsTrigger value="game-bg">Фон игры</TabsTrigger>
            <TabsTrigger value="profile-bg">Фон профиля</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedShopCategory} className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              {shopItems
                .filter(item => item.type === selectedShopCategory)
                .map(item => (
                  <Card key={item.id} className="p-6">
                    <div className="text-6xl text-center mb-4">{item.image}</div>
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-lg">
                        <Icon name="Star" className="mr-1" size={16} />
                        {item.price}
                      </Badge>
                      <Button
                        onClick={() => handlePurchase(item.id)}
                        disabled={item.purchased || player.balance < item.price}
                        size="sm"
                      >
                        {item.purchased ? 'Куплено' : 'Купить'}
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );

  const RulesView = () => (
    <div className="min-h-screen stars-bg p-8">
      <Card className="max-w-3xl mx-auto p-8 bg-card/95 backdrop-blur">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Правила игры</h2>
          <Button variant="ghost" onClick={() => setCurrentView('menu')}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Icon name="Gamepad2" className="mr-2" size={24} />
              Управление
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Стрелка влево/вправо - движение персонажа</li>
              <li>• Стрелка вверх или Пробел - прыжок</li>
              <li>• Кнопка паузы - приостановить игру</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Icon name="Star" className="mr-2 text-yellow-400" size={24} />
              Цель игры
            </h3>
            <p className="text-muted-foreground">
              Собери все звёзды на уровне, чтобы пройти его. За каждую звезду ты получаешь 10 очков.
              Используй платформы для перемещения и прыжков. Будь осторожен - падение с уровня вернёт тебя на старт!
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Icon name="ShoppingCart" className="mr-2" size={24} />
              Магазин
            </h3>
            <p className="text-muted-foreground">
              Накопленные звёзды можно потратить в магазине на новые скины персонажа и фоны для игры и профиля.
              Цены варьируются от 50 до 120 звёзд.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Icon name="Trophy" className="mr-2" size={24} />
              Прогресс
            </h3>
            <p className="text-muted-foreground">
              Твой прогресс сохраняется автоматически. Ты можешь видеть количество пройденных уровней
              в профиле и сравнивать свои результаты с другими игроками в таблице лидеров.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  const LeaderboardView = () => (
    <div className="min-h-screen stars-bg p-8">
      <Card className="max-w-3xl mx-auto p-8 bg-card/95 backdrop-blur">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center">
            <Icon name="Trophy" className="mr-3 text-yellow-400" size={32} />
            Таблица лидеров
          </h2>
          <Button variant="ghost" onClick={() => setCurrentView('menu')}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="space-y-3">
          {leaderboardData.map((entry) => (
            <Card
              key={entry.rank}
              className={`p-4 ${entry.nickname === player.nickname ? 'border-2 border-primary' : ''}`}
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

  const NewsView = () => (
    <div className="min-h-screen stars-bg p-8">
      <Card className="max-w-3xl mx-auto p-8 bg-card/95 backdrop-blur">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center">
            <Icon name="Newspaper" className="mr-3" size={32} />
            Новости
          </h2>
          <Button variant="ghost" onClick={() => setCurrentView('menu')}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="space-y-4">
          {newsItems.map((news) => (
            <Card key={news.id} className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold">{news.title}</h3>
                <Badge variant="outline">{news.date}</Badge>
              </div>
              <p className="text-muted-foreground">{news.content}</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );

  const SupportView = () => (
    <div className="min-h-screen stars-bg p-8">
      <Card className="max-w-3xl mx-auto p-8 bg-card/95 backdrop-blur">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center">
            <Icon name="MessageCircle" className="mr-3" size={32} />
            Поддержка
          </h2>
          <Button variant="ghost" onClick={() => setCurrentView('menu')}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3">Часто задаваемые вопросы</h3>
            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-bold mb-2">Как получить больше звёзд?</h4>
                <p className="text-muted-foreground">
                  Проходите уровни и собирайте все звёзды. За каждую звезду вы получаете 10 очков.
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">Сохраняется ли мой прогресс?</h4>
                <p className="text-muted-foreground">
                  Да, весь прогресс сохраняется автоматически в вашем браузере.
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-bold mb-2">Будут ли новые уровни?</h4>
                <p className="text-muted-foreground">
                  Да! Мы регулярно добавляем новые уровни. Следите за новостями!
                </p>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Связаться с нами</h3>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" size="lg" asChild>
                <a href="https://t.me/+QgiLIa1gFRY4Y2Iy" target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" className="mr-2" size={20} />
                  Telegram
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Icon name="Youtube" className="mr-2" size={20} />
                  YouTube
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                  <Icon name="Heart" className="mr-2" size={20} />
                  ВК
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen">
      {currentView === 'menu' && <MainMenu />}
      {currentView === 'game' && <GameView />}
      {currentView === 'account' && <AccountView />}
      {currentView === 'shop' && <ShopView />}
      {currentView === 'rules' && <RulesView />}
      {currentView === 'leaderboard' && <LeaderboardView />}
      {currentView === 'news' && <NewsView />}
      {currentView === 'support' && <SupportView />}
    </div>
  );
}
