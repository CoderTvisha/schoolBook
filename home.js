var firebaseConfig = {
  apiKey: "AIzaSyBsjG_quQAkj7sSC5DHpgbZqYwOo8jVME8",
  authDomain: "the-book-club-e846a.firebaseapp.com",
  databaseURL: "https://the-book-club-e846a.firebaseio.com",
  projectId: "the-book-club-e846a",
  storageBucket: "the-book-club-e846a.appspot.com",
  messagingSenderId: "858439830380",
  appId: "1:858439830380:web:95bbf30861d4868aaec149",
  measurementId: "G-WFPQCRQ2J1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "room.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      console.log("testing");
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  }); 

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "room.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "login.html";
}