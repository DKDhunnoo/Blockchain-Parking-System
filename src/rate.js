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
    } catch (error) {
      console.error("User denied account access", error);
    }
  } else {
    console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }
  
  getSpotId();
  getPreviousRatings();
  getTotalRents();
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

var spotId;

//get the spot ID from url params
function getSpotId(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  spotId = parseInt(urlParams.get('parkingSpaceNum'));
  //console.log(spotId);

  document.getElementById('spot-info').innerHTML = "<p>Spot ID: " + spotId + "</p>";
}

const reviewSpot = async () => {
    const stars = document.getElementById('stars').value;
    const comment = document.getElementById('comment').value;
  
    if (contract && account) {
      await contract.methods.rateSpot(spotId, stars, comment).send({ from: account });

      getSpotId();
      getPreviousRatings();
      getTotalRents();
    }
  };

const getPreviousRatings = async () => {
  // Load the total task count from the blockchain
  const ratingCount = await contract.methods.ratingCount.call().call();

    //create variables to store rating information
    var ratingSum = 0;
    var ratingCounts = 0;
    var ratingAverage = 0;

  //initialise table
  document.getElementById("tablePreviousRatings").innerHTML= "<tr><th>User ID</th><th>Rating</th><th>Comments</th></tr>";

  for (var i = 1; i <= ratingCount; i++) {
    const rating = await contract.methods.ratings(i).call();

    //show ratings for this parking spot
    if(rating.parkingSpaceNum == spotId)
    {
      ratingSum += parseInt(rating.rating);
      ratingCounts++;

      document.getElementById("tablePreviousRatings").innerHTML+= "<tr><td>"+rating.userId+"</td><td>"+rating.rating+"</td><td>"+rating.comments+"</td></tr>";
    }
  }

  //calculate rating average and add to spot info
  ratingAverage = ratingSum/ratingCounts;
  document.getElementById('spot-info').innerHTML += "<p>Rating: " + ratingAverage.toFixed(1) + "</p>";
};

const getTotalRents = async () => {
  //calculate total number of rents
  const reservationCount = await contract.methods.reservationCount.call().call();

  var rentCount = 0;
  
  for (var i = 1; i <= reservationCount; i++) {
    const previousReservation = await contract.methods.reservations(i).call();

    if(parseInt(previousReservation.parkingSpaceNum) == spotId){
      rentCount++;
    }
  }

  document.getElementById('spot-info').innerHTML += "<p>Total Rents: " + rentCount + "</p>";
}