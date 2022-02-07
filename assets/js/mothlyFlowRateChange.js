const MonthlyFlowRateChange = async (deviceName, lastMonthTotalFlow) => {
    // console.log('yahan p Total Flow Zero "0" karana hai');
    var deviceName1 = deviceName.split("_");
    let fireStore = firebase.firestore();

    if (deviceName1[1] > 0 && deviceName1[1] < 101){
        var dbRefObject = firebase.database(database[0]).ref(deviceName);
        fireStore.collection("Devices").doc(deviceName).update({
            LastMonthTotalFlow: lastMonthTotalFlow
        });
        dbRefObject.update({
            TotalLitresFromFloatSwitch: 0
        }, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }
    else if (deviceName1[1] > 100 && deviceName1[1] < 201){
        var dbRefObject = firebase.database(database[1]).ref(deviceName);
        fireStore.collection("Devices").doc(deviceName).update({
            LastMonthTotalFlow: lastMonthTotalFlow
        });
        dbRefObject.update({
            TotalLitresFromFloatSwitch: 0
        }, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }
    
}