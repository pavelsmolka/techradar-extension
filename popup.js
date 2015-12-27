var port = chrome.extension.connect({
    name: "Sample Communication"
});

// This message initializes the communication and requests the FEP data from Background
port.postMessage("Hi BackGround");

// The listener recieves the data from Background and renders it inside the Popup
port.onMessage.addListener(function(msg) {

    //console.log('Received data from Background.');
    //console.log(msg);

    var data_container = document.getElementById('data-container');
    data_container.innerHTML = JSON.stringify(msg, null, 2); // pretty print
});