"use strict";
exports.__esModule = true;
var todoItem_1 = require("./todoItem");
var inquirer = require("inquirer");
var jsonTodoCollection_1 = require("./jsonTodoCollection");
var todos = [
    new todoItem_1.TodoItem(1, "Buy Flowers"), new todoItem_1.TodoItem(2, "Get Shoes"),
    new todoItem_1.TodoItem(3, "Collect Tickets"), new todoItem_1.TodoItem(4, "Call Joe", true)
];
var collection = new jsonTodoCollection_1.JsonTodoCollection("Adam", todos);
var showCompleted = true;
function displayTodoList() {
    console.log(collection.userName + "'s Todo List "
        + ("(" + collection.getItemCounts().incomplete + " items to do)"));
    collection.getTodoItems(true).forEach(function (item) { return item.printDetails(); });
}
function promptAdd() {
    console.clear();
    inquirer.prompt({ type: "input", name: "add", message: "Enter task:" }).then(function (answers) {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    });
}
function promptComplete() {
    console.clear();
    inquirer.prompt({ type: "checkbox", name: "complete",
        message: "Mark Which Tasks are Complete",
        choices: collection.getTodoItems(showCompleted).map(function (item) {
            return ({ name: item.task, value: item.id, checked: item.complete });
        })
    }).then(function (answers) {
        var completedTasks = answers["complete"];
        collection.getTodoItems(true).forEach(function (item) {
            return collection.markComplete(item.id, completedTasks.find(function (id) { return id === item.id; }) != undefined);
        });
        promptUser();
    });
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Quit"] = "Quit";
    Commands["Complete"] = "Complete Task";
    Commands["Purge"] = "Remove Completed Tasks";
})(Commands || (Commands = {}));
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "choose option",
        choices: Object.values(Commands)
    }).then(function (answers) {
        switch (answers["command"]) {
            case Commands.Toggle:
                console.clear();
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                if (collection.getItemCounts().incomplete > 0) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
        }
    });
}
promptUser();

//# sourceMappingURL=index.js.map
