  var config = {
    apiKey: "AIzaSyCaNA5SLdRQHM-KnBKTtHf8km6go9VvlcY",
    authDomain: "firsthundreddevices.firebaseapp.com",
    databaseURL: "https://firsthundreddevices-default-rtdb.firebaseio.com",
    storageBucket: "firsthundreddevices.appspot.com"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var deviceName;
  var TotalActivePlants = document.getElementById('TotalActivePlants');
  var TotalNonActivePlants = document.getElementById('TotalNonActivePlants');
  var TotalUnderMaintanancePlants = document.getElementById('TotalUnderMaintainancePlants');
  var singleDeviceData;
  var singleDeviceLastUpdate;
  const dbRefObject = firebase.database().ref();
  dbRefObject.on('value', snap => {
    var data = snap.val();
    var NoOfDevices = Object.keys(data).length;
    var activeDevices = 0;
    var totalUnderMaintananceDevices = 0;
    for (let i = 0; i < NoOfDevices; i++) {
      deviceName = Object.keys(data)[i];
      singleDeviceData = data[deviceName];
      singleDeviceLastUpdate = singleDeviceData.LastUpdate;
      var underMaintananceDevice = singleDeviceData.UnderMintanance;
      var currentDateTime  = new Date();
      var currentDateTimeInSec = currentDateTime.setSeconds(currentDateTime.getSeconds()-3);
      var singleDeviceLastUpdateInSec = Date.parse(singleDeviceLastUpdate);
      if(singleDeviceLastUpdateInSec > currentDateTimeInSec - 90){
        activeDevices += 1;
        TotalActivePlants.innerText = activeDevices;
      }
      if(underMaintananceDevice) {
        totalUnderMaintananceDevices += 1;
        TotalUnderMaintanancePlants.innerText = totalUnderMaintananceDevices;
      }
      TotalNonActivePlants.innerText = NoOfDevices - activeDevices - totalUnderMaintananceDevices;
    }
  });