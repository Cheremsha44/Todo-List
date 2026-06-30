export function renderTasks(tasksArray){
    const todoworkspace = document.querySelector('.tasks-container')
    todoworkspace.innerHTML = ''
    tasksArray.forEach(task => {
        const taskHTML = `
            <div data-id="${task.id}" class="task-card">
                <div class="task-card__checkbox">
                    <input data-action="changeState" type="checkbox" class="checkbox-custom">
                </div>
                <div class="task-card__content">
                    <h4 class="task-title">${task.title}</h4>
                    <p class="task-desc">${task.description}</p>
                    <div class="task-meta">
                        <span data-action="changePriority" class="badge priority-high">${task.priority}</span>
                        <span data-action="changeData" class="task-date">${task.dueDate}</span>
                    </div>
                </div>
                <div class="task-card__actions">
                    <button data-action="DeleteTodo" class="btn-icon">Delete</button>
                </div>
            </div>
        `;
        todoworkspace.insertAdjacentHTML('beforeend', taskHTML)
    });
}

export function renderProjects(arrayProjects){
    const projectArray = document.querySelector('#projects-list')
    projectArray.innerHTML = ''
    arrayProjects.forEach(project => {
        const projectHTML = `
            <li data-id="${project.id}" class="menu-item">${project.projectName}</li>
        `
        projectArray.insertAdjacentHTML('beforeend', projectHTML)
    })
}