import React from "react";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import DesktopSideNav from "./SideNav";
import Post from "./Post";
import { Link } from "react-router-dom";

class UserProfile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userDetails: {},
            userPosts: []
        }
    }

    fetchUserPosts = async (username) => {

        try {

            let userPosts = await fetch("/getUserPosts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username
                })
            }).then(
                async (res) => {
                    return await res.json();
                }
            )

            return userPosts;

        }catch(err){
            console.log(err);
        }

    }

    fetchUserDetails = async (username) => {

        let userDetails = await fetch("/getUserDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username
            })
        }).then(
            async (res) => {
                return await res.json();
            }
        )

        return userDetails;
    }

    async componentDidMount(){
        window.scrollTo(0,0);

        let username = (this.props.match.params.username.split(":")).pop();

        let userDetails = await this.fetchUserDetails(username);

        let userPosts = await this.fetchUserPosts(username);

        this.setState({
            userDetails: userDetails,
            userPosts: userPosts
        });
    }

    render(){

        return (
            <>
                <HeaderNav desktopView={this.props.desktopView}/>
    
                 <div className='main-section'>

                    <DesktopSideNav desktopView={this.props.desktopView} />
    
                    <div className="profile-container content-container">

                        <header className="header">{this.state.userDetails.username} Profile</header>

                        <div className="profile-header-container settings">

                            <img src={this.state.userDetails.avatar_url} alt="" className="profile-icon" />

                            <div className="user-name">{this.state.userDetails.username}</div>
                            <div className="fullname">{this.state.userDetails.fullname}</div>

                            {
                                JSON.parse(sessionStorage.getItem("userDetails")).id !== this.state.userDetails.id
                                &&
                                <button className="message">
                                    <Link to={`/user-chat:${this.state.userDetails.username}-next-${encodeURIComponent(this.state.userDetails.avatar_url)}`}>Message</Link>
                                </button>
                            }


                        </div>

                        <div className="profile-body-container">

                        <div className="profile-body-container">

                            <div className="post-section content-container">
                                <h3 className="header">User Posts</h3>
                                <div className="post-container">
                                    {
                                        this.state.userPosts
                                        &&
                                        this.state.userPosts.map(
                                            (postDetails) => {
                                                return <Post key={postDetails.post_id} postDetails={postDetails} />
                                            }
                                        )
                                    }

                                    <div className="loading-container">

                                        <div ref={this.loadingRef}>No New Posts</div>

                                    </div>
                                </div>
                            </div>

                            </div>

                        </div>
                                        
                    </div>
    
                </div>
    
                <FooterNav desktopView={this.props.desktopView} />
            </>
        )

    }
}
export default UserProfile;