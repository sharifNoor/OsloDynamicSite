const GenerateNCR = async () => {
    var DeviceIDHeading = document.getElementById("DeviceID");
    let params = window.location.search.split('=');

    let fireStore = firebase.firestore();
    await fireStore.collection("Devices").get().then((deviceID) => {
        deviceID.forEach(singleDevice => {
            var deviceData = singleDevice.data();
            if (deviceData.DeviceID === params[1]) {
                DeviceIDHeading.innerText = 'Device Name: ' + deviceData.DeviceName;
            }
        });
    });
}

const PostIssue = async () => {
    var IssueText = document.getElementById('IssueText');
    let params = window.location.search.split('=');
    let fireStore = firebase.firestore();
    await fireStore.collection("Devices").doc(params[1]).update({
        IssueFromSupervisor: IssueText.value
    }).then(() => {
        alert('NCR Generated Successfully!');
        location.reload();
    })
    .catch((error) => {
        // The document probably doesn't exist.
        alert("Error Generating NCR\n" + error);
    });
}

(function () {
    // Get the modal
    var modal = document.getElementById("addDeviceModal");

    // Get the button that opens the modal
    var btn = document.getElementById("addDeviceBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementById("addDeviceModalClose");

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        GenerateNCR()
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}());