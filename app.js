const todoForm = document.querySelector('#todos-form');
const todoInput = document.querySelector('#title');
const todoSummary = document.querySelector('#summary');
const todoDate = document.querySelector('#date');
const todoList = document.querySelector('#todos-list');

function getDayName(day) {
    switch (day) {
        case 0:
            return 'Sun';
        case 1:
            return 'Mon';
        case 2:
            return 'Tues';
        case 3:
            return 'Wed';
        case 4:
            return 'Thurs';
        case 5:
            return 'Fri';
        case 6:
            return 'Sat';
        default:
            return 'Invalid'
    }
}

function createList(todoData) {
    const MainDiv = document.createElement('div');
    MainDiv.classList.add("list-item");

    const contentDiv = document.createElement('div');
    
    const titleDiv = document.createElement('div');
    const titleContent = document.createElement('strong');
    titleContent.textContent = todoData.title;
    titleDiv.append(titleContent)

    const summaryDiv = document.createElement('div');
    summaryDiv.classList.add('small');
    summaryDiv.textContent = todoData.summary;

    contentDiv.append(titleDiv);
    contentDiv.append(summaryDiv);

    const actionDiv = document.createElement('div');
    actionDiv.classList.add('actions');
    
    const date = document.createElement('small');
    date.textContent = todoData.date;

    const editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'edit');
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'delete');
    deleteBtn.textContent = "Delete";

    actionDiv.append(date);
    actionDiv.append(editBtn);
    actionDiv.append(deleteBtn);

    MainDiv.append(contentDiv);
    MainDiv.append(actionDiv);

    return MainDiv;
}

const todosArr = [];

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e, todoDate.value)
    const submitTodo = {
        title: todoInput.value,
        summary: todoSummary.value,
        date: getDayName(new Date(todoDate.value).getDay())
    }

    todosArr.unshift(submitTodo)

    const items = createList(submitTodo);

    console.log(items)
    todoList.prepend(items);

    todoInput.value = '';
    todoSummary.value = '';
    todoDate.value = '';
})









