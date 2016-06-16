import React from 'react';

class Events extends React.Component {

    render () {

        var revenueMap = {
            "click from editor price widget": 0.11,
            "click from hawklink": 0.07,
            "click from phone editor cc": 0.44,
            "click from top widget": 0.14,
            "click from editor review widget": 0.07,
            "click from bot widget": 0.17,
            "click from cc": 0.12,
            "click from in body widget": 0.12,
            "click from content widget": 0.08,
            "click from phone top widget": 0.25,
            "click from phone cc": 0.38,
            "click from best of widget": 0.10,
            "click from editor cc": 0.04,
            "click from phone editor review widget": 0.05,
            "click from phone bot widget": 0.32,
            "click from fep top widget": 0.14,
            "click from feature review widget": 0.05,
            "click from phone in body widget": 0.12,
            "click from fep bot widget": 0.04,
            "click from phone fep top widget": 0.90,
            "click from phone editor price widget": 0.34
        };

        var eventHeader = (
            <tr>
                <th>Event Type</th>
                <th>Count</th>
                <th>Revenue</th>
            </tr>
        );

        var events = Object.keys(this.props.events).map((eventType) => {

            var count = this.props.events[eventType];
            var revenue = revenueMap[eventType.toLowerCase()] ? '£' + (revenueMap[eventType.toLowerCase()] * count).toFixed(2) : 'N/A';

            return <tr key={eventType}>
                <td>{eventType}</td>
                <td>{count}</td>
                <td>{revenue}</td>
            </tr>
        });

        return <table>
            <thead>{eventHeader}</thead>
            <tbody>{events}</tbody>
        </table>;
    }
}

export default Events;