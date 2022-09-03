import React from 'react';
import SearchContainer from './SearchContainer';

export default function HeaderNav() {
  return (

    <div className='nav-section-container'>

        <img src="/public/svgs/logo.svg" className="brand-logo"/>

        <SearchContainer />

        <img src={"/public/svgs/avatar3.svg" || "https://avatars.dicebear.com/api/micah/randomseed.svg"} className="profileButton profile-icon" />

    </div>
    
    )
}
