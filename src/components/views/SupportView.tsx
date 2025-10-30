import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SupportViewProps {
  onNavigate: (view: string) => void;
}

export default function SupportView({ onNavigate }: SupportViewProps) {
  return (
    <div className="min-h-screen stars-bg p-8">
      <Card className="max-w-3xl mx-auto p-8 bg-card/95 backdrop-blur">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center">
            <Icon name="MessageCircle" className="mr-3" size={32} />
            Поддержка
          </h2>
          <Button variant="ghost" onClick={() => onNavigate('menu')}>
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
}
