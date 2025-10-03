import { apiService } from '@/services/api';
import { useAppStore } from '@/stores/appStore';
import type { Todo, UserWithStats } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<UserWithStats[]> => {
      const users = await apiService.getUsers();

      const usersWithStats = await Promise.all(
        users.map(async (user) => {
          const todos = await apiService.getUserTodos(user.id);
          return {
            ...user,
            todos,
            totalTasks: todos.length,
            completedTasks: todos.filter((todo) => todo.completed).length,
          };
        }),
      );

      return usersWithStats;
    },
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => apiService.getUser(id),
    enabled: !!id,
  });
};

export const useUserTodos = (userId: number) => {
  return useQuery({
    queryKey: ['todos', userId],
    queryFn: () => apiService.getUserTodos(userId),
    enabled: !!userId,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const { setSuccess, setError } = useAppStore();

  return useMutation({
    mutationFn: apiService.createTodo,
    onSuccess: (newTodo, variables) => {
      queryClient.setQueryData(['todos', variables.userId], (oldTodos: Todo[] | undefined) => {
        if (!oldTodos) return [newTodo];
        // Ajouter la nouvelle tâche en haut de la liste
        return [newTodo, ...oldTodos];
      });

      // Invalider aussi la liste des utilisateurs pour mettre à jour les stats
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSuccess('Tâche créée avec succès');
    },
    onError: (error) => {
      setError(`Erreur lors de la création de la tâche: ${error.message}`);
    },
  });
};
