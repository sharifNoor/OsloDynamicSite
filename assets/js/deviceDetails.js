var Firestoredata = [];
(function () {
    var config = {
        apiKey: "AIzaSyCaNA5SLdRQHM-KnBKTtHf8km6go9VvlcY",
        authDomain: "firsthundreddevices.firebaseapp.com",
        databaseURL: "https://firsthundreddevices-default-rtdb.firebaseio.com",
        storageBucket: "firsthundreddevices.appspot.com",
        projectId: "firsthundreddevices"
    };
    firebase.initializeApp(config);
    dataFromFirestore();
})

function dataFromFirestore() {
    let fireStore = firebase.firestore();
    fireStore.collection("Devices").get().then((deviceID) => {
      deviceID.forEach(singleDevice => {
        var deviceData = singleDevice.data();
        if (!Firestoredata.includes(deviceData)) {
          Firestoredata.push(deviceData);
        }
      });
    });
    console.log(Firestoredata);
  }