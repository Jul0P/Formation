import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/stores/appStore';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useAppStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    // Débounce pour éviter les mises à jour trop fréquentes
    const timer = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, setSearchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // évite le rechargement de la page
    setSearchQuery(localQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Rechercher un collaborateur..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)} // dès la saisie, on met à jour localQuery
          className="pl-10 pr-20"
        />
        <Button type="submit" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7">
          Rechercher
        </Button>
      </div>
    </form>
  );
}
