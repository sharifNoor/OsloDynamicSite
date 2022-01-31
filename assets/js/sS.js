function getSSData(key){
	ssData = sessionStorage.getItem(key);
    return ssData;
}

function setSSData (key, SSData) {
    sessionStorage.setItem(key, SSData);
}

function clearSSdata () {
    sessionStorage.clear();
}