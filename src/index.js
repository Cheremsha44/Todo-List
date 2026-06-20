import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";

const task = new Todo('1', '2', '3', 1);
const task2 = new Todo('12', '22', '32', 3);
const proj = new Project('HomeWork');
task.toggleComplete()
proj.addTask(task)
proj.addTask(task2)

console.log(proj)