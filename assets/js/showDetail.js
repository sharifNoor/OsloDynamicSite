function showDetail() {
  var ddlDeviceName = document.getElementById('ddlDeviceName');
  var CurrentFlowRate = document.getElementById('TotalCurrentFlowRate');
  var TotalFlow = document.getElementById('TotalFlow');
  var DeviceMonitoringDiv = document.getElementById('DeviceMonitoringDiv');
  var DeviceInactive = document.getElementById('DeviceInactive');
  var DeviceID = ddlDeviceName.value;
  var singleDeviceLastUpdate;

  if (DeviceID !== 'Select Device') {
    setTimeout(function(){
      singleDeviceLastUpdate = dataReal[DeviceID].LastUpdate;
      var currentDateTime = new Date();
      var currentDateTimeInSec = currentDateTime.setSeconds(currentDateTime.getSeconds() - 3);
      var singleDeviceLastUpdateInSec = Date.parse(singleDeviceLastUpdate) - 18000000; // Converting UTC GMT time to PST local time by Subtracting 18,000,000 as PST = GMT +5
      if (singleDeviceLastUpdateInSec > currentDateTimeInSec - 90000) {
        CurrentFlowRate.innerText = dataReal[DeviceID].FlowRateFromFloatSwitch;
        TotalFlow.innerText = dataReal[DeviceID].TotalLitresFromFloatSwitch;
        DeviceMonitoringDiv.style.display = 'flex';
        DeviceInactive.style.display = 'none';
      }
      else {
        CurrentFlowRate.innerText = 0;
        TotalFlow.innerText = dataReal[DeviceID].TotalLitresFromFloatSwitch;
        DeviceMonitoringDiv.style.display = 'flex';
        DeviceInactive.style.display = 'block';
      }
    });
  }
  else {
    alert('Please Select device to monitor!');
    DeviceMonitoringDiv.style.display = 'none';
  }
}