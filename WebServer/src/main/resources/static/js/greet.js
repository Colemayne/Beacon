let Person = class {
  constructor(empID, fname, lname, phone) {
    this.empID = empID;
    this.fname = fname;
    this.lname = lname;
    this.phone = phone;
  }
};

var p1 = new Person("xx0001", "Coleman", "Beiler", "703xxxxxx");
var p2 = new Person("xx0002", "Aamna", "Chaudry", "703xxxxxx");
var p3 = new Person("xx0003", "Nathan", "Hwang", "703xxxxxx");
var p4 = new Person("xx0004", "Ken", "Lee", "703xxxxxx");
var p5 = new Person("xx0005", "Ziba ", "Movahedpour", "703xxxxxx");
var p6 = new Person("xx0006", "Andy", "Nguyen", "703xxxxxx");
var p7 = new Person("xx0007", "Harrison", "Schwab", "703xxxxxx");

var People = [p1, p2, p3, p4, p5, p6, p7];



window.onload = function() {
  addPeople(People);
}


function addPeople(arr) {
  var table = document.querySelector("table");

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
