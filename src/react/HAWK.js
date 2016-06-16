import React from 'react';

class HAWK extends React.Component {

    render() {

        console.log(this.props.hawk);

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