let web3;
let contract;
let account;

const contractAddress = '0x9Bd0f4688da1EDBD4a8Da81C41ef787cFCF37083';
const contractABI = [{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "reservationId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "bool",
      "name": "completed",
      "type": "bool"
    }
  ],
  "name": "ReservationCompleted",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "reservationId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "startDate",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "endDate",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "userId",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "parkingSpaceNum",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "bool",
      "name": "completed",
      "type": "bool"
    }
  ],
  "name": "ReservationCreated",
  "type": "event"
},
{
  "constant": true,
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "clients",
  "outputs": [
    {
      "internalType": "address",
      "name": "userId",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "points",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "ratingCount",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "ratings",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "ratingId",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "userId",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "parkingSpaceNum",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "rating",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "comments",
      "type": "string"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "reservationCount",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "reservations",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "reservationId",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "startDate",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "endDate",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "userId",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "parkingSpaceNum",
      "type": "uint256"
    },
    {
      "internalType": "bool",
      "name": "completed",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "spotCount",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "spots",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "parkingSpotId",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "cost",
      "type": "uint256"
    },
    {
      "internalType": "bool",
      "name": "hasEVCharger",
      "type": "bool"
    },
    {
      "internalType": "uint256",
      "name": "distanceToExit",
      "type": "uint256"
    },
    {
      "internalType": "bool",
      "name": "hasRoof",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "internalType": "address",
      "name": "userId",
      "type": "address"
    }
  ],
  "name": "addUser",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "internalType": "address",
      "name": "userId",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "points",
      "type": "uint256"
    }
  ],
  "name": "SaveUserPoints",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_cost",
      "type": "uint256"
    },
    {
      "internalType": "bool",
      "name": "_hasEVCharger",
      "type": "bool"
    },
    {
      "internalType": "uint256",
      "name": "_distanceToExit",
      "type": "uint256"
    },
    {
      "internalType": "bool",
      "name": "_hasRoof",
      "type": "bool"
    }
  ],
  "name": "addParkingSpot",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_startDate",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_endDate",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_parkingSpaceNum",
      "type": "uint256"
    }
  ],
  "name": "createReservation",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_id",
      "type": "uint256"
    }
  ],
  "name": "toggleCompleted",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_parkingSpaceNum",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_rating",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "_comments",
      "type": "string"
    }
  ],
  "name": "rateSpot",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}];

window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];
      document.getElementById('user-address').innerText = `Connected: ${account}`;
      contract = new web3.eth.Contract(contractABI, contractAddress);
      // Initial data loading can be done here
      getAvailableSpots();
    } catch (error) {
      console.error("User denied account access", error);
    }
  } else {
    console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }
});

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];
      document.getElementById('user-address').innerText = `Connected: ${account}`;
      contract = new web3.eth.Contract(contractABI, contractAddress);
      // Initial data loading can be done here
    } catch (error) {
      console.error("User denied account access", error);
    }
  } else {
    console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }
};

const rentSpot = async (parkingSpaceNum) => {
  if (contract && account) {
    await contract.methods.createReservation(startDateTime.valueOf(), endDateTime.valueOf(),parkingSpaceNum).send({ from: account });
    getAvailableSpots();
  }
};

  //start: 1723197600000
  //end: 1723201200000

  var startDateTime;
  var endDateTime;

  // Function to log selected start datetime
  document.getElementById('startdatetime').addEventListener('change', function() {
    console.log(this.value);
    startDateTime = new Date(this.value);
    console.log('Start DateTime:', startDateTime.valueOf());
  });

  // Function to log selected end datetime
  document.getElementById('enddatetime').addEventListener('change', function() {
    endDateTime = new Date(this.value);
    console.log(this.value);
    console.log('End DateTime:', endDateTime.valueOf());
  });

const getAvailableSpots = async () => {
  console.log("In function");

  // Load the total task count from the blockchain
  const reservationCount = await contract.methods.reservationCount.call().call();

  //Create new set to store rented spots for this time.
  var rented = new Set();

  for (var i = 1; i <= reservationCount; i++) {
    const previousReservation = await contract.methods.reservations(i).call();

    console.log(parseInt(previousReservation.startDate) + "|" + startDateTime.valueOf());
    console.log(parseInt(previousReservation.endDate) + "|" + endDateTime.valueOf());

    //if scheduled, add to set
    if(!((startDateTime.valueOf() < parseInt(previousReservation.startDate) && endDateTime.valueOf() < parseInt(previousReservation.startDate)) || (startDateTime.valueOf() > parseInt(previousReservation.endDate) && endDateTime.valueOf() > parseInt(previousReservation.endDate))) && previousReservation.completed == false)
    {
        rented.add(previousReservation.parkingSpaceNum);
    }
  }

  document.getElementById("tableActive").innerHTML= "<tr><th>Parking Space</th><th>Rating</th></tr>";

  //for all the spots
  for( var i = 1; i <= 10; i++)
  {
    //show the ones that hasn't been rented yet
    if(rented.has(i.toString()))
    {
        document.getElementById("tableActive").innerHTML+= "<tr><td>"+i+"</td><td><button>Unavailable</button></td></tr>";
    }
    else
    {
      document.getElementById("tableActive").innerHTML+= "<tr><td>"+i+"</td><td><button onclick='rentSpot("+i+")'>Rent</button></td></tr>";
    }
  }
};

