import React from 'react'

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
        })
    }

    render(){
        return (
            <div className='search-container'>

                <div className='search-bar'>

                    <img src='/public/svgs/MagnifyingGlass.svg' className='bar-magnifying-glass'/>
                    <input type="text" name="search" id="search" placeholder='Search'/>

                </div>

                <div className='results-container'>

                {
                    this.state.results.map(
                        (row) => {
                            return <p key={row.project_name}>{row.project_name}</p>

                        }
                    )
                }

                </div>
            </div>
        )
    }
    

}


export default SearchContainer;