import HeaderNav from "./HeaderNav";
import FooterNav from "./FooterNav";
import React from "react";
import DesktopSideNav from "./SideNav";


class Notifications extends React.Component{

    componentDidMount(){
        window.scrollTo(0,0);
    }

    render(){

        return (
            <>
                <HeaderNav desktopView={this.props.desktopView}/>
    
                 <div className='main-section'>
    
                    <DesktopSideNav desktopView={this.props.desktopView} />
    
                    <div className="notifications-container content-container">
                        <h1 className="header">No New Notifications</h1>
                    </div>
    
                    </div>
    
                <FooterNav desktopView={this.props.desktopView} />
            </>
        )

    }

}

export default Notifications;