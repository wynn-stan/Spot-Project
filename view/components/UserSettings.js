import React from "react";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import DesktopSideNav from "./DesktopSideNav";

class UserSettings extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userDetails: JSON.parse(sessionStorage.getItem("userDetails"))
        }
    }

    renderUserSettings = () => {

        let userSettings = this.state.userDetails;

        return (
            <div>
                 <input type="text" value={userSettings.fullname} readOnly />

                 <input type="text" value={userSettings.username} readOnly />

                 <input type="email" value={userSettings.email} readOnly />

                 <input type="password" value={userSettings.password} readOnly />
            </div>
        )
    }

    render(){

        return (
            <>
                <HeaderNav desktopView={this.props.desktopView}/>
    
                 <div className='main-section'>
    
                    {
                        this.props.desktopView == true
                        &&
                        <DesktopSideNav />
                    }
    
                    <div className="profile-contiainer content-container">

                        <div className="settings-header-container">

                            <img src={this.state.userDetails.avatar_url} alt="" className="project-icon" />

                            <div className="user-name">
                                User Name
                            </div>

                            <button className="edit">Edit Info</button>
                                
                        </div>

                        <div className="profile-body-container">

                            {
                                this.renderUserSettings()
                            }

                        </div>
                                        
                    </div>
    
                </div>
    
                <FooterNav desktopView={this.props.desktopView} />

            </>
        )

    }
}
export default UserSettings;