

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

// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });



firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const username = prompt("please enter your name");

document.getElementById("message-form").addEventListener("submit", sendMessage);

function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}


const fetchChat = db.ref("messages/");



fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});















