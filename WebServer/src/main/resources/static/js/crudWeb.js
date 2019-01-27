
// Immediately start by running the grab data function in order to populate our page.
var request = grabData();

// The idea behind creating an array of Employee objects is that we can convert the JSON that we recieve
// into an object so that we can easily call / edit specific attributes from people in the database.
var People = [];
// Defining what the Employee object is supposed to look like. This is not statically typed so null values are possible.
let Employee = class {
  constructor(employee_id,first_name,last_name,phone_number,department,manager_id){
    this.employee_id = employee_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number;
    this.department = department;
    this.manager_id = manager_id;
  }
};

// Defining behavior for when the page has fully loaded.
window.onload = function() {
  
  //Defining behavior for when the request object has been returned a value from grabData().
  request.onload = function() { 
    // Set a variable employees to the response of request.  This will be a json array of all the users.
    // The data returned from our web API looks like this:
    // [{"employee_id":"xx0001","first_name":"Coleman","last_name":"Beiler","phone_number":"703-439-8816","department":"IT","manager_id":"xx0001"},{"employee_id":"xx0002","first_name":"Aamna","last_name":"Chaudry","phone_number":"703-439-8817","department":"IT","manager_id":"xx0001"},{"employee_id":"xx0003","first_name":"Nathan","last_name":"Hwang","phone_number":"703-439-8818","department":"IT","manager_id":"xx0001"},{"employee_id":"xx0004","first_name":"Ken","last_name":"Lee","phone_number":"703-439-8819","department":"IT","manager_id":"xx0001"},{"employee_id":"xx0005","first_name":"Ziba","last_name":"Movahedpour","phone_number":"703-439-8820","department":"IT","manager_id":"xx0001"},{"employee_id":"xx0006","first_name":"Andy","last_name":"Nguyen","phone_number":"703-439-8821","department":"IT","manager_id":"xx0001"},{"employee_id":"xx0007","first_name":"Harrison","last_name":"Schwab","phone_number":"703-439-8822","department":"IT","manager_id":"xx0001"}]
    // That is what the variable employees will be equal to.
    var employees = request.response;
    // Supply employees string as an arguement to addPeople().
    addPeople(employees);
    // Starts deleteUserIcon() function.
    deleteUserIcon(document.querySelectorAll('.delButton'));
  }
  // Defines what will happen when an element defined by the ID 'submitAdd' gets pressed.
  document.getElementById('submitAdd').onclick = function() {
    // Function to post to web API.
    sendNewUser();
    // Quickly reloads all of the elements to reflect the change to the database.
    location.reload();
  }
  // Defines functions for addbtn and addx.
  document.getElementById("addbtn").onclick = function() {addUserForm()};
  document.getElementById("addx").onclick = function() {addUserForm()};

}


function grabData() {
  // Set the request url to the predefined web API server.  Note* API must be running to populate from database.
  var requestURL = 'http://127.0.0.1:8081/select/user/all';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  return request;
}

// This function takes the fields from the popup menu and converts them into valid json to be sent to the web API.
// This is where form validation logic will need to be placed.  It's reccomended that we define what we expect in each text box.
// If one of the forms don't match, we can place a red marker by it and let them try again.  Closing out of the popup should clear the forms.
function sendNewUser() {
  var xhttp = new XMLHttpRequest();
  // All of these ID's can be found within the HTML.
  var idValue = document.getElementById('idbox').value;
  var fnValue = document.getElementById('fnbox').value;
  var lnValue = document.getElementById('lnbox').value;
  var phValue = document.getElementById('phbox').value;
  var dpValue = document.getElementById('dpbox').value;
  var mnValue = document.getElementById('mnbox').value;

  // I don't have anything fancy to generate JSON right now. A function that accepts a Map and returns a valid JSON string would be awesome!  *Not required though*
  var params = '{"employee_id":"'+idValue+'","first_name":"'+fnValue+'","last_name":"'+lnValue+'","phone_number":"'+phValue+'","department":"'+dpValue+'","manager_id":"'+mnValue+'"}';
  xhttp.open("POST", "http://localhost:8081/add/user", true);
  xhttp.send(params);
}

