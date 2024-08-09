// Function to log selected start datetime
document.getElementById('startdatetime').addEventListener('change', function() {
    const startDateTime = this.value;
    console.log('Start DateTime:', startDateTime);
});

// Function to log selected end datetime
document.getElementById('enddatetime').addEventListener('change', function() {
    const endDateTime = this.value;
    console.log('End DateTime:', endDateTime);
});
