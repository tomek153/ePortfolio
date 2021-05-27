import React, {Component} from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Button, Col, Container, FormControl, FormLabel, Image, ListGroup, Row} from "react-bootstrap";
import FooterAuth from "../Other/footer-auth";
import LoadingElement from "../Other/loading-element";
import {Redirect} from "react-router-dom";

class Chat extends Component {
    _isMounted = true;

    constructor() {
        super();
        this.state = {
            userInfo: null,
            userChats: [],
            messages: [],
            activeUser: null,

            messageToSend: "",
            status_messageToSend: false,

            _dataLoaded: false,
            _messagesLoad: false
        }
    }

    async componentDidMount() {
        this._isMounted = true;

        if (this._isMounted && Object.entries(this.props.userInfoContent).length !== 0) {
            this.state.userInfo = this.props.userInfoContent.userInfoContent;
            this.state.userChats = await this.getChats();

            if (this.props.location.newChat) {
                var chat_exists = false
                for (const chat of this.state.userChats) {
                    if (chat.member_id === this.props.location.newChat.id) {
                        chat_exists = true;
                        break;
                    }
                }

                if (!chat_exists) {
                    await this.createChat(this.props.userInfoContent.userInfoContent.id, this.props.location.newChat.id);
                }
            }

            this.setState({_dataLoaded: true});
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    async openMessages(user) {
        this.setState({_messagesLoad: false});
        this.state.activeUser = user;
        this.setState({activeUser: user});

        const messages = await this.getMessages(user.id);
        this.state.messages = messages;
        this.setState({messages: messages});

        var chats_list = document.querySelectorAll("div.chat-users-list-single");
        chats_list.forEach(single => {
            single.classList.remove("active");
        });
        document.querySelector("div.chat-users-list-single[data-key='"+user.id+"']").classList.add("active");

        this.state.messageToSend = "";
        document.getElementById("chat-messeges-input").value = "";
        this.setState({status_messageToSend: false});
        this.setState({_messagesLoad: true});
    }

    async getChats() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json; charset=utf-8');

        const request = new Request(
            'http://localhost:8080/chat/getChatsById/'+this.state.userInfo.id,
            {
                method: 'GET',
                headers: myHeaders
            }
        );

        const response = await fetch(request);
        if (response.status === 200) {
            const json = await response.json();

            return json;
        } else {
            localStorage.removeItem("token");
            window.location.href = '/logowanie';
        }
    }
    async getMessages(user_id) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json; charset=utf-8');

        const request = new Request(
            'http://localhost:8080/chat/get',
            {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({ id: user_id, name: "" })
            }
        );

        const response = await fetch(request);
        if (response.status === 200) {
            const json = await response.json();

            return json;
        } else {
            localStorage.removeItem("token");
            window.location.href = '/logowanie';
        }
    }
    async sendMessageRequest(message) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json; charset=utf-8');

        const request = new Request(
            'http://localhost:8080/chat/send',
            {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(message)
            }
        );

