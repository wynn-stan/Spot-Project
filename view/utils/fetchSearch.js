/**
 * search, live search for proect names, on every keystroke return select top 5 where params
 */
 async function fetchSearch(searchItem){

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

export default fetchSearch;