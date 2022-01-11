function search() {
    document.getElementById("DevicesDropdown").classList.toggle("show");
    var database = firebase.database();
    var deviceName;
    var listOuter = document.getElementById('DevicesDropdown');
    const dbRefObject = firebase.database().ref();
    dbRefObject.on('value', snap => {
        var data = snap.val();
        var length = Object.keys(data).length;
        for (var i = 0; i < length; i++) {
            deviceName = Object.keys(data)[i];
            if (!document.getElementById('UM' + deviceName)) {
                var a = document.createElement('a');
                a.innerText = deviceName;
                a.id = deviceName;
                listOuter.appendChild(a);
                console.log('deviceName')
                a.onclick = disp(a.id);
            }           
        }
    });
}

const disp = id => e => {
    e.preventDefault();
    e.stopPropagation();
    var searchBox = document.getElementById('deviceList');
    searchBox.value = id;
    document.getElementById("DevicesDropdown").classList.toggle("hide");
    document.getElementById("details").style.display = 'block';
};

function submit (id) {
    var modal = document.getElementById("addDeviceModal");
    firebase.database().ref(id).update({
        UnderMintanance: true
    }, (error) => {
        if(error){
            console.log(error);
        }
        else {
            location.reload();
        }
    });
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("deviceList");
    filter = input.value.toUpperCase();
    div = document.getElementById("DevicesDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}