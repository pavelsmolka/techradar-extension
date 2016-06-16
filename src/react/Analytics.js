import React from 'react';

class Analytics extends React.Component {

    render () {

        var trafficHeader = (
            <tr>
                <th>Country</th>
                <th>Page Views</th>
                <th>Sessions</th>
            </tr>
        );
        var traffic = this.props.pageviews.map((pageview) => {
            return <tr key={pageview.country}>
                <td>{pageview.country}</td>
                <td>{pageview.pageviews}</td>
                <td>{pageview.sessions}</td>
            </tr>
        });

        return <table>
                <thead>{trafficHeader}</thead>
                <tbody>{traffic}</tbody>
        </table>;
    }
}

export default Analytics;