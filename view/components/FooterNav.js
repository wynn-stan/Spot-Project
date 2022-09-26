import {Link} from "react-router-dom";
import React from 'react';

class FooterNav extends React.Component{

    constructor(props){

        super(props);

    }

    render(){
     

        return (
                <>
                    {
                        this.props.desktopView == false
                        && 
                        <div className="footer-nav">
                           
                            <Link to="/" className='home-button'>
                                <img src="/public/svgs/House.svg"/>
                            </Link>
        
                            <Link to="/explore" className='explore-button'>
                                <img src="/public/svgs/MagnifyingGlass.svg" />
                            </Link>
        
                            <Link to="/create-post" className='create-post-button'>
                                <img src="/public/svgs/Plus.svg" />
                            </Link>
        
                            <Link to="/notifications" className='messages-button' >
                                <img src="/public/svgs/BellRinging.svg" />
                            </Link>
            
                        </div>
                    }
                </>    
            )

    }

}

export default FooterNav;