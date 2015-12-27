var fep = null;

// Receive data from the page (content script)
chrome.runtime.onMessage.addListener(function (data) {
    //console.log('Received data from the page (content script)');
    fep = data;
});

chrome.extension.onConnect.addListener(function(port) {

  console.log("Connected .....");
  port.onMessage.addListener(function(msg) {
        //console.log("Message received " + msg);
        port.postMessage({data: fep});
  });

});