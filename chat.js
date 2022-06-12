
// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWsYUbtGlThZgIMswWOoUZbahWWyGEJbQ",
  authDomain: "messenger-39c9f.firebaseapp.com",
  projectId: "messenger-39c9f",
  storageBucket: "messenger-39c9f.appspot.com",
  messagingSenderId: "826797455058",
  appId: "1:826797455058:web:23364b50bcd772e4c55f0b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// console.log(app);



  function entername(){
    const enterusername = document.getElementById('entername');
    const username = enterusername.value;
    console.log(username);
  
  }


const db = firebase.database();

const username = prompt("Please Tell Us Your Name");
console.log(username);

document.getElementById("message-form").addEventListener("submit", sendMessage);



function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  console.log(message);
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    // document
    //   .getElementById("messages")
    //   .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }




  const fetchMessage = db.ref("messages/");


  fetchMessage.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });

  
  
//   function gmailsign(){
//   var provider = new firebase.auth.GoogleAuthProvider();

//   firebase.auth()
//   .signInWithPopup(provider)
//   .then((result) => {
//   console.log(result);
//   }).catch((error) => {
  
//   });
// }


async function signup(e){
  e.preventDefault();
  const mailId = document.getElementById('mailid');
  const password = document.getElementById('Password');
  console.log(mailId.value ,password.value);

  try{

      const result = await firebase.auth().createUserWithEmailAndPassword(mailId.value, mailId.value);
      await result.user.updateProfile({
          displayName: "User"
        })

        createUserCollection(result.user);

    await result.user.sendEmailVerification()
      console.log(result.user.email);

  }catch(error){
      console.log(error);
      
  }
  mailId.value = "";
  password.value = "";

}




async function login(e){
  e.preventDefault();
  const mailId = document.getElementById('lmailid');
  const password = document.getElementById('lPassword');
  console.log(mailId.value, password.value);

  try{

      const result = await firebase.auth().signInWithEmailAndPassword(mailId.value, password.value);
      console.log(result.user.email);

  }catch(error){
      console.log(error);
      
  }
  mailId.value = "";
  password.value = "";
}


function logout(){
  firebase.auth().signOut();
}

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else {
    console.log('signout');
  }
});



async function loginWithGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  try{

   const result = await firebase.auth()
    .signInWithPopup(provider)
    console.log(result);
    createUserCollection(result.user);
  }catch(err){
  console.log(err);
  }

}
