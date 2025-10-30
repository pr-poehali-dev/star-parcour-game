import { useState } from 'react';
import MainMenu from '@/components/views/MainMenu';
import GameView from '@/components/views/GameView';
import AccountView from '@/components/views/AccountView';
import ShopView from '@/components/views/ShopView';
import RulesView from '@/components/views/RulesView';
import LeaderboardView from '@/components/views/LeaderboardView';
import NewsView from '@/components/views/NewsView';
import SupportView from '@/components/views/SupportView';

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

  return (
    <div className="min-h-screen">
      {currentView === 'menu' && (
        <MainMenu
          onNavigate={setCurrentView}
          completedLevelsCount={player.completedLevels.length}
        />
      )}
      {currentView === 'game' && (
        <GameView
          onNavigate={setCurrentView}
          currentLevel={currentLevel}
          onLevelChange={setCurrentLevel}
          playerBalance={player.balance}
          onCollectStar={handleCollectStar}
          onLevelComplete={handleLevelComplete}
        />
      )}
      {currentView === 'account' && (
        <AccountView
          onNavigate={setCurrentView}
          player={player}
        />
      )}
      {currentView === 'shop' && (
        <ShopView
          onNavigate={setCurrentView}
          playerBalance={player.balance}
          shopItems={shopItems}
          selectedCategory={selectedShopCategory}
          onCategoryChange={setSelectedShopCategory}
          onPurchase={handlePurchase}
        />
      )}
      {currentView === 'rules' && (
        <RulesView onNavigate={setCurrentView} />
      )}
      {currentView === 'leaderboard' && (
        <LeaderboardView
          onNavigate={setCurrentView}
          leaderboardData={leaderboardData}
          playerNickname={player.nickname}
        />
      )}
      {currentView === 'news' && (
        <NewsView
          onNavigate={setCurrentView}
          newsItems={newsItems}
        />
      )}
      {currentView === 'support' && (
        <SupportView onNavigate={setCurrentView} />
      )}
    </div>
  );
}
