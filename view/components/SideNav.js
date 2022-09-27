import React from "react";
import {Link} from "react-router-dom";

class DesktopSideNav extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            userDetails: JSON.parse(sessionStorage.userDetails),
            followedProjects: [],
            managedProjects: []
        }

    }

    confirmSignout = (e) => {
        let confirmation = confirm("Confirm Sign out");
        if(confirmation) return;
        if(confirmation == false) e.preventDefault();
    }

    render(){

        return (
            <div className='side-nav-container'>
    
                <div className='user-menu-nav'>
                    <img src={this.state.userDetails.avatar_url} className='profile-icon' />
                    <a href="#" className='username'>u/{this.state.userDetails.username}</a>
                    <Link to="/user-profile" className='my-profile-option'>My Profile</Link>
                    <Link to="/create-project" className='create-option'>Create A Project</Link>
                    <Link to="/explore" className='create-option'>Explore Projects</Link>
                    <Link to="/create-post" className='create-option'>Create A Post</Link>
                    <Link to="/user-settings" className='Settings'>Settings</Link>
                    <a href="/signout" className='signout' onClick={this.confirmSignout}>Sign Out</a>

                </div>
    
                <div className='explore-nav-container'>
                    <div className='followed-projects'>
                        <p className='header'>Followed Projects</p>
                        <div className='options'>
                        {
                            this.state.followedProjects.length > 0
                            &&
                            this.state.followedProjects.map(
                                (project) => {
                                    return (<div className='option'>
                                        <img src={project.avatar_url} className="profile-icon" />
                                        <Link to={`/project-profile:${project.name}`} className='project-name'>{project.name}</Link>
                                    </div>)
                                }
                            )
                        }
                        {
                            this.state.followedProjects.length == 0
                            &&
                            <div>No projects currently being followed</div>
                        }
                        </div>
                    </div>
    
                    <div className='your-projects'>

                            <p className='header'>Managed Projects</p>
    
                            <div className='options'>
                                {
                                    this.state.managedProjects.length > 0
                                    &&
                                    this.state.managedProjects.map(
                                        (project) => {
                                            return (<div className='option'>
                                                <img src={project.avatar_url} className="profile-icon" />
                                                <Link to={`/project-profile:${project.name}`} className='project-name'>{project.name}</Link>
                                            </div>)
                                        }
                                    )
                                }
                                {
                                    this.state.managedProjects.length == 0
                                    &&
                                    <div>No projects currently being managed</div>
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