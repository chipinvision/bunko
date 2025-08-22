import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WordCardProps {
  word: string;
  reading?: string;
  meaning?: string;
  masteryLevel: number;
  tags?: string[];
  onClick?: () => void;
  className?: string;
}

const masteryColors = {
  0: "bg-muted text-muted-foreground", // New
  1: "bg-warning/10 text-warning-foreground border-warning/20", // Learning  
  2: "bg-success/10 text-success-foreground border-success/20", // Mastered
};

const masteryLabels = {
  0: "New",
  1: "Learning",
  2: "Mastered",
};

const WordCard = ({ 
  word, 
  reading, 
  meaning, 
  masteryLevel, 
  tags, 
  onClick,
  className 
}: WordCardProps) => {
  return (
    <Card 
      className={cn(
        "p-4 hover:shadow-sakura transition-sakura cursor-pointer sakura-fade-in",
        className
      )}
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="text-lg font-medium">{word}</h3>
            {reading && (
              <p className="text-sm text-muted-foreground">{reading}</p>
            )}
          </div>
        </div>
        
        {meaning && (
          <p className="text-sm text-foreground">{meaning}</p>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default WordCard;