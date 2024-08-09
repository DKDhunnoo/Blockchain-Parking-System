// SPDX-License-Identifier: MIT 
pragma solidity ^0.5.0;

contract ParkingSystem {
    uint public reservationCount = 0; //unique for each parking reservations;
    uint public ratingCount = 0;
    uint public spotCount = 0;

    struct Reservation{
        uint reservationId;

        uint startDate;
        uint endDate;
        address userId;

        uint parkingSpaceNum;

        bool completed;
    }

    struct Rating{
        uint ratingId;
        address userId;
        
        uint parkingSpaceNum;

        uint rating;
        string comments;
    }

    struct Client{
        address userId;
        uint points;
    }

    struct ParkingSpot{
        uint parkingSpotId;
        uint cost;
        bool hasEVCharger;
        uint distanceToExit;
        bool hasRoof;
    }

    mapping(uint => Reservation) public reservations;
    mapping(uint => Rating) public ratings;
    mapping(address => Client) public clients;
    mapping(uint => ParkingSpot) public spots;

    //store new user info
    function addUser(address userId) public {
        clients[userId] = Client(userId, 0);
    }

    //increment user points
    function SaveUserPoints(address userId, uint points) public {
        clients[userId].points += points;
    }

    //add new parking spots into the system
    function addParkingSpot(uint _cost, bool _hasEVCharger, uint _distanceToExit, bool _hasRoof) public {
        spotCount++;
        spots[spotCount] = ParkingSpot(spotCount, _cost, _hasEVCharger, _distanceToExit, _hasRoof);
    }

    //create new reservation and increment user points
    function createReservation(
        uint _startDate,
        uint _endDate,
        //uint _parkingLevelNum,
        uint _parkingSpaceNum) public {
        reservationCount++;
        reservations[reservationCount] = Reservation(reservationCount, _startDate, _endDate, msg.sender, _parkingSpaceNum, false);

        //increment user points
        clients[msg.sender].points += 10;

        emit ReservationCreated(reservationCount, _startDate, _endDate, msg.sender, _parkingSpaceNum, false);
    }

    //print reservation to user when created
    event ReservationCreated(
        uint reservationId, uint startDate, uint endDate, address userId, uint parkingSpaceNum, bool completed);
    
    function toggleCompleted(uint _id) public {
        Reservation memory _reservation = reservations[_id];
        _reservation.completed = !_reservation.completed;

        reservations[_id] = _reservation;

        //increment user points
        clients[msg.sender].points += 2;

        emit ReservationCompleted(_id, _reservation.completed);
    }

    //print details to user when reservation marked as completed
    event ReservationCompleted(uint reservationId, bool completed);

    function rateSpot(uint _parkingSpaceNum, uint _rating, string memory _comments) public {
        ratingCount++;
        ratings[ratingCount] = Rating(ratingCount, msg.sender, _parkingSpaceNum, _rating, _comments);

        //increment user points
        clients[msg.sender].points += 5;
    }
}