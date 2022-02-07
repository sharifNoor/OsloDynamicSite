const del = (id, type) => e => {
    e.preventDefault();
    e.stopPropagation();
    alert('Do you want to Delete ' + id + ' issue??')
    var deviceName = id.split("_");
    if (deviceName[1] > 0 && deviceName[1] < 101){
        var dbRefObject = firebase.database(database[0]).ref(id);
        dbRefObject.update({
            UnderMintanance: false
        }, (error) => {
            if (error) {
                console.log(error);
            }
            else {
                let fireStore = firebase.firestore();
                const FieldValue = firebase.firestore.FieldValue;
                var docRef = fireStore.collection("Devices");
                if (type === 'Issue') {
                    docRef.doc(id).update({
                        Issue: FieldValue.delete()
                    }).then(() => {
                        location.reload();
                    }).catch((error) => {
                        alert("Error Occured:", error);
                    });
                }
                else if (type === 'Supervisor') {
                    docRef.doc(id).update({
                        IssueFromSupervisor: FieldValue.delete()
                    }).then(() => {
                        location.reload();
                    }).catch((error) => {
                        alert("Error Occured:", error);
                    });
                }
            }
        });
    }
    else if (deviceName[1] > 100 && deviceName[1] < 201){
        var dbRefObject = firebase.database(database[1]).ref(id);
        dbRefObject.update({
            UnderMintanance: false
        }, (error) => {
            if (error) {
                console.log(error);
            }
            else {
                let fireStore = firebase.firestore();
                const FieldValue = firebase.firestore.FieldValue;
                var docRef = fireStore.collection("Devices");
                if (type === 'Issue') {
                    docRef.doc(id).update({
                        Issue: FieldValue.delete()
                    }).then(() => {
                        location.reload();
                    }).catch((error) => {
                        alert("Error Occured:", error);
                    });
                }
                else if (type === 'Supervisor') {
                    docRef.doc(id).update({
                        IssueFromSupervisor: FieldValue.delete()
                    }).then(() => {
                        location.reload();
                    }).catch((error) => {
                        alert("Error Occured:", error);
                    });
                }
            }
        });
    }
}