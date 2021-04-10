import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { urls } from '../../lib/urls';


class TabLiveOrder extends Component {

    render() {

        let tabLinksActivity = ['', '', '']
        if (urls.LIVE_ORDER_VIEW == this.props.match.url) {
            tabLinksActivity[0] = 'active'
            tabLinksActivity[1] = ''
            tabLinksActivity[2] = ''
        } else if (urls.OFFICE_MENU_VIEW == this.props.match.url) {
            tabLinksActivity[0] = ''
            tabLinksActivity[1] = 'active'
            tabLinksActivity[2] = ''
        } else if (`${urls.OFFICE_MENU_VIEW_OUT_OF_STOCK}` == this.props.match.url) {
            tabLinksActivity[0] = ''
            tabLinksActivity[1] = 'active'
            tabLinksActivity[2] = ''
        } else if (`${urls.OFFICE_MENU_VIEW_ON_STOCK}` == this.props.match.url) {
            tabLinksActivity[0] = ''
            tabLinksActivity[1] = 'active'
            tabLinksActivity[2] = ''
        } else if (`${urls.OFFICE_ANALYSE_VIEW}` == this.props.match.url) {
            tabLinksActivity[0] = ''
            tabLinksActivity[1] = ''
            tabLinksActivity[2] = 'active'
        } else {
            tabLinksActivity[0] = 'active'
            tabLinksActivity[1] = ''
            tabLinksActivity[2] = ''
        }

        return (
            <ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified no-print">
                <li class="nav-item"><Link class={`nav-link ${tabLinksActivity[0]}`} to={urls.LIVE_ORDER_VIEW} data-toggle="tab">Canlı Sipariş</Link></li>
                <li class="nav-item"><Link class={`nav-link ${tabLinksActivity[1]}`} to={urls.OFFICE_MENU_VIEW} data-toggle="tab">Stok Durumu</Link></li>
                <li class="nav-item"><Link class={`nav-link ${tabLinksActivity[2]}`} to={urls.OFFICE_ANALYSE_VIEW} data-toggle="tab">Şube Analizleri</Link></li>
                {/* <li class="nav-item"><Link class={`nav-link ${tabLinksActivity[1]}`} to={urls.CHAT_LIST_VIEW} data-toggle="tab">Mesajlaşma</Link></li> */}
            </ul>

        )
    }
}

export default TabLiveOrder