
//when this script loads, check the current view of the browser
//if it is in desktop, i.e., it's minimum width is 720px
//then load the background image
// otherwise, it is in mobile view
// So, keep listen for state change events and keep checking the current view
// if the view becomes a desktop view, load the backgrond image

let mediaQuery = window.matchMedia("(min-width: 720px)");
let desktopView = mediaQuery.matches;

if(desktopView){
    toggleBackgroundImage();
    mediaQuery.removeEventListener("change", checkCurrentView);
}else {

    mediaQuery.addEventListener("change", checkCurrentView);

}     

function checkCurrentView(mediaQuery){

    // check if the current view matches the query we specified in window.matchMedia(). 
    // If it does, we are in desktop view, so toggle the background image and stop listening

    if(mediaQuery.matches){

        toggleBackgroundImage();

    }

}

function toggleBackgroundImage(){

        //set the img src so the browser loads the image

            let img = document.querySelector("#authPageBg");
            let img_url = img.getAttribute("data-src");
            img.setAttribute("src", img_url);

}