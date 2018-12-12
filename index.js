'use strict';

// VARIABLES
let inputHowForm  = "test how to get dessert";
let inputWhatForm = "test what dessert to get";
let inputLocation = "19125";
const keyRecipe = "0e24783ea0e0e61d97038231191d5131";
const idRecipe = "190b4f83";
const keyLocation = "AIzaSyCNNIw6onSvZl9Z-3KqPMItMDezJoEUw8Q"; 

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
    if (inputHowForm === "buy") {
        getLocations();
    }
    else {
        getRecipes();
    }
    $("#sectionhow").addClass("hidden");
    $("#sectionwhat").removeClass("hidden");
})


function getZipcode() {
// get user zipcode and create variable from it
}

function getRecipes() {
    fetch("https://api.edamam.com/search?app_id=" + idRecipe + "&app_key=" + keyRecipe + "&q=" + inputWhatForm + "&from=0&to=5")
    .then(response => response.json())
    .then(responseJson => console.log(responseJson)
    .catch(error => alert('Something went wrong. Try again later.'))
    );  
}

function getLocations() {
    fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?output=json&key=" + keyLocation + "&libraries=places&query=" + inputWhatForm + "+near+" + inputLocation + "&radius=32187")
    .then(response => response.json())
    .then(responseJson => console.log(responseJson)
    .catch(error => alert('Something went wrong. Try again later.'))
    );    
}

$(function() {
    console.log("App loaded! Waiting for submit!");
    console.log(inputHowForm);
    console.log(inputWhatForm);
    console.log(inputLocation);
});


