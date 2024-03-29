var DevicesFromFirebase = [];
let dataReal = {};

const CheckPermissions = async () => {
    var role = getSSData('role');
    if (role !== 'Developer') {
        clearSSdata();
        window.location = window.location = "./login.html";
        alert('Permission Denied!\nOnly Developers are allowed to access this page')
    }
    else {
        var config = {
            apiKey: "AIzaSyCaNA5SLdRQHM-KnBKTtHf8km6go9VvlcY",
            authDomain: "firsthundreddevices.firebaseapp.com",
            databaseURL: "https://firsthundreddevices-default-rtdb.firebaseio.com",
            storageBucket: "firsthundreddevices.appspot.com",
            projectId: "firsthundreddevices",
        };
        firebase.initializeApp(config);
        getRealTimeData();
        let fireStore = firebase.firestore();
        await fireStore.collection("Devices").get().then((deviceID) => {
            deviceID.forEach(singleDevice => {
                var deviceData = singleDevice.data();
                if (!DevicesFromFirebase.includes(deviceData)) {
                    DevicesFromFirebase.push(deviceData);
                }
            });
        });
    }
}

const getRealTimeData = async () => {
    dataReal = await DataGetter();
    // console.log(dataReal)
}

(function () {
    window.onload = CheckPermissions();    
    var database = firebase.database();
    var deviceName;
    var deviceUnderMaintainance;
    const arr = ['S.No.', 'Device ID', 'Location', 'Issue', 'Action'];
    // const dbRefObject = firebase.database().ref();
    // dbRefObject.on('value', snap => {
    //     var data = snap.val();
    setTimeout(function(){ 
        var length = Object.keys(dataReal).length;
        var body = document.getElementById('underMaintananceDevicesDiv');
        var tbl =  document.getElementById('underMaintananceDevicesTable');
       
        tbl.className = 'table table-hover';
        var tbdy = document.createElement('tbody');
        for (var i = 0; i < length; i++) {
            deviceName = Object.keys(dataReal)[i];
            var tr = document.createElement('tr');
            deviceUnderMaintainance = dataReal[deviceName].UnderMintanance;
            if (deviceUnderMaintainance) {
                if (document.getElementById(deviceName)) { }
                else {
                    for (var j = 0; j < arr.length; j++) {
                        var td = document.createElement('td');
                        td.appendChild(document.createTextNode('\u0020'));
                        if (j === 0) {
                            td.innerText = i + 1;
							td.align= 'center';
                        }
                        else if (j === 1) {
                            td.innerText = deviceName;
                            td.id = deviceName;
                           
                        }
                        else if (j === 2) {
                            for (var k = 0; k < DevicesFromFirebase.length; k++) {
                                if (DevicesFromFirebase[k].DeviceID === deviceName){
                                    td.innerText = DevicesFromFirebase[k].Location;
                                    
                                }
                            }
                        }
                        else if (j === 3) {
                            for (var l = 0; l < DevicesFromFirebase.length; l++) {
                                if (DevicesFromFirebase[l].DeviceID === deviceName){
                                    td.innerText = DevicesFromFirebase[l].Issue;
                                }
                            }
                        }
                        else if (j === 4) {
                            td.innerHTML = 
                                '<button id="abc" class="btn btn-link btn-sm mr-3" role="button">' +
                                '<img src="images/delete.png" width="30px"  class="thumbnail img-responsives" alt="">' +
                                '</button>';
							td.align= 'center';
                            td.onclick = del(deviceName, 'Issue');
                        }
                        tr.appendChild(td);
                    }
                }
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        body.appendChild(tbl);
    // });
    }, 3000);
}());