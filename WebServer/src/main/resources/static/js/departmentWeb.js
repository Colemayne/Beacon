var request = grabData();

var Departments = [];

let Department = class {
  constructor(department_id, department_name){
    this.department_id = department_id;
    this.department_name = department_name;
  }
};

window.onload = function() {
  
  request.onload = function() { 

    var departments = request.response;
    
    addDepartments(departments);
    
    deleteAlertIcon(document.querySelectorAll('.delButton'));

  }
  
  document.getElementById('submitAdd').onclick = function() {
    sendNewDepartment();
    location.reload();
  }

}

function hashCode(s) {
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

function grabData() {
  var requestURL = 'http://127.0.0.1:8081/select/departments/all';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  return request;
}

function sendNewDepartment() {
  var xhttp = new XMLHttpRequest();
  var idValue = hashCode(document.getElementById('addNameForm').value);
  var nameValue = document.getElementById('addNameForm').value;
  
  var params = '{"department_id":"'+idValue+'","department_name":"'+nameValue+'"}';
  xhttp.open("POST", "http://localhost:8081/add/department", true);
  xhttp.send(params);
}

function deleteDepartment(d_id) {
  var xhttp = new XMLHttpRequest();
  var delValue = d_id;
  var params = '{"department_id":"'+delValue+'"}';
  xhttp.open("POST", "http://localhost:8081/delete/department", true);
  xhttp.send(params);
}

function addDepartments(arr) {

  var departmentList = arr;
  for (var i = 0; i < departmentList.length; i++){
    var d = new Department(departmentList[i].department_id,departmentList[i].department_name);
    Departments.push(d);
  }
  populateTable(Departments);
}

function populateTable(arr){
  
  var table = document.querySelector('header');
   
  if (arr === undefined || arr.length == 0)
  {
    var fillMessage = document.createElement('h1');
    fillMessage.textContent = "There are current no Departments in the Database.";
    
    table.appendChild(fillMessage);
  
  } else {
   
  table.className = "table table-striped";
  
  var tableHead = document.createElement('thead');
  var tableHeadRow = document.createElement('tr');
  var tableHeadName = document.createElement('th');
  var tableHeadDeleteCol = document.createElement('th');
  var tableBody = document.createElement('tbody');
  
  tableHeadName.className="text-center";
  tableHeadDeleteCol.className="text-center";
  
  tableHeadName.textContent="Name";
  tableHeadDeleteCol.textContent="Delete";
  
  tableHeadRow.appendChild(tableHeadName);
  tableHeadRow.appendChild(tableHeadDeleteCol);
  
  tableHead.appendChild(tableHeadRow);
  
  for(i=0; i<arr.length; i++){
    var tableBodyRow = document.createElement('tr');
    var tableBodyName = document.createElement('td');
    var tableBodyDelCol = document.createElement('td');
    var tableBodyDelBtn = document.createElement('button');

    tableBodyName.className="mx-auto text-center";
    tableBodyDelBtn.className = "btn btn-danger delButton";
    
    tableBodyName.textContent = arr[i].department_name;
    
    tableBodyDelBtn.textContent = "Delete";
    
    tableBodyDelCol.appendChild(tableBodyDelBtn);
    
    tableBodyRow.appendChild(tableBodyName);
    tableBodyRow.appendChild(tableBodyDelCol);
    
    tableBody.appendChild(tableBodyRow);
  }
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  
  }
}

function deleteAlertIcon(elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function(e) {
      var current = this;
      for (var i = 0; i < elem.length; i++) {
        if (current != elem[i]) {

        }
        else {
             deleteDepartment(Departments[i].department_id);
             location.reload();
        }
      }
      e.preventDefault();
    });
  };
}










