// The content of this file is injected into the page DOM
//
// Therefore it has access to all global JS variables inside window
// object

//console.log("I am injected!");
//console.log(window.FEP);

// As soon as this script is injected, it reads 'window.FEP' of the page
// and sends it to the Content Script
window.postMessage({
    type: "FEP",
    text: window.FEP
}, "*");