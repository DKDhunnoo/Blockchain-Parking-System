// SPDX-License-Identifier: MIT 
pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

    //user defined data type for a task
    struct Task{
        uint id;
        string content;
        bool completed;
    }

    //a list of tasks with an id
    mapping(uint => Task) public tasks;

    //an event for when a task has been created (basically to print out the data in the event to the user)
    event TaskCreated(
        uint id, string content, bool completed
    );

    //an event for then a task has been completed. It is printed
    event TaskCompleted(
        uint id, bool completed
    );

    //constructor for a task
    constructor() public {
        createTask("HelloWorld");
    }

    //function to create a task, assigned an id, the content and add it to the list of tasks and activate the task created event when completed.
    //This is a public function and thus can be called by a user.
    function createTask(string memory _content) public{
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

    //FUnction to change the value of a task to completed so that it is changed in the blockchain.
    //it gets the appropriate task from the list using the ID
    //then updated its completed value to true
    //then overwrites it with the new value in the list
    //then prints a message using the taskCompleted event
    //THis is a public function and thus can be called by a user.
    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }
}