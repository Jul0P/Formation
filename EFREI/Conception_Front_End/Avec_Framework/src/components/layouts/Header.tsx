import { ModeSwitcher } from '@/components/mode-switcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Projefrei</span>
        </Link>
        {/* Navigation desktop - affichée par défaut, cachée sur mobile */}
        <nav className="flex items-center space-x-4 max-md:hidden">
          <Button asChild variant="ghost">
            <Link to="/">Collaborateurs</Link>
          </Button>
          <ModeSwitcher />
        </nav>
        {/* Navigation mobile - menu burger affiché uniquement sur mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full">
            <div className="absolute top-4 left-4">
              <ModeSwitcher />
            </div>
            <nav className="flex flex-col items-center pt-16">
              <Button asChild variant="ghost" size="lg">
                <Link to="/">Collaborateurs</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
