import React from 'react';
import Home from './Home';
import {BrowserRouter, Routes, Route, Link, useParams} from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../public/style.css";
import "../public/bootstrap.min.css";
import PostCreator from './PostCreator';
import Explore from './Explore';
import Notifications from './Notifications';
import ProjectCreator from './ProjectCreator';
import "./client-socket";
import ProjectProfile from './ProjectProfile';
import UserProfile from './UserProfile';
import UserSettings from './UserSettings';
import UserChat from './UserChat';



class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        const ProjectProfileWrapper = (props) => {
            const params = useParams();
            return <ProjectProfile desktopView={this.state.desktopView} {...{...props, match: {params}}}/>
        }

        const UserProfileWrapper = (props) => {
            const params = useParams();
            return <UserProfile desktopView={this.state.desktopView} {...{...props, match: {params}}}/>
        }

        const UserChatWrapper = (props) => {
            let params = useParams();
            return <UserChat desktopView={this.state.desktopView} {...{...props, match: {params}}}/>
        }

        return (
            <BrowserRouter>
                <Routes>

                    <Route path='/' element={<Home desktopView={this.state.desktopView}/>} />
                    <Route path="/create-post" element={<PostCreator desktopView={this.state.desktopView}/>} />
                    <Route path="/notifications" element={<Notifications desktopView={this.state.desktopView}/>} />
                    <Route path="/explore" element={<Explore desktopView={this.state.desktopView}/>} />
                    <Route path="/create-project" element={<ProjectCreator desktopView={this.state.desktopView}/>} />
                    <Route path="/project-profile:projectRef" element={<ProjectProfileWrapper />} />
                    <Route path="/user-profile:username" element={<UserProfileWrapper />} />
                    <Route path='/user-settings' element={<UserSettings desktopView={this.state.desktopView}/>} />
                    <Route path='/user-chat:params' element={<UserChatWrapper />} />

                </Routes>
            </BrowserRouter>
        )
    }

    componentDidMount = () => {
        this.checkCurrentView();

        //set sessionStorage global stuff
        sessionStorage.setItem("followedProject", {})
    }

    checkCurrentView = () => {

       let mediaQuery = window.matchMedia("(min-width: 720px)");

       mediaQuery.addEventListener("change", this.checkCurrentView);

       let desktopView = mediaQuery.matches;

       if(desktopView){

            this.setState({
                desktopView: true
            });
       }else{
            this.setState({
                desktopView: false
            })
       }

    }

    componentDidUpdate(){
        window.scrollTo(0,0);
    }


}

export default App;