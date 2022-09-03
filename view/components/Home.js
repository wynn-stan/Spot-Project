import React from 'react';
import {Link} from 'react-router-dom';
import Post from './Post';
import SearchContainer from './SearchContainer';
import HeaderNav from './HeaderNav';
import FooterNav from './FooterNav';

class Home extends React.Component {

    //constructor for cppl
    constructor(props){
        super(props);

        this.state = {
            currentPage: 0,
            posts: [],
            loading: false, 
            prevY: 0
        }

        this.loadingRef = React.createRef();
    }

    renderHomePosts = (currentPage) => {

            let posts = sessionStorage.getItem("posts");

            if(posts == null) return ;
            
            this.setState({
                loading: true
            });
    
            //data will be in the localStorage so fetch from that.
            const oldPosts = this.state.posts;
            const newPosts = JSON.parse(posts).slice(currentPage, currentPage + 10);

            console.log("new Posts");
            console.log(newPosts);
            
            this.setState({
                posts: [...oldPosts, ...newPosts]
            });
    
            currentPage = currentPage + 10;
    
            this.setState(
                {
                    currentPage: currentPage,
                    loading: false
                }
            )        
        
    }   

    savePosts = (posts) => {
        sessionStorage.setItem("posts", posts);
    }
    
    fetchDBPosts = async () => {

        const posts = await fetch("/fetchDBPosts", {
            method: "POST",
            headers: {
                
            }
        }).then(
           async (res) => {
                return await res.json();
            }
        );

        this.savePosts(posts);
        this.renderHomePosts(this.state.currentPage);
        
    } 

    componentDidMount(){      

        this.fetchDBPosts();

        //create the observer
        //observe the loading ref element
        const observer = new IntersectionObserver(
            (entries, observer) => {

                const y = entries[0].boundingClientRect.y;
                if(this.state.prevY > y){
                    let newPage = this.state.currentPage;
                    this.renderHomePosts(newPage);
                }
                this.setState({
                    prevY: y
                })

                //... get new posts with new page, 

            }
        , {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        })

        observer.observe(this.loadingRef.current);

    }

    render(){

        const logoUrl = "";

        /**
         * Nav has brand, logo, searchbar, userAvatar nav
         */

        return (
            <>
            
            <HeaderNav />

            <div className="post-section">
                <div className="post-container">
                    {
                        this.state.posts.map(
                            (postDetails) => {
                                return <Post key={postDetails.post_id} postDetails={postDetails} />
                            }
                        )
                    }
                    <div ref={this.loadingRef}>
                    Loading...
                    </div>
                </div>

            </div>

            <FooterNav />
        </>
        )

    }

    componentDidUpdate(){





    }

}

export default Home;