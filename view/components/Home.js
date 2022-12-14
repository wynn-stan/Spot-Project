import React from 'react';
import Post from './Post';
import HeaderNav from './HeaderNav';
import FooterNav from './FooterNav';
import DesktopSideNav from './SideNav';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            posts: []
        }
    }

    async componentDidMount(){
        window.scrollTo(0,0);

        let posts = await this.getHomeFeed();

        this.setState({
            posts: posts,
            loading: false
        })
    }

    getHomeFeed = async () => {

        const posts = await fetch("/getHomeFeed", {
            method: "POST"
        }).then(
           async (res) => {
                return await res.json();
            }
        );

        console.log(posts);
    
        return posts;
        
    }

    render(){

        return (
            <>
            
            <HeaderNav desktopView={this.props.desktopView}/>

            <div className='main-section'>

                <DesktopSideNav desktopView={this.props.desktopView} />

                <div className="post-section content-container">
                    <div className="post-container">
                        {
                            this.state.posts
                            &&
                            this.state.posts.map(
                                (postDetails) => {
                                    return <Post key={postDetails.post_id} postDetails={postDetails} />
                                }
                            )
                        }

                            <div className="loading-container">

                                    {
                                        this.state.loading == true
                                        &&
                                        <>
                                            <div ref={this.loadingRef} className="spinner-grow text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                            </div>

                                            <div ref={this.loadingRef} className="spinner-grow text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                            </div>

                                            <div ref={this.loadingRef} className="spinner-grow text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </>
                                    }

                                    {
                                        this.state.loading == false
                                        &&
                                        <div ref={this.loadingRef}>No New Posts</div>
                                    }

                            </div>

                        
                    </div>

                </div>

            </div>

            <FooterNav desktopView={this.props.desktopView} />
        </>
        )

    }
}

// class oldHome extends React.Component {

//     //constructor for cppl
//     constructor(props){
//         super(props);

//         this.state = {
//             currentPage: 0,
//             posts: [],
//             loading: false, 
//             prevY: 0,
//             hasFetched: false
//         }

//         this.loadingRef = React.createRef();
//     }

//     renderHomePosts = (currentPage) => {

//             let posts = sessionStorage.getItem("posts");

//             if(posts == null) return ;
            
//             this.setState({
//                 loading: true
//             });
    
//             //data will be in the localStorage so fetch from that.
//             const oldPosts = this.state.posts;
//             const newPosts = JSON.parse(posts).slice(currentPage, currentPage + 10);

//             console.log("new Posts");
//             console.log(newPosts);
            
//             this.setState({
//                 posts: [...oldPosts, ...newPosts],
//             });
    
//             currentPage = currentPage + 10;
    
//             this.setState(
//                 {
//                     currentPage: currentPage,
//                     loading: false
//                 }
//             )        
        
//     }   

//     savePosts = (posts) => {
//         sessionStorage.setItem("posts", JSON.stringify(posts));
//     }
    
//     getHomeFeed = async () => {

//         const posts = await fetch("/getHomeFeed", {
//             method: "POST"
//         }).then(
//            async (res) => {
//                 return await res.json();
//             }
//         );


//         this.savePosts(posts);
//         this.renderHomePosts(this.state.currentPage);
        
//     } 

//     componentDidMount(){      

//         window.scrollTo(0,0);

//         this.getHomeFeed();

//         //create the observer
//         //observe the loading ref element
//         const observer = new IntersectionObserver(
//             (entries, observer) => {

//                 const y = entries[0].boundingClientRect.y;
//                 if(this.state.prevY > y){
//                     let newPage = this.state.currentPage;
//                     this.renderHomePosts(newPage);
//                 }
//                 this.setState({
//                     prevY: y
//                 })

//                 //... get new posts with new page, 

//             }
//         , {
//             root: null,
//             rootMargin: "0px",
//             threshold: 1.0
//         })

//         observer.observe(this.loadingRef.current);

//     }

//     render(){

//         const logoUrl = "";

//         /**
//          * Nav has brand, logo, searchbar, userAvatar nav
//          */

//         return (
//             <>
            
//             <HeaderNav desktopView={this.props.desktopView}/>

//             <div className='main-section'>

//                 <DesktopSideNav desktopView={this.props.desktopView} />

//                 <div className="post-section content-container">
//                     <div className="post-container">
//                         {
//                             this.state.posts.map(
//                                 (postDetails) => {
//                                     return <Post key={postDetails.post_id} postDetails={postDetails} />
//                                 }
//                             )
//                         }

//                             <div className="loading-container">

//                                     {/* <div ref={this.loadingRef} className="spinner-grow text-primary" role="status">
//                                     <span className="visually-hidden">Loading...</span>
//                                     </div>

//                                     <div ref={this.loadingRef} className="spinner-grow text-primary" role="status">
//                                     <span className="visually-hidden">Loading...</span>
//                                     </div>

//                                     <div ref={this.loadingRef} className="spinner-grow text-primary" role="status">
//                                     <span className="visually-hidden">Loading...</span>
//                                     </div> */}


//                                     <div ref={this.loadingRef}>No New Posts</div>

//                             </div>

                        
//                     </div>

//                 </div>

//             </div>

//             <FooterNav desktopView={this.props.desktopView} />
//         </>
//         )

//     }

// }

export default Home;