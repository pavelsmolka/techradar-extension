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
    chrome.runtime.sendMessage({ type: "data", data: all_data, initiator: "request"});
});

let old_parsed = [];

// needs a better one than 5 seconds
const refresh = setInterval(() => {
    const hawks = Array.prototype.slice.call(document.querySelectorAll(".hawk-widget-insert"));
    const parsed = hawks.filter((el) => { return ~el.className.indexOf("parsed"); });
    const empty = parsed.filter((el) => { return el.children.length === 0; });

    const anchors = [];

    hawks.forEach((widget) => {
      var anchor = document.createElement('a');
      anchor.name = 'widget-anchor-' + (Math.random() * 10000).toFixed(0);
      widget.parentNode.insertBefore(anchor, widget);
      anchors.push(anchor.name);
    });

    all_data.HAWK = {
        widgets: hawks,
        parsed: parsed,
        empty: empty,
        anchors: anchors
    };

    if (hawks.length === parsed.length) {
        clearInterval(refresh);
    }

    if (old_parsed.length !== parsed.length) {
        console.log(all_data);
        chrome.runtime.sendMessage({ type: "data", data: all_data, initiator: "HAWK"});
    }
}, 5000);


window.addEventListener("message", (event) => {
  if (event.source != window) {
    return;
  }

  if (event.data.type && (event.data.type == "FEP")) {
    console.log("Content script received: ", event.data.data);
    all_data.FEP = event.data.data.fep;
    all_data.dfp = event.data.data.dfp;
    all_data.url = document.location.pathname;
    chrome.runtime.sendMessage({type: "data", data: all_data, initiator: "FEP"});
  }
}, false);

injectScript(chrome.extension.getURL('/injected.js'), 'body');