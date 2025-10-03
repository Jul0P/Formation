// Configuration de l'API
const CONFIG = {
  API: {
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    ENDPOINTS: {
      users: '/users',
      todos: '/todos',
      userTodos: (userId) => `/todos?userId=${userId}`,
    },
  },
};

// Récupère tous les utilisateurs
export async function getUsers() {
  try {
    const response = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.users}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Récupère un utilisateur par ID
export async function getUser(userId) {
  try {
    const response = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.users}/${userId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Récupère les tâches d'un utilisateur
export async function getUserTodos(userId) {
  try {
    const response = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.userTodos(userId)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Ajoute une nouvelle tâche pour un utilisateur
export async function addTodo(todoData) {
  try {
    const response = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.todos}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
}
