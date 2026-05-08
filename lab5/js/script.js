// КОНСТАНТИ ТА КОНФІГУРАЦІЯ 
const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const USER_API_URL = 'https://jsonplaceholder.typicode.com/users/1';

const taskList = document.getElementById('task-list');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('search-input');
const taskCounter = document.getElementById('task-counter');
const userInfo = document.getElementById('user-info');
const filterButtons = document.querySelectorAll('.filter-btn');

let allTasks = [];
let currentFilter = 'all';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

// РОБОТА З API

async function loadInitialData() {
    toggleLoader(true);
    try {
        const [todosRes, userRes] = await Promise.all([
            fetch(`${API_URL}?_limit=15`),
            fetch(USER_API_URL)
        ]);

        if (!todosRes.ok || !userRes.ok) throw new Error('Помилка при завантаженні');

        allTasks = await todosRes.json();
        const user = await userRes.json();

        renderUserInfo(user);
        applyFilter();
    } catch (error) {
        showError("Помилка: " + error.message);
    } finally {
        toggleLoader(false);
    }
}

async function addTask(title) {
    toggleLoader(true);
    try {
        const formattedTitle = capitalize(title);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: formattedTitle,
                completed: false,
                userId: 1
            })
        });

        const newTask = await response.json();
        
        allTasks.unshift({ ...newTask, id: Date.now() });
        
        todoInput.value = '';
        addBtn.disabled = true;
        applyFilter();
    } catch (error) {
        showError("Не вдалося додати задачу");
    } finally {
        toggleLoader(false);
    }
}

async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        allTasks = allTasks.filter(task => task.id !== id);
        applyFilter();
    } catch (error) {
        showError("Помилка при видаленні");
    }
}

async function toggleTaskStatus(id, completed) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed })
        });
        
        allTasks = allTasks.map(task => 
            task.id === id ? { ...task, completed } : task
        );
        updateCounter();
    } catch (error) {
        showError("Не вдалося оновити статус");
    }
}

//DOM МАНІПУЛЯЦІЇ ТА РЕНДЕРИНГ

function renderTasks(tasksToRender) {
    taskList.innerHTML = '';

    tasksToRender.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        const displayTitle = truncate(task.title, 50);

        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-title">${displayTitle}</span>
            </div>
            <button class="task-delete">Видалити</button>
        `;
        
        taskList.appendChild(li);
    });
    updateCounter();
}

function renderUserInfo(user) {
    userInfo.innerHTML = `<span>Користувач: <strong>${user.name}</strong> (${user.email})</span>`;
}

function updateCounter() {
    const activeCount = allTasks.filter(t => !t.completed).length;
    taskCounter.textContent = `Залишилось виконати: ${activeCount}`;
}

// ФІЛЬТРАЦІЯ ТА ПОШУК

function applyFilter() {
    let filtered = allTasks;

    if (currentFilter === 'active') {
        filtered = allTasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filtered = allTasks.filter(t => t.completed);
    }

    const query = searchInput.value.toLowerCase();
    if (query) {
        filtered = filtered.filter(t => t.title.toLowerCase().includes(query));
    }

    renderTasks(filtered);
}

// ОБРОБНИКИ ПОДІЙ

taskList.addEventListener('click', (e) => {
    const li = e.target.closest('.task-item');
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.classList.contains('task-delete')) {
        deleteTask(id);
    } else if (e.target.classList.contains('task-checkbox')) {
        toggleTaskStatus(id, e.target.checked);
        li.classList.toggle('completed', e.target.checked);
    }
});

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = todoInput.value.trim();
    if (val) addTask(val);
});

todoInput.addEventListener('input', () => {
    addBtn.disabled = !todoInput.value.trim();
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        applyFilter();
    });
});

function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

searchInput.addEventListener('input', debounce(() => {
    applyFilter();
}, 300));

// ХЕЛПЕРИ
function toggleLoader(show) {
    loader.classList.toggle('hidden', !show);
}

function showError(message) {
    console.error(message);
}

document.addEventListener('DOMContentLoaded', loadInitialData);