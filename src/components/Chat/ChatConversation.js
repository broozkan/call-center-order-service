import React, { Component } from 'react'
import Swal from 'sweetalert2';
import { getMessages, getChats } from '../../controllers/MainController'
import api from '../../services/api';
import ChatMessage from '../Chat/ChatMessage'


class ChatConversation extends Component {

    constructor() {
        super()
        this.state = {
            messages: [],
            chat: {},
            receiver_user: {},
            is_messages_loaded: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)

    }

    componentDidMount() {
        console.log(this.props);

        if (this.props.match.params.chatId) {
            this.loadChatContent(this.props.match.params.chatId)
        }
    }

    async loadChatContent(chatId) {
        await getChats(1, { '_id': chatId }, async (chatResult) => {

            const user = JSON.parse(localStorage.getItem('user'))
            await getMessages(1, { 'message_chat._id': chatId }, (messageResults) => {

                let receiverUser = chatResult.data.docs[0].chat_host_user
                if (chatResult.data.docs[0].chat_host_user._id == user._id) {
                    receiverUser = chatResult.data.docs[0].chat_client_user
                }

                this.setState({
                    messages: messageResults.data.docs,
                    chat: chatResult.data.docs[0],
                    receiver_user: receiverUser,
                    is_messages_loaded: true
                })
            })
        })
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async handleOnSubmit(e) {
        e.preventDefault()

        const user = JSON.parse(localStorage.getItem('user'))


        const messageData = {
            message: this.state.message,
            message_sender: user,
            message_receiver: this.state.receiver_user,
            message_chat: this.state.chat
        }


        const submitResponse = await api.post(`/messages`, messageData)
        if (submitResponse.data.status != 400) {
            this.setState({
                message: ''
            })
            this.loadChatContent(this.props.match.params.chatId)
        } else {
            Swal.fire({
                title: "Bir sorun oluştu",
                text: "Çözmeye çalışıyoruz...",
                icon: "error"
            })
        }

    }

    render() {

        // render receiver user name
        let receiverUserName = ''
        if (this.state.is_messages_loaded) {
            receiverUserName = this.state.receiver_user.user_name
        }

        // render messages
        let messagesJsx = ''
        if (this.state.is_messages_loaded) {
            messagesJsx = this.state.messages.map((messageItem) => {
                return (
                    <ChatMessage message={messageItem} />
                )
            })
        } else {
            messagesJsx = (
                <h4 className="text-center my-5">Bir sohbet başlatın</h4>
            )
        }

        return (
            <div class="chat-cont-right">
                <div class="chat-header">
                    <div class="media">
                        <div class="media-img-wrap">
                            <div class="avatar avatar-online">
                                <img src="/assets/img/profiles/avatar-02.jpg" alt="User Image" class="avatar-img rounded-circle" />
                            </div>
                        </div>
                        <div class="media-body">
                            <div class="user-name">{receiverUserName}</div>
                            <div class="user-status">çevrimiçi</div>
                        </div>
                    </div>
                </div>
                <div class="chat-body">
                    <div class="chat-scroll">
                        <ul class="list-unstyled">
                            {messagesJsx}
                        </ul>
                    </div>
                </div>
                <div class="chat-footer">
                    <form onSubmit={this.handleOnSubmit}>
                        <div class="input-group">
                            <input type="text" name="message" onChange={this.handleOnChange} value={this.state.message} class="input-msg-send form-control" placeholder="Mesaj yazın" />
                            <div class="input-group-append">
                                <button type="button" class="btn msg-send-btn"><i class="fas fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

        )
    }
}

export default ChatConversation