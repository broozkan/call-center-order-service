import React, { Component } from 'react'


class Breadcrumb extends Component {

    render() {

        const url = this.props.routeMatch.match.url.split("/")

        let breadcrumbString = []
        let pageHeaderString = url[url.length - 1]
        for (let index = 0; index < url.length; index++) {
            if (url[index] == "")
                continue
            if (isFinite(url[index][0])) {

                pageHeaderString = url[url.length - 2]
                continue

            }



            breadcrumbString.push(
                <li className="breadcrumb-item"><a href="#">{url[index]}</a></li>
            )
        }

        return (
            <div className="col-lg-12">
                <div className="page-header">
                    <div className="row">
                        <div className="col">
                            <h3 className="page-title">{pageHeaderString}</h3>
                            <ul className="breadcrumb">
                                {breadcrumbString}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Breadcrumb