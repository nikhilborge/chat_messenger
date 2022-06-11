

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
    const lmailId = document.getElementById('lmailid');
    const lpassword = document.getElementById('lPassword');
    console.log(lmailId.value ,lpassword.value);

    try{

        const result = await firebase.auth().signInWithEmailAndPassword(lmailId.value, lpassword.value);
        console.log(result.user.email);

    }catch(error){
        console.log(error);
        
    }
    lmailId.value = "";
    lpassword.value = "";
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