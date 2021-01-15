/* eslint-disable require-jsdoc */
$(document).ready(function() {
  // Use Moment here to retrieve and display the current date & time...
  function updateTime() {
    $('#currentDay').html(moment().format('LLLL'));
  }
  updateTime();
  //  ... and dynamically update every minute:
  setInterval(function() {
    updateTime();
  }, 60000);

  // Function for each button click scenario:
  $('button').on('click', function() {
    const btnID = $(this).attr('id');
    const timeBlock = btnID.split('-')[1];
    // Setting the key of timeBlock equal to the split number string gives
    // us easy access to its value in local storage due to id-structure of
    // time-blocks in HTML
    if (btnID.includes('save')) {
      const userData = $(`#input-${timeBlock}`).val();
      localStorage.setItem(timeBlock, userData);
    } else if (btnID.includes('clear')) {
      $(`#input-${timeBlock}`).val('');
      localStorage.removeItem(timeBlock);
    }
  });

  function displayLocalStorage() {
    // Get hours from Moment with the 24-hour format
    const hour = moment().hours();
    // then add the correct class name
    for (let i = 9; i < 19; i++) {
      const todo = $(`#input-${i}`);
      if (hour > i) {
        todo.addClass('past');
      } else if (hour == i) {
        todo.addClass('present');
      } else {
        todo.addClass('future');
      }
      // then we grab any user input, using the timeBlock keys
      $(`#input-${i}`).val(localStorage.getItem(i));
    }
  }
  // So, on page load, display any locally stored events for the day
  //   and format time-blocks
  displayLocalStorage();
});
