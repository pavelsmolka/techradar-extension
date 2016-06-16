import React from 'react';

class FEP extends React.Component {

    render() {

        const lines = Object.keys(this.props.fep).map((key) => {
            const v = this.props.fep[key];
            let value = null;

            if (Array.isArray(v)) {
                value = v.map((it) => {
                    return <div key={it}>{it}</div>
                })
            } else if (typeof v === "object") {
                value = <pre>{JSON.stringify(v, null, 2)}</pre>;
            } else {
                value = v.toString();
            }

            return <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
            </tr>;
        });

        return <table>
                <tbody>{lines}</tbody>
            </table>;
    }
}

export default FEP;