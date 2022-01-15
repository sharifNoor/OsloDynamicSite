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

  // Get a reference to the database service
  var database = firebase.database();
  var deviceNamee;
  var reload = false;
  var div;
  var singleDeviceData;
  var singleDeviceLastUpdate;
  const dbRefObject = firebase.database().ref();
  dbRefObject.on('value', snap => {
    var data = snap.val();
    if (data === null) {
      reload = true;
    }
    else {
      var length = Object.keys(data).length;
      for (let i = 0; i < length; i++) {
        deviceNamee = Object.keys(data)[i];
        singleDeviceData = data[deviceNamee];
        singleDeviceLastUpdate = singleDeviceData.LastUpdate;
        var currentDateTime = new Date();
        var currentDateTimeInSec = currentDateTime.setSeconds(currentDateTime.getSeconds() - 3);
        var singleDeviceLastUpdateInSec = Date.parse(singleDeviceLastUpdate) - 18000000; // Converting UTC GMT time to PST local time by Subtracting 18,000,000 as PST = GMT +5
        if (singleDeviceLastUpdateInSec < currentDateTimeInSec - 90000) {
          if (!singleDeviceData.UnderMintanance) {
            if (document.getElementById(deviceNamee)) {
              for (var n = 0; n < Firestoredata.length; n++) {
                if (Firestoredata[n].DeviceID === deviceNamee) {
                  document.getElementById(deviceNamee).innerHTML = "<div style='border-radius: 25px' class='p-2 bg-danger bg-gradient text-white'><h3 class='text-center'>" + Firestoredata[n].DeviceName + "</h3>" + '<p class="m-0">Taluqa: ' + Firestoredata[n].Taluqa + '</p><p class="m-0">Location: ' + Firestoredata[n].Location + '</p><p class="m-0">Operator: ' + Firestoredata[m].OperatorName + '</p><p class="m-0">Contact No: ' + Firestoredata[m].OperatorCellNo + '</p></div>';
                }
              }
            }
            else {
              for (var m = 0; m < Firestoredata.length; m++) {
                if (Firestoredata[m].DeviceID === deviceNamee) {
                  div = document.createElement('div');
                  div.id = deviceNamee;
                  div.className = 'col-md-3 p-1';
                  outer.appendChild(div);
                  div.innerHTML = "<div style='height: 100%; border-radius: 25px' class='p-2 bg-danger bg-gradient text-white'><h3 class='text-center'>" + Firestoredata[m].DeviceName + "</h3>" + '<p class="m-0">Taluqa: ' + Firestoredata[m].Taluqa + '</p><p class="m-0">Location: ' + Firestoredata[m].Location + '</p><p class="m-0">Operator: ' + Firestoredata[m].OperatorName + '</p><p class="m-0">Contact No: ' + Firestoredata[m].OperatorCellNo + '</p></div>';
                  div.onclick = PlantsDetails(Firestoredata[m].DeviceID)
                }
              }
            }
          }
          else {
            if (document.getElementById(deviceNamee)) {
              document.getElementById(deviceNamee).remove();
            }
          }
        }
        else {
          if (document.getElementById(deviceNamee)) {
            document.getElementById(deviceNamee).remove();
          }
        }
      }
    }
  });

}());

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