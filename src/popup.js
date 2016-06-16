import ML from './MessageListener';

import React from 'react';
import ReactDOM from 'react-dom';

import Extension from './react/Extension';

const ml = new ML();

chrome.runtime.sendMessage({ type: "request" });

ml.add("popup-data", (msg) => {
    console.log('msg received', msg);
    ReactDOM.render(
        <Extension fep={msg.data.FEP} analytics={msg.data.analytics} hawk={msg.data.HAWK} />,
        document.getElementById('data-container')
    );
});