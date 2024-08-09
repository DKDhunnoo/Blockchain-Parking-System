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
      viewReservations();
      loadPoints();
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

const rentSpot = async () => {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const parkingLevelNum = document.getElementById('parkingLevelNum').value;
  const parkingSpaceNum = document.getElementById('parkingSpaceNum').value;

  if (contract && account) {
    await contract.methods.createReservation(startDate, endDate, parkingLevelNum, parkingSpaceNum).send({ from: account });
    // Placeholder: Reload data if needed
  }
};

const loadPoints = async () => {
  if (contract && account) {
    // Placeholder for points system
    const client = await contract.methods.clients(account).call();
    document.getElementById('points').innerText = client.points;
  } 
};

const completeRent = async (reservationId) =>{
  if (contract && account) {
    await contract.methods.toggleCompleted(reservationId).send({ from: account});
    viewReservations();
  }
}

const rateSpot = async (parkingSpaceNum) =>{
  window.location="rate.html?parkingSpaceNum="+parkingSpaceNum;
}

const viewReservations = async () => {
  console.log("In function");

  // Load the total task count from the blockchain
  const reservationCount = await contract.methods.reservationCount.call().call();
  console.log("after accessing count: ", reservationCount);

  document.getElementById("tableCompleted").innerHTML= "<tr><th>Reservation ID</th><th>User Id</th><th>Start Date</th><th>End Date</th><th>Parking Space</th><tr>";

  document.getElementById("tableActive").innerHTML= "<tr><th>Reservation ID</th><th>User Id</th><th>Start Date</th><th>End Date</th><th>Parking Space</th></tr>";
     
  // Render out each task with a new task template
  for (var i = 1; i <= reservationCount; i++) {
    const reservation = await contract.methods.reservations(i).call();

    if(reservation.completed)
    {
      document.getElementById("tableCompleted").innerHTML+= "<tr><td>"+reservation.reservationId+"</td><td>"+reservation.userId+"</td><td>"+reservation.startDate+"</td><td>"+reservation.endDate+"</td><td>"+reservation.parkingSpaceNum+"</td><td><button onclick='rateSpot("+reservation.parkingSpaceNum+")'>Rate</button></td></tr>";
    }
    else{
      document.getElementById("tableActive").innerHTML+= "<tr><td>"+reservation.reservationId+"</td><td>"+reservation.userId+"</td><td>"+reservation.startDate+"</td><td>"+reservation.endDate+"</td><td>"+reservation.parkingSpaceNum+"</td><td><button onclick='completeRent("+i+")'>Complete</button></td></tr>"; 
    }
  }
};
