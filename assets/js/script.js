$(function () {
  // Creates object of user input
  var userInput = {};
  // Checks for user input in local storage and adds input to object if storage is not empty 
  var storedUserInput = JSON.parse(localStorage.getItem("userInput"));
  if (storedUserInput !== null) {
    userInput = storedUserInput;
  }
  // Adds event listener on the save buttons that saves the hour and text to local storage
  $('.saveBtn').on('click', function() {
    var hourSaved = $(this).parent().attr('id');
    var textSaved = $(this).prev().val().trim();
    userInput[hourSaved] = textSaved;
    localStorage.setItem('userInput', JSON.stringify(userInput));
  });

  
  // Loops through all time blocks and adds past, present, or future styling based on the current hour
  var currentHour = parseInt(dayjs().format('HH'));
   $('.time-block').each(function(){
    var timeBlockHour = parseInt($(this).attr('id').slice(-2));
    if (timeBlockHour < currentHour) {
      $(this).addClass('past');
    } else if (timeBlockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });

  // Loops through each time block and populates the text area if there is a value in local storage
  $('.time-block').each(function(){
    $(this).children().eq(1).val(storedUserInput[$(this).attr('id')]);
  });

  // Displays the current date in the header of the page using dayjs()
  var currentDateEl = $('#currentDay');
  var today = dayjs();
  var todayLastDigit = dayjs().format('D').slice(-1);
  var numberSuffix = '';
  console.log(todayLastDigit);
  if (todayLastDigit === '1') {
    numberSuffix = 'st';
  } else if (todayLastDigit === '2') {
    numberSuffix = 'nd';
  } else if (todayLastDigit === '3') {
    numberSuffix = 'rd';
  } else {
    numberSuffix = 'th';
  }
  currentDateEl.text(today.format('dddd, MMMM D')+numberSuffix);
});
