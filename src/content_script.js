import ML from './MessageListener';

const ml = new ML();

let all_data = {};

function injectScript(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('src', file);
  th.appendChild(s);
}

ml.add("fe-request", () => {
    console.log("request")
    chrome.runtime.sendMessage({ type: "data", data: all_data});
});

const refresh = setInterval(() => {
    const hawks = Array.prototype.slice.call(document.querySelectorAll(".hawk-widget-insert"));
    const parsed = hawks.filter((el) => {
        console.log(el);
        return el;
    });

    if (hawks.length === parsed.length) {
        clearInterval(refresh);
    }
    
    console.log(hawks.length, parsed.length);
}, 2000);

window.addEventListener("message", (event) => {
  if (event.source != window) { return; }

  if (event.data.type && (event.data.type == "FEP")) {
    console.log("Content script received: ", event.data.data);
    all_data.FEP = event.data.data;
    all_data.url = document.location.pathname;
    chrome.runtime.sendMessage({ type: "data", data: all_data});
  }
}, false);

injectScript(chrome.extension.getURL('/injected.js'), 'body');