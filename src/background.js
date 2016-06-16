import ML from './MessageListener';

class BG {

    constructor() {
        this.ml = new ML();
        this.ml.add("data", (msg) => {
            console.log("data from frontend", msg);
            chrome.runtime.sendMessage({ type: "popup-data", data: msg.data});
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