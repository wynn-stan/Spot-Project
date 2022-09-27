import React from "react";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import DesktopSideNav from "./SideNav";

class UserSettings extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userDetails: JSON.parse(sessionStorage.getItem("userDetails"))
        }
    }

    makeInfoEditable = () => {

        document.querySelector(".saveDetails").disabled = false;

        document.querySelectorAll(".profile-body-container input").forEach(
            (element) => {
                element.disabled = false;
            }
        )
    }

    makeInfoUneditable =() => {

        document.querySelector(".saveDetails").disabled = true;

        document.querySelectorAll(".profile-body-container input").forEach(
            (element) => {
                element.disabled = true;
            }
        )
    }

    saveInfoToDB = async () => {

        //let user know has been saved, depending on res
        let newDetails = {
            fullname: document.querySelector("input[name='fullname']").value,
            username: document.querySelector("input[name='username']").value,
            email: document.querySelector("input[name='email']").value,
            password: document.querySelector("input[name='password']").value
        }

        await fetch("/updateUserProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                updatedProfile: newDetails
            })
        }).then(
            async (res) => {
                if(res.status == 200) {
                    alert("Settings Updated");
                    let data = await res.json();
                                                    
                    this.setState({
                        userDetails: data
                    });

                    this.makeInfoUneditable();

                }else if(res.status == 403) {
                    alert("Username/Email Already Exists");
                }else {
                    alert("Failed To Update Settings. Please Retry Again")
                }

            }
        );


    }

    renderUserSettings = () => {

        let userSettings = this.state.userDetails;

        return (
            <div>
                 <label htmlFor="fullname">Fullname: </label>
                 <input type="text" defaultValue={userSettings.fullname} name="fullname" disabled={true} />

                 <label htmlFor="username">Username: </label>
                 <input type="text" defaultValue={userSettings.username} name="username" disabled={true} />

                 <label htmlFor="email">Email: </label>
                 <input type="email" defaultValue={userSettings.email} name="email" disabled={true} />

                 <label htmlFor="password">Password: </label>
                 <input type="password" defaultValue={userSettings.password} name="password" disabled={true} />
            </div>
        )
    }

    render(){

        return (
            <>
                <HeaderNav desktopView={this.props.desktopView}/>
    
                 <div className='main-section'>
    
                    <DesktopSideNav desktopView={this.props.desktopView} />
    
                    <div className="profile-container content-container">

                        <div className="settings-header-container">

                            <img src={this.state.userDetails.avatar_url} alt="" className="project-icon" />

                            <div className="user-name">
                                User Name
                            </div>

                            <button className="editDetails" onClick={this.makeInfoEditable}>Edit Info</button>

                            <button className="saveDetails" onClick={this.saveInfoToDB}>Save</button>


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

    componentDidMount(){
        window.scrollTo(0,0);
        document.querySelector(".saveDetails").disabled = true;
    }
}
export default UserSettings;