import React from "react";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import DesktopSideNav from "./SideNav";

class UserProfile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userDetails: JSON.parse(sessionStorage.getItem("userDetails"))
        }
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

                            <div className="user-bio">{}</div>

                            <div className="project-following">
                                
                            </div>


                        </div>

                        <div className="profile-body-container">

                            <div className="user-posts"></div>

                        </div>
                                        
                    </div>
    
                </div>
    
                <FooterNav desktopView={this.props.desktopView} />
            </>
        )

    }

    componentDidMount(){
        window.scrollTo(0,0);
    }
}
export default UserProfile;