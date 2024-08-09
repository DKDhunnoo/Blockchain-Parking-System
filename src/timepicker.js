// Initialize the date picker for start date and time
const startPicker = new Pikaday({
    field: document.getElementById('startdatetime'),
    format: 'YYYY-MM-DD HH:mm',
    showTime: true,
    use24hour: true,
    onSelect: function() {
        console.log('Start DateTime:', this.getMoment().format('YYYY-MM-DD HH:mm'));
    }
});

// Initialize the date picker for end date and time
const endPicker = new Pikaday({
    field: document.getElementById('enddatetime'),
    format: 'YYYY-MM-DD HH:mm',
    showTime: true,
    use24hour: true,
    onSelect: function() {
        console.log('End DateTime:', this.getMoment().format('YYYY-MM-DD HH:mm'));
    }
});
