import React from 'react';
import Home from './Home';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
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



class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        return (
            <BrowserRouter>
                <Routes>

                    <Route path='/' element={<Home desktopView={this.state.desktopView}/>} />
                    <Route path="/create-post" element={<PostCreator desktopView={this.state.desktopView}/>} />
                    <Route path="/notifications" element={<Notifications desktopView={this.state.desktopView}/>} />
                    <Route path="/explore" element={<Explore desktopView={this.state.desktopView}/>} />
                    <Route path="/create-project" element={<ProjectCreator desktopView={this.state.desktopView}/>} />
                    <Route path="/project-profile:projectRef" render={
                        (props) => { <ProjectProfile globalStore={globalStore} {...props} desktopView={this.state.desktopView}/>}
                    } />
                    <Route path="/user-profile" element={<UserProfile desktopView={this.state.desktopView}/>} />
                    <Route path='/user-settings' element={<UserSettings desktopView={this.state.desktopView}/>} />

                </Routes>
            </BrowserRouter>
        )
    }

    componentDidMount = () => {
        this.checkCurrentView();
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


}

export default App;