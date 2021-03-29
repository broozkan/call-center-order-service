import React, { Component } from 'react'
import { getChats } from '../../controllers/MainController'
import LoaderSpin from '../Loader/LoaderSpin'
import ChatItem from './ChatItem'


class ChatList extends Component {

    constructor() {
        super()
        this.state = {
            chats: [],
            is_chats_loaded: false
        }
    }

    componentDidMount() {
        getChats(1, {}, (results) => {
            this.setState({
                chats: results.data.docs,
                is_chats_loaded: true
            })
        })
    }

    render() {

        // render chats
        let chatsJsx = <LoaderSpin />
        if (this.state.is_chats_loaded) {
            chatsJsx = this.state.chats.map((chat) => {
                return (
                    <ChatItem chat={chat} />
                )
            })
        }


        return (
            <div class="chat-cont-left">

                <div class="chat-header">
                    <span>Sohbetler</span>
                </div>
                <div class="chat-users-list">
                    <div class="chat-scroll">
                        {chatsJsx}
                    </div>
                </div>
            </div>

        )
    }
}

export default ChatList