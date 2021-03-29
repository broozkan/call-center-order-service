import React, { Component } from 'react'
import { getChats, getUsers } from '../../controllers/MainController'
import LoaderSpin from '../Loader/LoaderSpin'
import ChatUserItem from './ChatUserItem'


class ChatUsersList extends Component {

    constructor() {
        super()
        this.state = {
            users: [],
            is_users_loaded: false
        }
    }

    componentDidMount() {
        getUsers(1, { 'user_type': 'call_center_user' }, (results) => {
            this.setState({
                users: results.data.docs,
                is_users_loaded: true
            })
        })
    }

    render() {

        // render users
        let usersJsx = <LoaderSpin />
        if (this.state.is_users_loaded) {
            usersJsx = this.state.users.map((user) => {
                return (
                    <ChatUserItem user={user} />
                )
            })
        }


        return (
            <div class="chat-cont-left">

                <div class="chat-header">
                    <span>Kişiler</span>
                </div>
                <div class="chat-users-list">
                    <div class="chat-scroll">
                        {usersJsx}
                    </div>
                </div>
            </div>

        )
    }
}

export default ChatUsersList