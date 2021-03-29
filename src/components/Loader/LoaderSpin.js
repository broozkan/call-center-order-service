import React, { Component } from 'react'


class LoaderSpin extends Component {
    render() {

        let size = '3'
        if (this.props.size) {
            size = this.props.size
        }


        return (
            <div className="text-center my-3">
                <i className={`fas fa-spin fa-${size}x fa-spinner text-center`}></i>
            </div>
        )
    }
}

export default LoaderSpin