// Toggles the add user popup.
function addUserForm() {
  document.getElementById("popupBG").classList.toggle("unhidden");
}

// It may be helpful to have the web API's HookController class available to see how each JSON string should be structured before sending.
function deleteUser(e_id) {
  var xhttp = new XMLHttpRequest();
  var delValue = e_id;
  // Instead of allowing this behavior, we should ask the user if they are sure they want to delete this user.
  alert('deleteUser is called: value passed = '+e_id);
  var params = '{"employee_id":"'+delValue+'"}';
  xhttp.open("POST", "http://localhost:8081/delete/user", true);
  xhttp.send(params);
}

// This function generates an employee object and adds it to an array.  This function expects a JSON string.
function addPeople(arr) {

  var peopleList = arr;
  // Create an object for every employee listed.
  for (var i = 0; i < peopleList.length; i++){
    // Using the constructor defined for the Employee object, we parse the JSON for specific values. 
    var p = new Employee(peopleList[i].employee_id, peopleList[i].first_name, peopleList[i].last_name, peopleList[i].phone_number, peopleList[i].department, peopleList[i].manager_id);
    People.push(p);
  }
  // Populates the table with all of the users.
  populateTable(People);
}

// Most important function of this page.  This function expects an array of Employee objects.
function populateTable(arr) {
  // Set a variable to reference the tag <header></header>  This is where we will define all of our content.
  var table = document.querySelector('header');
  // Set for alternating colors.
  var col = 1;
  
  // We want a row for every employee in the list.
  for(i=0; i<arr.length; i++){
    // 'bar' is the main object in the row.
    var bar = document.createElement('div');
    // I've split the bar into 5 seperate pieces for the different fields. b1 - b5
    var b1 = document.createElement('div');
    var b2 = document.createElement('div');
    var b3 = document.createElement('div');
    var b4 = document.createElement('div');
    var b5 = document.createElement('div');
    // Each piece has an associated textbox.
    var t1 = document.createElement('p');
    var t2 = document.createElement('p');
    var t3 = document.createElement('p');
    var t4 = document.createElement('p');
    var t5 = document.createElement('p');
    // Object used to delete each specific user.
    var delButton = document.createElement('div');

    // Setting attributes.  Alternating colors to make rows look distinguishable. 
    if(col == 1){
      bar.className = "userTableBar userTableColor1";
      col = 2;
    } else {
      bar.className = "userTableBar userTableColor2";
      col = 1;
    }
    
    b1.className = "contentBox";
    b2.className = "contentBox";
    b3.className = "contentBoxSmall";
    b4.className = "contentBoxSmall";
    b5.className = "contentBox";
    t1.className = "blockText centered";
    t2.className = "blockText";
    t3.className = "blockText";
    t4.className = "blockText centered";
    t5.className = "blockText centered";

    delButton.className = "delButton";
    
    t1.textContent = arr[i].employee_id;
    t2.textContent = arr[i].first_name+" "+arr[i].last_name;
    t3.textContent = arr[i].phone_number;
    t4.textContent = arr[i].department;
    t5.textContent = arr[i].manager_id;
    // Append each object to their correct parent object. By default children objects will have a seperate z-index value that cannot go lower than the parent.
    b1.appendChild(t1);
    b2.appendChild(t2);
    b3.appendChild(t3);
    b4.appendChild(t4);
    b5.appendChild(t5);
    
    bar.appendChild(b1);
    bar.appendChild(b2);
    bar.appendChild(b3);
    bar.appendChild(b4);
    bar.appendChild(b5);
    bar.appendChild(delButton);
    // Append each bar to the <header></header> tag.
    table.appendChild(bar);
    
  }
}

// This function adds an event listener to each delete button on the page and runs them through an array to determine which one was pressed. It will do nothing if
// it wasn't pressed. If it was, it will run the delete user function and reload the page to reflect the database.
function deleteUserIcon(elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function(e) {
      var current = this;
      for (var i = 0; i < elem.length; i++) {
        if (current != elem[i]) {

        }
        else {
             deleteUser(People[i].employee_id);
             location.reload();
        }
      }
      e.preventDefault();
    });
  };
}




