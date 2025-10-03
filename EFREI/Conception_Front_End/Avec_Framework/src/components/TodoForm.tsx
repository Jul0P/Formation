import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateTodo } from '@/hooks/useUsers';
import type { TodoFormData } from '@/lib/validations';
import { todoFormSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface TodoFormProps {
  userId: number;
}

export function TodoForm({ userId }: TodoFormProps) {
  const createTodoMutation = useCreateTodo(); // Hook de mutation pour créer une tâche

  const form = useForm({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: '',
      completed: false,
    },
  });

  const onSubmit = (data: TodoFormData) => {
    createTodoMutation.mutate(
      {
        userId,
        title: data.title,
        completed: data.completed,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-[2fr_1fr] max-md:grid-cols-1 gap-4 w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Titre de la tâche *</FormLabel>
                <FormControl>
                  <Input placeholder="Entrez le titre de la tâche..." {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="completed"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Statut</FormLabel>
                <Select onValueChange={(value) => field.onChange(value === 'true')} defaultValue={field.value ? 'true' : 'false'}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionnez le statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="false">En cours</SelectItem>
                    <SelectItem value="true">Terminée</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={createTodoMutation.isPending} className="w-full">
          {createTodoMutation.isPending ? 'Création...' : 'Ajouter la tâche'}
        </Button>
      </form>
    </Form>
  );
}
