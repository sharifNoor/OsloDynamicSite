const del = id => e => {
    e.preventDefault();
    e.stopPropagation();
    alert('Do you want to Delete ' + id + ' issue??')
    firebase.database().ref(id).update({
        UnderMintanance: false
    }, (error) => {
        if (error) {
            console.log(error);
        }
        else {
            let fireStore = firebase.firestore();
            const FieldValue = firebase.firestore.FieldValue;
            var docRef = fireStore.collection("Devices");
            docRef.doc(id).update({
                Issue: FieldValue.delete()
            }).then(() => {
                location.reload();
            }).catch((error) => {
                alert("Error Occured:", error);
            });
        }
    });
}