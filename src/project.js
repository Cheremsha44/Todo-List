export class Project{
    constructor(projectName){
        this.projectName = projectName;
        this.tasks = []
    }
    addTask(todoObject){
        this.tasks.push(todoObject)
    }
    deleteTask(id){
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}