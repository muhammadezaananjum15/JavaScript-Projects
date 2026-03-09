const todoInput = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addBtn');
const todoList = document.querySelector('#todoList');
const emptyState = document.querySelector('#emptyState');
const counter = document.querySelector('#counter');
let editIndex = null;
const esc = (s) => {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
};
function refreshCounter() {
  const n = todoList.querySelectorAll('li:not(.removing)').length;
  counter.innerHTML = `<b>${n}</b> ${n === 1 ? 'task' : 'tasks'}`;
  emptyState.className = n === 0 ? 'show' : '';
}
function doAdd() {
  const val = todoInput.value.trim();
  if (!val) return;

  if (editIndex === null) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="todo-text">${esc(val)}</span>
      <div class="actions">
        <button class="ibtn done-btn" title="Mark done"><i class="fas fa-check"></i></button>
        <button class="ibtn edit" title="Edit"><i class="fas fa-edit"></i></button>
        <button class="ibtn del" title="Delete"><i class="far fa-trash-alt"></i></button>
      </div>`;
    todoList.appendChild(li);
  } else {
    const li = todoList.querySelectorAll('li')[editIndex];
    li.querySelector('.todo-text').textContent = val;
    editIndex = null;
    addBtn.textContent = '+ Add';
    addBtn.classList.remove('update');
  }
  todoInput.value = '';
  todoInput.focus();
  refreshCounter();
}

todoList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  if (e.target.closest('.del')) {
    li.classList.add('removing');
    setTimeout(() => {
      li.remove();
      if (editIndex !== null) {
        editIndex = null;
        addBtn.textContent = '+ Add';
        addBtn.classList.remove('update');
      }
      refreshCounter();
    }, 200);
    return;
  }
  if (e.target.closest('.edit')) {
    const all = Array.from(todoList.querySelectorAll('li'));
    editIndex = all.indexOf(li);
    todoInput.value = li.querySelector('.todo-text').textContent;
    addBtn.textContent = '✓ Update';
    addBtn.classList.add('update');
    todoInput.focus();
    return;
  }
  if (e.target.closest('.done-btn')) {
    li.classList.toggle('done');
  }

  refreshCounter();
});
addBtn.addEventListener('click', doAdd);
todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doAdd();
});
const clearBtn = document.querySelector('#clearBtn');
clearBtn.addEventListener('click', () => {
  Array.from(todoList.querySelectorAll('li')).forEach((li, i) => {
    setTimeout(() => {
      li.classList.add('removing');
      setTimeout(() => {
        li.remove();
        refreshCounter();
      }, 200);
    }, i * 50);
  });
  editIndex = null;
  addBtn.textContent = '+ Add';
  addBtn.classList.remove('update');
});
refreshCounter();
