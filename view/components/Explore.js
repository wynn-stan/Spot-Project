import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import React from "react";
import DesktopSideNav from "./DesktopSideNav";
import setSessionItem from "../utils/setSessionItem";
import { Link } from "react-router-dom";

class Explore extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categories: [],
            selectedCategory: null,
            categoryProjects: []
        }
    }

    selectCategory = async (e) =>{

        let category_id = e.target.getAttribute("data-id");
        let category_name = e.target.innerHTML;

        let categoryProjects = await fetch('/getCategoryProjects', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category_id: category_id
            })
        }).then(
            async (res) => {
                return await res.json()
            }
        );

        this.setState({
            selectedCategory: category_name,
            categoryProjects: categoryProjects
        });

    }

    fetchAllProjectCategories = async () => {

        let categories = await fetch("/getCategories", {
            method: "POST"
        }).then(
            async (res) => {
                return await res.json();
            }
        );

        return categories;

    }

    getAllProjects = async () => {

        let rows = await fetch("/getAllProjects", {
            method: "POST"
        }).then(
            async (res) => {
                return await res.json();
            }
        );

        this.setState({
            selectedCategory: "All",
            categoryProjects: rows
        })

    }

    async componentDidMount(){

        let categories = await this.fetchAllProjectCategories();
        
        this.setState({
            categories: categories
        });

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
    
                    <div className="explore-container content-container">

                        <button className="category-item all" onClick={this.getAllProjects}>All</button>

                        {
                            this.state.categories
                            &&
                            this.state.categories.map(
                                (category) => {
                                    return <button onClick={this.selectCategory} key={category.name} className="category-item" data-id={category.id}>{category.name}</button>
                                }
                            )
                        }
                        
                        {
                            this.state.selectedCategory
                            &&
                            <div className="category-projects-container">
                                <h2>{this.state.selectedCategory}</h2>
                                {
                                    this.state.categoryProjects.map(
                                        (row) => {
                                            return (<Link to="/project-profile" key={row.name} className='project-item' onClick={() => {setSessionItem("selected_project", row.name)}}>
                                                        <img src={row.avatar_url} className="project-icon" />
                                                        <p>{row.name}</p>
                                                        <p>{row.description}</p>
                                                    </Link>)
                                        }
                                    )
                                }
                            </div>
                        }
                    </div>


    
                </div>
    
                <FooterNav desktopView={this.props.desktopView}/>
            </>
        )

    }

}

export default Explore;