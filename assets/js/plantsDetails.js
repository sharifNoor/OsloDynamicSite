const PlantsDetails = Firestoredata => e => {
    e.preventDefault();
    e.stopPropagation();
    window.location = 'plantsDetails.html?id=' + Firestoredata;
}