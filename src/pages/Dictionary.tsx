import { useEffect, useState } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Word {
  id: string;
  word: string;
  reading?: string;
  meaning?: string;
  mastery_level: number;
  tags?: string[];
  created_at: string;
}

const JAPANESE_GROUPS = [
  { label: 'Vowels', chars: ['あ', 'い', 'う', 'え', 'お'] },
  { label: 'K-line', chars: ['か', 'き', 'く', 'け', 'こ'] },
  { label: 'S-line', chars: ['さ', 'し', 'す', 'せ', 'そ'] },
  { label: 'T-line', chars: ['た', 'ち', 'つ', 'て', 'と'] },
  { label: 'N-line', chars: ['な', 'に', 'ぬ', 'ね', 'の'] },
  { label: 'H-line', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
  { label: 'M-line', chars: ['ま', 'み', 'む', 'め', 'も'] },
  { label: 'Y-line', chars: ['や', 'ゆ', 'よ'] },
  { label: 'R-line', chars: ['ら', 'り', 'る', 'れ', 'ろ'] },
  { label: 'W-line', chars: ['わ', 'を', 'ん'] },
  { label: 'G-line', chars: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
  { label: 'Z-line', chars: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
  { label: 'D-line', chars: ['だ', 'ぢ', 'づ', 'で', 'ど'] },
  { label: 'B-line', chars: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
  { label: 'P-line', chars: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] },
];

function groupWords(words: Word[]) {
  const grouped: Record<string, Word[]> = {};
  JAPANESE_GROUPS.forEach(g => grouped[g.label] = []);
  words.forEach(word => {
    const firstChar = word.word[0];
    const group = JAPANESE_GROUPS.find(g => g.chars.includes(firstChar));
    if (group) {
      grouped[group.label].push(word);
    }
  });
  return grouped;
}

export default function Dictionary() {
  const { user } = useAuth();
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    async function fetchWords() {
      if (!user) return;
      const { data, error } = await supabase
        .from('words')
        .select('*')
        .eq('user_id', user.id)
        .order('word', { ascending: true });
      if (!error && data) setWords(data);
    }
    fetchWords();
  }, [user]);

  const grouped = groupWords(words);

  const handleDelete = async (wordId: string) => {
    if (!user) return;
    const { error } = await supabase
      .from('words')
      .delete()
      .eq('id', wordId)
      .eq('user_id', user.id);
    if (!error) {
      setWords(words.filter(w => w.id !== wordId));
    }
  };

  return (
    <MobileLayout title="Dictionary">
      <div className="space-y-6 pt-8 pb-24">
        {/* SizedBox for spacing */}
        <div style={{ height: 24 }} />
        {JAPANESE_GROUPS.map(group => (
          <div key={group.label}>
            <h2 className="text-lg font-bold mb-2">{group.label}</h2>
            {grouped[group.label].length > 0 ? (
              <div className="space-y-2">
                {grouped[group.label].map(word => (
                  <Card key={word.id} className="p-4 relative">
                    <button
                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(word.id)}
                      title="Delete"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="font-semibold">{word.word}</div>
                    {word.reading && <div className="text-sm text-muted-foreground">{word.reading}</div>}
                    {word.meaning && <div className="text-sm">{word.meaning}</div>}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">No words in this group.</div>
            )}
          </div>
        ))}
      </div>
    </MobileLayout>
  );
}
