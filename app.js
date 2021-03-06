var taskInput = document.getElementById('new-task');
var addButton = document.querySelector('p button');
var incompleteTasksHolder = document.getElementById('incomplete-tasks');
var completedTasksHolder = document.getElementById('completed-tasks');

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement('li');
  var checkBox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var editButton = document.createElement('button');
  var deleteButton = document.createElement('button');

  // Limit to 24 characters 
  editInput.maxLength = 24;

  checkBox.type = 'checkbox';
  editInput.type  = 'text';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function () {
  console.log('Add task . . . ');
  taskInput.focus();

  var taskValue = taskInput.value;
  // Check if zero input
  if (taskValue.replace(/\s+/, '').length === 0) {
    return taskInput.value = '';
  }

  var listItem = createNewTaskElement(taskValue.trim());

  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  // Reset value
  taskInput.value = '';
};

var editTask = function (event) {
  if (event.target.tagName === 'BUTTON') {
    console.log('Edit/Done ' + event.target.tagName + ' task . . . ');
  } else {
    console.log(event.target.tagName + ' task . . . ');
  }

  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  var containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    label.innerText = editInput.value;
    this.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editInput.nextElementSibling.innerText = 'Done';
  }

  if (!listItem.children[1].innerText) {
    listItem.children[1].innerText = 'Fill out later.';
  }

  listItem.classList.toggle('editMode');
  editInput.focus();
};

var deleteTask = function () {
  console.log('Delete task . . . ');

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
};

var taskCompleted = function () {
  console.log('Completed task . . . ');

  var listItem = this.parentNode;

  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log('Incomplete task . . . ');

  var listItem = this.parentNode;

  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');
  var label = taskListItem.querySelector('label');

  editButton.onclick = editTask;
  
  deleteButton.onclick = deleteTask;
  
  checkBox.onchange = checkBoxEventHandler;

  label.onclick = editTask;
};

addButton.addEventListener("click", addTask);

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
