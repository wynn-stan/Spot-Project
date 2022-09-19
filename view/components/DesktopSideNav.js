import React from "react";
import {Link} from "react-router-dom";
import setSessionItem from "../utils/setSessionItem";

class DesktopSideNav extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            userDetails: JSON.parse(sessionStorage.userDetails),
            followedProjects: [],
            managedProjects: []
        }

    }

    render(){

        return (
            <div className='side-nav-container'>
    
                <div className='user-menu-nav'>
                    <img src={this.state.userDetails.avatar_url} className='profile-icon' />
                    <a href="#" className='username'>u/{this.state.userDetails.username}</a>
                    <Link to="/user-profile" className='my-profile-option'>My Profile</Link>
                    <Link to="/create-project" className='create-option'>Create A Project</Link>
                    <Link to="/user-settings" className='Settings'>Settings</Link>
                    <a href="/signout" className='signout'>Sign Out</a>

                </div>
    
                <div className='explore-nav-container'>
                    <div className='followed-projects'>
                        <p className='header'>Followed Projects</p>
                        {
                            this.state.followedProjects
                            &&
                            this.state.followedProjects.map(
                                (project) => {
                                    return (<Link to={`/project-profile:${project.name}`} className='option'>
                                        <img src={project.avatar_url} className="avatar-icon" />
                                        <p className='project-name'>{project.name}</p>
                                    </Link>)
                                }
                            )
                        }
                    </div>
    
                    <div className='your-projects'>

                            <p className='header'>Managed Projects</p>
    
                            <div className='create-a-project'>
                                <img src="/public/svgs/Plus.svg" />
                                <Link to="/create-project" className='create-a-project'>Create A Project</Link>
                            </div>
    
                            <div className='options'>
                                {
                                    this.state.managedProjects
                                    &&
                                    this.state.managedProjects.map(
                                        (project) => {
                                            return (<Link to="/project-profile"  onClick={() => {setSessionItem("selected_project", project.name)}} className='option'>
                                                <img src={project.avatar_url} className="avatar-icon" />
                                                <p className='project-name'>{project.name}</p>
                                            </Link>)
                                        }
                                    )
                                }
                            </div>
    
                    </div>
                </div>
    
        </div>
        )

    }

    fetchUserManagedProjects = async () => {

       let managedProjects = await fetch('/getUserManagedProjects', {
        method: "POST"
       })
        .then(
            async (res) => {
                return await res.json();
            }
        );

        return managedProjects;

    }

    fetchUserFollowedProjects = async () => {

        let followedProjects = await fetch('/getUserFollowedProjects', {
            method: "POST"
        })
        .then(
            async (res) => {
                return await res.json();
            }
        );

        return followedProjects;

    }

    async componentDidMount(){
        //fetch user created projects
        const managedProjects = await this.fetchUserManagedProjects();

        //fetch user followed projects
        const followedProjects = await this.fetchUserFollowedProjects();

        this.setState({
            managedProjects: managedProjects,
            followedProjects: followedProjects
        });
        
    }

}

export default DesktopSideNav;