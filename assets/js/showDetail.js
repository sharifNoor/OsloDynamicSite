function showDetail () {
    // var ddlTaluqa = document.getElementById('ddlTaluqa');
    // var ddlArea = document.getElementById('ddlArea');
    var ddlDeviceName = document.getElementById('ddlDeviceName');
    var CurrentFlowRate = document.getElementById('TotalCurrentFlowRate');
    var TotalFlow = document.getElementById('TotalFlow');
    var DeviceMonitoringDiv = document.getElementById('DeviceMonitoringDiv');
    var DeviceID = ddlDeviceName.value;
    var data;

    if (DeviceID !== 'Select Device'){
        const dbRefObject = firebase.database().ref();
        dbRefObject.on('value', snap => {
          data = snap.val();
          CurrentFlowRate.innerText = data[DeviceID].FlowRateFromFloatSwitch;
          TotalFlow.innerText = data[DeviceID].TotalLitresFromFloatSwitch;
          DeviceMonitoringDiv.style.display = 'flex';
        });
        
    }
    else {
        alert('Please Select device to monitor!');
        DeviceMonitoringDiv.style.display = 'none';
    }
}