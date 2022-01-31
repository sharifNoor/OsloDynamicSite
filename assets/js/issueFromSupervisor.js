(function () {
    var config = {
        apiKey: "AIzaSyCaNA5SLdRQHM-KnBKTtHf8km6go9VvlcY",
        authDomain: "firsthundreddevices.firebaseapp.com",
        databaseURL: "https://firsthundreddevices-default-rtdb.firebaseio.com",
        storageBucket: "firsthundreddevices.appspot.com",
        projectId: "firsthundreddevices",
    };
    let fireStore = firebase.firestore();
    var database = firebase.database();
    const arr = ['S.No.', 'Device ID', 'Issue', 'Action'];
    var fsDeviceName;

    fireStore.collection("Devices").get().then((deviceID) => {
        deviceID.forEach(singleDevice => {
            var deviceData = singleDevice.data();
            fsDeviceName = singleDevice.data().DeviceID;
            if (deviceData.IssueFromSupervisor !== undefined) {
                    var body = document.getElementById('issueFromSupervisorDiv');
                    var tbl = document.getElementById('issueFromSupervisorTalble');
                    tbl.style.width = '100%';
                    tbl.className = 'table table-hover';
                    var tbdy = document.createElement('tbody');
                    var tr = document.createElement('tr');
                    if (document.getElementById(fsDeviceName)) {}
                    else {
                            var i = 0;
                            for (var j = 0; j < 5; j++) {
                                var td = document.createElement('td');
                                td.appendChild(document.createTextNode('\u0020'));
                                if (j === 0) {
                                    td.innerText = i + 1;
									td.align = 'center'

                                }
                                else if (j === 1) {
                                    td.innerText = fsDeviceName;
                                    td.id = fsDeviceName;
                                    td.style.paddingLeft = '15px'
                                }
                                else if (j === 2) {
                                    td.innerText = deviceData.Location;
                                    td.style.paddingLeft = '15px';
                        }
                                else if (j === 3) {
                                            td.innerText = deviceData.IssueFromSupervisor;
                                            td.style.paddingLeft = '15px';
                                }
                                else if (j === 4) {
                                    td.innerHTML = 
                                        '<button id="btn' + fsDeviceName + '" class="btn btn-link btn-sm mr-3" role="button">' +
                                        '<img src="images/delete.png" style="max-width:100; height:25px" class="thumbnail img-responsives" alt="">' +
                                        '</button>';
									td.align = 'center'
                                    td.onclick = del(fsDeviceName, 'Supervisor');
                                }
                                tr.appendChild(td);
                            }
                        
                    }
                    tbdy.appendChild(tr);
                    tbl.appendChild(tbdy);
                    body.appendChild(tbl);
            }
            
        });
    });
}());