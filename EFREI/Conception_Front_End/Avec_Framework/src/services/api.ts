import type { Todo, User } from '@/types';
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const apiService = {
  getUsers: (): Promise<User[]> => api.get('/users').then((response) => response.data),

  getUser: (id: number): Promise<User> => api.get(`/users/${id}`).then((response) => response.data),

  getUserTodos: (userId: number): Promise<Todo[]> => api.get(`/todos?userId=${userId}`).then((response) => response.data),

  createTodo: (todo: Omit<Todo, 'id'>): Promise<Todo> => api.post('/todos', todo).then((response) => response.data),
};
