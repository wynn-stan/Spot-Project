import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import React from "react";
import DesktopSideNav from "./SideNav";
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

        window.scrollBy(0, 500);

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

    componentDidUpdate(){
    }

    async componentDidMount(){
        window.scrollTo(0, 0);


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
    
                    <DesktopSideNav desktopView={this.props.desktopView} />
    
                    <div className="explore-container content-container">

                        <header>Explore Projects</header>

                        <div className="category-items">
                            <button className="category-item all btn btn-primary btn-large" onClick={this.getAllProjects}>All</button>

                            {
                                this.state.categories
                                &&
                                this.state.categories.map(
                                    (category) => {
                                        return <button onClick={this.selectCategory} key={category.name} className="category-item btn btn-primary btn-large" data-id={category.id}>{category.name}</button>
                                    }
                                )
                            }
                            
                        </div>

                        {
                                this.state.selectedCategory
                                &&
                                <div className="category-projects-container">
                                    <h2 className="header">{this.state.selectedCategory} Projects</h2>
                                    <div className="category-projects">
                                    {
                                        this.state.categoryProjects.length > 0
                                        &&
                                        this.state.categoryProjects.map(
                                            (row) => {
                                                return (<Link to={`/project-profile:${row.name}`} key={row.name} className='project-item'>
                                                            <img src={row.avatar_url} className="project-icon" />
                                                            <p>{row.name}</p>
                                                            <div className="item-categories">
                                                                {
                                                                    row.categories
                                                                    &&
                                                                    row.categories.map(
                                                                        (category_name) => {
                                                                            <span className="badge rounded-pill bg-primary">{category_name}</span>
                                                                        }
                                                                    )
                                                                }
                                                            </div>
                                                        </Link>)
                                            }
                                        )
                                    }
                                    {
                                        this.state.categoryProjects.length == 0
                                        &&
                                        <>
                                            <p>No projects under this category.</p>
                                            <p>Why don't you create one <i><Link to="/create-project">here</Link></i></p>
                        
                                        </>
                                    }
                                    </div>
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