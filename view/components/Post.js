import React from 'react';
import { Link } from 'react-router-dom';

class Post extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            post: props.postDetails
        };
    }

    render(){
        
        let Post = (
                <div className="post">
                    <img src={this.state.post.project_avatar_url} className="project-icon" />
                    <Link to={`/project-profile:${this.state.post.project_name}`} className='post-for'>{this.state.post.project_name}</Link> 
                   <div className="post-by-container">
                        <p className='post-by'>{this.state.post.username}</p>
                        <p className='post-time'>{this.state.post.post_time}</p>
                   </div>
                    <img src="/public/svgs/DotsThreeVertical.svg" className='options-icon' />
                    <p className='post-heading'>{this.state.post.post_heading}</p>
                    <p className='post-description'>{this.state.post.post_description}</p>
                    {
                        this.state.post.post_img_url
                        &&
                        <img className="post-img" src={this.state.post.post_img_url} />
                    }
                </div>
        )

        return Post;
    }

}

export default Post;
