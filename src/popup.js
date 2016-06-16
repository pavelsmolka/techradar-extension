import ML from './MessageListener';

import React from 'react';
import ReactDOM from 'react-dom';

import Extension from './react/Extension';

const ml = new ML();

chrome.runtime.sendMessage({ type: "request" });

ml.add("popup-data", (msg) => {
    ReactDOM.render(<Extension fep={msg.data.FEP} />, document.getElementById('data-container'));
});