"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var todoItem_1 = require("./todoItem");
var TodoCollection = /** @class */ (function () {
    function TodoCollection(userName, todoItems) {
        var _this = this;
        if (todoItems === void 0) { todoItems = []; }
        this.userName = userName;
        this.todoItems = todoItems;
        this.nextId = 1;
        this.itemMap = new Map();
        todoItems.forEach(function (item) { return _this.itemMap.set(item.id, item); });
    }
    TodoCollection.prototype.addTodo = function (task) {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.todoItems.push(new todoItem_1.TodoItem(this.nextId, task));
        this.itemMap.set(this.nextId, new todoItem_1.TodoItem(this.nextId, task));
        return this.nextId;
    };
    TodoCollection.prototype.removeComplete = function () {
        var _this = this;
        this.itemMap.forEach(function (item) {
            if (item.complete) {
                _this.itemMap["delete"](item.id);
            }
        });
    };
    TodoCollection.prototype.getTodoById = function (id) {
        return this.itemMap.get(id);
    };
    TodoCollection.prototype.getTodoItems = function (includeComplete) {
        return __spreadArrays(this.itemMap.values()).filter(function (item) { return includeComplete || !item.complete; });
    };
    TodoCollection.prototype.getItemCounts = function () {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        };
    };
    TodoCollection.prototype.markComplete = function (id, complete) {
        var todoItem = this.getTodoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        }
    };
    return TodoCollection;
}());
exports.TodoCollection = TodoCollection;

//# sourceMappingURL=todoCollection.js.map
