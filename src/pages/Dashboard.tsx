import { useState, useEffect } from 'react';
import { Plus, BookOpen, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MobileLayout from "@/components/layout/MobileLayout";
import ProgressStats from "@/components/stats/ProgressStats";
import WordCard from "@/components/word/WordCard";
import AddWordForm from "@/components/word/AddWordForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [words, setWords] = useState([]);
  const [todayWords, setTodayWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    wordsToday: 0,
    streak: 1,
    totalWords: 0,
    masteredWords: 0
  });
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWords();
    fetchTodayWords();
  }, [user]);

  const fetchWords = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('words')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setWords(data || []);
      // Calculate stats
      const total = data?.length || 0;
      const mastered = data?.filter(w => w.mastery_level === 2).length || 0;
      setStats(prev => ({
        ...prev,
        totalWords: total,
        masteredWords: mastered
      }));
    } catch (error) {
      console.error('Error fetching words:', error);
      toast({
        title: "Error",
        description: "Failed to fetch words.",
        variant: "destructive"
      });
    }
  };

  const fetchTodayWords = async () => {
    if (!user) return;
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('words')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', today)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setTodayWords(data || []);
      setStats(prev => ({
        ...prev,
        wordsToday: data?.length || 0
      }));
    } catch (error) {
      console.error('Error fetching today words:', error);
    }
  };

  const handleAddWord = async (wordData) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('words')
        .insert([
          {
            word: wordData.word,
            reading: wordData.reading,
            meaning: wordData.meaning,
            tags: wordData.tags,
            mastery_level: 0,
            user_id: user.id
          }
        ])
        .select()
        .single();
      if (error) throw error;
      setWords([data, ...words]);
      setTodayWords([data, ...todayWords]);
      setStats(prev => ({
        ...prev,
        wordsToday: prev.wordsToday + 1,
        totalWords: prev.totalWords + 1
      }));
      setShowAddForm(false);
      toast({
        title: "Success!",
        description: "New word added.",
      });
    } catch (error) {
      console.error('Error adding word:', error);
      toast({
        title: "Error",
        description: "Failed to add word.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (showAddForm) {
    return (
      <MobileLayout title="Add New Word" onLogout={handleSignOut}>
        <div className="space-y-4">
          <AddWordForm
            onSubmit={handleAddWord}
            onCancel={() => setShowAddForm(false)}
            isLoading={isLoading}
          />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout onLogout={handleSignOut}>
      <div className="space-y-6 pt-8 pb-24">
        {/* SizedBox for spacing */}
        <div style={{ height: 24 }} />
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Welcome back!</h2>
          <p className="text-muted-foreground">Let's learn Japanese today</p>
        </div>

        {/* Progress Stats */}
        <ProgressStats {...stats} />

        {/* Quick Add Button */}
        <Button
          onClick={() => setShowAddForm(true)}
          className="w-full py-6 text-lg bg-gradient-sakura hover:opacity-90 transition-sakura"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Word
        </Button>

        {/* Today's Words */}
        {todayWords.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Today's Words</h3>
            </div>
            <div className="space-y-2">
              {todayWords.slice(0, 3).map((word) => (
                <WordCard
                  key={word.id}
                  word={word.word}
                  reading={word.reading}
                  meaning={word.meaning}
                  masteryLevel={word.mastery_level}
                  tags={word.tags}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {words.length === 0 && (
          <Card className="p-8 text-center space-y-4">
            <div className="text-6xl">🌸</div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Let's get started!</h3>
              <p className="text-muted-foreground text-sm">
                Add your first Japanese word to begin your learning journey.
              </p>
            </div>
          </Card>
        )}
      </div>
    </MobileLayout>
  );
};

export default Dashboard;