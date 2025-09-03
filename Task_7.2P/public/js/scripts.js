const clickMe = () => {
  alert("Thanks for clicking me. Hope you have a nice day!");
};

const submitForm = () => {
  let formData = {};
  formData.first_name = $('#first_name').val();
  formData.last_name = $('#last_name').val();
  formData.password = $('#password').val();
  formData.email = $('#email').val();
  console.log("Form Data Submitted:", formData);
};

const addCards = (items) => {
  $("#card-section").empty(); // Clear old cards if any
  items.forEach(item => {
    let itemToAppend = `
      <div class="col s4 center-align">
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${item.image}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">
              ${item.title}<i class="material-icons right">more_vert</i>
            </span>
            <p><a href="#">${item.link}</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              ${item.title}<i class="material-icons right">close</i>
            </span>
            <p class="card-text">${item.description}</p>
          </div>
        </div>
      </div>
    `;
    $("#card-section").append(itemToAppend);
  });
};

// Fetch data from the server
const getProjects = () => {
  $.get('/api/projects', (response) => {
    if (response.statusCode === 200) {
      addCards(response.data);
    } else {
      console.error("Failed to load projects:", response.message);
    }
  });
};

// Create socket connection
const socket = io();

// Listen to 'number' event from server
socket.on('number', (msg) => {
    console.log('Random number:', msg);
    document.getElementById('number').innerText = msg;
});


$(document).ready(function(){
  $('.materialboxed').materialbox();

  $('#formSubmit').click(() => {
    submitForm();
  });

  getProjects();

$('#clickMeButton').click(() => {
    clickMe();
  });

  $('.modal').modal();
});
