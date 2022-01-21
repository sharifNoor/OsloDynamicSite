var Firestoredata = [];
var userTaluqa;
var userRole;

const dataFromFirestore = async () => {
  userTaluqa = await getSSData('userTaluqa');
  userRole = await getSSData('role');
  let fireStore = firebase.firestore();
  await fireStore.collection("Devices").get().then((deviceID) => {
    deviceID.forEach(singleDevice => {
      var deviceData = singleDevice.data();
      if (userRole === 'Supervisor'){
        if (deviceData.Taluqa === userTaluqa) {
          if (!Firestoredata.includes(deviceData)) {
            Firestoredata.push(deviceData);
          }
        }
      }
      else {
        if (!Firestoredata.includes(deviceData)) {
          Firestoredata.push(deviceData);
        }
      }
    });
  });
}

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
  var deviceName;
  var div;
  var singleDeviceData;
  const dbRefObject = firebase.database().ref();
  dbRefObject.on('value', snap => {
    var data = snap.val();
    var length = Object.keys(data).length;
    for (let i = 0; i < length; i++) {
      deviceName = Object.keys(data)[i];
      singleDeviceData = data[deviceName];
      singleDeviceUnderMintanance = singleDeviceData.UnderMintanance;
      if (singleDeviceUnderMintanance) {
        if (document.getElementById(deviceName)) {
          for (var n = 0; n < Firestoredata.length; n++) {
            if (Firestoredata[n].DeviceID === deviceName) {
              document.getElementById(deviceName).innerHTML = "<div style='border-radius: 25px' class='p-2 bg-warning bg-gradient text-white'><h3 class='text-center'>" + Firestoredata[n].DeviceName + "</h3>" + '<p class="m-0">Taluqa: ' + Firestoredata[n].Taluqa + '</p><p class="m-0">Location: ' + Firestoredata[n].Location + '</p><p class="m-0">Operator: ' + Firestoredata[m].OperatorName + '</p><p class="m-0">Contact No: ' + Firestoredata[m].OperatorCellNo + '</p></div>';
            }
          }
          // singleDeviceData = data[deviceName];
          // singleDeviceFlowRate = singleDeviceData.FlowRateFromFloatSwitch;
          // singleDeviceTotalFlow = singleDeviceData.TotalLitresFromFloatSwitch;
          // singleDeviceLastUpdate = singleDeviceData.LastUpdate.split("T", 2);
          // document.getElementById(deviceName).innerHTML = "<div style='border-radius: 25px' class='p-2 bg-warning bg-gradient text-white'><h3 class='text-center'>" + deviceName + "</h3>" + '<p>Flow Rate: ' + singleDeviceFlowRate + '</p><p>Total Flow: ' + singleDeviceTotalFlow + '</p><p>Last Update: ' + singleDeviceLastUpdate[0] + " " + singleDeviceLastUpdate[1].slice(0, -1) + '</p></div>';
        }
        else {
          for (var m = 0; m < Firestoredata.length; m++) {
            if (Firestoredata[m].DeviceID === deviceName) {
              div = document.createElement('div');
              div.id = deviceName;
              div.className = 'col-md-3 p-1 btn';
              outer.appendChild(div);
              div.onclick = PlantsDetails(Firestoredata[m].DeviceID)
              div.innerHTML = "<div style='height: 100%; border-radius: 25px' class='p-2 bg-warning bg-gradient text-white'><h3 class='text-center'>" + Firestoredata[m].DeviceName + "</h3>" + '<p class="m-0">Taluqa: ' + Firestoredata[m].Taluqa + '</p><p class="m-0">Location: ' + Firestoredata[m].Location + '</p><p class="m-0">Operator: ' + Firestoredata[m].OperatorName + '</p><p class="m-0">Contact No: ' + Firestoredata[m].OperatorCellNo + '</p></div>';
            }
          }
          // div = document.createElement('div');
          // div.id = 'UM' + deviceName;
          // div.className = 'col p-1';
          // outer.appendChild(div);
          // singleDeviceData = data[deviceName];
          // singleDeviceFlowRate = singleDeviceData.FlowRateFromFloatSwitch;
          // singleDeviceTotalFlow = singleDeviceData.TotalLitresFromFloatSwitch;
          // singleDeviceLastUpdate = singleDeviceData.LastUpdate.split("T", 2);
          // div.innerHTML = "<div style='border-radius: 25px;' class='p-2 bg-warning bg-gradient text-dark'><h3 class='text-center'>" + deviceName + "</h3>" + '<p>Flow Rate: ' + singleDeviceFlowRate + '</p><p>Total Flow: ' + singleDeviceTotalFlow + '</p><p>Last Update: ' + singleDeviceLastUpdate[0] + " " + singleDeviceLastUpdate[1].slice(0, -1) + '</p></div>';
        }
      }
    }
  });
}());
