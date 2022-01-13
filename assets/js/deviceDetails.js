(function () {
    var Firestoredata = [];
    
    var Latitude, Longitude;
    var iframe = document.getElementById('iframe');
    var config = {
        apiKey: "AIzaSyCaNA5SLdRQHM-KnBKTtHf8km6go9VvlcY",
        authDomain: "firsthundreddevices.firebaseapp.com",
        databaseURL: "https://firsthundreddevices-default-rtdb.firebaseio.com",
        storageBucket: "firsthundreddevices.appspot.com",
        projectId: "firsthundreddevices"
    };
    firebase.initializeApp(config);
    let fireStore = firebase.firestore();
    fireStore.collection("Devices").get().then((deviceID) => {
        deviceID.forEach(singleDevice => {
          var deviceData = singleDevice.data();
          if (!Firestoredata.includes(deviceData)) {
            Firestoredata.push(deviceData);
          }
          if (deviceData.Latitude !== undefined){
             Latitude = deviceData.Latitude;
             Longitude = deviceData.Longitude;
             iframe.src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAlFfikVxbKgBIcrCDFwbdnJJnFzTtkM50&q=" + Latitude + "," + Longitude;
          }
        });
    });
}());