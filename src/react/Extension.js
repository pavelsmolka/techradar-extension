import React from 'react';

import FEP from './FEP'
import HAWK from './HAWK'

class Extension extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fep: false,
            hawk: false,
            analytics: false
        };
    }

    toggle(prop) {
        let st = this.state;
        st[prop] = !st[prop];
        this.setState(st);
    }

    render () {

        let fep = null;
        console.log(this.props.fep);

        if (this.props.fep) {

            fep = <div>
                <h1 onClick={this.toggle.bind(this, 'fep')}>FEP</h1>
                { this.state.fep ? <FEP fep={this.props.fep} /> : null }
            </div>;
        }

        let hawk = null;
        if (this.props.hawk) {
            hawk = <div>
                <h1 onClick={this.toggle.bind(this, 'hawk')}>HAWK</h1>
                { this.state.hawk ? <HAWK hawk={this.props.hawk} /> : null }
            </div>;
        }

        let analytics = null;
        if (this.props.analytics) {
            analytics = <div>
                <h1 onClick={this.toggle.bind(this, 'analytics')}>Analytics</h1>
                { this.state.analytics
                    ? <div>{JSON.stringify(this.props.analytics)}</div>
                    : null
                }
            </div>;
        }

        return (
			<div>
                <section>{fep}</section>
                <section>{hawk}</section>
                <section>{analytics}</section>
            </div>
		);
    }
}

export default Extension;