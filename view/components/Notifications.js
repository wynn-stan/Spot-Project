import HeaderNav from "./HeaderNav";
import FooterNav from "./FooterNav";
import React from "react";
import DesktopSideNav from "./DesktopSideNav";


class Notifications extends React.Component{

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
    
                    <div className="notifications-contiainer content-container">
                        <h1 className="header">No New Notifications</h1>
                    </div>
    
                    </div>
    
                <FooterNav desktopView={this.props.desktopView} />
            </>
        )

    }

}

export default Notifications;