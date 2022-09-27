import React from "react";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import DesktopSideNav from "./SideNav";

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
    
                    <DesktopSideNav desktopView={this.props.desktopView} />

                    <form className="create-project-form" action="/create-project" method="POST">

                        <header>Create A Project</header>

                        <div className="form-floating">
                            <input placeholder="An Interesting Project Name" type="text" className="project-title form-control" name="project_name" id="project_name" required/>
                            <label for="project_name">An Interesting Project Name</label>
                        </div>

                        <div className="form-floating">
                            <textarea placeholder="Project Description" name="project_description" id="project_description" className="project-description form-control"></textarea>
                            <label for="project_description">Project Description</label>
                        </div>


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
                                                    <p className="badge bg-primary rounded-pill">{category.name}</p>
                                                </div>

                                            )
                                        }else {

                                            return (
                                                <div  key={category.id} className="category_option">
                                                    <input type="checkbox" name={category.name} value={category.name} data-id={category.id} />
                                                    <p className="badge bg-primary rounded-pill">{category.name}</p>
                                                </div>

                                            )

                                        }
                                    }
                                )
                            }
                        </fieldset>

                        <button type="submit" className="create-btn btn btn-primary">Create Project</button>
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

        window.scrollTo(0,0);

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

        if(projectDetails.project_name == ""){
            alert("Project Name Cannot Be Empty");
            return;
        }

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
                    window.location = "/";
                }
            }
        )

            }catch(err){
                console.log(err)
            }

    }
}

export default ProjectCreator;