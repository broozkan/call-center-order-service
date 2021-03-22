import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import TabLiveOrder from '../../../components/Tab/TabLiveOrder';
import TableLiveOrder from '../../../components/Table/Order/TableLiveOrder';
import TableOrder from '../../../components/Table/Order/TableOrder'
import { urls } from '../../../lib/urls'

class ChatView extends Component {
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
                            <div class="chat-window">
                                <div class="chat-cont-left">
                                    <div class="chat-header">
                                        <span>Chats</span>
                                        <a href="#" class="chat-compose">
                                            <i class="material-icons">control_point</i>
                                        </a>
                                    </div>
                                    <form class="chat-search">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <i class="fas fa-search"></i>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Search" />
                                        </div>
                                    </form>
                                    <div class="chat-users-list">
                                        <div class="chat-scroll">
                                            <a href="#;" class="media">
                                                <div class="media-img-wrap">
                                                    <div class="avatar avatar-away">
                                                        <img src="/assets/img/profiles/avatar-03.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <div>
                                                        <div class="user-name">Marie Canales</div>
                                                        <div class="user-last-chat">Hey, How are you?</div>
                                                    </div>
                                                    <div>
                                                        <div class="last-chat-time block">2 min</div>
                                                        <div class="badge badge-success badge-pill">15</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#;" class="media read-chat active">
                                                <div class="media-img-wrap">
                                                    <div class="avatar avatar-online">
                                                        <img src="/assets/img/profiles/avatar-04.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <div>
                                                        <div class="user-name">Barbara Moore</div>
                                                        <div class="user-last-chat">I'll call you later </div>
                                                    </div>
                                                    <div>
                                                        <div class="last-chat-time block">8:01 PM</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#;" class="media">
                                                <div class="media-img-wrap">
                                                    <div class="avatar avatar-away">
                                                        <img src="/assets/img/profiles/avatar-05.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <div>
                                                        <div class="user-name">Greg Lynch</div>
                                                        <div class="user-last-chat">Give me a full explanation about our project</div>
                                                    </div>
                                                    <div>
                                                        <div class="last-chat-time block">7:30 PM</div>
                                                        <div class="badge badge-success badge-pill">3</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#;" class="media read-chat">
                                                <div class="media-img-wrap">
                                                    <div class="avatar avatar-online">
                                                        <img src="/assets/img/profiles/avatar-06.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <div>
                                                        <div class="user-name">Karlene Chaidez</div>
                                                        <div class="user-last-chat">That's very good UI design</div>
                                                    </div>
                                                    <div>
                                                        <div class="last-chat-time block">6:59 PM</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#;" class="media read-chat">
                                                <div class="media-img-wrap">
                                                    <div class="avatar avatar-offline">
                                                        <img src="/assets/img/profiles/avatar-07.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <div>
                                                        <div class="user-name">John Blair</div>
                                                        <div class="user-last-chat">Yesterday i completed the task</div>
                                                    </div>
                                                    <div>
                                                        <div class="last-chat-time block">11:21 AM</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#;" class="media read-chat">
                                                <div class="media-img-wrap">
                                                    <div class="avatar avatar-online">
                                                        <img src="/assets/img/profiles/avatar-08.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <div>
                                                        <div class="user-name">Russell Copeland</div>
                                                        <div class="user-last-chat">What is the major functionality?</div>
                                                    </div>
                                                    <div>
                                                        <div class="last-chat-time block">10:05 AM</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#;" class="media read-chat">
                                                <div class="media-img-wrap">
                                                    <div class="avatar avatar-away">
                                                        <img src="/assets/img/profiles/avatar-09.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <div>
                                                        <div class="user-name">Leatha Bailey</div>
                                                        <div class="user-last-chat">This has allowed me to showcase not only my technical skills</div>
                                                    </div>
                                                    <div>
                                                        <div class="last-chat-time block">Yesterday</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#;" class="media read-chat">
                                                <div class="media-img-wrap">
                                                    <div class="avatar avatar-offline">
                                                        <img src="/assets/img/profiles/avatar-10.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <div>
                                                        <div class="user-name">Joseph Collins</div>
                                                        <div class="user-last-chat">Let's talk briefly in the evening. </div>
                                                    </div>
                                                    <div>
                                                        <div class="last-chat-time block">Sunday</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#;" class="media read-chat">
                                                <div class="media-img-wrap">
                                                    <div class="avatar avatar-online">
                                                        <img src="/assets/img/profiles/avatar-11.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <div>
                                                        <div class="user-name">Jennifer Floyd</div>
                                                        <div class="user-last-chat">Do you have any collections? If so, what of?</div>
                                                    </div>
                                                    <div>
                                                        <div class="last-chat-time block">Saturday</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#;" class="media read-chat">
                                                <div class="media-img-wrap">
                                                    <div class="avatar avatar-away">
                                                        <img src="/assets/img/profiles/avatar-12.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <div>
                                                        <div class="user-name">Alex Campbell</div>
                                                        <div class="user-last-chat">Connect the two modules with in 1 day.</div>
                                                    </div>
                                                    <div>
                                                        <div class="last-chat-time block">Friday</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="chat-cont-right">
                                    <div class="chat-header">
                                        <a id="back_user_list" href="#" class="back-user-list">
                                            <i class="material-icons">chevron_left</i>
                                        </a>
                                        <div class="media">
                                            <div class="media-img-wrap">
                                                <div class="avatar avatar-online">
                                                    <img src="/assets/img/profiles/avatar-02.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                </div>
                                            </div>
                                            <div class="media-body">
                                                <div class="user-name">Brian Johnson</div>
                                                <div class="user-status">online</div>
                                            </div>
                                        </div>
                                        <div class="chat-options">
                                            <a href="#">
                                                <i class="material-icons">local_phone</i>
                                            </a>
                                            <a href="#">
                                                <i class="material-icons">videocam</i>
                                            </a>
                                            <a href="#">
                                                <i class="material-icons">more_vert</i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="chat-body">
                                        <div class="chat-scroll">
                                            <ul class="list-unstyled">
                                                <li class="media sent">
                                                    <div class="media-body">
                                                        <div class="msg-box">
                                                            <div>
                                                                <p>Hello. What can I do for you?</p>
                                                                <ul class="chat-msg-info">
                                                                    <li>
                                                                        <div class="chat-time">
                                                                            <span>8:30 AM</span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="media received">
                                                    <div class="avatar">
                                                        <img src="/assets/img/profiles/avatar-02.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                    <div class="media-body">
                                                        <div class="msg-box">
                                                            <div>
                                                                <p>I'm just looking around.</p>
                                                                <p>Will you tell me something about yourself?</p>
                                                                <ul class="chat-msg-info">
                                                                    <li>
                                                                        <div class="chat-time">
                                                                            <span>8:35 AM</span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div class="msg-box">
                                                            <div>
                                                                <p>Are you there? That time!</p>
                                                                <ul class="chat-msg-info">
                                                                    <li>
                                                                        <div class="chat-time">
                                                                            <span>8:40 AM</span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div class="msg-box">
                                                            <div>
                                                                <div class="chat-msg-attachments">
                                                                    <div class="chat-attachment">
                                                                        <img src="/assets/img/img-01.jpg" alt="" />
                                                                        <div class="chat-attach-caption">placeholder.jpg</div>
                                                                        <a href="" class="chat-attach-download">
                                                                            <i class="fas fa-download"></i>
                                                                        </a>
                                                                    </div>
                                                                    <div class="chat-attachment">
                                                                        <img src="/assets/img/img-01.jpg" alt="" />
                                                                        <div class="chat-attach-caption">placeholder.jpg</div>
                                                                        <a href="" class="chat-attach-download">
                                                                            <i class="fas fa-download"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <ul class="chat-msg-info">
                                                                    <li>
                                                                        <div class="chat-time">
                                                                            <span>8:41 AM</span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="media sent">
                                                    <div class="media-body">
                                                        <div class="msg-box">
                                                            <div>
                                                                <p>Where?</p>
                                                                <ul class="chat-msg-info">
                                                                    <li>
                                                                        <div class="chat-time">
                                                                            <span>8:42 AM</span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div class="msg-box">
                                                            <div>
                                                                <p>OK, my name is Limingqiang. I like singing, playing basketballand so on.</p>
                                                                <ul class="chat-msg-info">
                                                                    <li>
                                                                        <div class="chat-time">
                                                                            <span>8:42 AM</span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div class="msg-box">
                                                            <div>
                                                                <div class="chat-msg-attachments">
                                                                    <div class="chat-attachment">
                                                                        <img src="/assets/img/img-01.jpg" alt="" />
                                                                        <div class="chat-attach-caption">placeholder.jpg</div>
                                                                        <a href="" class="chat-attach-download">
                                                                            <i class="fas fa-download"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <ul class="chat-msg-info">
                                                                    <li>
                                                                        <div class="chat-time">
                                                                            <span>8:50 AM</span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="media received">
                                                    <div class="avatar">
                                                        <img src="/assets/img/profiles/avatar-02.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                    <div class="media-body">
                                                        <div class="msg-box">
                                                            <div>
                                                                <p>You wait for notice.</p>
                                                                <p>Consectetuorem ipsum dolor sit?</p>
                                                                <p>Ok?</p>
                                                                <ul class="chat-msg-info">
                                                                    <li>
                                                                        <div class="chat-time">
                                                                            <span>8:55 PM</span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="chat-date">Today</li>
                                                <li class="media received">
                                                    <div class="avatar">
                                                        <img src="/assets/img/profiles/avatar-02.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                    <div class="media-body">
                                                        <div class="msg-box">
                                                            <div>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                                                                <ul class="chat-msg-info">
                                                                    <li>
                                                                        <div class="chat-time">
                                                                            <span>10:17 AM</span>
                                                                        </div>
                                                                    </li>
                                                                    <li><a href="#">Edit</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="media sent">
                                                    <div class="media-body">
                                                        <div class="msg-box">
                                                            <div>
                                                                <p>Lorem ipsum dollar sit</p>
                                                                <div class="chat-msg-actions dropdown">
                                                                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i class="fe fe-elipsis-v"></i>
                                                                    </a>
                                                                    <div class="dropdown-menu dropdown-menu-right">
                                                                        <a class="dropdown-item" href="#">Delete</a>
                                                                    </div>
                                                                </div>
                                                                <ul class="chat-msg-info">
                                                                    <li>
                                                                        <div class="chat-time">
                                                                            <span>10:19 AM</span>
                                                                        </div>
                                                                    </li>
                                                                    <li><a href="#">Edit</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="media received">
                                                    <div class="avatar">
                                                        <img src="/assets/img/profiles/avatar-02.jpg" alt="User Image" class="avatar-img rounded-circle" />
                                                    </div>
                                                    <div class="media-body">
                                                        <div class="msg-box">
                                                            <div>
                                                                <div class="msg-typing">
                                                                    <span></span>
                                                                    <span></span>
                                                                    <span></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chat-footer">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <div class="btn-file btn">
                                                    <i class="fas fa-paperclip"></i>
                                                    <input type="file" />
                                                </div>
                                            </div>
                                            <input type="text" class="input-msg-send form-control" placeholder="Type something" />
                                            <div class="input-group-append">
                                                <button type="button" class="btn msg-send-btn"><i class="fas fa-paper-plane"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default ChatView