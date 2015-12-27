// We inject another script (Injected) right into the DOM of the page, so we can access its `window` object
function injectScript(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('src', file);
  th.appendChild(s);
}
injectScript(chrome.extension.getURL('/injected.js'), 'body');


// We expect the Injected script to send us a message with some data from the DOM/window
window.addEventListener("message", function (event) {

  // We only accept messages from ourselves
  if (event.source != window) {
    return;
  }

  // Is this the message we are expecting? We speciried the same `type` in injected.js
  if (event.data.type && (event.data.type == "FEP")) {
    
    console.log("Content script received: " + event.data.text);

    // Propagate the message further - into Background
    chrome.runtime.sendMessage(event.data.text);
  }
}, false);