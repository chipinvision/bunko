import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProgressStatsProps {
  wordsToday: number;
  streak: number;
  totalWords: number;
  masteredWords: number;
}

const ProgressStats = ({ 
  wordsToday, 
  streak, 
  totalWords, 
  masteredWords 
}: ProgressStatsProps) => {
  const masteryRate = totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0;

  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="p-4">
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold">{wordsToday}</div>
          <div className="text-sm opacity-90">Today's Words</div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold">{streak}</div>
          <div className="text-sm text-muted-foreground">Streak (days)</div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-center space-y-1">
          <div className="text-xl font-semibold">{totalWords}</div>
          <div className="text-sm text-muted-foreground">Total Words</div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-semibold">{masteryRate}%</span>
          </div>
          <div className="text-sm text-muted-foreground">{masteredWords} / {totalWords}</div>
        </div>
      </Card>
    </div>
  );
};

export default ProgressStats;