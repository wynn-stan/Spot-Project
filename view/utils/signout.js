async function signout(){
    await fetch("/signout", {method: "POST"});
}

export default signout;