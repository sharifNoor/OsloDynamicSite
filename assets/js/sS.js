function getSSData(key) {
    let ssData = sessionStorage.getItem(key);
    return atob(ssData);
}

function setSSData (key, SSData) {
    sessionStorage.setItem(key, btoa(SSData));
}

function clearSSdata () {
    sessionStorage.clear();
}