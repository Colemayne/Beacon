var request = grabData();

var Alerts = [];

let Alert = class {
  constructor(alert_id, alert_type, alert_recipients, alert_content, alert_recurring){
    this.alert_id = alert_id;
    this.alert_type = alert_type;
    this.alert_recipients = alert_recipients;
    this.alert_content = alert_content;
    this.alert_recurring = alert_recurring;
  }
};

window.onload = function() {
  
  request.onload = function() { 

    var alerts = request.response;
    addAlerts(alerts);

  }

}


function grabData() {
  var requestURL = 'http://127.0.0.1:8081/select/alert/all';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  return request;
}

function addAlerts(arr) {

  var alertList = arr;
  for (var i = 0; i < alertList.length; i++){
    var a = new Alert(alertList[i].alert_id, alertList[i].alert_type, alertList[i].alert_recipients, alertList[i].alert_content, alertList[i].alert_recurring);
    Alerts.push(a);
  }
  populateTable(Alerts);
}

function populateTable(arr){
  var table = document.querySelector('header');
  var col = 1;
  for(i=0; i<arr.length; i++){
    var bar = document.createElement('div');
    var b1 = document.createElement('div');
    var b2 = document.createElement('div');
    var b3 = document.createElement('div');
    var b4 = document.createElement('div');
    var t1 = document.createElement('p');
    var t2 = document.createElement('p');
    var t3 = document.createElement('p');
    var t4 = document.createElement('p');
    
    if(col == 1){
      bar.className = "userTableBar userTableColor1";
      col = 2;
    } else {
      bar.className = "userTableBar userTableColor2";
      col = 1;
    }
    
    b1.className = "contentBox";
    b2.className = "contentBox";
    b3.className = "contentBox";
    b4.className = "contentBoxSmall";
    
    t1.className = "blockText";
    t2.className = "blockText";
    t3.className = "blockText";
    t4.className = "blockText centered";
    
    t1.textContent = arr[i].alert_type;
    t2.textContent = arr[i].alert_recipients;
    t3.textContent = arr[i].alert_content;
    t4.textContent = arr[i].alert_recurring;
    
    
    b1.appendChild(t1);
    b2.appendChild(t2);
    b3.appendChild(t3);
    b4.appendChild(t4);
    
    bar.appendChild(b1);
    bar.appendChild(b2);
    bar.appendChild(b3);
    bar.appendChild(b4);
    
    table.appendChild(bar);
  } 
}






