const fs = require("fs");

const filePath = "./tasks.json";

// 1. Load tasks from the JSON file
const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

// 2. Save tasks into the JSON file
const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks);

    fs.writeFileSync(filePath, dataJSON);
};

// 3. Add a new task
const addTask = (task) => {
    const tasks = loadTasks();

    tasks.push({
        id: Date.now(),
        task: task
    });

    saveTasks(tasks);

    console.log("Task added successfully!");
};

// 4. Display all tasks
const listTasks = () => {
    const tasks = loadTasks();

    if (tasks.length === 0) {
        console.log("No tasks found!");
        return;
    }

    tasks.forEach((task) => {
        console.log(`${task.id}: ${task.task}`);
    });
};

// 5. Delete a task
const deleteTask = (id) => {
    const tasks = loadTasks();

    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (filteredTasks.length === tasks.length) {
        console.log("Task not found!");
        return;
    }

    saveTasks(filteredTasks);

    console.log("Task deleted successfully!");
};

// 6. Get command-line arguments
const command = process.argv[2];
const argument = process.argv[3];

// 7. Decide which function to execute
if (command === "add") {
    addTask(argument);

} else if (command === "list") {
    listTasks();

} else if (command === "delete") {
    deleteTask(Number(argument));

} else {
    console.log("Invalid command!");
    console.log("Available commands: add, list, delete");
}