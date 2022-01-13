const linkDevice = id => e => {
    e.preventDefault();
    e.stopPropagation();

    var linkmodal = document.getElementById("linkDevicesModal");
    linkmodal.style.display = "block";

    // Get the <span> element that closes the modal
    var span = document.getElementById("linkDeviceModalClose");
    var DeviceIdDiv = document.getElementById("DeviceID");
    var DeviceDisplayName = document.getElementById("inputDeviceName");
    var DeviceTaluqa = document.getElementById("inputTaluqa");
    var DeviceLocation = document.getElementById("inputLocation");
    var inputCapacity = document.getElementById("inputCapacity");
    var inputNetAvailable = document.getElementById("inputNetAvailable");
    var inputNetDeviceNo = document.getElementById("inputNetDeviceNo");
    var inputOperatorName = document.getElementById("inputOperatorName");
    var inputOperatorCellNo = document.getElementById("inputOperatorCellNo");
    var LinkBtn = document.getElementById("LinkBtn");
    DeviceIdDiv.innerText = id;
    var displayName = id.split("_");
    var fullDisplayName;
    if(displayName[1].length === 1){
        fullDisplayName = 'DTS-100' + displayName[1];
    }
    else if(displayName[1].length === 2){
        fullDisplayName = 'DTS-10' + displayName[1];
    }
    else if(displayName[1].length === 3){
        fullDisplayName = 'DTS-1' + displayName[1];
    }
    DeviceDisplayName.value = fullDisplayName;

    // When Link Button is Clicked!
    LinkBtn.onclick = function () {
        let fireStore = firebase.firestore();
        if (DeviceTaluqa.value && DeviceLocation.value !== null || '') {
            fireStore.collection("Devices").doc(id).set({
                DeviceID: id,
                DeviceName: fullDisplayName,
                Location: DeviceLocation.value,
                Taluqa: DeviceTaluqa.value,
                Capacity: inputCapacity.value, 
                NatAvailable: inputNetAvailable.value,
                NetDeviceNo: inputNetDeviceNo.value,
                OperatorName: inputOperatorName.value,
                OperatorCellNo: inputOperatorCellNo.value
            }).then(() => {
                alert(id + ' Linked Successfully!');
                location.reload();
            });
        }
        else {
            alert('Please Provide Proper Details!')
        }
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        linkmodal.style.display = "none";
    }


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == linkmodal) {
            linkmodal.style.display = "none";
        }
    }
}