(function () {
    var config = {
        apiKey: "AIzaSyCaNA5SLdRQHM-KnBKTtHf8km6go9VvlcY",
        authDomain: "firsthundreddevices.firebaseapp.com",
        databaseURL: "https://firsthundreddevices-default-rtdb.firebaseio.com",
        storageBucket: "firsthundreddevices.appspot.com"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var deviceName;
    var deviceUnderMaintainance;
    const arr = ['S.No.', 'Device ID', 'Location', 'Issue', 'Action'];
    const dbRefObject = firebase.database().ref();
    dbRefObject.on('value', snap => {
        var data = snap.val();
        var length = Object.keys(data).length;
        // console.log(length);
        var body = document.getElementById('underMaintananceDevicesDiv');
        var tbl = document.getElementById('underMaintananceDevicesTable');
        tbl.style.width = '100%';
        tbl.className = 'table table-hover';
        var tbdy = document.createElement('tbody');
        for (var i = 0; i < length; i++) {
            deviceName = Object.keys(data)[i];
            var tr = document.createElement('tr');
            deviceUnderMaintainance = data[deviceName].UnderMintanance;
            if (deviceUnderMaintainance){
                if (document.getElementById(deviceName)){}
                else {
                    for (var j = 0; j < arr.length; j++) {
                        var td = document.createElement('td');
                        td.appendChild(document.createTextNode('\u0020'));
                        if (j === 0) {
                            td.innerText = i + 1;
                        }
                        else if (j === 1) {
                            td.innerText = deviceName;
                            td.id = deviceName;
                            td.style.paddingLeft = '15px'
                        }
                        else if (j === 2) {
                            td.innerText = 'Location';
                            td.style.paddingLeft = '15px'
                        }
                        else if (j === 3) {
                            td.innerText = 'Issue';
                            td.style.paddingLeft = '15px'
                        }
                        else if (j === 4) {
                            td.innerHTML = '<div class="row d-flex justify-content-md-end">' + 
                            '<button id="abc" class="btn btn-link btn-sm mr-3" style="max-width: 50px;" role="button">' + 
                            '<img src="images/delete.png" style="max-width:100; height:25px" class="thumbnail img-responsives" alt="">' + 
                            '</button>' + '</div>';
                            td.onclick = del(deviceName);
                        }
                        tr.appendChild(td);
                    }
                }
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        body.appendChild(tbl);
    });
}());