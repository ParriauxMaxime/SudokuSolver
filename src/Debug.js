import React, { Component } from 'react'
import { connect } from 'react-redux';

export class Debug extends Component {
    render() {
        const { status } = this.props
        return (
            <div>
                Status : {status ? 'running' : 'idle'}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    status: state.system.status
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Debug)
