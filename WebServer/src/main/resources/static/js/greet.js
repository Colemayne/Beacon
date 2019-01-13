

var request = grabData();

var People = [];

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

window.onload = function() {
  

  request.onload = function() { 
    var employees = request.response;
    addPeople(employees);
    deleteUserIcon(document.querySelectorAll('.delButton'));
  }

  document.getElementById('submitAdd').onclick = function() {
    sendNewUser();
    location.reload();
  }

  document.getElementById("addbtn").onclick = function() {addUserForm()};
  document.getElementById("addx").onclick = function() {addUserForm()};


 // document.getElementById('DelBtn').onclick = function() {
 //   deleteUser();
 //   location.reload();
  //}

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

function sendNewUser() {
  var xhttp = new XMLHttpRequest();
  var idValue = document.getElementById('idbox').value;
  var fnValue = document.getElementById('fnbox').value;
  var lnValue = document.getElementById('lnbox').value;
  var phValue = document.getElementById('phbox').value;
  var dpValue = document.getElementById('dpbox').value;
  var mnValue = document.getElementById('mnbox').value;

  var params = '{"employee_id":"'+idValue+'","first_name":"'+fnValue+'","last_name":"'+lnValue+'","phone_number":"'+phValue+'","department":"'+dpValue+'","manager_id":"'+mnValue+'"}';
  xhttp.open("POST", "http://localhost:8081/addUser", true);
  xhttp.send(params);
}

function addUserForm() {
  document.getElementById("popupBG").classList.toggle("unhidden");
}

function deleteUser(e_id) {
  var xhttp = new XMLHttpRequest();
  var delValue = e_id;
  alert('deleteUser is called: value passed = '+e_id);
  var params = '{"employee_id":"'+delValue+'"}';
  xhttp.open("POST", "http://localhost:8081/delUser", true);
  xhttp.send(params);
}

function addPeople(arr) {

  var peopleList = arr;
  for (var i = 0; i < peopleList.length; i++){
    var p = new Employee(peopleList[i].employee_id, peopleList[i].first_name, peopleList[i].last_name, peopleList[i].phone_number, peopleList[i].department, peopleList[i].manager_id);
    People.push(p);
  }
  populateTable(People);
}

function populateTable(arr) {
  var table = document.querySelector('header');
  var col = 1;
  
  for(i=0; i<arr.length; i++){
    var bar = document.createElement('div');
    var b1 = document.createElement('div');
    var b2 = document.createElement('div');
    var b3 = document.createElement('div');
    var b4 = document.createElement('div');
    var b5 = document.createElement('div');
    var t1 = document.createElement('p');
    var t2 = document.createElement('p');
    var t3 = document.createElement('p');
    var t4 = document.createElement('p');
    var t5 = document.createElement('p');

    var delButton = document.createElement('div');

    
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
    
    table.appendChild(bar);
    
  }
}

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




