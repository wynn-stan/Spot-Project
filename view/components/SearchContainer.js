import React from 'react';
import { Link } from 'react-router-dom';

/**
 * search, live search for proect names, on every keystroke return select top 5 where params
 */ 

class SearchContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            results: []
        }
    }

    fetchSearch = async (searchItem) => {

        const payload = {
            search: searchItem
        }
    
    
        let data = await fetch(
            "http://localhost:3002/search", 
            {
            method: "POST",
            headers : new Headers({
                'Content-Type':'application/json'
            }),
            body: JSON.stringify(payload)
        }).then(
            (res) => {
                return res.json()
            }
        ).then(
            (data) => {
                return data;
            }
        )
    
        return data;
        
    }

    displaySearchResults = () => {

        let searchResultsContainer = document.querySelector(".search-container .results-container");
        searchResultsContainer.classList.add("display-item");

    }

    hideSearchResults = () => {

        let searchResultsContainer = document.querySelector(".search-container .results-container");
        setTimeout(
            () => {searchResultsContainer.classList.remove("display-item");},
            500
        )

    }   

    setSelectedProject = (projectRef) => {
        sessionStorage.setItem("selected_project", projectRef);
    }

    componentDidMount(){
        //searchbar is now available
        document.querySelector('input#search').addEventListener("input", () => {
            let searchItem = document.querySelector("input#search").value;

            this.fetchSearch(searchItem)
            .then(
                (data) => {
                   this.setState({
                    results : data
                   })
                }
            );
        });

        document.querySelector('input#search').addEventListener("focusin", this.displaySearchResults)

        document.querySelector('input#search').addEventListener("focusout", this.hideSearchResults);        
    }

    render(){

        return (
            <div className='search-container'>

                <div className='search-bar'>

                    <img src='/public/svgs/MagnifyingGlass.svg' className='bar-magnifying-glass'/>
                    <input type="text" name="search" id="search" placeholder='Search Projects...'/>

                </div>

                <div className='results-container'>

                {
                    this.state.results.map(
                        (row) => {
                            return (<Link to={`/project-profile:${row.name}`} key={row.name} className='result-item' onClick={() => {this.setSelectedProject(row.id)}}>
                                        <img src={row.avatar_url} className="profile-icon" />
                                        <p>{row.name}</p>
                                    </Link>)

                        }
                    )
                }

                </div>
            </div>
        )
    }
    

}


export default SearchContainer;