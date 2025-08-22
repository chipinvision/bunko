import { Home, Book } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Home', icon: Home, path: '/dashboard' },
  { label: 'Dictionary', icon: Book, path: '/dictionary' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex justify-around py-2">
      {navItems.map(({ label, icon: Icon, path }) => (
        <button
          key={label}
          className={`flex flex-col items-center gap-1 px-4 py-1 text-sm focus:outline-none ${location.pathname === path ? 'text-primary font-bold' : 'text-muted-foreground'}`}
          onClick={() => navigate(path)}
        >
          <Icon className="h-5 w-5" />
          {label}
        </button>
      ))}
    </nav>
  );
}
