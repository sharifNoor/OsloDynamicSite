const del = id => e => {
    e.preventDefault();
    e.stopPropagation();
    firebase.database().ref(id).update({
        UnderMintanance: false
    }, (error) => {
        if(error){
            console.log(error);
        }
        else {
            location.reload();
        }
    });
}