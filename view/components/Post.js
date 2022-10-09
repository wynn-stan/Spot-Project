import React from 'react';
import { Link } from 'react-router-dom';

class Post extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            post: props.postDetails
        };
    }

    renderPostBlob = (post_img_blob) => {
        let img_arraybuffer = new Uint8Array(post_img_blob.data);
        let img_blob = new Blob([img_arraybuffer], {type: "octet/stream"})
        let dataUrl = window.URL.createObjectURL(img_blob);
        return <img className="post-img" src={dataUrl} />
    }
    
    render(){

        let postDetails = this.state.post;
        if(typeof postDetails.post_time == "object"){
            let time_arraybuffer = new Uint8Array(postDetails.post_time)
            postDetails.post_time = (new TextDecoder()).decode(time_arraybuffer);
        }
        
        let Post = (
                <div className="post">
                    <img src={postDetails.project_avatar_url} className="project-icon" />
                    <Link to={`/project-profile:${postDetails.project_name}`} className='post-for'>{postDetails.project_name}</Link> 
                   <div className="post-by-container">
                        <Link to={`/user-profile:${postDetails.username}`} className='post-by'>{postDetails.username}</Link>
                        <p className='post-time'>{postDetails.post_time}</p>
                   </div>
                    <img src="/public/svgs/DotsThreeVertical.svg" className='options-icon' />
                    <p className='post-heading'>{postDetails.post_heading}</p>
                    <p className='post-description'>{postDetails.post_description}</p>
                    {
                        postDetails.post_img_blob
                        &&
                        this.renderPostBlob(postDetails.post_img_blob)
                    }
                </div>
        )

        return Post;
    }

}

export default Post;
