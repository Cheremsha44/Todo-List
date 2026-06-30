import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { renderTasks, renderProjects } from "./ui.js";
import { isToday, format } from 'date-fns';

const today = new Date(); 
const formatted = format(today, 'yyyy.MM.dd');

const form = document.getElementById('addForm')
const taskBtn = document.getElementById('create-task-btn')
const projBtn = document.getElementById('addButton')
const addProjBtn = document.getElementById('submit-new-project')
const addProjectForm = document.querySelector('.add-project-form')
const todoworkspace = document.querySelector('.tasks-container')
const projectArray = document.querySelector('#projects-list')
const filterArray = document.querySelector('#filters-list')

let myProjects = []

let currentProject = ''

function saveToStorage(){
    const textData = JSON.stringify(myProjects)
    localStorage.setItem('todoData', textData)
}

projBtn.addEventListener('click', (e) => {
    hideMenu()
})

function hideMenu(){
    addProjectForm.classList.toggle("hidden")
    if(addProjectForm.classList.contains('hidden')){
        projBtn.textContent = '+'
    }else{
        projBtn.textContent = '-'
    }
}

addProjectForm.addEventListener('submit', function(e){
    e.preventDefault();
    let input = document.getElementById('new-project-input');
    if (input.value.trim() !== ''){
        const newAddProject = new Project(input.value)
        myProjects.push(newAddProject)
        renderProjects(myProjects)
        saveToStorage()
        hideMenu()
        input.value = ''
    }
})

function loadFromStorage(){
    const textData = localStorage.getItem('todoData')
    if(!textData) return
    const parsedData = JSON.parse(textData)
    const liveProjects = parsedData.map(deadProject => {
        const liveProj = new Project(deadProject.projectName)
        liveProj.id = deadProject.id
        liveProj.tasks = deadProject.tasks.map(deadTask => {
            const liveTask = new Todo(deadProject.id, deadTask.title, deadTask.description, deadTask.dueDate, deadTask.priority)
            liveTask.id = deadTask.id
            liveTask.isComplete = deadTask.isComplete
            return liveTask
        })
        return liveProj
    })
    myProjects = liveProjects;
}

function initApp(){
    loadFromStorage()
    if(myProjects.length === 0){
        const Inbox = new Project('Inbox');
        myProjects.push(Inbox)
        saveToStorage()
    }
    currentProject = myProjects[0]
    renderProjects(myProjects)
    renderTasks(currentProject.getIncompleteTasks())
}

projectArray.addEventListener('click', (e) => {
    const menuItem = e.target.closest('.menu-item')
    if (!menuItem) return;
    const activeItem = document.querySelector('.menu-item.active')
    if(activeItem){
        activeItem.classList.remove("active")
    }
    menuItem.classList.add("active")

    const proj = myProjects.find(project => project.id === menuItem.dataset.id)
    currentProject = proj
    refreshCurrentView()
})

filterArray.addEventListener("click", (e) => {
    const menuItem = e.target.closest('.menu-item')
    if (!menuItem) return;
    const activeItem = document.querySelector('.menu-item.active')
    if(activeItem){
        activeItem.classList.remove("active")
    }
    menuItem.classList.add("active")
    const filterMode = menuItem.dataset.filter;
    refreshCurrentView()
})

function getAllTasks(mode){
    const allTasks = myProjects.flatMap(project => project.tasks)
    if(mode === 'all'){
        return allTasks.filter(task => task.isComplete === false);
    }else if(mode === 'priority'){
        return allTasks.filter(task => task.priority === 3 && task.isComplete === false)
    }else if(mode === 'completed'){
        return allTasks.filter(task => task.isComplete === true)
    }else if(mode === 'today'){
        return allTasks.filter(task => isToday(task.dueDate) && task.isComplete === false)
    }
}

todoworkspace.addEventListener("click", e => {
    const action = e.target.dataset.action;
    
    if(!action) return;
    console.log(action)
    const taskId = e.target.closest('.task-card').dataset.id;
    const taska = myProjects.flatMap(p => p.tasks).find(task => task.id === taskId)

    if(!taska) return;

    if(action === 'changePriority'){
        taska.priority === 3 ? taska.changePriority(1) : taska.changePriority(taska.priority + 1) 
        refreshCurrentView()
        saveToStorage()
    }else if(action === 'DeleteTodo'){
        const project = myProjects.find(proj => proj.id === taska.projectId)
        project.deleteTask(taskId)
        refreshCurrentView()
        saveToStorage()
    }else if(action === 'changeState'){
        taska.toggleComplete()
        refreshCurrentView()
        saveToStorage()
    }
})

function refreshCurrentView() {
    const activeTab = document.querySelector('.menu-item.active');
    if(activeTab.dataset.filter){
        renderTasks(getAllTasks(activeTab.dataset.filter));
    } else {
        renderTasks(currentProject.getIncompleteTasks());
    }
}

taskBtn.addEventListener("click", e => {
    const inputtask = document.querySelector('#input-task')
    inputtask.classList.add('active');
    document.getElementById('title').focus();
})

form.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form))
    formData.priority = Number(formData.priority)
    const task = new Todo(currentProject.id, formData.title, formData.description, formData.dueDate, formData.priority)
    currentProject.addTask(task)
    refreshCurrentView();
    form.reset()
    saveToStorage()
})


initApp()