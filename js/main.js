"use strict";

window.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.querySelector('#taskInput'),
    form = document.querySelector('#form'),
    tasksList = document.querySelector('#tasksList'),
    emptyList = tasksList.querySelector('#emptyList'),
    btnRemoveDoneTasks = document.querySelector('#removeDoneTasks');

  form.addEventListener('submit', addTask);
  tasksList.addEventListener('click', deleteTask);
  tasksList.addEventListener('click', doneTask);
  btnRemoveDoneTasks.addEventListener('click', removeDoneTasks);

  function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value;
    const taskHTML = `
    <li class="list-group-item d-flex justify-content-between task-item">
      <span class="task-title">${taskText}</span>
      <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
      </div>
    </li>
    `;

    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    checkEmptyList();

    taskInput.value = '';
    taskInput.focus();
  }

  function checkEmptyList() {
    if (tasksList.children.length > 1) {
      emptyList.style.display = 'none';
    } else {
      emptyList.style.display = 'flex';
    }
  }

  function deleteTask(event) {
    let target = event.target;

    if (target && target.getAttribute('data-action') === 'delete') {
      target.closest('li').remove();
      checkEmptyList();
    }
  }

  function doneTask(event) {
    let target = event.target;

    if (target && target.getAttribute('data-action') === 'done') {
      const parentNode = target.closest('li');
      parentNode.querySelector('.task-title').classList.toggle('task-title--done');
    }
  }

  function removeDoneTasks() {
    const doneTasks = tasksList.querySelectorAll('.task-title--done');

    doneTasks.forEach(task => task.closest('LI').remove());
    checkEmptyList();
  }
  
});