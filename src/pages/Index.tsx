import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-sakura flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sakura flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            Japanese Learning App
          </h1>
          <p className="text-muted-foreground">
            Learn Japanese efficiently
          </p>
        </div>
        
        <Card className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🌸</div>
            <h2 className="text-xl font-semibold mb-2">
              Start Learning
            </h2>
            <p className="text-muted-foreground mb-6">
              Create an account to begin your Japanese learning journey
            </p>
            <Button 
              onClick={() => navigate('/auth')}
              className="w-full bg-gradient-sakura hover:opacity-90"
              size="lg"
            >
              Get Started
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
