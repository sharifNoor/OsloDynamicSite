const PlantsDetails = Firestoredata => e => {
    e.preventDefault();
    e.stopPropagation();
        // console.log('Firestoredata' +JSON.stringify(Firestoredata));
    
    window.location = 'plantsDetails.html';
    var outer = document.getElementById('outer');
    var p = document.createElement('p');
    p.innerText = Firestoredata.DeviceID;
    outer.appendChild(p);
        // console.log(Firestoredata.DeviceID);

}