        const response = await fetch(request);
        if (response.status === 200) {
            var newMessages = this.state.messages;
            newMessages.push(message);

            this.setState({messages: newMessages});
            this.state.messageToSend = "";
            document.getElementById("chat-messeges-input").value = "";
        } else {
            localStorage.removeItem("token");
            window.location.href = '/logowanie';
        }
    }
    async createChat(my_id, user_id) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json; charset=utf-8');

        const request = new Request(
            'http://localhost:8080/chat/create',
            {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify([{
                        id: "",
                        chatId: "",
                        memberId: my_id
                    }, {

                        id: "",
                        chatId: "",
                        memberId: user_id
                    }])
            }
        );

        const response = await fetch(request);
        if (response.status === 200) {
            window.location.reload();
        } else {
            localStorage.removeItem("token");
            window.location.href = '/logowanie';
        }
    }
    async removeChat(id) {
        document.querySelector("div.chat-users-list-single[data-key='"+id+"'] > i").style.disabled = true;

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json; charset=utf-8');

        const request = new Request(
            'http://localhost:8080/chat/delete/'+id,
            {
                method: 'DELETE',
                headers: myHeaders
            }
        );

        const response = await fetch(request);
        if (response.status === 200) {
            document.location.reload();
        } else {
            localStorage.removeItem("token");
            window.location.href = '/logowanie';
        }
    }

    displayDate(date_message) {
        var date = new Date(date_message.send_date);
        var date_string = "";

        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var minute = date.getMinutes();
        if (day < 10)
            day = "0" + day;
        if (month < 10)
            month = "0" + month;
        if (year < 10)
            year = "0"+year;
        if (hour < 10)
            hour = "0"+hour;
        if (minute < 10)
            minute = "0"+minute;

        date_string = day+"-"+month+"-"+year+", "+hour+":"+minute;

        return <> {date_string} </>
    }
    async sendMessage() {
        this.setState({status_messageToSend: false});

        var newMessage = {
            id: this.state.messages.length+1,
            chatId: this.state.activeUser.id,
            senderId: this.state.userInfo.id,
            message: this.state.messageToSend,
            send_date: new Date()
        }

        await this.sendMessageRequest(newMessage);
    }
    messageControll(event) {
        var value = event.target.value;
        this.state.messageToSend = value;

        if (value.length > 0 && this.state.activeUser !== null) {
            this.setState({status_messageToSend: true});
        } else {
            this.setState({status_messageToSend: false});
        }
    }

    render() {
        return(
            <>
                <Breadcrumb className="breadcrumb-all">
                    <Breadcrumb.Item href="#">Start</Breadcrumb.Item>
                    <Breadcrumb.Item active>Wiadomości</Breadcrumb.Item>
                </Breadcrumb>
                <Container>
                    <Row className="chat-contianer">
                        {!this.state._dataLoaded
                            ? <LoadingElement/>
                            : <>
                                <Col xs={4} className="chat-users-list-container">
                                    <Row className="chat-users-list-title">
                                        <Image src={this.state.userInfo.image} className="chat-my-avatar" roundedCircle/>&nbsp;&nbsp;
                                        <span>Rozpoczęte rozmowy</span>
                                    </Row>
                                    <ListGroup className="chat-users-list-group-container">
                                        {this.state.userChats.map((user, i) =>
                                            <ListGroup.Item onClick={() => this.openMessages(user)} className="chat-users-list-single" key={i} data-key={user.id}>
                                                <Image src={user.image} className="chat-users-avatars" roundedCircle/>&nbsp;&nbsp;
                                                {user.first_name} {user.last_name}
                                                <i className="fas fa-trash chat-users-remove-chat-icon" onClick={() => this.removeChat(user.id)}/>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                    <Row style={{height: "68px"}}/>
                                </Col>
                                <Col className="chat-messeges-container">
                                    <Row className="chat-messeges-title">
                                        {!this.state._messagesLoad
                                            ? <FormLabel style={{height: "37px"}}/>
                                            : <FormLabel>
                                                <Image src={this.state.activeUser.image} className="chat-my-avatar" roundedCircle/>&nbsp;&nbsp;
                                                {this.state.activeUser.first_name} {this.state.activeUser.last_name}
                                            </FormLabel>
                                        }
                                    </Row>
                                    <Row className="chat-messeges-message-area">
                                        <Col style={{padding: "10px 15px"}}>
                                            {!this.state._messagesLoad
                                                ? <>
                                                    {this.state.activeUser === null
                                                        ? null
                                                        : <LoadingElement/>
                                                    }
                                                </>
                                                : <>
                                                    {this.state.messages.length === 0
                                                        ? <div style={{textAlign: "center", paddingTop: "10px"}}>Rozpocznij rozmowę.</div>
                                                        : <>
                                                            {this.state.messages.map((message, i) =>
                                                                <>{message.senderId === this.state.userInfo.id
                                                                    ? <>
                                                                        <div style={{display: "flex"}} key={i}>
                                                                            <Row className="chat-single-message-row send">
                                                                                <span className="chat-single-message-text send">
                                                                                    {message.message}
                                                                                </span>
                                                                            </Row>
                                                                            <Image src={this.state.userInfo.image} style={{width: "30px", height: "30px", marginTop: "7px", marginLeft: "10px"}} roundedCircle/>
                                                                        </div>
                                                                        <span className="single-message-date">{this.displayDate(message)}</span>
                                                                    </>
                                                                    : <>
                                                                        <div style={{display: "flex"}} key={i}>
                                                                            <Image src={this.state.activeUser.image} style={{width: "30px", height: "30px", marginTop: "7px", marginRight: "10px"}} roundedCircle/>
                                                                            <Row className="chat-single-message-row incoming">
                                                                                <span className="chat-single-message-text incoming">
                                                                                    {message.message}
                                                                                </span>
                                                                            </Row>
                                                                        </div>
                                                                        <span className="single-message-date incoming">{this.displayDate(message)}</span>
                                                                    </>
                                                                }</>
                                                            )}
                                                        </>
                                                    }
                                                </>
                                            }
                                        </Col>
                                    </Row>
                                    <Row className="chat-messeges-input-container">
                                        <Col>
                                            <FormControl as="input" id="chat-messeges-input" placeholder="Aa" onChange={this.messageControll.bind(this)}/>
                                        </Col>
                                        <Col xs={1} style={{paddingLeft: "0px"}}>
                                            <Button disabled={!this.state.status_messageToSend} id="chat-messages-send-button" variant="link" onClick={this.sendMessage.bind(this)}><i className="fas fa-chevron-circle-right"/></Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </>
                        }
                    </Row>
                </Container>
                <FooterAuth/>
            </>
        )
    }
}

export default Chat;