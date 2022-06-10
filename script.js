

async function signup(e){
    e.preventDefault();
    const mailId = document.getElementById('mailid');
    const password = document.getElementById('Password');
    console.log(mailId.value ,password.value);

    try{

        const result = await firebase.auth().createUserWithEmailAndPassword(mailId.value, mailId.value);
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

        const result = await firebase.auth().signInWithEmailAndPassword(mailId.value, mailId.value);
        console.log(result.user.email);

    }catch(error){
        console.log(error);
        
    }
    lmailId.value = "";
    lpassword.value = "";
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