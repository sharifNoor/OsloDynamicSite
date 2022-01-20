function logout() {
    setSSData('email', '');
    setSSData('password', '');
    setSSData('role', '');
    window.location = "./login.html";
}