(function () {
    var config = {
        apiKey: "AIzaSyCaNA5SLdRQHM-KnBKTtHf8km6go9VvlcY",
        authDomain: "firsthundreddevices.firebaseapp.com",
        databaseURL: "https://firsthundreddevices-default-rtdb.firebaseio.com",
        storageBucket: "firsthundreddevices.appspot.com",
        projectId: "firsthundreddevices",
    };
    // firebase.initializeApp(config);
    let fireStore = firebase.firestore();
    var database = firebase.database();
    var deviceName;
    var deviceUnderMaintainance;
    const arr = ['S.No.', 'Device ID', 'Action'];
    var devicesListRealTime = [];
    var devicesListFirestore = [];
    var fsDeviceName;

    fireStore.collection("Devices").get().then((deviceID) => {
        deviceID.forEach(singleDevice => {
            var deviceData = singleDevice.data();
            fsDeviceName = singleDevice.data().DeviceID;
            // console.log(JSON.stringify(deviceData.DeviceID));
            if (!devicesListFirestore.includes(fsDeviceName)) {
                devicesListFirestore.push(fsDeviceName);
            }
        });
    });

    const dbRefObject = firebase.database().ref();
    dbRefObject.on('value', snap => {
        var data = snap.val();
        var length = Object.keys(data).length;
        // console.log(length);
        for (var i = 0; i < length; i++) {
            deviceName = Object.keys(data)[i];
            //Populate all data in array
            if (!devicesListRealTime.includes(deviceName)) {
                devicesListRealTime.push(deviceName);
            }
        }
        for (var i = 0; i < devicesListRealTime.length; i++) {
            // console.log(devicesListRealTime.length)
            var body = document.getElementById('pendingDevicesDiv');
            var tbl = document.getElementById('pendingDevicestable');
            tbl.style.width = '100%';
            tbl.className = 'table table-hover';
            var tbdy = document.createElement('tbody');
            var tr = document.createElement('tr');
            // if (deviceUnderMaintainance){
            if (document.getElementById(devicesListRealTime[i])) { }
            else {
                if (!devicesListFirestore.includes(devicesListRealTime[i])) {
                    for (var j = 0; j < 3; j++) {
                        var td = document.createElement('td');
                        td.appendChild(document.createTextNode('\u0020'));
                        if (j === 0) {
                            td.innerText = i + 1;
                        }
                        else if (j === 1) {
                            td.innerText = devicesListRealTime[i];
                            td.id = devicesListRealTime[i];
                            td.style.paddingLeft = '15px'
                        }
                        else if (j === 2) {
                            td.innerHTML = '<div class="row d-flex justify-content-md-end">' +
                                '<button id="btn' + devicesListRealTime[i] + '" class="btn btn-link btn-sm mr-3" style="max-width: 50px;" role="button">' +
                                '<img src="images/add.png" style="max-width:100; height:25px" class="thumbnail img-responsives" alt="">' +
                                '</button>' + '</div>';
                            td.onclick = linkDevice(devicesListRealTime[i]);
                        }
                        tr.appendChild(td);
                    }
                }
            }
            tbdy.appendChild(tr);
            tbl.appendChild(tbdy);
            body.appendChild(tbl);
        }
    });
}());