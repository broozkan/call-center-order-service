import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { urls } from '../../lib/urls'


class ChatContact extends Component {


    render() {

        // render user name
        const user = JSON.parse(localStorage.getItem('user'))
        let userName = ''
        if (user.user_type == "call_center_user") {
            userName = this.props.chat.chat_client_user.user_name
        } else if (user.user_type == "super_user") {
            userName = this.props.chat.chat_client_user.user_name
        } else {
            userName = this.props.chat.chat_host_user.user_name
        }

        return (
            <Link to={`${urls.CHAT_VIEW}/detay/${this.props.chat._id}`} class="media">
                <div class="media-img-wrap">
                    <div class="avatar avatar-away">
                        <img src="/assets/img/profiles/avatar-03.jpg" alt="User Image" class="avatar-img rounded-circle" />
                    </div>
                </div>
                <div class="media-body">
                    <div>
                        <div class="user-name">{userName}</div>
                        <div class="user-last-chat">#53253 sipariş durumu nedir?</div>
                    </div>
                    <div>
                        <div class="last-chat-time block">10:35</div>
                        <div class="badge badge-success badge-pill">15</div>
                    </div>
                </div>
            </Link>

        )
    }
}

export default ChatContact