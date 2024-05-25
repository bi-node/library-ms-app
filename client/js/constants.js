var apiUrl="http://localhost:3000";
var clientUrlAdditive="/client";
// var serverResourceUrl=serverUrl+"/resources/music/";

function reloadLogin() {
    console.log('Redirecting to login page...');
    window.location.replace(clientUrlAdditive + '/login.html');
}
