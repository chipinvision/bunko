import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";

interface AddWordFormProps {
  onSubmit: (wordData: {
    word: string;
    reading?: string;
    meaning?: string;
    tags: string[];
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const commonTags = [
  "Noun", "Verb", "Adjective", "Adverb",
  "JLPT N5", "JLPT N4", "JLPT N3",
  "Daily Life", "Work", "Travel", "Food"
];

const AddWordForm = ({ onSubmit, onCancel, isLoading }: AddWordFormProps) => {
  const [word, setWord] = useState('');
  const [reading, setReading] = useState('');
  const [meaning, setMeaning] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;
    
    onSubmit({
      word: word.trim(),
      reading: reading.trim() || undefined,
      meaning: meaning.trim() || undefined,
      tags
    });
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleNewTag = () => {
    if (newTag.trim()) {
      addTag(newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <Card className="p-6 sakura-fade-in w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ...existing code... */}
          <div className="space-y-2">
            <Label htmlFor="word" className="text-sm font-medium">
              Word *
            </Label>
            <Input
              id="word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="e.g. Hello"
              className="text-lg"
              required
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reading" className="text-sm font-medium">
              Reading
            </Label>
            <Input
              id="reading"
              value={reading}
              onChange={(e) => setReading(e.target.value)}
              placeholder="e.g. Hello, konnichiwa"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meaning" className="text-sm font-medium">
              Meaning
            </Label>
            <Textarea
              id="meaning"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="例: Hello, good afternoon"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Tags</Label>
            {/* Selected tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Common tags */}
            <div className="flex flex-wrap gap-1">
              {commonTags.filter(tag => !tags.includes(tag)).map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => addTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>

            {/* Custom tag input */}
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Custom Tags"
                className="text-sm"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleNewTag())}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleNewTag}
                disabled={!newTag.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!word.trim() || isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddWordForm;