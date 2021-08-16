var currentURL = window.location.href;

//Retrieving JSON data from our API to create a tasks list

async function getTasks() {
    const response = await fetch(currentURL+'data');

    if (!response.ok) {
        const message = 'An error has ocurred: ${response.status}';
        throw new Error(message);
    }

    const tasks = await response.json();
    return tasks;
}

getTasks().catch(error => {
    error.message;
});


//Append tasks to list in HTML
getTasks().then(tasks => {
    for (let i = 0; i < tasks.length; i++) {
        var item = document.createElement('li');
        item.classList.add('todo-list-item');

        var division = document.createElement('div');
        division.classList.add('todo-list-item-name', tasks[i].status);
        division.setAttribute('id', tasks[i]._id);

        var task = document.createTextNode(tasks[i].content);

        var edit = document.createElement('a');
        edit.classList.add('edit');
        edit.setAttribute('href', currentURL+'edit/'+tasks[i]._id+'/'+tasks[i].status)
        var editIcon = document.createElement('i');
        editIcon.setAttribute('class', 'far fa-check-square');
        editIcon.setAttribute('id', tasks[i]._id);

        var remover = document.createElement('a');
        remover.classList.add('remove');
        remover.setAttribute('href', currentURL+'remove/'+tasks[i]._id)
        var removerIcon = document.createElement('i');
        removerIcon.setAttribute('class', 'fas fa-times');

        item.appendChild(division);
        division.appendChild(task);
        item.appendChild(edit);
        edit.appendChild(editIcon);
        item.appendChild(remover);
        remover.appendChild(removerIcon);

        document.querySelector('ul').appendChild(item);
    };
});


