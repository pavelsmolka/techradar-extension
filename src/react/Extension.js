import React from 'react';

import Analytics from './Analytics';
import Events from './Events';

import FEP from './FEP'
import HAWK from './HAWK'
import DFP from './DFP'

class Extension extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fep: false,
            hawk: false,
            pageviews: false,
            affiliates: false,
            dfp: false
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
                <h1 onClick={this.toggle.bind(this, 'hawk')}>Hawk Widgets</h1>
                { this.state.hawk ? <HAWK hawk={this.props.hawk} /> : null }
            </div>;
        }

        let pageviews = null;
        if (this.props.analytics && this.props.analytics.pageviews) {
            pageviews = <div>
                <h1 onClick={this.toggle.bind(this, 'pageviews')}>Page Views</h1>
                {this.state.pageviews ?
                    <div>
                        <Analytics pageviews={this.props.analytics.pageviews} />
                    </div>
                : null}
            </div>;
        }

        let affiliates = null;
        if (this.props.analytics && this.props.analytics.events) {
            affiliates = <div>
                <h1 onClick={this.toggle.bind(this, 'affiliates')}>Affiliates (last 3 days)</h1>
                {this.state.affiliates ?
                    <div>
                        <Events events={this.props.analytics.events} />
                    </div>
                    : null}
            </div>;
        }

        let dfp = null;
        if (this.props.dfp) {
            dfp = <div>
                <h1 onClick={this.toggle.bind(this, 'dfp')}>Adverts</h1>
                {this.state.dfp ?
                    <div>
                        <DFP ads={this.props.dfp} />
                    </div>
                    : null}
            </div>;
        }

        return (
			<div>
                <section>{fep}</section>
                <section>{hawk}</section>
                <section>{pageviews}</section>
                <section>{affiliates}</section>
                <section>{dfp}</section>
            </div>
		);
    }
}

export default Extension;