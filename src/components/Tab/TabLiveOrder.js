import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { urls } from '../../lib/urls';


class TabLiveOrder extends Component {

    render() {

        let tabLinksActivity = ['', '']
        if (urls.LIVE_ORDER_VIEW == this.props.match.url) {
            tabLinksActivity[0] = 'active'
            tabLinksActivity[1] = ''
        } else if (urls.CHAT_VIEW == this.props.match.url) {
            tabLinksActivity[0] = ''
            tabLinksActivity[1] = 'active'
        } else {
            tabLinksActivity[0] = 'active'
            tabLinksActivity[1] = ''
        }

        return (
            <ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                <li class="nav-item"><Link class={`nav-link ${tabLinksActivity[0]}`} to={urls.LIVE_ORDER_VIEW} data-toggle="tab">Canlı Sipariş</Link></li>
                <li class="nav-item"><Link class={`nav-link ${tabLinksActivity[1]}`} to={urls.CHAT_LIST_VIEW} data-toggle="tab">Mesajlaşma</Link></li>
            </ul>

        )
    }
}

export default TabLiveOrder