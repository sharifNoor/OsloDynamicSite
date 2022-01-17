(function () {
  var Firestoredata = [];

  var Latitude, Longitude;
  var iframe = document.getElementById('iframe');
  var DeviceName = document.getElementById('DeviceName');
  var DeviceLocation = document.getElementById('DeviceLocation');
  var Taluqa = document.getElementById('Taluqa');
  var ContactPerson = document.getElementById('ContactPerson');
  var ContactNo = document.getElementById('ContactNo');
  var NatAvailable = document.getElementById('NatAvailable');
  var NetDeviceNo = document.getElementById('NetDeviceNo');
  
  var config = {
    apiKey: "AIzaSyCaNA5SLdRQHM-KnBKTtHf8km6go9VvlcY",
    authDomain: "firsthundreddevices.firebaseapp.com",
    databaseURL: "https://firsthundreddevices-default-rtdb.firebaseio.com",
    storageBucket: "firsthundreddevices.appspot.com",
    projectId: "firsthundreddevices"
  };
  let params = window.location.search.split('=');
  firebase.initializeApp(config);
  let fireStore = firebase.firestore();
  fireStore.collection("Devices").get().then((deviceID) => {
    deviceID.forEach(singleDevice => {
      var deviceData = singleDevice.data();
      if (!Firestoredata.includes(deviceData) && deviceData.DeviceID === params[1]) {
        Firestoredata.push(deviceData);
      }
      if(deviceData.DeviceID === params[1]) {
        Latitude = deviceData.Latitude;
        Longitude = deviceData.Longitude;
        DeviceName.innerText = 'Device Name: ' + deviceData.DeviceName;
        DeviceLocation.innerText = 'Location: ' + deviceData.Location;
        Taluqa.innerText = 'Taluqa: ' + deviceData.Taluqa;
        ContactPerson.innerText = 'Contact Person: ' + deviceData.OperatorName;
        ContactNo.innerText = 'Contact No.: ' + deviceData.OperatorCellNo;
        NatAvailable.innerText = 'Is Internet Available: ' + deviceData.NatAvailable;
        NetDeviceNo.innerText = 'Internet Device No: ' + deviceData.NetDeviceNo;
        iframe.src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAlFfikVxbKgBIcrCDFwbdnJJnFzTtkM50&q=" + Latitude + "," + Longitude;
      }
    });
  });
}());