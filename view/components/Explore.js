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
        });

        window.scrollBy(0, 500);

    }


    async componentDidMount(){
        window.scrollTo(0, 0);


        let categories = await this.fetchAllProjectCategories();
        
        this.setState({
            categories: categories
        });

    }

    render(){

        // let rowsChecked = 0;
        // let currentProjectCategories = [];
        // let rows = this.state.categoryProjects;
        // let currentRowName = "";

        // for(let i = 0; i < rows.length; i++){
                                            

        //         currentRowName = rows[i].name;

        //         let item = (
        //             <Link to={`/project-profile:${rows[i].name}`} key={rows[i].name} className='project-item'>
        //                 <img src={rows[i].avatar_url} className="project-icon" />
        //                 <p>{rows[i].name}</p>
        //                 <div className="item-categories">
        //                     {
        //                         while(rows[i].name == currentRowName){
        //                             categoryProjects.push(
        //                                 <span className="badge bg-prmary rounded-pill">{rows[i].category_name}</span>
        //                             )
        //                         }
        //                     }
        //                 </div>
        //             </Link>
        //         )
        // }

        return (
            <>
                <HeaderNav desktopView={this.props.desktopView}/>
    
                <div className="main-section">
    
                    <DesktopSideNav desktopView={this.props.desktopView} />
    
                    <div className="explore-container content-container">

                        <header className="header">Explore Projects</header>

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
                                        //super-inefficient
                                        this.state.categoryProjects.length > 0
                                        &&
                                        this.state.categoryProjects.map(
                                            (out_row, out_index, out_elements) => {

                                                    console.log(out_row, out_index, out_elements);

                                                    if(out_index == 0){

                                                        return (<Link to={`/project-profile:${out_row.name}`} key={out_row.name} className='project-item'>
                                                                    <img src={out_row.avatar_url} className="project-icon" />
                                                                    <p>{out_row.name}</p>
                                                                    <div className="item-categories">
                                                                        {
                                                                            this.state.categories.map(
                                                                                (in_row, in_index) => {
                                                                                    console.log(out_row, out_index, in_index, out_elements);

                                                                                    if((out_elements[out_index + in_index] !== undefined) && (out_elements[out_index + in_index].name == out_row.name)){
                                                                                        return  <span className="badge rounded-pill">{out_elements[out_index + in_index].category_name}</span>
                                                                                    }else{
                                                                                        return ;
                                                                                    }
                                                                                }
                                                                            )
                                                                        }
                                                                    </div>
                                                                </Link>)

                                                    }
                                                    if(out_index == out_elements.length){

                                                        return
                                                     
                                                    }
                                                    
                                                    if(out_elements[out_index -1].name !== out_row.name){ //we're in a different project row

                                                            return (<Link to={`/project-profile:${out_row.name}`} key={out_row.name} className='project-item'>
                                                                        <img src={out_row.avatar_url} className="project-icon" />
                                                                        <p>{out_row.name}</p>
                                                                        <div className="item-categories">
                                                                            {
                                                                                this.state.categories.map(
                                                                                    (in_row, in_index) => {
                                                                                        if((out_elements[out_index + in_index] !== undefined) && (out_elements[out_index + in_index].name == out_row.name)){
                                                                                            return  <span className="badge rounded-pill">{out_elements[out_index + in_index].category_name}</span>
                                                                                        }else{
                                                                                            return ;
                                                                                        }
                                                                                    }
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </Link>)
                                                            
                                                    }
                                                                                                        
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