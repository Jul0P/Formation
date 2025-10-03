import { TodoForm } from '@/components/TodoForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useUser, useUserTodos } from '@/hooks/useUsers';
import { useAppStore } from '@/stores/appStore';
import type { Todo } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Globe, MapPin, Phone } from 'lucide-react';
import { Link, useParams } from 'react-router';

export function UserDetail() {
  const { userId } = useParams<{ userId: string }>();
  const { currentFilter, setCurrentFilter } = useAppStore();
  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading, error: userError } = useUser(Number(userId));
  const { data: todos, isLoading: todosLoading, error: todosError } = useUserTodos(Number(userId));

  const toggleTodoCompletion = (todoId: number) => {
    queryClient.setQueryData(['todos', Number(userId)], (oldTodos: Todo[] | undefined) => {
      if (!oldTodos) return oldTodos;
      return oldTodos.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo));
    });
  };

  const filteredTodos = todos?.filter((todo) => {
    if (currentFilter === 'completed') return todo.completed;
    if (currentFilter === 'pending') return !todo.completed;
    return true;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (userError) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <p className="text-destructive mb-4">Erreur lors du chargement de l'utilisateur</p>
          <Button asChild>
            <Link to="/">Retour à la liste</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link to="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste
        </Link>
      </Button>

      {userLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Chargement des informations...</p>
        </div>
      ) : user ? (
        <>
          <Card className="mb-8 pt-0">
            <CardHeader className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground p-8 rounded-t-xl">
              <div className="flex items-center space-x-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white font-bold text-2xl border-3 border-white/30">
                  {getInitials(user.name)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <p className="text-sm opacity-90">{user.email}</p>
                  <p className="text-sm opacity-90">{user.company.name}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 py-3 border-b">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <strong className="text-sm text-muted-foreground block">Téléphone :</strong>
                    <span>{user.phone}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 py-3 border-b">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <strong className="text-sm text-muted-foreground block">Site web :</strong>
                    <span>{user.website}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 py-3 border-b">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <strong className="text-sm text-muted-foreground block">Adresse :</strong>
                    <span>
                      {user.address.street}, {user.address.city}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">{todos?.length || 0}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Tâches totales</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">{todos?.filter((t) => t.completed).length || 0}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Terminées</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">{todos?.filter((t) => !t.completed).length || 0}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">En cours</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {todos && todos.length > 0 ? Math.round((todos.filter((t) => t.completed).length / todos.length) * 100) : 0}%
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Progression</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-8">
            <div className="col-span-1">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Ajouter une tâche</h2>
                </CardHeader>
                <CardContent>
                  <TodoForm userId={user.id} />
                </CardContent>
              </Card>
            </div>
            <div className="col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex flex-row max-sm:flex-col justify-between items-center max-sm:items-start gap-4">
                    <h2 className="text-xl font-semibold">Tâches</h2>
                    <div className="flex space-x-2">
                      {(['all', 'completed', 'pending'] as const).map((filter) => (
                        <Button
                          key={filter}
                          variant={currentFilter === filter ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentFilter(filter)}
                        >
                          {filter === 'all' && 'Toutes'}
                          {filter === 'completed' && 'Terminées'}
                          {filter === 'pending' && 'En cours'}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {todosLoading ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Chargement des tâches...</p>
                    </div>
                  ) : todosError ? (
                    <div className="text-center py-8">
                      <p className="text-destructive">Erreur lors du chargement des tâches</p>
                    </div>
                  ) : filteredTodos && filteredTodos.length > 0 ? (
                    <div className="space-y-3">
                      {filteredTodos.map((todo) => (
                        <div
                          key={todo.id}
                          className={`flex items-center space-x-4 p-4 border rounded-lg transition-opacity ${todo.completed ? 'opacity-60' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodoCompletion(todo.id)}
                            className="h-5 w-5 rounded border-gray-300 cursor-pointer flex-shrink-0"
                          />
                          <Badge variant={todo.completed ? 'default' : 'secondary'} className="whitespace-nowrap">
                            {todo.completed ? 'Terminée' : 'En cours'}
                          </Badge>
                          <p className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>{todo.title}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">Aucune tâche trouvée</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
