import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface NewsViewProps {
  onNavigate: (view: string) => void;
  newsItems: NewsItem[];
}

export default function NewsView({ onNavigate, newsItems }: NewsViewProps) {
  return (
    <div className="min-h-screen stars-bg p-8">
      <Card className="max-w-3xl mx-auto p-8 bg-card/95 backdrop-blur">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center">
            <Icon name="Newspaper" className="mr-3" size={32} />
            Новости
          </h2>
          <Button variant="ghost" onClick={() => onNavigate('menu')}>
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
}
