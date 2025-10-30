import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RulesViewProps {
  onNavigate: (view: string) => void;
}

export default function RulesView({ onNavigate }: RulesViewProps) {
  return (
    <div className="min-h-screen stars-bg p-8">
      <Card className="max-w-3xl mx-auto p-8 bg-card/95 backdrop-blur">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Правила игры</h2>
          <Button variant="ghost" onClick={() => onNavigate('menu')}>
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
}
