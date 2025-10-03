import { getUsers, getUserTodos } from './api.js';
import { getInitials, setupMobileMenu } from './utils.js';

// État global
let state = {
  users: [],
  filteredUsers: [],
};

function init() {
  setupEventListeners();
  loadContent();
}

// Configure les écouteurs d'événements
function setupEventListeners() {
  setupMobileMenu();

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.querySelector('.search-btn');

  if (searchInput) {
    let searchTimer;
    searchInput.addEventListener('input', (e) => {
      // Anti spam
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => handleSearch(e.target.value), 300);
    });

    // Recherche au clavier "Enter"
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch(e.target.value);
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      handleSearch(searchInput.value);
    });
  }
}

async function loadContent() {
  await loadUsers();
}

async function loadUsers() {
  const grid = document.getElementById('itemsGrid');
  if (!grid) return;

  try {
    grid.innerHTML = `
      <div class="loading">
        <p>Chargement des collaborateurs...</p>
      </div>
    `;

    const users = await getUsers();

    const usersWithTodos = await Promise.all(
      users.map(async (user) => {
        try {
          const todos = await getUserTodos(user.id); // Récupère les tâches de l'utilisateur
          return {
            ...user, // conserve les données utilisateur
            // ajoute les tâches et les stats
            todos,
            totalTasks: todos.length,
            completedTasks: todos.filter((todo) => todo.completed).length,
          };
        } catch (error) {
          return { ...user, todos: [], totalTasks: 0, completedTasks: 0 };
        }
      }),
    );

    state.users = usersWithTodos;
    state.filteredUsers = usersWithTodos;

    renderUsers();
  } catch (error) {
    grid.innerHTML = `
      <div class="no-results">
        <p>Erreur lors du chargement des données</p>
        <button onclick="location.reload()" class="btn">Réessayer</button>
      </div>
    `;
  }
}

function renderUsers(users = state.filteredUsers) {
  const grid = document.getElementById('itemsGrid');
  if (!grid) return;

  if (users.length === 0) {
    grid.innerHTML = '<div class="no-results"><p>Aucun collaborateur trouvé</p></div>';
    return;
  }

  grid.innerHTML = users
    .map((user) => {
      const completionRate = user.totalTasks > 0 ? Math.round((user.completedTasks / user.totalTasks) * 100) : 0; // calcul du taux de taches terminées

      return `
        <div class="card" onclick="window.location.href='user.html?id=${user.id}'" style="cursor: pointer;" role="button" tabindex="0">
          <div class="card-image">
            <div class="card-avatar">
              ${getInitials(user.name)}
            </div>
          </div>
          <h3 class="card-title">${user.name}</h3>
          <p class="card-description">
            ${user.email}<br/>
            ${user.company.name}
          </p>
          <div class="card-stats">
            <div class="stat">
              <strong>${user.totalTasks}</strong>
              <span>Tâches</span>
            </div>
            <div class="stat">
              <strong>${user.completedTasks}</strong>
              <span>Terminées</span>
            </div>
            <div class="stat">
              <strong>${completionRate}%</strong>
              <span>Progression</span>
            </div>
          </div>
          <div class="card-action">Voir détails</div>
        </div>
      `;
    })
    .join('');
}

function handleSearch(query) {
  const term = query.toLowerCase().trim(); // minuscule et trim (espaces)

  if (!term) {
    state.filteredUsers = state.users;
  } else {
    state.filteredUsers = state.users.filter(
      (user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term) || user.company.name.toLowerCase().includes(term), // Recherche dans nom, email, entreprise de l'user
    );
  }

  renderUsers();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
