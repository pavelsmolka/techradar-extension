import ML from './MessageListener';
import Ajax from './Ajax';

class BG {

    constructor() {
        this.ml = new ML();
        this.ml.add("data", (msg) => {
            console.log("data from frontend", msg);
            if (msg.data.url) {
                var api = 'http://stage.search-api.fie.future.net.uk/gapi.php?site=TRD&days=1&url=' + msg.data.url;
                Ajax(api).then((data) => {
                    msg.data.analytics = JSON.parse(data);
                    console.log('sending analytics', msg.data);
                    chrome.runtime.sendMessage({ type: "popup-data", data: msg.data, initiator: "Analytics"});
                });
            }
            chrome.runtime.sendMessage({ type: "popup-data", data: msg.data, initiator: msg.initiator});
        });
        this.ml.add("request", (msg) => {
            console.log("request");
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {type: "fe-request"});
            });
        });
    }
}

new BG();


chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [ new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostContains: 'techradar.com' } }) ],
            actions: [ new chrome.declarativeContent.ShowPageAction() ]}
        ]);
    });
});