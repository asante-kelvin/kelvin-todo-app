const textInput = document.querySelector('#taskInput')
const addTaskButton = document.querySelector('#addTaskButton')
const taskList = document.querySelector('.task-list')
const clearItems = document.querySelector('#clearButton')
const filterItems = document.getElementById('filter')

// Load items from local storage when the page loads
document.addEventListener('DOMContentLoaded', displayItemsFromLocalStorage);

function displayItemsFromLocalStorage() {

  // This part displays already-saved tasks
  const items = JSON.parse(localStorage.getItem('items')) || [];

  items.forEach(function(item) {
    const listItem = document.createElement('li');
    listItem.className = 'task-item done';
    listItem.textContent = item;

    // Add delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = "X";
    delBtn.className = 'delete';
    listItem.append(delBtn);

    // Add done button
    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.classList = 'task-tag done-tag';
    listItem.append(doneBtn);
    doneBtn.style.border = 'none'

    taskList.appendChild(listItem);
  });

  // ✅ Attach all your event listeners
  addTaskButton.addEventListener('click', addTask)
  taskList.addEventListener('click', deleteItem)
  taskList.addEventListener('click', TaskDone)
  clearItems.addEventListener('click', itemsTOClear)
  filterItems.addEventListener('input', toFilterItems)
 
//  Function to add items to the list
  function addTask() {
    const newTaskText = textInput.value.trim()
    if (newTaskText === '') {
      alert('Please add a task')
    } else {
      const listItem = document.createElement('li')
      listItem.className = 'task-item done'
      listItem.textContent = newTaskText
      taskList.appendChild(listItem)
      saveItemToLocalStorage(newTaskText)

      // Adding button to the list item
      const delBtn = document.createElement('button')
      delBtn.textContent = "X"
      delBtn.className = 'delete'
      listItem.append(delBtn)

      // Adding the finish button
      const doneBtn = document.createElement('button')
      doneBtn.textContent = 'Done'
      doneBtn.classList = 'task-tag done-tag'
      listItem.append(doneBtn)
      doneBtn.style.border = 'none'
    }
    textInput.value = ''
  }

  // Function to delete an item
  function deleteItem(e) {
    if (e.target.classList.contains('delete')) {
      if (confirm('Do you want to delete this item?')) {
        const li = e.target.parentElement
        li.remove()
        removeItemFromLocalStorage(li.textContent.replace('X', '').replace('Done', ''))
      }
    }
  }

  // Function to Save task to the local Storage
  function saveItemToLocalStorage(item) {
    let items;
    if (localStorage.getItem('items') === null) {
      items = []
    } else {
      items = JSON.parse(localStorage.getItem('items'))
    }
    items.push(item)
    localStorage.setItem('items', JSON.stringify(items))
  }

  // Function to delete an item from local storage
  function removeItemFromLocalStorage(ItemsText) {
    let items = JSON.parse(localStorage.getItem('items')) || []
    items = items.filter((i) => i !== ItemsText)
    localStorage.setItem('items', JSON.stringify(items))
  }

//   Function to Clear items
  function itemsTOClear() {
    if (taskList && taskList.firstElementChild) {
      if (confirm('Do you want to clear all the items?')) {
        taskList.innerHTML = ''
        localStorage.removeItem('items')
        console.log('all item is cleared')
      }
    } else {
      alert('nothing is cleared')
    }
  }

  // Function to mark task as done
  function TaskDone(e) {
    const element = e.target;
    if (element.classList.contains('task-tag') && element.classList.contains('done-tag')) {
      if (confirm(`Congratulation for finishing today's task`)) {
        const done = element.parentElement
        done.style.textDecoration = 'line-through'
      }
    }
  }

//   Function to Filter or search items
  function toFilterItems(e){
       const text  = e.target.value.toLowerCase()
       const items = document.querySelectorAll('li')

       items.forEach(item =>{
        const textItems = item.firstChild.textContent.toLowerCase()

        if(textItems.includes(text)){
            item.style.display = 'flex'
        }else{
            item.style.display = 'none'
        }
       })
  }

// //  Editing Mode Cancelled  for a reason
// taskList.addEventListener('click', (e) => {
//   if (e.target.tagName === 'LI') {
//     e.target.contentEditable = true;
//     e.target.focus();

//     // Optional: style while editing
//     e.target.classList.add('editing');

//     e.target.addEventListener('blur', () => {
//       e.target.contentEditable = false;
//       e.target.classList.remove('editing');
//     });
//   }
// });


}