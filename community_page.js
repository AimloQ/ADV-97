// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6XdfsKHdvLo8Hofk2MyxA870txYZlNXc",
  authDomain: "prime-xfbu.firebaseapp.com",
  projectId: "prime-xfbu",
  storageBucket: "prime-xfbu.appspot.com",
  messagingSenderId: "1011535454889",
  appId: "1:1011535454889:web:eb8ece6cf57bd789b13fb8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("Room");

document.getElementById("entered_room").innerHTML= "You have have entered in: " + room_name ;
console.log(room_name)

function send(){
    Msg = document.getElementById("msg_input").value;

      firebase.database().ref(room_name).push({
            User: user_name,
            Like: 0,
            Message: Msg
      });

      document.getElementById("msg_input").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                if (childKey != "purpose") {
                      firebase_message_id = childKey;
                      message_data = childData;
                      
                      console.log(firebase_message_id);
                      console.log(message_data);

                      login_name = message_data["User"];
                      console.log(user_name);
                      like = message_data["Like"];
                      msg = message_data["Message"];

                      name_tag = "<h4>" + login_name + "<img src='tick.png' class='user_tick'> </h4>";
                      msg_tag = "<h4>" + msg + "</h4>";
                      like_btn = "<button class= 'btn btn-warning' id=" + firebase_message_id + " value= " + like + " onclick='updateLike(this.id)'>";
                      span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>";

                      row= name_tag + msg_tag + like_btn + span_tag;
                      document.getElementById("output").innerHTML += row;

                      
                }
          });
    });
}
getData();

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("Room");
    window.location = "community_login.html";
}

function back() {
    localStorage.removeItem("Room");
    window.location = "community.html";
}

function updateLike(clicked_msg){
    console.log("clicked on like button - " + clicked_msg);
    
    likes_value = document.getElementById(clicked_msg).value;
    updated_likes = Number(likes_value) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(clicked_msg).update({
     Like : updated_likes
    });
}
