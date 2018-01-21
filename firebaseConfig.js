
var config = {
	apiKey: "AIzaSyD_0MubOduGW0MGGtVn2HMeBN0e4vmc2vU",
	authDomain: "fundrace-46c75.firebaseapp.com",
	databaseURL: "https://fundrace-46c75.firebaseio.com",
	projectId: "fundrace-46c75",
	storageBucket: "fundrace-46c75.appspot.com",
	messagingSenderId: "505786262262"
};
firebase.initializeApp(config);

//Get element
const btnLogin = document.getElementById('btn-login');
const getUsername = document.getElementById('login-username');
const getPass = document.getElementById('login-pass');

//Create-References
const dbRefOject = firebase.database().ref().child('users').child('user1');

//firebase.auth().signOut();
//Sync object changes
dbRefOject.on('child_added', snap => console.log(snap.val()));

var experiment ="";
var usernameList= [];
var passwordList= [];

firebase.database().ref('users').once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    // var childData = childSnapshot.val();
		firebase.database().ref('/users/' + childKey).once('value', function(snapshot){
			var readUsername = snapshot.child('username').val();
			var readPass = snapshot.child('password').val();
			this.usernameList.push(readUsername);
			this.passwordList.push(readPass);
			
	 });
	});
});

function writeUserData(userId, userName, email, pass) {
  firebase.database().ref('users/' + userId).set({
		username: userName,
		email: email,
    password: pass
  });
}

//firebase.auth().signInWithEmailAndPassword("davinreinaldogozali@gmail.com","Tsuchikage123");
//console.log("usernya :" + firebase.auth().currentUser.uid);
const auth = firebase.auth();
// const promise = firebase.auth().signInWithEmailAndPassword("davinreinaldogozali@gmail.com","Tsuchikage123");
// console.log(promise);
//auth.signOut();
btnLogin.addEventListener('click', e =>{
	const email = getUsername.value;
	const pass = getPass.value;
	
	console.log(email);
	console.log(pass);
	//Sign in
  auth.signInWithEmailAndPassword(email,pass);
	
	
	// const promise = auth.signInWithEmailAndPassword(email,pass);
	// promise.catch(e => console.log(e.message));
});

auth.onAuthStateChanged(user =>{
	if(user){
		console.log(user.uid);
	}else{
		console.log("not logged in");
	}
});

if (firebase.auth().currentUser !== null) {
				console.log("user id: " + firebase.auth().currentUser.uid);
}
function validate(){
	console.log("Jalan");
	
	var tempUserName = document.getElementById('input-username').value;
	var tempEmail = document.getElementById('input-email').value;
	var tempPass = document.getElementById('input-password').value;
	console.log(tempUserName);
	console.log(tempEmail);
	console.log(tempPass);
	firebase.auth().createUserWithEmailAndPassword(tempEmail, tempPass).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
	});

	//writeUserData("user3",tempUserName,"coba");

}

function loginAuth(){
	console.log("ini login Auth");
	console.log("==============:");
	console.log("bnyk user: " + usernameList.length);
	// for(var i=0; i<usernameList.length; i++){
	// 	console.log("username: " + usernameList[i] + "\n" + "password: " + passwordList[i]);
	// }
	var index;
	var check = false;
	var getUsername = document.getElementById('login-username').value;
	var getPass = document.getElementById('login-pass').value;
	for(var i=0;i<usernameList.length;i++){
		if(getUsername == usernameList[i] && getPass == passwordList[i]){
			console.log("usernya ada")
			check = true;
			index = i;
		}
	}
	firebase.auth().signInAnonymously().catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// ...
	});
	// firebase.auth().signOut().then(function() {
	// 	// Sign-out successful.
	// }).catch(function(error) {
	// 	// An error happened.
	// });


	// 	alert("login success");
	// }else{
	// 	alert("login failed");
	// }

}

