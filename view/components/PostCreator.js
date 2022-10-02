import React from "react";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import DesktopSideNav from "./SideNav";


class PostCreator extends React.Component{

    //select options with project names

    constructor(props){

        super(props);

        this.state = {
            userProjects: []
        }

    }

    handleImageUpload = (e) => {

        //send a post to the 

    }

    createPost = async (e) => {

        let formElement = document.querySelector("#create-post-form");

        //get selected Project 
        let selectedProjectValue = document.querySelector("#create-post-for").value;
        let selectedProject = document.querySelector(`option[value="${selectedProjectValue}"]`);
        let projectId = selectedProject.getAttribute("data-id");

        let post_heading = document.querySelector("#create-post-heading").value;
        let post_for = projectId;

        if(selectedProjectValue == "null"){
            alert("Please Select A Project To Post To");
            return;
        }

        if(post_heading == ""){
            alert("Post Heading Cannot Be Empty");
            return;
        }

        // let requestBody = JSON.stringify({
        //     post_heading: post_heading,
        //     post_description: post_description,
        //     post_for: post_for,
        //     post_image_url: image_url
        // });

        let post_by = (JSON.parse(sessionStorage.getItem("userDetails"))).id;

        let formData = new FormData(formElement);
        formData.append("post_for", projectId);
        formData.append("post_by", post_by)


        try {
            await fetch("/createPost", {
                method: "POST",
                body: formData
            }).then(
                (res) => {
                    if(res.status == 200){
                        alert("Post Submitted Successfully");
                        window.location = "/";
                    }else if(res.status == 401){
                        alert("You cannot create posts or projects as a guest. Please Register An Account To Access These Features")
                    }else if(res.status == 500){
                        alert("Invalid file. You may only upload .png, .jpg, .jpeg, or .gif files");
                    }
                    else {
                        alert("There was an error in creating this post. Please retry again");
                    }
                }
            );


        }catch(err){
            console.log(err);
        }

    }

    fetchUserProjects = async () => {

        //fetch results and save them in sessionStorage
        let userFollowedProjects = await fetch("/getUserFollowedProjects", {
            method: "POST"
        })
        .then(
            async (res) => {return await res.json()}
        )

        let userManagedProjects = await fetch("/getUserManagedProjects", {
            method: "POST"
        }).then(
            async (res) => {return await res.json()}
        )

        let projectOptions = [...userManagedProjects, ...userFollowedProjects];

        return projectOptions;
    
    }


    render(){

        return (
            <>

                <HeaderNav desktopView={this.props.desktopView}/>

                <div className="main-section">
                    
                    <DesktopSideNav desktopView={this.props.desktopView} />

                    <form action="#" encType="multipart/form-data" onSubmit={(e) => {e.preventDefault(); this.createPost();}} className="create-post-section content-container" id="create-post-form" method="POST">

                        <header className="header">Create A Post</header>

                        <select name="posted_for" id="create-post-for" onFocus={(e) => {e.target.size = 10}} onBlur={(e) => {e.target.size = 1}} onChange={(e) => {e.target.size = 1; e.target.blur()}}>
                            <option value="null">Select A Project To Post To...</option>
                            {
                                this.state.userProjects.length > 0
                                &&
                                this.state.userProjects.map(
                                    (project) => {
                                        return <option key={project.name} data-id={project.id} value={project.name}>{project.name}</option>
                                    }
                                )
                            }
                        </select>

                        <div className="form-floating">
                            <input className="post-heading form-control" type="text" name="post_heading" id="create-post-heading" />
                            <label htmlFor="create-post-heading">An Interesting Title</label>
                        </div>

                        <div className="form-floating">
                            <textarea className="form-control" id="create-post-description"  name="post_description" ></textarea>
                            <label htmlFor="create-post-description">Your text post(optional)</label>
                        </div>

                        <label htmlFor="img_upload" className="img_upload_button btn btn-secondary">
                            <input type="file" name="post_image" id="img_upload" onChange={this.handleImageUpload} />
                            Add Image
                        </label>    

                        <button type="submit" className="btn btn-primary">Post</button>

                    </form>
                </div>
    
                <FooterNav desktopView={this.props.desktopView}/>
            </>
        )
    }

    async componentDidMount(){

        window.scrollTo(0,0);

        let userProjects = await this.fetchUserProjects();

        if(userProjects.length == 0){
            alert("Reminder: You must be following or managing at least 1 project before you can post");
        }

        this.setState({
            userProjects: userProjects
        });

    }
}



export default PostCreator;