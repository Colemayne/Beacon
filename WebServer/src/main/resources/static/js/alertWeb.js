var request = grabData();

var Alerts = [];

var ActiveUsers = [];

var AlertTitle = "ALERT_TITLE";

let Alert = class {
  constructor(alert_id, alert_title, alert_type, alert_recipients, alert_content, alert_recurring){
    this.alert_id = alert_id;
    this.alert_title = alert_title;
    this.alert_type = alert_type;
    this.alert_recipients = alert_recipients;
    this.alert_content = alert_content;
    this.alert_recurring = alert_recurring;
  }
};

let ActiveUser = class {
  constructor(first_name, last_name, employee_response){
    this.first_name = first_name;
    this.last_name = last_name;
    this.employee_response = employee_response;
  }
};

window.onload = function() {
  
  request.onload = function() { 

    var alerts = request.response;
    
    addAlerts(alerts);
    
    deleteAlertIcon(document.querySelectorAll('.delButton'));
    infoAlertIcon(document.querySelectorAll('.infoButton'));

  }
  
  document.getElementById('submitAdd').onclick = function() {
    // Function to post to web API.
    sendNewAlert();
    // Quickly reloads all of the elements to reflect the change to the database.
    location.reload();
  }

}

function hashCode(s) {
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

function grabData() {
  var requestURL = 'http://127.0.0.1:8081/select/alert/all';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  return request;
}

function grabModalData(alertId, title) {
  var requestURL = 'http://127.0.0.1:8081/select/alert/specific';
  var request = new XMLHttpRequest();
  var params = '{"alert_id":"'+alertId+'"}';
  request.open('POST', requestURL);
  request.responseType = 'json';
  request.send(params);
  
  return request;
}

function sendNewAlert() {
  var xhttp = new XMLHttpRequest();
  // All of these ID's can be found within the HTML.
  var idValue = hashCode(document.getElementById('alertTitleForm').value);
  var titleValue = document.getElementById('alertTitleForm').value;
  var typeValue = document.getElementById('alertTypeForm').value;
  var recipientsValue = document.getElementById('alertRecipientsForm').value;
  var recurringValue = document.getElementById('alertRecurringForm').value;
  var contentValue = document.getElementById('alertContentForm').value;
  
  if (recurringValue == "No"){
      recurringValue = 0;
  } else {
      recurringValue = 1;
  }

  // I don't have anything fancy to generate JSON right now. A function that accepts a Map and returns a valid JSON string would be awesome!  *Not required though*
  var params = '{"alert_id":"'+idValue+'","alert_title":"'+titleValue+'","alert_type":"'+typeValue+'","alert_recipients":"'+recipientsValue+'","alert_recurring":"'+recurringValue+'","alert_content":"'+contentValue+'"}';
  xhttp.open("POST", "http://localhost:8081/add/alert", true);
  xhttp.send(params);
}

function deleteAlert(a_id) {
  var xhttp = new XMLHttpRequest();
  var delValue = a_id;
  // Instead of allowing this behavior, we should ask the user if they are sure they want to delete this user.
  var params = '{"alert_id":"'+delValue+'"}';
  xhttp.open("POST", "http://localhost:8081/delete/alert", true);
  xhttp.send(params);
}

function addAlerts(arr) {

  var alertList = arr;
  for (var i = 0; i < alertList.length; i++){
    var a = new Alert(alertList[i].alert_id,alertList[i].alert_title,alertList[i].alert_type, alertList[i].alert_recipients, alertList[i].alert_content, alertList[i].alert_recurring);
    Alerts.push(a);
  }
  populateTable(Alerts);
}

function addActiveUsers( arr) {
  var userList = arr;
  for (var i = 0; i < userList.length; i++) {
    var u = new ActiveUser(userList[i].first_name,userList[i].last_name,userList[i].employee_response);
    ActiveUsers.push(u);
  }
  populateModal(ActiveUsers);
}

function populateTable(arr){
  
  var table = document.querySelector('header');
   
  if (arr === undefined || arr.length == 0)
  {
    var fillMessage = document.createElement('h1');
    fillMessage.textContent = "There are current no Alerts in the Database.";
    
    table.appendChild(fillMessage);
  
  } else {
   
  table.className = "table table-striped";
  
  var tableHead = document.createElement('thead');
  var tableHeadRow = document.createElement('tr');
  var tableHeadTitle = document.createElement('th');
  var tableHeadType = document.createElement('th');
  var tableHeadRecipients = document.createElement('th');
  var tableHeadRecurring = document.createElement('th');
  var tableHeadInfoCol = document.createElement('th');
  var tableHeadDeleteCol = document.createElement('th');
  var tableBody = document.createElement('tbody');
  
  tableHeadTitle.className="text-center";
  tableHeadType.className="text-center";
  tableHeadRecipients.className="text-center";
  tableHeadRecurring.className="text-center";
  tableHeadInfoCol.className="text-center";
  tableHeadDeleteCol.className="text-center";
  
  tableHeadTitle.textContent="Title";
  tableHeadType.textContent="Type";
  tableHeadRecipients.textContent="Recipients";
  tableHeadRecurring.textContent="Recurring";
  tableHeadInfoCol.textContent="Info";
  tableHeadDeleteCol.textContent="Delete";
  
  tableHeadRow.appendChild(tableHeadTitle);
  tableHeadRow.appendChild(tableHeadType);
  tableHeadRow.appendChild(tableHeadRecipients);
  tableHeadRow.appendChild(tableHeadRecurring);
  tableHeadRow.appendChild(tableHeadInfoCol);
  tableHeadRow.appendChild(tableHeadDeleteCol);
  
  tableHead.appendChild(tableHeadRow);
  
  for(i=0; i<arr.length; i++){
    var tableBodyRow = document.createElement('tr');
    var tableBodyTitle = document.createElement('td');
    var tableBodyType = document.createElement('td');
    var tableBodyRecipients = document.createElement('td');
    var tableBodyRecurring = document.createElement('td');
    var tableBodyInfoCol = document.createElement('td');
    var tableBodyInfoBtn = document.createElement('button');
    var tableBodyDelCol = document.createElement('td');
    var tableBodyDelBtn = document.createElement('button');

    tableBodyTitle.className="mx-auto text-center";
    tableBodyType.className="mx-auto text-center";
    tableBodyRecipients.className="mx-auto text-center";
    tableBodyRecurring.className="mx-auto text-center";
    tableBodyInfoBtn.className = "btn btn-primary infoButton";
    tableBodyDelBtn.className = "btn btn-danger delButton";
    
    
    tableBodyTitle.textContent = arr[i].alert_title;
    tableBodyType.textContent = arr[i].alert_type;
    tableBodyRecipients.textContent = arr[i].alert_recipients;
    
    if (arr[i].alert_recurring == "0"){
    tableBodyRecurring.textContent = "No";
    } else {
    tableBodyRecurring.textContent = "Yes";
    }
    
    tableBodyInfoBtn.textContent = "Info";
    tableBodyDelBtn.textContent = "Delete";
    
    tableBodyInfoCol.appendChild(tableBodyInfoBtn);
    tableBodyDelCol.appendChild(tableBodyDelBtn);
    
    tableBodyRow.appendChild(tableBodyTitle);
    tableBodyRow.appendChild(tableBodyType);
    tableBodyRow.appendChild(tableBodyRecipients);
    tableBodyRow.appendChild(tableBodyRecurring);
    tableBodyRow.appendChild(tableBodyInfoCol);
    tableBodyRow.appendChild(tableBodyDelCol);
    
    tableBody.appendChild(tableBodyRow);
  }
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  
  }
}

function populateModal(arr) {
  
  var modalContent = document.querySelector('#modalContent');
  var modalTitle = document.querySelector('#alertTitleText');
  
  modalTitle.textContent = AlertTitle;
  
  var modalHeader = document.createElement('h2');
  var peopleTable = document.createElement('table');
  var tableHead = document.createElement('thead');
  var tableHeadRow = document.createElement('tr');
  var tableHeadFirstName = document.createElement('th');
  var tableHeadLastName = document.createElement('th');
  var tableHeadEmployeeResponse = document.createElement('th');
  var tableBody = document.createElement('tbody');
  
  peopleTable.className="table table-sm";
  tableHeadFirstName.className="text-center";
  tableHeadLastName.className="text-center";
  tableHeadEmployeeResponse.className="text-center";
  
  tableHeadFirstName.textContent = "First Name";
  tableHeadLastName.textContent = "Last Name";
  tableHeadEmployeeResponse.textContent = "Response";
  
  tableHeadRow.appendChild(tableHeadFirstName);
  tableHeadRow.appendChild(tableHeadLastName);
  tableHeadRow.appendChild(tableHeadEmployeeResponse);
  
  tableHead.appendChild(tableHeadRow);
  
  for(i=0; i<arr.length; i++){
   
    var tableBodyRow = document.createElement('tr');
    var tableBodyFirstName = document.createElement('td');
    var tableBodyLastName = document.createElement('td');
    var tableBodyEmployeeResponse = document.createElement('td');
    
    tableBodyFirstName.className="mx-auto text-center";
    tableBodyLastName.className="mx-auto text-center";
    tableBodyEmployeeResponse.className="mx-auto text-center";
    
    tableBodyFirstName.textContent = arr[i].first_name;
    tableBodyLastName.textContent = arr[i].last_name;
    tableBodyEmployeeResponse.textContent = arr[i].employee_response;
    
    tableBodyRow.appendChild(tableBodyFirstName);
    tableBodyRow.appendChild(tableBodyLastName);
    tableBodyRow.appendChild(tableBodyEmployeeResponse);
    
    tableBody.appendChild(tableBodyRow);
    
  }
  peopleTable.appendChild(tableHead);
  peopleTable.appendChild(tableBody);
  
  modalContent.appendChild(peopleTable);
  
}



function deleteAlertIcon(elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function(e) {
      var current = this;
      for (var i = 0; i < elem.length; i++) {
        if (current != elem[i]) {

        }
        else {
             deleteAlert(Alerts[i].alert_id);
             location.reload();
        }
      }
      e.preventDefault();
    });
  };
}

function infoAlertIcon(elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function(e) {
      var current = this;
      for (var i = 0; i < elem.length; i++) {
        if (current != elem[i]) {

        }
        else {
          
          var modalRequest = grabModalData(Alerts[i].alert_id,Alerts[i].alert_title);
          AlertTitle = Alerts[i].alert_title;
          modalRequest.onload = function() {
              users = modalRequest.response;
              addActiveUsers(users);
          
          }

          $("#infoModal").modal("toggle");
          
             
        }
      }
      e.preventDefault();
    });
  };
}









