App = {
    loading: false,
    contracts: {},

    load: async () => {
      //loadWeb3() JS allows client to talk to blockchain
      await App.loadWeb3()
      //load account
      await App.loadAccount()
      //load contract
      await App.loadContract()
      //display
      await App.render()
    },

    loadWeb3: async () => {

      if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
            //console.log(web3.eth.accounts[0]);  
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
    // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },

    //web3.eth.accounts[0] - meaning first account on ganache
    loadAccount: async () => {
      // Set the current blockchain account
      App.account = web3.eth.accounts[0]
      //web3.eth.defaultAccount=web3.eth.accounts[0]
    },
    
    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const parkingSystem = await $.getJSON('ParkingSystem.json')
      App.contracts.ParkingSystem = TruffleContract(parkingSystem)
      App.contracts.ParkingSystem.setProvider(App.web3Provider)
      // Hydrate the smart contract with values from the blockchain
      App.parkingSystem = await App.contracts.ParkingSystem.deployed()
    },

    render: async () => {
      // Prevent double render
      if (App.loading) {
        return
      }

     // Update app loading state
      App.setLoading(true)
      
      // Render Account
      $('#account').html(App.account)
            
      // Render Tasks
      await App.renderTasks()
      //window.alert("After Task rendered")    

      // Update loading state
      App.setLoading(false)
    },
  
    renderTasks: async () => {
       
      // Load the total task count from the blockchain
      const reservationCount = await App.parkingSystem.reservationCount()
      //console.log(taskCount)
      //window.alert(taskCount)

      //refering to id tasktemplate in html
      const $reservationTemplate = $('.reservationTemplate')
         
      // Render out each task with a new task template
      for (var i = 1; i <= reservationCount; i++) {
        
        // Fetch the task data from the blockchain
        const reservation = await App.parkingSystem.reservations(i)
        //window.alert(task)
        const reservationId = reservation[0].toNumber()
        //window.alert(taskId)
        const startDate = reservation[1].toNumber()
        const endDate = reservation[2].toNumber()
        const clientName = reservation[3]
        const parkingLevelNum = reservation[4]
        const parkingSpaceNum = reservation[5]
        const completed = task[6]
        //window.alert(completed)

        // Create the html for the task
        const $newReservationTemplate = $reservationTemplate.clone()

        //.content refering to class=content
        //input refering to input type
        $newReservationTemplate.find('.content').html(clientName)
        $newReservationTemplate.find('input')
                        .prop('name', reservationId)
                        .prop('checked', completed)
                        .on('click', App.toggleCompleted)
                
        // Put the task in the correct list
        
        
        if (completed) {
          $('#completedReservation').append($newReservationTemplate)
          //window.alert("taskcom true")
        } else {
          $('#registrationList').append($newReservationTemplate)
          //window.alert("taskcom false")
        }
        // Show the task
        $newReservationTemplate.show()
        
      }
    },

    createTask: async () => {
        App.setLoading(true)
        const content = $('#newREgistration').val()
        await App.parkingSystem.createRegistration(content, {from: App.account}) //REached here
        window.location. reload()
    },

    toggleCompleted: async (e) => {
        App.setLoading(true)
        const taskId = e.target.name
        await App.todoList.toggleCompleted(taskId, {from: App.account})
        window.location.reload()
    },


    setLoading: (boolean) => {
      //window.alert(boolean)
      App.loading = boolean
      const loader = $('#loader');
      const content = $('#content');
      if (boolean) {
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    },
  }
  $(() => {
    $(window).load(() => {
      App.load()
    })
  })