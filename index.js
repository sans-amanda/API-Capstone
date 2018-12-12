'use strict';

// VARIABLES
let inputHowForm  = "test how to get dessert";
let inputWhatForm = "test what dessert to get";
let inputLocation = "19125";
const keyRecipe = "0e24783ea0e0e61d97038231191d5131";
const idRecipe = "190b4f83";
const keyLocationSecret = "24DY22E4YCK3GXZRWU2MU5SFWT2DUHPVPRR4FWXYDVAGT3ZR"; 
const secretLocation = "ZBQVXBNWPLEWN55ZHJO0H0REJE35SIA1FFCLT5H2CSHZAJ3Z";





// HIDE/DISPLAY SECTIONS
// hide start, show how WORKS
$("#formstart").submit(event => {
    event.preventDefault();
    $("#sectionstart").addClass("hidden");
    $("#sectionhow").removeClass("hidden");
})




// hide how, show what WORKS
$("#formhow").click(event => {
    event.preventDefault();
    inputHowForm = $("#formhow input[type=radio]:checked").val();
    console.log(inputHowForm);
    $("#sectionhow").addClass("hidden");
    $("#sectionwhat").removeClass("hidden");
})





// hide what, show recipes or locations
$("#formwhat").click(event => {
    event.preventDefault();
    inputWhatForm = $("#formwhat input[type=radio]:checked").val();
    console.log(inputWhatForm);
    if (inputHowForm === "make") {
        getRecipes();
        $("#sectionwhat").addClass("hidden");
        $("#sectionrecipes").removeClass("hidden");
    }
    else {
        getZipcode();
        console.log(inputLocation);
        getLocations();
        displayLocations(responseJson);
        $("#sectionhow").addClass("hidden");
        $("#sectionlocations").removeClass("hidden");
    };
})









// MODAL WINDOW
// open modal window and get zipcode
function openModal() {

}


function getZipcode() {
    $("#formzipcode").click(event => {
        event.preventDefault();
        inputLocation = $("#formzipcode input[type=text]").text();
    })
    console.log(inputLocation);
}







// APIS
function getRecipes() {
    fetch("https://api.edamam.com/search?app_id=" + idRecipe + "&app_key=" + keyRecipe + "&q=" + inputWhatForm + "&from=0&to=5")
    .then(response => response.json())
    .then(responseJson => displayRecipes(responseJson)
    //.then(displayRecipes(responseJson))
    );  
}

function getLocations() {
    fetch("https://api.foursquare.com/v2/venues/search?client_id=" + keyLocation + "&client_secret=" + keyLocationSecret + "&v=20201230&intent=browse&limit=20&query=" + inputWhatForm + "&near=" + inputLocation + "&radius=30000")
    .then(response => response.json())
    .then(responseJson => console.log(responseJson)
    );    
}





// WORKING WITH DATA
function displayRecipes(responseJson) {
    console.log("displayRecipes works");
    // iterate through the items array and push them to DOM
    for (let i = 0; i < responseJson.hits.length; i++) {
        console.log("for loop works");
        $("#recipesheader").after(
            `<li><a href="${responseJson.hits[i].recipe.url}">${responseJson.hits[i].recipe.label}</a></h3>
            <img src="${responseJson.hits[i].recipe.image}"></li>`
        )};
}

function displayLocations() {
    console.log("displayLocations working");
}


// ON PAGE LOAD
$(function() {
    console.log("App loaded! Waiting for submit!");
    console.log(inputHowForm);
    console.log(inputWhatForm);
    console.log(inputLocation);
});


