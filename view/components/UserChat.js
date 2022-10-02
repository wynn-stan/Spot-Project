import React from "react";
import HeaderNav from "./HeaderNav";
import FooterNav from "./FooterNav";
import DesktopSideNav from "./SideNav";
import { io } from "socket.io-client";

const socket = io("http://localhost:3003");

class UserChat extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            reciepientDetails: {},
            senderDetails: JSON.parse(sessionStorage.getItem("userDetails")),
            messages: []
        }
    }

    sendMessage = () => {
       let messageText = document.querySelector(".user-chat-container .footer input").value;
       let senderId = this.state.senderDetails.username;
       let recieverId = this.state.reciepientDetails.username;


       if(messageText.trim() == ""){
            return ;
       }

       socket.emit("send-room-message", messageText, senderId, recieverId);

    }

    setupMessaging = (reciepientDetails) => {
        let recieverId = reciepientDetails.username;
        let senderId = this.state.senderDetails.username;

        socket.emit("join-room", senderId, recieverId);

        socket.on("recieving-message", (data) => {

            let newMessage = {
                text: data.text
            }

            if(data.socketId == socket.id){
                newMessage.status = "sending";
            }else {
                newMessage.status = "recieving";
            }

            this.setState({
                messages: [newMessage, ...this.state.messages]
            })
        })
    }

    async componentDidMount(){
        window.scrollTo(0,0);

        let params = this.props.match.params.params;
        params = params.slice(1, params.length);

        params = (params).split("-next-");
    
        console.log(params);

        let reciepientDetails = {
            username: params[0],
            avatar_url: params[1]
        }

        this.setState({
            reciepientDetails: reciepientDetails
        });

        this.setupMessaging(reciepientDetails);
    }

    render(){

        return (
            <>
                <HeaderNav desktopView={this.props.desktopView}/>
    
                 <div className='main-section'>
    
                    <DesktopSideNav desktopView={this.props.desktopView} />
    
                    <div className="user-chat-container content-container">
                        <header className="header">
                            Direct Messaging
                        </header>

                        <main className="messages-container">

                            <div className="header">
                                <img className="profile-icon" src={this.state.reciepientDetails.avatar_url} />
                                <p>{this.state.reciepientDetails.username}</p>
                            </div>

                            <div className="body">
                                {
                                    this.state.messages.length == 0
                                    &&
                                    <div className="msg no-messages">No New Messages</div>
                                }

                                {
                                    this.state.messages
                                    && 
                                    this.state.messages.map(
                                        (message) => {
                                            //message.identifier will be sent or recieved
                                            return (<div className={`msg ${message.status}`} >
                                                {message.text}
                                            </div>)
                                        }
                                    )
                                }
                            </div>

                            <div className="footer">
                                <input type="text" placeholder="Enter Message" />
                                <button onClick={this.sendMessage} className="send-btn">Send</button>
                            </div>

                        </main>

                    </div>
    
                    </div>
    
                <FooterNav desktopView={this.props.desktopView} />
            </>
        )

    }

}

export default UserChat;