import React from 'react';

class HAWK extends React.Component {

    render() {

        console.log(this.props.hawk);

        // this.props.hawk.anchors.map((anchor) => {
        //     // return <a href="cosi">{anchor}</a>
        //     console.log(anchor);
        // });
        delete this.props.hawk.anchors;

        const lines = Object.keys(this.props.hawk).map( (key) => {
            const v = this.props.hawk[key];
            return <tr key={key}><td>{key}:</td><td>{v.length}</td></tr>
        });

        return <table>
                <tbody>{lines}</tbody>
            </table>;
    }
}

export default HAWK;