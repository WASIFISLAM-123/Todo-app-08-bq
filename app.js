// == Todo App Logic == //

const todoForm = document.querySelector('#todos-form');
const todoInput = document.querySelector('#title');
const todoSummary = document.querySelector('#summary');
const todoDate = document.querySelector('#date');
const todoList = document.querySelector('#todos-list');

let editingId = null;

function getDayName(day) {
  switch (day) {
    case 0: return 'Sun';
    case 1: return 'Mon';
    case 2: return 'Tues';
    case 3: return 'Wed';
    case 4: return 'Thurs';
    case 5: return 'Fri';
    case 6: return 'Sat';
    default: return 'Invalid';
  }
}

  function createList(todo) {
  const item = document.createElement('div');
  item.classList.add('list-item');
  item.setAttribute('data-id', todo.id);

  const content = document.createElement('div');

  const titleEl = document.createElement('strong');
  titleEl.textContent = todo.title;

  const summaryEl = document.createElement('p');
  summaryEl.textContent = todo.summary;

  content.append(titleEl, summaryEl);

  const actions = document.createElement('div');
  actions.classList.add('actions');

  const dateEl = document.createElement('small');
  dateEl.textContent = todo.dayName;

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit');
  editBtn.type = 'button';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete');
  deleteBtn.type = 'button';

  editBtn.addEventListener('click', () => fillFormForEdit(todo.id));
  deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

  actions.append(dateEl, editBtn, deleteBtn);

  item.append(content, actions);
  return item;
}

const todos = [];

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = todoInput.value.trim();
  const summary = todoSummary.value.trim();
  const dateValue = todoDate.value;

  if (!title || !summary || !dateValue) {
    alert('Please fill all fields!');
    return;
  }

  const dayName = getDayName(new Date(dateValue).getDay());

  if (editingId) {
    const index = todos.findIndex(t => t.id === editingId);
    if (index !== -1) {
      todos[index] = { ...todos[index], title, summary, rawDate: dateValue, dayName };
      renderOrReplace(todos[index]);
    }
    editingId = null; 
  } else {
    const newTodo = {
      id: Date.now(),
      title,
      summary,
      rawDate: dateValue,
      dayName
    };
    todos.unshift(newTodo);
    renderOrReplace(newTodo);
  }

  todoInput.value = '';
  todoSummary.value = '';
  todoDate.value = '';
});

function renderOrReplace(todo) {
  const existing = document.querySelector(`[data-id="${todo.id}"]`);
  const newItem = createList(todo);
  if (existing) {
    existing.replaceWith(newItem);
  } else {
    todoList.prepend(newItem);
  }
}

function deleteTodo(id) {
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) todos.splice(index, 1);

  const element = document.querySelector(`[data-id="${id}"]`);
  if (element) element.remove();

  if (editingId === id) editingId = null; 
}


function fillFormForEdit(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  todoInput.value = todo.title;
  todoSummary.value = todo.summary;
  todoDate.value = todo.rawDate;

  editingId = id; 
}





