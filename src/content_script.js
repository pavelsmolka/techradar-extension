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

ml.add("anchor", (msg) => {
    console.log(msg);
    location.hash = "#" + msg.anchor;
});

let old_parsed = [];

// needs a better one than 5 seconds
const refresh = setInterval(() => {

    function widget_mapper(widget, index) {

        var anchor = document.createElement('a');
        anchor.name = 'widget-anchor-' + index;
        widget.parentNode.insertBefore(anchor, widget);

        return {
            anchor : anchor.name,
            parsed : !!~widget.className.indexOf("parsed"),
            empty : widget.children.length === 0,
            name : widget.dataset.name,
            product : widget.dataset.trdProductId,
            widgetType : widget.dataset.widgetType
        };
    }

    const hawks = Array.prototype.slice.call(document.querySelectorAll(".hawk-widget-insert"));

    all_data.HAWK = {
        widgets: hawks.map(widget_mapper),
    };

    let parsed = all_data.HAWK.widgets.filter(w => w.parsed);

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
      all_data.FEP = event.data.data.fep;
  }

    if (event.data.type && (event.data.type == "DFP")) {
        all_data.dfp = event.data.data.dfp;
    }

    all_data.location = document.location;
    chrome.runtime.sendMessage({type: "data", data: all_data, initiator: "FEP"});
}, false);

injectScript(chrome.extension.getURL('/injected.js'), 'body');