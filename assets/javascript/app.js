// Initialize Firebase
var config = {
  apiKey: "AIzaSyD3jPGBWY41ik3SqvFOJ7e9IdMHponP6N8",
  authDomain: "train-353c2.firebaseapp.com",
  databaseURL: "https://train-353c2.firebaseio.com",
  projectId: "train-353c2",
  storageBucket: "train-353c2.appspot.com",
  messagingSenderId: "319806030524"
};

firebase.initializeApp(config);

// Name a Variable to Reference the Database
var database = firebase.database();

// Database Directory
var trainRef = database.ref("/Train");

// Create Variables
var name = null;
var destination = null;
var time = null;
var frequency = null;

// Listen for Button Click
$("#user-add-train").on("click", function() {
  event.preventDefault();
  var nameOfTrain = $("#user-input-name").val().trim();
  var Destination = $("#user-input-dest").val().trim();
  var Time = moment($("#user-input-first").val().trim(), "HH:mm").format();
  var Freq = parseInt($("#user-input-freq").val().trim());

  var newTrn = {
    name: nameOfTrain,
    destination: Destination,
    time: Time,
    frequency: Freq
  }

  // Save to Firebase
  database.ref("/Train").push(newTrn);

  // Make Input Boxes Blank After Firebase Push
  $("#user-input-name").val(null);
  $("#user-input-dest").val(null);
  $("#user-input-first").val(null);
  $("#user-input-freq").val(null);

});

// Add New Train to Firebase
database.ref("/Train").on("child_added", function( x, y) {

  // Store everything into a variable.
  var nameOfTrain = x.val().name;
  var Destination = x.val().destination;
  var Time = x.val().time;
  var Freq = x.val().frequency;
  var timeConvert = moment(Time, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(timeConvert), "minutes");
  var Remainder = diffTime % Freq;
  var minutesUntil = Freq - Remainder;
  var nextTrain = moment().add(minutesUntil, "minutes");

  // Add New Train to Table
  $("#sched-for-trains").append("<tr><td>" + nameOfTrain + "</td><td>" + Destination + "</td><td>" + Freq + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minutesUntil + "</td><td>" + "" + "</td></tr>");

});