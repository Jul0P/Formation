import { addTodo, getUser, getUserTodos } from './api.js';
import { getInitials, getUserIdFromUrl, setupMobileMenu } from './utils.js';

// État global
let state = {
  userId: null,
  user: null,
  todos: [],
  filteredTodos: [],
  currentFilter: 'all',
};

function init() {
  state.userId = getUserIdFromUrl();

  // Redirection si pas d'ID
  if (!state.userId) {
    window.location.href = 'index.html';
    return;
  }

  setupEventListeners();
  loadUserData();
}

function setupEventListeners() {
  setupMobileMenu();

  const form = document.getElementById('addTaskForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
      handleAddTask();
    });
  }

  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');

      state.currentFilter = e.target.dataset.filter;
      filterTasks(state.currentFilter);
    });
  });
}

async function loadUserData() {
  try {
    const [user, todos] = await Promise.all([getUser(state.userId), getUserTodos(state.userId)]); // Récupère les données utilisateur et ses tâches en parallèle

    state.user = user;
    state.todos = todos;
    state.filteredTodos = todos;

    // Affiche les données
    renderUserInfo();
    renderTasks();
  } catch (error) {
    window.location.href = 'index.html';
  }
}

function renderUserInfo() {
  const userInfoContainer = document.getElementById('userInfo');
  if (!userInfoContainer || !state.user) return;

  const user = state.user;
  const completedTasks = state.todos.filter((t) => t.completed).length; // Nombre de tâches terminées
  const totalTasks = state.todos.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  userInfoContainer.innerHTML = `
    <div class="user-card-header">
      <div class="user-avatar">
        ${getInitials(user.name)}
      </div>
      <div class="user-info">
        <h1>${user.name}</h1>
        <p class="user-email">${user.email}</p>
        <p class="user-company">${user.company.name}</p>
      </div>
    </div>
    <div class="user-card-body">
      <div class="user-details">
        <div class="detail-item">
          <strong>Téléphone :</strong>
          <span>${user.phone}</span>
        </div>
        <div class="detail-item">
          <strong>Site web :</strong>
          <span>
            ${user.website}
          </span>
        </div>
        <div class="detail-item">
          <strong>Adresse :</strong>
          <span>${user.address.street}, ${user.address.city}</span>
        </div>
      </div>
      <div class="user-stats">
        <div class="stat-card">
          <div class="stat-number">${totalTasks}</div>
          <div class="stat-label">Tâches totales</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${completedTasks}</div>
          <div class="stat-label">Terminées</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${totalTasks - completedTasks}</div>
          <div class="stat-label">En cours</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${completionRate}%</div>
          <div class="stat-label">Progression</div>
        </div>
      </div>
    </div>
  `;
}

function renderTasks(tasks = state.filteredTodos) {
  const tasksList = document.getElementById('tasksList');
  if (!tasksList) return;

  if (tasks.length === 0) {
    tasksList.innerHTML = '<div class="no-results"><p>Aucune tâche trouvée</p></div>';
    return;
  }

  tasksList.innerHTML = tasks
    .map(
      (task) => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
          <div class="task-checkbox">
            <input 
              type="checkbox" 
              ${task.completed ? 'checked' : ''} 
              id="task-${task.id}"
              data-task-id="${task.id}"
            />
            <label for="task-${task.id}"></label>
          </div>
          <div class="task-content">
            <div class="task-title">${task.title}</div>
            <div class="task-meta">
              <span class="task-status ${task.completed ? 'status-completed' : 'status-pending'}">
                ${task.completed ? 'Terminée' : 'En cours'}
              </span>
            </div>
          </div>
        </div>
      `,
    )
    .join('');

  // Ajoute les écouteurs sur les checkboxes
  tasksList.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      toggleTaskStatus(parseInt(e.target.dataset.taskId), e.target.checked);
    });
  });
}

async function handleAddTask() {
  const form = document.getElementById('addTaskForm');
  const titleInput = document.getElementById('taskTitle');
  const statusSelect = document.getElementById('taskStatus');
  const submitBtn = form.querySelector('button[type="submit"]');

  const title = titleInput.value.trim(); // Trim pour enlever les espaces inutiles
  const completed = statusSelect.value === 'true';

  if (title.length < 3) {
    return;
  }

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Ajout...';

    const newTodo = await addTodo({
      userId: parseInt(state.userId),
      title: title,
      completed: completed,
    });

    newTodo.id = Date.now();
    state.todos.unshift(newTodo); // Ajoute la nouvelle tâche en début de liste
    state.filteredTodos = filterTasksByType(state.todos, state.currentFilter); // Met à jour la liste filtrée car on est peut-être en mode filtré

    renderTasks();
    renderUserInfo();

    titleInput.value = '';
    statusSelect.value = 'false';
  } catch (error) {
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Ajouter la tâche';
  }
}

function toggleTaskStatus(taskId, completed) {
  const task = state.todos.find((t) => t.id === taskId);
  if (task) {
    task.completed = completed;
    state.filteredTodos = filterTasksByType(state.todos, state.currentFilter);
    renderTasks();
    renderUserInfo();
  }
}

function filterTasks(filter) {
  state.filteredTodos = filterTasksByType(state.todos, filter);
  renderTasks();
}

function filterTasksByType(tasks, filter) {
  if (filter === 'all') return tasks;
  if (filter === 'completed') return tasks.filter((task) => task.completed);
  if (filter === 'pending') return tasks.filter((task) => !task.completed);
  return tasks;
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
