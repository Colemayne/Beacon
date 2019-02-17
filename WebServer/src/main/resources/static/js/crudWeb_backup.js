
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

let Department = class{
  constructor(department_id, department_name){
    this.department_id = department_id;
    this.department_name = department_name;
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
    editUserIcon(document.querySelectorAll('.editButton'));
  }
  // Defines what will happen when an element defined by the ID 'submitAdd' gets pressed.
  document.getElementById('submitAdd').onclick = function() {
    // Function to post to web API.
    sendNewUser();
    // Quickly reloads all of the elements to reflect the change to the database.
    location.reload();
  }
  
  document.getElementById('submitEdit').onclick = function() {
    // Function to post to web API.
    sendUpdatedUser();
    // Quickly reloads all of the elements to reflect the change to the database.
    location.reload();
  }
  
  document.querySelector('#choose-file').addEventListener('click', function() {
	document.querySelector('#upload-file').click();
  });
  
  document.querySelector('#upload-file').addEventListener('change', function() {
      var file = this.files[0];
      var reader = new FileReader();
      reader.onload = function () {
          bulkSplit(reader.result);
      };
      
      reader.readAsBinaryString(file);
      
  });

}

function hashCode(s) {
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
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

function bulkSplit(csvString) {
  var arr = csvString.split('\n');
  var jsonObj = [];
  var headers = ["employee_id","first_name","last_name","phone_number","department","manager_id"];
  for(var i = 1; i < arr.length; i++){
    var data = arr[i].split(',');
    var obj = {};
    for(var j = 0; j < data.length; j++) {
        obj[headers[j].trim()] = data[j].trim();
    }
    jsonObj.push(obj);
  }
  
  sendBulkUsers(jsonObj); 
}

// This function takes the fields from the popup menu and converts them into valid json to be sent to the web API.
// This is where form validation logic will need to be placed.  It's reccomended that we define what we expect in each text box.
// If one of the forms don't match, we can place a red marker by it and let them try again.  Closing out of the popup should clear the forms.
function sendNewUser() {
  var xhttp = new XMLHttpRequest();
  // All of these ID's can be found within the HTML.
  var idValue = document.getElementById('employeeIDForm').value;
  var fnValue = document.getElementById('firstNameForm').value;
  var lnValue = document.getElementById('lastNameForm').value;
  var phValue = document.getElementById('phoneNumberForm').value;
  var dpValue = document.getElementById('departmentForm').value;
  var mnValue = document.getElementById('managerIDForm').value;

  // I don't have anything fancy to generate JSON right now. A function that accepts a Map and returns a valid JSON string would be awesome!  *Not required though*
  var params = '{"employee_id":"'+idValue+'","first_name":"'+fnValue+'","last_name":"'+lnValue+'","phone_number":"'+phValue+'","department":"'+dpValue+'","manager_id":"'+mnValue+'"}';
  xhttp.open("POST", "http://localhost:8081/add/user", true);
  xhttp.send(params);
}
function sendBulkUsers(arr) {
    
    var bulkList = arr;
    
    for(var i = 0; i < bulkList.length; i++){
      var b = new Employee(bulkList[i].employee_id, bulkList[i].first_name, bulkList[i].last_name, bulkList[i].phone_number, bulkList[i].department, bulkList[i].manager_id);
      
      var xhttp = new XMLHttpRequest();
      var params = '{"employee_id":"'+b.employee_id+'","first_name":"'+b.first_name+'","last_name":"'+b.last_name+'","phone_number":"'+b.phone_number+'","department":"'+b.department+'","manager_id":"'+b.manager_id+'"}';
      xhttp.open("POST", "http://localhost:8081/add/user", true);
      xhttp.send(params);
      
    }
    
    location.reload();
}

function sendUpdatedUser() {
  var xhttp = new XMLHttpRequest();
  // All of these ID's can be found within the HTML.
  var idValue = document.getElementById('eemployeeIDForm').value;
  var fnValue = document.getElementById('efirstNameForm').value;
  var lnValue = document.getElementById('elastNameForm').value;
  var phValue = document.getElementById('ephoneNumberForm').value;
  var dpValue = document.getElementById('edepartmentForm').value;
  var mnValue = document.getElementById('emanagerIDForm').value;

  // I don't have anything fancy to generate JSON right now. A function that accepts a Map and returns a valid JSON string would be awesome!  *Not required though*
  var params = '{"employee_id":"'+idValue+'","first_name":"'+fnValue+'","last_name":"'+lnValue+'","phone_number":"'+phValue+'","department":"'+dpValue+'","manager_id":"'+mnValue+'"}';
  xhttp.open("POST", "http://localhost:8081/edit/user", true);
  xhttp.send(params);
}

// It may be helpful to have the web API's HookController class available to see how each JSON string should be structured before sending.
function deleteUser(e_id) {
  var xhttp = new XMLHttpRequest();
  var delValue = e_id;
  // Instead of allowing this behavior, we should ask the user if they are sure they want to delete this user.
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
 
  var table = document.querySelector('header');
  
  if (arr === undefined || arr.length == 0)
  {
    var fillMessage = document.createElement('h1');
    fillMessage.textContent = "There are current no Employees in the Database.";
    
    table.appendChild(fillMessage);
  
  } else {
  
  table.className = "table table-striped";
  
  var tableHead = document.createElement('thead');
  var tableHeadRow = document.createElement('tr');
  var tableHeadID = document.createElement('th');
  var tableHeadFirstName = document.createElement('th');
  var tableHeadLastName = document.createElement('th');
  var tableHeadPhoneNumber = document.createElement('th');
  var tableHeadDepartment = document.createElement('th');
  var tableHeadManagerID = document.createElement('th');
  var tableHeadEditCol = document.createElement('th');
  var tableHeadDeleteCol = document.createElement('th');
  var tableBody = document.createElement('tbody');
  
  tableHeadID.className="text-center";
  tableHeadFirstName.className="text-center";
  tableHeadLastName.className="text-center";
  tableHeadPhoneNumber.className="text-center";
  tableHeadDepartment.className="text-center";
  tableHeadManagerID.className="text-center";
  tableHeadEditCol.className="text-center";
  tableHeadDeleteCol.className="text-center";
  
  tableHeadID.textContent="Employee ID";
  tableHeadFirstName.textContent="First Name";
  tableHeadLastName.textContent="Last Name";
  tableHeadPhoneNumber.textContent="Phone Number";
  tableHeadDepartment.textContent="Department";
  tableHeadManagerID.textContent="Manager ID";
  tableHeadEditCol.textContent="Edit";
  tableHeadDeleteCol.textContent="Delete";
  
  tableHeadRow.appendChild(tableHeadID);
  tableHeadRow.appendChild(tableHeadFirstName);
  tableHeadRow.appendChild(tableHeadLastName);
  tableHeadRow.appendChild(tableHeadPhoneNumber);
  tableHeadRow.appendChild(tableHeadDepartment);
  tableHeadRow.appendChild(tableHeadManagerID);
  tableHeadRow.appendChild(tableHeadEditCol);
  tableHeadRow.appendChild(tableHeadDeleteCol);
  
  tableHead.appendChild(tableHeadRow);
  
  for(i=0; i<arr.length; i++){
    var tableBodyRow = document.createElement('tr');
    var tableBodyID = document.createElement('td');
    var tableBodyFirstName = document.createElement('td');
    var tableBodyLastName = document.createElement('td');
    var tableBodyPhoneNumber = document.createElement('td');
    var tableBodyDepartment = document.createElement('td');
    var tableBodyManagerID = document.createElement('td');
    var tableBodyEditCol = document.createElement('td');
    var tableBodyEditBtn = document.createElement('button');
    var tableBodyDelCol = document.createElement('td');
    var tableBodyDelBtn = document.createElement('button');

    tableBodyID.className="mx-auto text-center";
    tableBodyFirstName.className="mx-auto text-center";
    tableBodyLastName.className="mx-auto text-center";
    tableBodyPhoneNumber.className="mx-auto text-center";
    tableBodyDepartment.className="mx-auto text-center";
    tableBodyManagerID.className="mx-auto text-center";
    tableBodyEditBtn.className = "btn btn-secondary editButton";
    tableBodyDelBtn.className = "btn btn-danger delButton";
    
    
    tableBodyID.textContent = arr[i].employee_id;
    tableBodyFirstName.textContent = arr[i].first_name;
    tableBodyLastName.textContent = arr[i].last_name;
    tableBodyPhoneNumber.textContent = arr[i].phone_number;
    tableBodyDepartment.textContent = arr[i].department;
    tableBodyManagerID.textContent = arr[i].manager_id;
    tableBodyEditBtn.textContent = "Edit";
    tableBodyDelBtn.textContent = "Delete";
    
    tableBodyEditCol.appendChild(tableBodyEditBtn);
    tableBodyDelCol.appendChild(tableBodyDelBtn);
    
    tableBodyRow.appendChild(tableBodyID);
    tableBodyRow.appendChild(tableBodyFirstName);
    tableBodyRow.appendChild(tableBodyLastName);
    tableBodyRow.appendChild(tableBodyPhoneNumber);
    tableBodyRow.appendChild(tableBodyDepartment);
    tableBodyRow.appendChild(tableBodyManagerID);
    tableBodyRow.appendChild(tableBodyEditCol);
    tableBodyRow.appendChild(tableBodyDelCol);
    
    tableBody.appendChild(tableBodyRow);
  }
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  
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

function editUserIcon(elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function(e) {
      var current = this;
      for (var i = 0; i < elem.length; i++) {
        if (current != elem[i]) {

        }
        else {
           document.getElementById('eemployeeIDForm').value = People[i].employee_id;
           document.getElementById('efirstNameForm').value = People[i].first_name;
           document.getElementById('elastNameForm').value = People[i].last_name;
           document.getElementById('ephoneNumberForm').value = People[i].phone_number;
           document.getElementById('edepartmentForm').value = People[i].department;
           document.getElementById('emanagerIDForm').value = People[i].manager_id;
           $("#eemployeeIDForm").attr('disabled', 'disabled');
           $("#editModal").modal("toggle");
        }
      }
      e.preventDefault();
    });
  };
}



