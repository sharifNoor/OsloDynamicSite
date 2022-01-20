function Register() {
	var email = document.getElementById("email").value;
	var pwd = document.getElementById("pwd").value;
	var confirmPwd = document.getElementById("confirmPwd").value;
	var name = document.getElementById("name").value;
	var role = document.getElementById("userRole").value;
	var taluqa = document.getElementById("usertaluqa").value;

	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (email == '') {
		alert("please enter Email Address.");
	}
	else if (pwd == '') {
		alert("enter the password");
	}
	else if (!filter.test(email)) {
		alert("Enter valid email id.");
	}
	else if (pwd.length < 6) {
		alert("Password min and max length is 6.");
	}
	else {
		if (pwd === confirmPwd) {
			createUser(email, pwd, name, role, taluqa)
		}
		else {
			alert('Password and Confirm Password must be same!');
		}
	}
}

const createUser = async (email, pwd, name, role, userTaluqa) => {
	let fireStore = firebase.firestore();
	var docRef = fireStore.collection("Users");

	if (role === 'Supervisor') {
		docRef.doc(name).set({
			Email: email,
			Name: name,
			Password: pwd,
			Role: role,
			Taluqa: userTaluqa
		}).then(() => {
			setSSData('email', email);
			setSSData('password', pwd);
			setSSData('role', role);
			setSSData('userTaluqa', userTaluqa);
			window.location = "./dashboard.html";
		}).catch((error) => {
			alert("Error Registering User:", error);
		});
	}
	else {
		docRef.doc(name).set({
			Email: email,
			Name: name,
			Password: pwd,
			Role: role
		}).then(() => {
			setSSData('email', email);
			setSSData('password', pwd);
			setSSData('role', role);
			window.location = "./dashboard.html";
		}).catch((error) => {
			alert("Error Registering User:", error);
		});
	}
}


//Reset Inputfield code.
function clearFunc() {
	document.getElementById("email").value = "";
	document.getElementById("pwd").value = "";
}

// timeout before a callback is called

let timeout;

// traversing the DOM and getting the input and span using their IDs

let password = document.getElementById('pwd')
let strengthBadge = document.getElementById('StrengthDisp')

// The strong and weak password Regex pattern checker

let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{6,}))')

function StrengthChecker(PasswordParameter) {
	// We then change the badge's color and text based on the password strength

	if (strongPassword.test(PasswordParameter)) {
		strengthBadge.style.backgroundColor = "green"
		strengthBadge.textContent = 'Strong'
		strengthBadge.className = 'badge displayBadge justify-content-center w-100'
	} else if (mediumPassword.test(PasswordParameter)) {
		strengthBadge.style.backgroundColor = 'blue'
		strengthBadge.textContent = 'Medium'
		strengthBadge.className = 'badge displayBadge justify-content-center w-100'
	} else {
		strengthBadge.style.backgroundColor = 'red'
		strengthBadge.textContent = 'Weak'
		strengthBadge.className = 'badge displayBadge justify-content-center w-100'
	}
}

// Adding an input event listener when a user types to the  password input 

password.addEventListener("input", () => {

	//The badge is hidden by default, so we show it

	strengthBadge.style.display = 'block'
	clearTimeout(timeout);

	//We then call the StrengChecker function as a callback then pass the typed password to it

	timeout = setTimeout(() => StrengthChecker(password.value), 500);

	//Incase a user clears the text, the badge is hidden again

	if (password.value.length !== 0) {
		strengthBadge.style.display != 'block'
	} else {
		strengthBadge.style.display = 'none'
	}
});

const userRoleSelect = async (role) => {
	var userTaluqaSelect = document.getElementById('userTaluqaDiv');
	var userTaluqaList = document.getElementById('usertaluqa');
	var TaluqaList = [];
	var config = {
		apiKey: "AIzaSyCaNA5SLdRQHM-KnBKTtHf8km6go9VvlcY",
		authDomain: "firsthundreddevices.firebaseapp.com",
		databaseURL: "https://firsthundreddevices-default-rtdb.firebaseio.com",
		storageBucket: "firsthundreddevices.appspot.com",
		projectId: "firsthundreddevices"
	};
	firebase.initializeApp(config);
	if (role === 'Supervisor') {
		let fireStore = firebase.firestore();
		await fireStore.collection("Devices").get().then((deviceID) => {
			deviceID.forEach(singleDevice => {
			var deviceData = singleDevice.data();
			if (!TaluqaList.includes(deviceData.Taluqa)) {
				TaluqaList.push(deviceData.Taluqa);
			}
			});
		});
		TaluqaList.forEach((taluqa) => {
			var opt = document.createElement('option');
			opt.innerText = taluqa;
			userTaluqaList.appendChild(opt);
		});
		userTaluqaSelect.style.display = 'block';
	}
	else {
		userTaluqaSelect.style.display = 'none';
	}
}