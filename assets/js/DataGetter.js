var RealTimeData = {};
var database = [];
const DataGetter = async () => {
    var config1 = {
        apiKey: "AIzaSyCaNA5SLdRQHM-KnBKTtHf8km6go9VvlcY",
        authDomain: "firsthundreddevices.firebaseapp.com",
        databaseURL: "https://firsthundreddevices-default-rtdb.firebaseio.com",
        storageBucket: "firsthundreddevices.appspot.com",
        projectId: "firsthundreddevices",
    };
    var config2 = {
        apiKey: "AIzaSyDGoYGEh850nMK9onabVIJ6K0Q7u33HocM",
        authDomain: "secondhundreddevices.firebaseapp.com",
        databaseURL: "https://secondhundreddevices-default-rtdb.firebaseio.com",
        storageBucket: "secondhundreddevices.appspot.com",
        projectId: "secondhundreddevices",
    };
    var config = [config1, config2]
    var name = ['default', 'App1']
    for (var i=0; i<2; i++) {
        database[i] = firebase.initializeApp(config[i], 'others' + i);
        var dbRefObject = firebase.database(database[i]).ref();
        await dbRefObject.once('value', snap => {
            var data = snap.val();
            var length = Object.keys(data).length;
            for (let i = 0; i < length; i++) {
                deviceNamee = Object.keys(data)[i];
                RealTimeData[deviceNamee] = data[deviceNamee];
            }
        });
    }

    // if ()
    return RealTimeData;
}