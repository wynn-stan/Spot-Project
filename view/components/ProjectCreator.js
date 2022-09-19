import React from "react";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import DesktopSideNav from "./DesktopSideNav";
import setSessionItem from "../utils/setSessionItem";

class ProjectCreator extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            projectCategories: []
        }
    }

    render(){
        return (
            <>

                <HeaderNav desktopView={this.props.desktopView}/>

                <div className="main-section">
    
                    {
                        this.props.desktopView
                        && 
                        <DesktopSideNav />
                    }

                    <form className="create-project-form" action="/create-project" method="POST">
                        <input placeholder="An Interesting Project Name" type="text" className="project-title" name="project_name" required/>
                        <textarea placeholder="Project Description" name="project_description" className="project-description"></textarea>
                        <fieldset>
                            <legend>Select Project's Categories</legend>
                            {
                                this.state.projectCategories
                                &&
                                this.state.projectCategories.map(
                                    (category) => {
                                        if(category.name == "Misc"){
                                            return (
                                                <div key={category.id} className="category_option">
                                                    <input type="checkbox" name={category.name} value={category.name} data-id={category.id} defaultChecked/>
                                                    <p>{category.name}</p>
                                                </div>

                                            )
                                        }else {

                                            return (
                                                <div  key={category.id} className="category_option">
                                                    <input type="checkbox" name={category.name} value={category.name} data-id={category.id} />
                                                    <p>{category.name}</p>
                                                </div>

                                            )

                                        }
                                    }
                                )
                            }
                        </fieldset>

                        <button type="submit" className="create-btn">Create Project</button>
                    </form>
    
                </div>

                <FooterNav desktopView={this.props.desktopView}/>
            </>
        )
    }

    fetchAllProjectCategories = async () => {

        let categories = fetch("/getCategories", {
            method: "POST"
        }).then(
            async (res) => {
                return await res.json();
            }
        );

        return categories;

    }

    async componentDidMount(){

        let projectCategories = await this.fetchAllProjectCategories();

        let formElement = document.querySelector(".create-project-form");
        formElement.addEventListener("submit", (e) => {e.preventDefault()});

        let submitBtn = document.querySelector(".create-btn");
        submitBtn.addEventListener("click", this.handleFormSubmission);

        this.setState({
            projectCategories: projectCategories
        })

    }

    handleFormSubmission = async (event) => {

        let selected_categories = (document.querySelectorAll("input[type='checkbox']:checked"));
        let project_categories = [];
        for(let x = 0; x < selected_categories.length; x++){
            project_categories.push(selected_categories[x].getAttribute("data-id"));
        }

        let projectDetails = {
            project_name: document.querySelector(".project-title").value,
            project_description: document.querySelector(".project-description").value,
            project_categories: project_categories
        }

        console.log(projectDetails);

        try{

            fetch("/createProject", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(projectDetails)
        }).then(
            async (res) => {
                if(res.status == 403){
                    //project already exists
                    alert("Project Name already taken");
                    return;
                }else {

                    alert("Successfully Created Project");
                    setSessionItem("selected_project", projectDetails.project_name);
                    window.location = "/project-profile"

                }
            }
        )

            }catch(err){
                console.log(err)
            }

    }
}

export default ProjectCreator;