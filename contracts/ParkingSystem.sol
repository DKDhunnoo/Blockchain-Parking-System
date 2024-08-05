// SPDX-License-Identifier: MIT 
pragma solidity ^0.5.0;

contract TodoList {
    //Dont need this unless we wanna define how many parking spaces or levels there are in the system
    /*uint public parkinglotLevels = 0;
    uint public parkinglotSpaces = 0; */

    uint public reservationCount = 0; //unique for each parking reservations;

    //DOnt think we need this. WE can just read the parking reservation array and derive all the data from there itself. Most code will be in js for displaying then.
    //GRid like structure or idk
   /*  struct ParkingLot{
        ParkingSpace[][] parkingSpaces;
        
    }

    struct ParkingSpace{
        Reservation[] Reservations;
    }   

    struct Day{
        uint a;
    } */

    struct Reservation{
        uint reservationId;

        uint startDate;
        uint endDate;
        string clientName;

        uint parkingLevelNum;
        uint parkingSpaceNum;

        bool completed;
    }

    mapping(uint => Reservation) public reservations;

    //print reservation to user when created
    event ReservationCreated(
        uint reservationId,
        uint startDate,
        uint endDate,
        string clientName,
        uint parkingLevelNum,
        uint parkingSpaceNum,
        bool completed);

    //print details to user when reservation marked as completed
    event ReservationCompleted(uint reservationId, bool completed);


    constructor() public {
        createReservation(0, 0, "name", 0, 0);
    }

    function createReservation(uint _startDate, uint _endDate, string memory _clientName, uint _parkingLevelNum, uint _parkingSpaceNum) public {
        reservationCount++;
        reservations[reservationCount] = Reservation(reservationCount, _startDate, _endDate, _clientName, _parkingLevelNum, _parkingSpaceNum, false);
        emit ReservationCreated(reservationCount, _startDate, _endDate, _clientName, _parkingLevelNum, _parkingSpaceNum, false);
    }

    function toggleCompleted(uint _id) public {
        Reservation memory _reservation = reservations[_id];
        _reservation.completed = !_reservation.completed;
        reservations[_id] = _reservation;
        emit ReservationCompleted(_id, _reservation.completed);
    }
}