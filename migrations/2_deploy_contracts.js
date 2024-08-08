var TodoList = artifacts.require("./ParkingSystem.sol");

module.exports = function(deployer){
    deployer.deploy(TodoList);
};