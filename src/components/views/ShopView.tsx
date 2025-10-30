import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ShopItem {
  id: string;
  name: string;
  price: number;
  type: 'skin' | 'game-bg' | 'profile-bg';
  image: string;
  purchased: boolean;
}

interface ShopViewProps {
  onNavigate: (view: string) => void;
  playerBalance: number;
  shopItems: ShopItem[];
  selectedCategory: 'skin' | 'game-bg' | 'profile-bg';
  onCategoryChange: (category: 'skin' | 'game-bg' | 'profile-bg') => void;
  onPurchase: (itemId: string) => void;
}

export default function ShopView({
  onNavigate,
  playerBalance,
  shopItems,
  selectedCategory,
  onCategoryChange,
  onPurchase
}: ShopViewProps) {
  return (
    <div className="min-h-screen stars-bg p-8">
      <Card className="max-w-4xl mx-auto p-8 bg-card/95 backdrop-blur">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Магазин</h2>
          <div className="flex gap-4 items-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Icon name="Star" className="mr-2" size={20} />
              {playerBalance} звёзд
            </Badge>
            <Button variant="ghost" onClick={() => onNavigate('menu')}>
              <Icon name="X" size={24} />
            </Button>
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={(v) => onCategoryChange(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skin">Скины</TabsTrigger>
            <TabsTrigger value="game-bg">Фон игры</TabsTrigger>
            <TabsTrigger value="profile-bg">Фон профиля</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              {shopItems
                .filter(item => item.type === selectedCategory)
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
                        onClick={() => onPurchase(item.id)}
                        disabled={item.purchased || playerBalance < item.price}
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
}
