var config = {
  apiKey: "AIzaSyCaNA5SLdRQHM-KnBKTtHf8km6go9VvlcY",
  authDomain: "firsthundreddevices.firebaseapp.com",
  databaseURL: "https://firsthundreddevices-default-rtdb.firebaseio.com",
  storageBucket: "firsthundreddevices.appspot.com",
  projectId: "firsthundreddevices"
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
    var singleDeviceLastUpdateInSec = Date.parse(singleDeviceLastUpdate) - 18000000;;
    if(singleDeviceLastUpdateInSec > currentDateTimeInSec - 90000){
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
//==============================================================================================================

let fireStore = firebase.firestore();
var ddlData = [];
var Taluqa = [];
var AreaLocation = [];

function getLocations(){
  //Get devices information from firestore and store in arrays.
  fireStore.collection("Devices").get().then((deviceID)=>{
      deviceID.forEach(singleDevice => {
          var deviceData = singleDevice.data();

          //Populate all data in array
          if(!ddlData.includes(deviceData)){
            ddlData.push(deviceData);
          }

          //Populate only Taluqa in array
          if(!Taluqa.includes(deviceData.Taluqa)){
            Taluqa.push(deviceData.Taluqa);
          }
          
      });

      //Populate Taluqa dropdown
      var select = document.getElementById("ddlTaluqa");

      for(var i = 0; i < Taluqa.length; i++) {
          var opt = Taluqa[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          select.appendChild(el);
      }

      
  });  
};

function populateArea(_Taluqa){
  //Filter Data list by Taluqa
  const filteredArea = ddlData.filter(ddlData => ddlData.Taluqa == _Taluqa);
  
  //Select Area dropdown
  var select = document.getElementById("ddlArea");
  
  //Clear Area dropdown before load
  select.innerHTML = "<option>Select Area</option>";

  //Clear DeviceName dropdown
  document.getElementById("ddlDeviceName").innerHTML = "<option>Select Device</option>";

  //Fill Area dropdown
  for(var i = 0; i < filteredArea.length; i++) {
      var opt = filteredArea[i].Location;
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  }
}

function populateDevices(_Area){

  //Get Value from Taluqa DropDown
  var selectedTaluqa = document.getElementById("ddlTaluqa");

  //Filter Data by Taluqa and Area
  const filteredDevices = ddlData.filter(ddlData => ddlData.Taluqa == selectedTaluqa.value && ddlData.Location == _Area);
  
  //Get instance of DeviceName dropdown
  var select = document.getElementById("ddlDeviceName");
  
  //Clear dropdown before pushing data
  select.innerHTML = "<option>Select Device</option>";

  //Push data in device dropdown
  for(var i = 0; i < filteredDevices.length; i++) {
      var opt = filteredDevices[i].DeviceName;
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = filteredDevices[i].DeviceID;
      select.appendChild(el);
  }
}


window.onload = getLocations;