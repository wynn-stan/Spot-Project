import React from 'react';
import Post from "./Post";

class PostContainer extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        console.log(this.props.posts)

        //the props contains the details for each post,
        //for each prop post, generate a post component and return the post container

        return (
            <>
                <div className='post-container'>
                    {
                         this.props.posts.map(
                            (postDetails) => {
                            }
                        )
                    }
                </div>

            </>
        )
    }

}

export default PostContainer;