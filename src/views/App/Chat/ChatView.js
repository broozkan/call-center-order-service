import React, { Component } from 'react'
import Swal from 'sweetalert2';
import ChatList from '../../../components/Chat/ChatList';
import TabLiveOrder from '../../../components/Tab/TabLiveOrder';
import {
    Link,
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { urls } from '../../../lib/urls';
import ChatUsersList from '../../../components/Chat/ChatUsersList';
import ChatConversation from '../../../components/Chat/ChatConversation';

class ChatView extends Component {

    constructor() {
        super()

        this.state = {
            users: [],
            is_users_loaded: false,
            chat: {},
            message: '',
            messages: [],
            is_messages_loaded: false
        }
    }








    render() {


        return (
            <div className="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <div className="row">
                                <div class="col">
                                    <h5 class="card-title">Kayseri Şube Sipariş Yönetim</h5>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <TabLiveOrder match={this.props.match} />

                            <div class="chat-window mt-5">
                                <Router>
                                    <div className="row">
                                        <div className="col-lg-6 offset-lg-3 col-md-12 col-12">
                                            <ul class="nav nav-tabs nav-tabs-bottom nav-justified">
                                                <li class="nav-item"><Link class="nav-link active" to={`${urls.CHAT_LIST_VIEW}`}>Sohbetler</Link></li>
                                                <li class="nav-item"><Link class="nav-link" to={`${urls.NEW_CHAT_VIEW}`}>Kişiler</Link></li>
                                            </ul>
                                            <Switch>
                                                <Route path={`${urls.CHAT_LIST_VIEW}`} exact component={ChatList}></Route>
                                                <Route path={`${urls.NEW_CHAT_VIEW}`} exact component={ChatUsersList}></Route>
                                                <Route path={`${urls.CHAT_DETAIL_VIEW}/:chatId`} exact component={ChatConversation}></Route>
                                            </Switch>
                                        </div>
                                    </div>

                                </Router>


                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default ChatView