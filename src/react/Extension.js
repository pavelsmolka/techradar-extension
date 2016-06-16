import React from 'react';

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
            const lines = Object.keys(this.props.fep).map((key) => {
                const v = this.props.fep[key];
                let value = null;

                if (Array.isArray(v)) {
                    value = v.map((it) => {
                        return <div key={it}>{it}</div>
                    })
                } else if(typeof v === "object") {
                    value = <pre>{JSON.stringify(v, null, 2)}</pre>;
                } else {
                    value = v.toString();
                }

                return <tr key={key}><td>{key}</td><td>{value}</td></tr>;
            });

            fep = <div>
                <h1 onClick={this.toggle.bind(this, 'fep')}>FEP</h1>
                { this.state.fep ? <table><tbody>{lines}</tbody></table> : null }
            </div>;
        }

        let hawk = null;
        if (this.props.hawk) {
            hawk = <div>
                <h1 onClick={this.toggle.bind(this, 'fep')}>HAWK</h1>
                { this.state.hawk ? <table><tbody></tbody></table> : null }
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