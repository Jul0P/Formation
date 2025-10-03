import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { UserWithStats } from '@/types';
import { Link } from 'react-router';

interface UserCardProps {
  user: UserWithStats;
}

export function UserCard({ user }: UserCardProps) {
  const completionRate = user.totalTasks > 0 ? Math.round((user.completedTasks / user.totalTasks) * 100) : 0;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Link to={`/user/${user.id}`}>
      <Card className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
              {getInitials(user.name)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{user.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground truncate">{user.company.name}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">{user.totalTasks} tâches</Badge>
              <Badge variant="outline">{user.completedTasks} terminées</Badge>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${completionRate}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">{completionRate}% de progression</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
