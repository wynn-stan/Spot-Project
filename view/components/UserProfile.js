import React from "react";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import DesktopSideNav from "./SideNav";
import Post from "./Post";

class UserProfile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userDetails: JSON.parse(sessionStorage.getItem("userDetails")),
            userPosts: []
        }
    }

    fetchUserPosts = async () => {

        try {

            let userPosts = await fetch("/getUserPosts", {
                method: "POST"
            }).then(
               async (res) => {
                    return await res.json();
                }
            );

            return userPosts;

        }catch(err){
            console.log(err);
        }

    }

    async componentDidMount(){
        window.scrollTo(0,0);
        let userPosts = await this.fetchUserPosts();
        this.setState({
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

                        <div className="profile-header-container">

                            <img src={this.state.userDetails.avatar_url} alt="" className="project-icon" />

                            <div className="user-name">{this.state.userDetails.username}</div>
                            <div className="fullname">{this.state.userDetails.fullname}</div>


                        </div>

                        <div className="profile-body-container">

                        <div className="profile-body-container">

                            <div className="post-section content-container">
                                <div className="post-container">
                                    {
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