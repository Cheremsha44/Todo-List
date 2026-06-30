export class Project{
    constructor(projectName){
        this.id = crypto.randomUUID();
        this.projectName = projectName;
        this.tasks = []
    }
    addTask(todoObject){
        this.tasks.push(todoObject)
    }
    deleteTask(id){
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
    getIncompleteTasks(){
        return this.tasks.filter(task => task.isComplete === false)
    }
}