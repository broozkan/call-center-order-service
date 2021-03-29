import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { urls } from '../../lib/urls'
import api from '../../services/api'


class ChatUserItem extends Component {


    constructor() {
        super()

        this.handleOnClick = this.handleOnClick.bind(this)
    }


    async handleOnClick() {

        const user = JSON.parse(localStorage.getItem('user'))



        const chatData = {
            chat_host_user: user,
            chat_client_user: this.props.user
        }
        const submitResponse = await api.post('/chats', chatData)
    }

    render() {
        return (
            <Link class="media">
                <div class="media-img-wrap">
                    <div class="avatar avatar-away">
                        <img src="/assets/img/profiles/avatar-03.jpg" alt="User Image" class="avatar-img rounded-circle" />
                    </div>
                </div>
                <div class="media-body">
                    <div>
                        <div class="user-name">{this.props.user.user_name}</div>
                    </div>
                    <div>
                        <button onClick={this.handleOnClick} className="btn btn-outline-primary btn-sm">Sohbet başlat</button>
                    </div>
                </div>
            </Link>

        )
    }
}

export default ChatUserItem