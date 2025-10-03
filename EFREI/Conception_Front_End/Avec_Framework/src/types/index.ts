export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UserWithStats extends User {
  todos: Todo[];
  totalTasks: number;
  completedTasks: number;
}
