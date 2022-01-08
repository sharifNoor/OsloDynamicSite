(function() {
    var config = {
        apiKey: "AIzaSyCaNA5SLdRQHM-KnBKTtHf8km6go9VvlcY",
        authDomain: "firsthundreddevices.firebaseapp.com",
        databaseURL: "https://firsthundreddevices-default-rtdb.firebaseio.com",
        storageBucket: "firsthundreddevices.appspot.com"
      };
    
      firebase.initializeApp(config);
    
      // Get a reference to the database service
      var database = firebase.database();
      var deviceName;
      var div;
      var singleDeviceData;
      var singleDeviceFlowRate;
      var singleDeviceTotalFlow;
      var singleDeviceLastUpdate;
      const dbRefObject = firebase.database().ref();
      dbRefObject.on('value', snap => {
        var data = snap.val();
        var length = Object.keys(data).length;
        for (let i = 0; i < length; i++) {
          deviceName = Object.keys(data)[i];
          singleDeviceData = data[deviceName];
          singleDeviceLastUpdate = singleDeviceData.LastUpdate;
          var currentDateTime  = new Date();
          var currentDateTimeInSec = currentDateTime.setSeconds(currentDateTime.getSeconds()-3);
          var singleDeviceLastUpdateInSec = Date.parse(singleDeviceLastUpdate) - 18000000; // Converting UTC GMT time to PST local time by Subtracting 18,000,000 as PST = GMT +5
          if(singleDeviceLastUpdateInSec < currentDateTimeInSec - 90){
            if (!singleDeviceData.UnderMintanance){
              if (document.getElementById(deviceName)){
                singleDeviceData = data[deviceName];
                singleDeviceFlowRate = singleDeviceData.FlowRateFromFloatSwitch;
                singleDeviceTotalFlow = singleDeviceData.TotalLitresFromFloatSwitch;
                singleDeviceLastUpdate = singleDeviceData.LastUpdate.split("T", 2);
                document.getElementById(deviceName).innerHTML = "<div style='border-radius: 25px' class='p-2 bg-danger bg-gradient text-white'><h3 class='text-center'>" + deviceName + "</h3>" + '<p>Flow Rate: ' + singleDeviceFlowRate + '</p><p>Total Flow: ' + singleDeviceTotalFlow + '</p><p>Last Update: ' + singleDeviceLastUpdate[0] + " " + singleDeviceLastUpdate[1].slice(0, -1) + '</p></div>';
              } 
              else {
                div = document.createElement('div');
                div.id = deviceName;
                div.className = 'col p-1';
                outer.appendChild(div);
                singleDeviceData = data[deviceName];
                singleDeviceFlowRate = singleDeviceData.FlowRateFromFloatSwitch;
                singleDeviceTotalFlow = singleDeviceData.TotalLitresFromFloatSwitch;
                singleDeviceLastUpdate = singleDeviceData.LastUpdate.split("T", 2);
                div.innerHTML = "<div style='border-radius: 25px' class='p-2 bg-danger bg-gradient text-white'><h3 class='text-center'>" + deviceName + "</h3>" + '<p>Flow Rate: ' + singleDeviceFlowRate + '</p><p>Total Flow: ' + singleDeviceTotalFlow + '</p><p>Last Update: ' + singleDeviceLastUpdate[0] + " " + singleDeviceLastUpdate[1].slice(0, -1) + '</p></div>';
              }
            }
          } 
        }
      });
    }());