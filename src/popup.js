import ML from './MessageListener';

import React from 'react';
import ReactDOM from 'react-dom';

import Extension from './react/Extension';

const ml = new ML();

chrome.runtime.sendMessage({ type: "request" });

ml.add("popup-data", (msg) => {
    console.log('msg received', msg);
    ReactDOM.render(
        <Extension fep={msg.data.FEP} analytics={msg.data.analytics} />, 
        document.getElementById('data-container')
    );
});

function dataToHtml(data, data_container) {
    console.log(data);

    for (var ii in data) {
        if (data.hasOwnProperty(ii)) {

            var dt = document.createElement('dt');
            var dd = document.createElement('dd');

            dt.innerHTML = ii;

            var value_input = data[ii];
            var value_node;

            if (value_input instanceof Array) {

                value_node = document.createElement('ul');
                // TODO use reduce?
                value_input.forEach(function(array_item) {
                    var li = document.createElement('li');
                    li.innerHTML = array_item;
                    value_node.insertBefore(li, null)
                });

            } else if (value_input instanceof Object) {

                value_node = document.createElement('div');
                var value_as_json = dataToHtml(data[ii], value_node);

            } else {

                value_node = document.createTextNode(value_input);

            }

            dd.insertBefore(value_node, null);

            data_container.insertBefore(dt, null);
            data_container.insertBefore(dd, null);
        }
    }
}