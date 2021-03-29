import React, { Component } from 'react'



class ChatMessage extends Component {
    render() {

        const user = JSON.parse(localStorage.getItem('user'))
        // render message
        let messageClass = 'sent'
        console.log(this.props);
        // if (this.props.message.message_sender._id != user._id) {
        //     messageClass = 'received'
        // }

        return (
            <li class={`media ${messageClass}`}>
                <div className="media-body">
                    <div className="msg-box">
                        <div>
                            <p>{this.props.message.message}</p>
                            <ul className="chat-msg-info">
                                <li>
                                    <div className="chat-time">
                                        <span>{this.props.message.message_date}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default ChatMessage