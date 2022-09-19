import React from "react";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import DesktopSideNav from "./DesktopSideNav";


class PostCreator extends React.Component{

    //select options with project names

    constructor(props){

        super(props);

        this.state = {
            userProjects: []
        }

        this.cloudinary_form = new FormData();
        //for dev purposes only store the cloudinary upload preset, url, and etc on client sside
        this.CLOUDINARY_UPLOAD_PRESET = "";
        this.CLOUDINARY_URL = "";

    }

    handleImageUpload = (e) => {

        this.cloudinary_form.append("file", e.target.files[0]);
        this.cloudinary_form.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

    }

    createPost = async (e) => {

        //get selected Project 
        let selectedProjectValue = document.querySelector("#create-post-for").value;
        let selectedProject = document.querySelector(`option[value="${selectedProjectValue}"]`);
        let projectId = selectedProject.getAttribute("data-id");

        let post_heading = document.querySelector("#create-post-heading").value;
        let post_for = projectId;
        let post_description = document.querySelector("#create-post-description").value;  
        let image_url;

        //if image, generate cloudinary url for image
        // if(this.cloudinary_form.has("file")){

        //     image_url = fetch(this.CLOUDINARY_URL)
        //     .then(async (res) => await res.json)
        //     .then(
        //         data => {
        //                 return data.secure_url;
        //         }
        //     )

        // }

        let requestBody = JSON.stringify({
            post_heading: post_heading,
            post_description: post_description,
            post_for: post_for,
            post_image_url: image_url
        });

        try {
            await fetch("/createPost", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: requestBody
            });
            
            alert("Post Submitted Successfully");
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

    stopFormSubmission = (e) => {
        e.preventDefault();
    } 


    render(){

        console.log("user_projects");
        console.log(this.state.userProjects);

        return (
            <>

                <HeaderNav desktopView={this.props.desktopView}/>

                <div className="main-section">
                    
                    {
                        this.props.desktopView == true
                        &&
                        <DesktopSideNav />
                    }

                    <form action="#" onSubmit={this.stopFormSubmission} className="create-post-section content-container" method="POST">

                        <input list="projects-list" name="post_for" id="create-post-for" placedholder="Select A Project To Post To..." required/>
                        <datalist id="projects-list" className="select-user-projects">
                            {
                                this.state.userProjects
                                &&
                                this.state.userProjects.map(
                                    (project) => {
                                        return <option key={project.name} onClick={this.selectProject} data-id={project.id} value={project.name} />
                                    }
                                )
                            }
                        </datalist>

                        <input className="post-heading" type="text" name="post_heading" id="create-post-heading" placeholder="An Interesting Title"/>

                        <textarea id="create-post-description" name="post_description" placeholder="Your text post(optional)"></textarea>

                        <label htmlFor="img_upload" className="img_upload_button btn btn-primary">
                            <input type="file" name="img_upload" id="img_upload" onChange={this.handleImageUpload} />
                            Add Image
                        </label>    

                        <button type="submit" onClick={this.createPost}>Post</button>

                    </form>
                </div>
    
                <FooterNav desktopView={this.props.desktopView}/>
            </>
        )
    }

    async componentDidMount(){

        let userProjects = await this.fetchUserProjects();

        this.setState({
            userProjects: userProjects
        });

    }
}



export default PostCreator;