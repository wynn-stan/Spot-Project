import React from 'react';
import SearchContainer from './SearchContainer';
import { Link } from 'react-router-dom';

class HeaderNav extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      desktopView: false
    }

  }

  static getDerivedStateFromProps(props, state){

    return {
      desktopView: props.desktopView
    }

  }

  render(){

    const userDetails = JSON.parse(sessionStorage.userDetails)

    return (

      <div className='nav-section-container'>
  
          <img src="/public/svgs/logo.svg" className="brand-logo"/>
  
          <SearchContainer />

          {
              this.state.desktopView == true
              &&
              <div className="header-nav-links">
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

          {
            this.state.desktopView == false
            &&
            <img src={userDetails.avatar_url} className="profileButton profile-icon" />
          }
  
      </div>
      
      )    

  }
  
}

export default HeaderNav;
