export class Todo{
    constructor(title, description, dueDate, priority){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.changePriority(priority);
        this.isComplete = false;
    };
    toggleComplete(){
        this.isComplete = !this.isComplete
    }
    changePriority(newValue){
        if(typeof newValue !== 'number' || newValue < 1 || newValue > 9){
            console.error("Неверный приоритет")
            return;
        }
        this.priority = newValue
    }
}