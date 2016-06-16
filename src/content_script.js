let all_data = {};

function injectScript(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('src', file);
  th.appendChild(s);
}


window.addEventListener("message", (event) => {
  if (event.source != window) { return; }

  if (event.data.type && (event.data.type == "FEP")) {
    console.log("Content script received: ", event.data.data);
    all_data.FEP = event.data.data;
    chrome.runtime.sendMessage({ type: "data", data: all_data});
  }
}, false);

injectScript(chrome.extension.getURL('/injected.js'), 'body');