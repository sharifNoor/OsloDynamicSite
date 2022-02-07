function search() {
    document.getElementById("DevicesDropdown").classList.toggle("show");
    var database = firebase.database();
    var deviceName;
    var listOuter = document.getElementById('DevicesDropdown');
    setTimeout(function(){ 
        var length = Object.keys(dataReal).length;
        for (var i = 0; i < length; i++) {
            deviceName = Object.keys(dataReal)[i];
            if (!document.getElementById('UM' + deviceName)) {
                var a = document.createElement('a');
                a.innerText = deviceName;
                a.id = deviceName;
                listOuter.appendChild(a);
                a.onclick = disp(a.id);
            }
        }
    }, 500);
    // });
}

const disp = id => e => {
    e.preventDefault();
    e.stopPropagation();
    var searchBox = document.getElementById('deviceList');
    searchBox.value = id;
    document.getElementById("DevicesDropdown").classList.toggle("hide");
    document.getElementById("details").style.display = 'block';
};

function submit(id) {
    var modal = document.getElementById("addDeviceModal");
    var deviceName = id.split("_");
    if (deviceName[1] > 0 && deviceName[1] < 101){
        var dbRefObject = firebase.database(database[0]).ref(id);
        dbRefObject.update({
            UnderMintanance: true
        }, (error) => {
            if (error) {
                console.log(error);
            }
            else {
                updateIssue(id);
            }
        });
    }
    else if (deviceName[1] > 100 && deviceName[1] < 201){
        var dbRefObject = firebase.database(database[1]).ref(id);
        dbRefObject.update({
            UnderMintanance: true
        }, (error) => {
            if (error) {
                console.log(error);
            }
            else {
                updateIssue(id);
            }
        });
    }
}

const updateIssue = async (id) => {
    let fireStore = firebase.firestore();
	var docRef = fireStore.collection("Devices");
    var IssueText = document.getElementById('IssueText').value;
    docRef.doc(id).update({
        Issue: IssueText
    }).then(() => {
        location.reload();
    }).catch((error) => {
        alert("Error Occured:", error);
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