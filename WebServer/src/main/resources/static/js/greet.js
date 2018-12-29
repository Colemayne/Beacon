

var request = grabData();

var People = [];

let Person = class {
  constructor(empID, fname, lname, phone) {
    this.empID = empID;
    this.fname = fname;
    this.lname = lname;
    this.phone = phone;
  }
};

window.onload = function() {
  

  request.onload = function() { 
    var people = request.response;
    addPeople(people);
  }

  document.getElementById('AddBtn').onclick = function() {
    doIT();
    //location.reload();
  }

}

function refactorTable() {
    var refactor = grabData();
    var people = refactor.response;
    addPeople(people);
}

function grabData() {
  var requestURL = 'http://127.0.0.1:8081/selectAll';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  return request;
}

function doIT() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:8081/TestIt", true);
  xhttp.send();
}


function addPeople(arr) {

  var peopleList = arr;
  for (var i = 0; i < peopleList.length; i++){
    var p = new Person(peopleList[i].empId, peopleList[i].firstName, peopleList[i].lastName, peopleList[i].phoneNumber);
    People.push(p);
  }
  populatePage(People);
}

function populatePage(arr) {
  var table = document.querySelector("table");

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  for (i = 0; i < arr.length; i++) {
    var row = document.createElement("tr");
    var el1 = document.createElement("td");
    var el2 = document.createElement("td");
    var el3 = document.createElement("td");
    var el4 = document.createElement("td");

    el1.textContent = arr[i].empID;
    el2.textContent = arr[i].fname;
    el3.textContent = arr[i].lname;
    el4.textContent = arr[i].phone;

    row.appendChild(el1);
    row.appendChild(el2);
    row.appendChild(el3);
    row.appendChild(el4);

    table.appendChild(row);
  }
}
