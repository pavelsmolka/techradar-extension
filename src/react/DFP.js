import React from 'react';

class DFP extends React.Component {

    render() {

        console.log('dfp ads', this.props.ads);

        var header = (
            <tr>
                <th>ID</th>
                <th>Empty</th>
                <th>Line Item ID</th>
                <th>Size</th>
            </tr>
        );
        var ads = this.props.ads.map((ad) => {
            return <tr key={ad.creativeId}>
                <td>{ad.creativeId}</td>
                <td>{ad.isEmpty ? 'yes' : 'no'}</td>
                <td>{ad.lineItemId}</td>
                <td>{ad.size ? (ad.size[0] + 'x' + ad.size[1]) : 'N/A'}</td>
            </tr>
        });

        return <table>
            <thead>{header}</thead>
            <tbody>{ads}</tbody>
        </table>;

    }
}

export default DFP;