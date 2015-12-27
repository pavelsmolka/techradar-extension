var port = chrome.extension.connect({
    name: "Sample Communication"
});

// This message initializes the communication and requests the FEP data from Background
port.postMessage("Hi BackGround");

// The listener recieves the data from Background and renders it inside the Popup
port.onMessage.addListener(function(msg) {

    //console.log('Received data from Background.');
    //console.log(msg);

    if (!msg.data) {
        console.log('No data received.');
        return;
    }

    var data_container = document.getElementById('data-container');
    dataToHtml(msg.data, data_container);

});

function dataToHtml(data, data_container) {

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