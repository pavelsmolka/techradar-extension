import React from 'react';

class HAWK extends React.Component {

    targetAnchor(anc, ev) {
        ev.preventDefault();
        console.log(anc);

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {type: "anchor", anchor: anc});
        });
    }

    render() {

        console.log(this.props.hawk);

        const lines =this.props.hawk.widgets.map( (widget) => <tr key={widget.anchor}>
                        <td>{widget.name}</td>
            <td>{widget.product}</td>
            <td>{widget.widgetType}</td>
            <td>{widget.parsed ? "Y" : "N"}</td>
            <td>{widget.empty ? "Y" : "N"}</td>
            <td><a href="#" onClick={this.targetAnchor.bind(this, widget.anchor)}>=&gt;</a></td>
        </tr> );

        return <table style={ {textAlign: "center" }}>
            <thead>
                <tr><td>Name</td><td>Product</td><td>Type</td><td>Parsed</td><td>Empty</td><td>Link</td></tr>
            </thead>
                <tbody>
                {lines}
                </tbody>
            </table>;
    }
}

export default HAWK;