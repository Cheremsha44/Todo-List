import "./styles.css";
import { Todo } from "./todo.js";

const task = new Todo('1', '2', '3', '4')
task.toggleComplite()
console.log(task)