import ML from './MessageListener';

class BG {

    constructor() {
        this.ml = new ML();
        this.ml.add("data", (msg) => {
            console.log("data from frontend", msg);
            this.data = msg.data;
            chrome.runtime.sendMessage({ type: "popup-data", data: this.data});
        });
        this.ml.add("request", (msg) => {
            console.log("request", msg);
            chrome.runtime.sendMessage({ type: "popup-data", data: this.data});
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