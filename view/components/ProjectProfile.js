import React from "react";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import DesktopSideNav from "./SideNav";
import Post from "./Post";

class ProjectProfile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            posts:[]
        }
    }

    fetchProjectDetails = async (projectRef) => {

        let [projectDetails] = await fetch("/getProjectDetails", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                projectRef: projectRef
            })
        }).then(
            async (res) => {
                return await res.json();
            }
        )

        return projectDetails;
    }

    fetchProjectPosts = async (id) => {

        let projectRef = id;

        let posts = await fetch("/getProjectPosts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                projectRef: projectRef
            })
        }).then(
            async (res) => {
                return await res.json();
            }
        );

        return posts;
    }

    async componentDidMount(){

        window.scrollTo(0, 0);


       let projectDetails = await this.fetchProjectDetails(this.props.match.params.projectRef);
       let posts = await this.fetchProjectPosts(projectDetails.id);

       this.setState({
        projectDetails: projectDetails,
        posts: posts
       });

    }

    async getSnapshotBeforeUpdate(prevProps, prevState){

        if(prevProps.match.params.projectRef !== this.props.match.params.projectRef){
            let projectDetails = await this.fetchProjectDetails(this.props.match.params.projectRef);
            let posts = await this.fetchProjectPosts(projectDetails.id);

            this.setState({
                projectDetails: projectDetails,
                posts: posts
               });
        }
    }

    componentDidUpdate(){

    }

    followProject = async () => {

        await fetch("/followProject",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                projectId: this.state.projectDetails.id
            })
        })
        .then(
            async (res) => {
                if(res.status == 200){
                    alert("Followed");
                }
            }
        )

    }

    unfollowProject = async () => {

        await fetch("/unfollowProject",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                projectId: this.state.projectDetails.id
            })
        })
        .then(
            async (res) => {
                if(res.status == 200){
                    alert("Unfollowed");
                }
            }
        )

    }

    render(){

        return (
            <>
                <HeaderNav desktopView={this.props.desktopView}/>
    
                 <div className='main-section'>
    
                    <DesktopSideNav desktopView={this.props.desktopView} />
    
                    <div className="profile-contiainer content-container">

                        <div className="profile-header-container">

                            {
                                this.state.projectDetails
                                &&
                                <>
                                    <img src={this.state.projectDetails.avatar_url} alt="" className="project-icon" />

                                    <div className="project-name">{this.state.projectDetails.name}</div>

                                    <div className="project-description">{this.state.projectDetails.project_description}</div>

                                    <div className="project-followers">{}</div>

                                    <button className="follow-btn" onClick={this.followProject}>Follow</button>

                                    <button className="unfollow-btn" onClick={this.unfollowProject}>Unfollow</button>
                                </>
                            }

                        </div>

                        <div className="profile-body-container">

                            <div className="post-section content-container">
                                <div className="post-container">
                                    {
                                        this.state.posts.map(
                                            (postDetails) => {
                                                return <Post key={postDetails.post_id} postDetails={postDetails} />
                                            }
                                        )
                                    }

                                    <div className="loading-container">
                                        <div ref={this.loadingRef} className="spinner-grow text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                        </div>

                                        <div ref={this.loadingRef} className="spinner-grow text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                        </div>

                                        <div ref={this.loadingRef} className="spinner-grow text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                                        
                    </div>
    
                </div>
    
                <FooterNav desktopView={this.props.desktopView} />
            </>
        )

    }
}
export default ProjectProfile;