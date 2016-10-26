
import React from 'react';

import { connect } from 'react-redux';


class InitialContainer extends React.Component {

    render() {

        return (
            <div>
                <div className="content">
                    <h1 className="page-header">Dashboard <small>header small text goes here...</small></h1>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {

    return {
        main : state.main
    }
}

export default connect(mapStateToProps)(InitialContainer)
