import React from 'react';

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
                    <img src={this.state.post.project_image_url || "/public/svgs/avatar3.svg"} className="project-icon" />
                    <p className='post-for'>{this.state.post.project_name}</p> 
                   <div className="post-by-container">
                        <p className='post-by'>{this.state.post.post_by}</p>
                        <p className='post-time'>{this.state.post.post_time}</p>
                   </div>
                    <img src="/public/svgs/DotsThreeVertical.svg" className='options-icon' />
                    <p className='post-heading'>{this.state.post.heading}</p>
                    <p className='post-description'>{this.state.post.description}</p>
                    {
                        this.state.post.post_image
                        &&
                        <img className="post-img" src={this.state.post.post_image} />
                    }
                </div>
        )

        return Post;
    }

}

export default Post;
