// SPDX-License-Identifier: MIT 
pragma solidity ^0.5.0;

contract ParkingSystem {
    uint public reservationCount = 0; //unique for each parking reservations;

    struct Reservation{
        uint reservationId;

        uint startDate;
        uint endDate;
        address userAccount;

        uint parkingLevelNum;
        uint parkingSpaceNum;

        bool completed;
        uint rating;
        string comments;
    }

    struct Client{
        uint userID;
        uint points;
    }

    mapping(uint => Reservation) public reservations;

    //print reservation to user when created
    event ReservationCreated(
        uint reservationId,
        uint startDate,
        uint endDate,
        address userAccount,
        uint parkingLevelNum,
        uint parkingSpaceNum,
        bool completed, address sender);

    //print details to user when reservation marked as completed
    event ReservationCompleted(uint reservationId, bool completed, uint rating, string comments);

    function createReservation(
        uint _startDate,
        uint _endDate,
        uint _parkingLevelNum,
        uint _parkingSpaceNum) public{
        reservationCount++;
        reservations[reservationCount] = Reservation(reservationCount, _startDate, _endDate,  msg.sender, _parkingLevelNum, _parkingSpaceNum, false, 0, "");
        emit ReservationCreated(reservationCount, _startDate, _endDate, msg.sender, _parkingLevelNum, _parkingSpaceNum, false, msg.sender);
    }

    function toggleCompleted(uint _id, uint _rating, string memory _comments) public {
        Reservation memory _reservation = reservations[_id];
        _reservation.completed = !_reservation.completed;
        _reservation.rating = _rating;
        _reservation.comments = _comments;
        reservations[_id] = _reservation;
        emit ReservationCompleted(_id, _reservation.completed, _rating, _comments);
    }
}