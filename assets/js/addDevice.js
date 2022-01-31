(function () {
    // Get the modal
    var modal = document.getElementById("addDeviceModal");

    // Get the button that opens the modal
    var btn = document.getElementById("addDeviceBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementById("addDeviceModalClose");
	var CloseBtn1 = document.getElementById("CloseBtn1");

    var inputBox = document.getElementById("deviceList");

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
	 CloseBtn1.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            inputBox.value = '';
            modal.style.display = "none";
        }
    }
}());